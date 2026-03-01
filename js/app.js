// ============================================
// تريدات روبلوكس - ملف الجافاسكربت الرئيسي
// ============================================

// متغيرات عامة
let currentUser = null;
let posts = [];
let currentCategory = 'all';

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // التحقق من الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        initAuthPage();
    } else if (currentPage === 'feed.html') {
        initFeedPage();
    }
    
    // إخفاء شاشة التحميل
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
}

// ============================================
// صفحة المصادقة
// ============================================
function initAuthPage() {
    // التبويبات
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tab === 'login' ? 'loginForm' : 'registerForm').classList.add('active');
        });
    });
    
    // إظهار/إخفاء كلمة المرور
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // قوة كلمة المرور
    const regPassword = document.getElementById('regPassword');
    if (regPassword) {
        regPassword.addEventListener('input', checkPasswordStrength);
    }
    
    // نموذج التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // نموذج الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // التحقق من تذكرني
    checkRememberMe();
}

function checkPasswordStrength() {
    const password = this.value;
    const bars = document.querySelectorAll('.strength-bar');
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    bars.forEach((bar, index) => {
        bar.className = 'strength-bar';
        if (index < strength) {
            if (strength <= 2) bar.classList.add('weak');
            else if (strength <= 3) bar.classList.add('medium');
            else bar.classList.add('strong');
        }
    });
}

function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // التحقق من البيانات
    if (password !== confirmPassword) {
        showToast('كلمات المرور غير متطابقة!', 'error');
        shakeElement(document.getElementById('regConfirmPassword').parentElement);
        return;
    }
    
    // التحقق من وجود المستخدم
    const users = JSON.parse(localStorage.getItem('roblox_traders_users') || '[]');
    if (users.find(u => u.username === username)) {
        showToast('اسم المستخدم موجود بالفعل!', 'error');
        return;
    }
    
    // إنشاء المستخدم
    const user = {
        id: Date.now(),
        username,
        email,
        password: btoa(password), // تشفير بسيط
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    localStorage.setItem('roblox_traders_users', JSON.stringify(users));
    
    showToast('تم إنشاء الحساب بنجاح!', 'success');
    
    setTimeout(() => {
        // تسجيل الدخول تلقائياً
        loginUser(user);
    }, 1000);
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const users = JSON.parse(localStorage.getItem('roblox_traders_users') || '[]');
    const user = users.find(u => u.username === username && atob(u.password) === password);
    
    if (!user) {
        showToast('اسم المستخدم أو كلمة المرور غير صحيحة!', 'error');
        shakeElement(document.querySelector('.form-container'));
        return;
    }
    
    if (rememberMe) {
        localStorage.setItem('roblox_traders_remember', JSON.stringify({
            username: user.username,
            expiry: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 يوم
        }));
    }
    
    loginUser(user);
}

function loginUser(user) {
    currentUser = user;
    sessionStorage.setItem('roblox_traders_current', JSON.stringify(user));
    showToast(`مرحباً ${user.username}!`, 'success');
    
    setTimeout(() => {
        window.location.href = 'feed.html';
    }, 500);
}

function checkRememberMe() {
    const remember = localStorage.getItem('roblox_traders_remember');
    if (remember) {
        const data = JSON.parse(remember);
        if (data.expiry > Date.now()) {
            document.getElementById('loginUsername').value = data.username;
            document.getElementById('rememberMe').checked = true;
        } else {
            localStorage.removeItem('roblox_traders_remember');
        }
    }
}

// ============================================
// صفحة المنشورات
// ============================================
function initFeedPage() {
    // التحقق من تسجيل الدخول
    const userData = sessionStorage.getItem('roblox_traders_current');
    if (!userData) {
        showToast('يجب تسجيل الدخول أولاً!', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }
    
    currentUser = JSON.parse(userData);
    document.getElementById('currentUser').textContent = currentUser.username;
    document.getElementById('userAvatar').src = currentUser.avatar;
    
    // تحميل المنشورات
    loadPosts();
    
    // الفئات
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterPosts();
        });
    });
    
    // الفلاتر
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sortPosts(btn.dataset.filter);
        });
    });
    
    // زر الإضافة العائم
    const fabBtn = document.getElementById('fabBtn');
    const postModal = document.getElementById('postModal');
    
    fabBtn.addEventListener('click', () => {
        postModal.classList.add('active');
    });
    
    // إغلاق المودال
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelPost').addEventListener('click', closeModal);
    
    postModal.addEventListener('click', (e) => {
        if (e.target === postModal) closeModal();
    });
    
    // رفع الصور
    setupImageUpload('itemImageUpload', 'itemImage');
    setupImageUpload('tradeImageUpload', 'tradeImage');
    
    // نشر المنشور
    document.getElementById('postForm').addEventListener('submit', handlePostSubmit);
    
    // تأثير scroll للهيدر
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function closeModal() {
    const modal = document.getElementById('postModal');
    modal.classList.remove('active');
    document.getElementById('postForm').reset();
    document.querySelectorAll('.image-upload').forEach(upload => {
        upload.classList.remove('has-image');
        upload.querySelector('img').src = '';
    });
}

function setupImageUpload(uploadId, inputId) {
    const upload = document.getElementById(uploadId);
    const input = document.getElementById(inputId);
    const preview = upload.querySelector('img');
    const removeBtn = upload.querySelector('.remove-image');
    
    upload.addEventListener('click', () => input.click());
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                upload.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });
    
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = '';
        preview.src = '';
        upload.classList.remove('has-image');
    });
}

function handlePostSubmit(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const tradeFor = document.getElementById('tradeFor').value;
    const tiktokUrl = document.getElementById('tiktokUrl').value;
    const discordUser = document.getElementById('discordUser').value;
    
    const itemImageInput = document.getElementById('itemImage');
    const tradeImageInput = document.getElementById('tradeImage');
    
    const post = {
        id: Date.now(),
        author: currentUser.username,
        authorAvatar: currentUser.avatar,
        itemName,
        itemCategory,
        itemImage: '',
        tradeFor,
        tradeImage: '',
        tiktokUrl,
        discordUser,
        createdAt: new Date().toISOString(),
        likes: 0,
        views: 0
    };
    
    // معالجة الصور
    const processImage = (input) => {
        return new Promise((resolve) => {
            if (input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(input.files[0]);
            } else {
                resolve('');
            }
        });
    };
    
    Promise.all([
        processImage(itemImageInput),
        processImage(tradeImageInput)
    ]).then(([itemImage, tradeImage]) => {
        post.itemImage = itemImage || 'https://via.placeholder.com/300x200/6366f1/ffffff?text=No+Image';
        post.tradeImage = tradeImage || '';
        
        // حفظ المنشور
        const posts = JSON.parse(localStorage.getItem('roblox_traders_posts') || '[]');
        posts.unshift(post);
        localStorage.setItem('roblox_traders_posts', JSON.stringify(posts));
        
        showToast('تم نشر التريد بنجاح!', 'success');
        closeModal();
        loadPosts();
    });
}

function loadPosts() {
    posts = JSON.parse(localStorage.getItem('roblox_traders_posts') || '[]');
    
    // إضافة منشورات تجريبية إذا لم يكن هناك منشورات
    if (posts.length === 0) {
        addSamplePosts();
        posts = JSON.parse(localStorage.getItem('roblox_traders_posts') || '[]');
    }
    
    renderPosts();
    updateStats();
}

function addSamplePosts() {
    const samplePosts = [
        {
            id: 1,
            author: 'RobloxKing',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RobloxKing',
            itemName: 'Dominus Infernus',
            itemCategory: 'limited',
            itemImage: 'https://via.placeholder.com/300x200/ff4444/ffffff?text=Dominus',
            tradeFor: '1,000,000 Robux أو Dominus Aureus',
            tradeImage: 'https://via.placeholder.com/300x200/ffd700/ffffff?text=Trade',
            tiktokUrl: 'https://tiktok.com/@robloxking',
            createdAt: new Date().toISOString(),
            likes: 156,
            views: 1200
        },
        {
            id: 2,
            author: 'ProTrader',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProTrader',
            itemName: 'Valkyrie Helm',
            itemCategory: 'limited',
            itemImage: 'https://via.placeholder.com/300x200/4444ff/ffffff?text=Valkyrie',
            tradeFor: '500,000 Robux',
            tradeImage: '',
            tiktokUrl: '',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            likes: 89,
            views: 650
        }
    ];
    
    localStorage.setItem('roblox_traders_posts', JSON.stringify(samplePosts));
}

function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    const filteredPosts = currentCategory === 'all' 
        ? posts 
        : posts.filter(p => p.itemCategory === currentCategory);
    
    filteredPosts.forEach((post, index) => {
        const card = createPostCard(post, index);
        container.appendChild(card);
    });
    
    document.getElementById('totalPosts').textContent = posts.length;
}

function createPostCard(post, index) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const timeAgo = getTimeAgo(post.createdAt);
    const categoryLabels = {
        limited: 'Limited',
        robux: 'Robux',
        gamepass: 'Game Pass',
        avatar: 'Avatar'
    };
    
    card.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <img src="${post.authorAvatar}" alt="${post.author}" class="author-avatar">
                <div class="author-info">
                    <h4>${post.author}</h4>
                    <span class="post-time">${timeAgo}</span>
                </div>
            </div>
            <span class="post-category">${categoryLabels[post.itemCategory] || post.itemCategory}</span>
        </div>
        
        <div class="post-images">
            <div class="post-image">
                <img src="${post.itemImage}" alt="${post.itemName}">
                <span class="image-label">العنصر</span>
            </div>
            ${post.tradeImage ? `
            <div class="post-image">
                <img src="${post.tradeImage}" alt="Trade">
                <span class="image-label">المقابل</span>
            </div>
            ` : `
            <div class="post-image" style="background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <span style="color: var(--text-muted); font-size: 0.9rem;">${post.tradeFor}</span>
            </div>
            `}
        </div>
        
        <div class="post-content">
            <h3 class="post-title">${post.itemName}</h3>
            <div class="post-trade">
                <i class="fas fa-exchange-alt"></i>
                <span>المقابل: ${post.tradeFor}</span>
            </div>
            
            ${post.tiktokUrl ? `
            <a href="${post.tiktokUrl}" target="_blank" class="tiktok-link" onclick="event.stopPropagation()">
                <i class="fab fa-tiktok"></i>
                <span>تواصل عبر TikTok</span>
            </a>
            ` : ''}
            
            <div class="post-actions" style="margin-top: 15px;">
                <button class="post-btn primary" onclick="contactTrader('${post.author}', '${post.tiktokUrl}')">
                    <i class="fas fa-handshake"></i>
                    <span>تواصل</span>
                </button>
                <button class="post-btn secondary" onclick="likePost(${post.id})">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'الآن';
    if (seconds < 3600) return `منذ ${Math.floor(seconds / 60)} دقيقة`;
    if (seconds < 86400) return `منذ ${Math.floor(seconds / 3600)} ساعة`;
    if (seconds < 604800) return `منذ ${Math.floor(seconds / 86400)} يوم`;
    return date.toLocaleDateString('ar-SA');
}

function filterPosts() {
    renderPosts();
}

function sortPosts(filter) {
    if (filter === 'newest') {
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === 'popular') {
        posts.sort((a, b) => b.likes - a.likes);
    }
    renderPosts();
}

function contactTrader(author, tiktokUrl) {
    if (tiktokUrl) {
        window.open(tiktokUrl, '_blank');
    } else {
        showToast(`يمكنك التواصل مع ${author} عبر Discord`, 'info');
    }
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('roblox_traders_posts', JSON.stringify(posts));
        renderPosts();
        showToast('تم الإعجاب بالمنشور!', 'success');
    }
}

function updateStats() {
    document.getElementById('totalPosts').textContent = posts.length;
}

function logout() {
    sessionStorage.removeItem('roblox_traders_current');
    showToast('تم تسجيل الخروج!', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ============================================
// أدوات مساعدة
// ============================================
function showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

// تأثيرات إضافية
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rota
