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
    
    if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
        initAuthPage();
    } else if (currentPage === 'feed.html') {
        initFeedPage();
    }
    
    // إخفاء شاشة التحميل    
    // إخفاء شاشة التحميل بعد التهيئة
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 800);
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
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
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
    
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // التحقق من البيانات
    if (password !== confirmPassword) {
        showToast('كلمات المرور غير متطابقة!', 'error');
        shakeElement(document.getElementById('regConfirmPassword').parentElement);
        return;
    }
    
    if (username.length < 3) {
        showToast('اسم المستخدم يجب أن يكون 3 أحرف على الأقل!', 'error');
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
        username: username,
        email: email,
        password: btoa(password),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    localStorage.setItem('roblox_traders_users', JSON.stringify(users));
    
    showToast('تم إنشاء الحساب بنجاح!', 'success');
    
    setTimeout(() => {
        loginUser(user);
    }, 1000);
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe')?.checked || false;
    
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
            expiry: Date.now() + (30 * 24 * 60 * 60 * 1000)
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
            const usernameInput = document.getElementById('loginUsername');
            const rememberCheckbox = document.getElementById('rememberMe');
            if (usernameInput) usernameInput.value = data.username;
            if (rememberCheckbox) rememberCheckbox.checked = true;
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
    
    const currentUserEl = document.getElementById('currentUser');
    const userAvatarEl = document.getElementById('userAvatar');
    
    if (currentUserEl) currentUserEl.textContent = currentUser.username;
    if (userAvatarEl) userAvatarEl.src = currentUser.avatar;
    
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
    
    if (fabBtn && postModal) {
        fabBtn.addEventListener('click', () => {
            postModal.classList.add('active');
        });
    }
    
    // إغلاق المودال
    const closeModalBtn = document.getElementById('closeModal');
    const cancelPostBtn = document.getElementById('cancelPost');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelPostBtn) cancelPostBtn.addEventListener('click', closeModal);
    
    if (postModal) {
        postModal.addEventListener('click', (e) => {
            if (e.target === postModal) closeModal();
        });
    }
    
    // رفع الصور
    setupImageUpload('itemImageUpload', 'itemImage');
    setupImageUpload('tradeImageUpload', 'tradeImage');
    
    // نشر المنشور
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', handlePostSubmit);
    }
    
    // تأثير scroll للهيدر
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

function closeModal() {
    const modal = document.getElementById('postModal');
    const form = document.getElementById('postForm');
    
    if (modal) modal.classList.remove('active');
    if (form) form.reset();
    
    document.querySelectorAll('.image-upload').forEach(upload => {
        upload.classList.remove('has-image');
        const img = upload.querySelector('img');
        if (img) img.src = '';
    });
}

function setupImageUpload(uploadId, inputId) {
    const upload = document.getElementById(uploadId);
    const input = document.getElementById(inputId);
    
    if (!upload || !input) return;
    
    const preview = upload.querySelector('img');
    const removeBtn = upload.querySelector('.remove-image');
    
    upload.addEventListener('click', (e) => {
        if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
            input.click();
        }
    });
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (preview) preview.src = e.target.result;
                upload.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });
    
    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            input.value = '';
            if (preview) preview.src = '';
            upload.classList.remove('has-image');
        });
    }
}

function handlePostSubmit(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName')?.value.trim();
    const itemCategory = document.getElementById('itemCategory')?.value;
    const tradeFor = document.getElementById('tradeFor')?.value.trim();
    const tiktokUrl = document.getElementById('tiktokUrl')?.value.trim();
    const discordUser = document.getElementById('discordUser')?.value.trim();
    
    if (!itemName || !itemCategory || !tradeFor) {
        showToast('يرجى ملء جميع الحقول المطلوبة!', 'error');
        return;
    }
    
    const itemImageInput = document.getElementById('itemImage');
    const tradeImageInput = document.getElementById('tradeImage');
    
    const post = {
        id: Date.now(),
        author: currentUser.username,
        authorAvatar: currentUser.avatar,
        itemName: itemName,
        itemCategory: itemCategory,
        itemImage: '',
        tradeFor: tradeFor,
        tradeImage tradeFor,
        tradeImage: '',
        tiktokUrl: tiktokUrl,
        discordUser: discordUser,
        createdAt: new Date().toISOString(),
        likes: 0,
        views: 0
    };
    
    // معالجة الصور
    const processImage = (input) => {
        return new Promise((resolve) => {
            if (input && input.files[0]) {
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
        post.itemImage = itemImage || `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(itemName)}`;
        post.tradeImage = tradeImage || '';
        
        // حفظ المنشور
        const existingPosts = JSON.parse(localStorage.getItem('roblox_traders_posts') || '[]');
        existingPosts.unshift(post);
        localStorage.setItem('roblox_traders_posts', JSON.stringify(existingPosts));
        
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
            itemImage: 'https://placehold.co/400x300/ff4444/ffffff?text=Dominus+Infernus',
            tradeFor: '1,000,000 Robux أو Dominus Aureus',
            tradeImage: 'https://placehold.co/400x300/ffd700/ffffff?text=Trade',
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
            itemImage: 'https://placehold.co/400x300/4444ff/ffffff?text=Valkyrie+Helm',
            tradeFor: '500,000 Robux',
            tradeImage: '',
            tiktokUrl: '',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            likes: 89,
            views: 650
        },
        {
            id: 3,
            author: 'NoobMaster',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NoobMaster',
            itemName: '10,000 Robux',
            itemCategory: 'robux',
            itemImage: 'https://placehold.co/400x300/22c55e/ffffff?text=10K+Robux',
            tradeFor: 'Limited Items',
            tradeImage: '',
            tiktokUrl: 'https://tiktok.com/@noobmaster',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            likes: 45,
            views: 320
        }
    ];
    
    localStorage.setItem('roblox_traders_posts', JSON.stringify(samplePosts));
}

function renderPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredPosts = currentCategory === 'all' 
        ? posts 
        : posts.filter(p => p.itemCategory === currentCategory);
    
    if (filteredPosts.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <i class="fas fa-inbox" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>لا توجد منشورات</h3>
                <p>كن أول من ينشر تريد في هذه الفئة!</p>
            </div>
        `;
        return;
    }
    
    filteredPosts.forEach((post, index) => {
        const card = createPostCard(post, index);
        container.appendChild(card);
    });
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
    
    const hasTiktok = post.tiktokUrl && post.tiktokUrl.trim() !== '';
    
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
                <img src="${post.itemImage}" alt="${post.itemName}" onerror="this.src='https://placehold.co/400x300/6366f1/ffffff?text=No+Image'">
                <span class="image-label">العنصر</span>
            </div>
            ${post.tradeImage ? `
            <div class="post-image">
                <img src="${post.tradeImage}" alt="Trade" onerror="this.style.display='none'">
                <span class="image-label">المقابل</span>
            </div>
            ` : `
            <div class="post-image" style="background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;">
                <i class="fas fa-exchange-alt" style="font-size: 2rem; color: var(--primary);"></i>
                <span style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 0 10px;">${post.tradeFor}</span>
            </div>
            `}
        </div>
        
        <div class="post-content">
            <h3 class="post-title">${post.itemName}</h3>
            <div class="post-trade">
                <i class="fas fa-hand-holding-usd"></i>
                <span>المقابل: ${post.tradeFor}</span>
            </div>
            
            ${hasTiktok ? `
            <a href="${post.tiktokUrl}" target="_blank" class="tiktok-link" onclick="event.stopPropagation()">
                <i class="fab fa-tiktok"></i>
                <span>تواصل عبر TikTok</span>
            </a>
            ` : ''}
            
            <div class="post-actions" style="margin-top: 15px;">
                <button class="post-btn primary" onclick="contactTrader('${post.author}', '${post.tiktokUrl || ''}')">
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
    if (seconds < 86400) return `منذ ${Math.flo
