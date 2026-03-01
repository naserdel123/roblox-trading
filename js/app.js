/* ============================================
   تريدات روبلوكس - CSS معدل
   ============================================ */

:root {
    --primary: #6366f1;
    --primary-light: #818cf8;
    --secondary: #ec4899;
    --bg-dark: #0f0f1a;
    --bg-card: rgba(255, 255, 255, 0.05);
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Tajawal', sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    min-height: 100vh;
}

/* خلفية متحركة */
.animated-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
    overflow: hidden;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float-orb 20s infinite ease-in-out;
}

.orb-1 { width: 600px; height: 600px; background: var(--primary); top: -200px; right: -200px; }
.orb-2 { width: 400px; height: 400px; background: var(--secondary); bottom: -100px; left: -100px; animation-delay: -5s; }
.orb-3 { width: 300px; height: 300px; background: #06b6d4; top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: -10s; }

@keyframes float-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(0, 50px) scale(0.9); }
}

/* صفحة المصادقة */
.auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.auth-container {
    width: 100%;
    max-width: 450px;
}

.logo-section {
    text-align: center;
    margin-bottom: 30px;
}

.logo {
    width: 90px;
    height: 90px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 2.5rem;
    color: var(--primary-light);
    backdrop-filter: blur(10px);
    animation: logo-float 3s infinite ease-in-out;
}

@keyframes logo-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.site-title {
    font-size: 2.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.site-subtitle {
    color: var(--text-secondary);
    margin-top: 5px;
}

.form-container {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    backdrop-filter: blur(20px);
}

.form-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

.tab-btn {
    flex: 1;
    padding: 12px;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    transition: 0.3s;
}

.tab-btn.active {
    color: white;
    background: rgba(99, 102, 241, 0.2);
}

.auth-form {
    display: none;
}

.auth-form.active {
    display: block;
    animation: fade-in 0.4s ease;
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.input-group {
    margin-bottom: 20px;
    position: relative;
}

.input-wrapper {
    position: relative;
}

.input-wrapper input {
    width: 100%;
    padding: 15px 45px 15px 15px;
    background: rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: 0.3s;
}

.input-wrapper input:focus {
    border-color: var(--primary);
}

.input-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
}

.toggle-password {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
}

.form-options {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.remember-me input {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: transparent;
    transition: 0.3s;
}

.remember-me input:checked + .checkmark {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
}

.label-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.password-strength {
    display: flex;
    gap: 4px;
    margin-top: 8px;
    height: 4px;
}

.strength-bar {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    transition: 0.3s;
}

.strength-bar.weak { background: #ef4444; }
.strength-bar.medium { background: #f59e0b; }
.strength-bar.strong { background: #10b981; }

.submit-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 0.3s;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

/* Toast */
.toast-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background: rgba(255, 255, 255, 0.1);
    border-right: 4px solid var(--primary);
    border-radius: 10px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    backdrop-filter: blur(10px);
    animation: slide-in 0.4s ease;
    min-width: 280px;
}

.toast.error { border-right-color: #ef4444; }
.toast.success { border-right-color: #10b981; }

@keyframes slide-in {
    from { opacity: 0; transform: translateX(-100%); }
    to { opacity: 1; transform: translateX(0); }
}

/* Loading Screen */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-dark);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s, visibility 0.5s;
}

.loading-screen.hidden {
    opacity: 0;
    visibility: hidden;
}

.loading-content {
    text-align: center;
}

.loading-logo {
    font-size: 4rem;
    color: var(--primary);
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.loading-spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 20px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-text {
    color: var(--text-secondary);
}

/* صفحة المنشورات */
.feed-page {
    padding-top: 80px;
}

.main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: rgba(15, 15, 26, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
}

.logo-pulse {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    animation: pulse 2s infinite;
}

.site-name {
    font-weight: 800;
    margin-right: 10px;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.main-nav {
    display: flex;
    gap: 10px;
}

.nav-link {
    padding: 10px 15px;
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: 10px;
    transition: 0.3s;
}

.nav-link.active, .nav-link:hover {
    color: white;
    background: rgba(99, 102, 241, 0.2);
}

.user-section {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-avatar {
    position: relative;
    width: 40px;
    height: 40px;
}

.user-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--primary);
}

.online-status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background: #10b981;
    border-radius: 50%;
    border: 2px solid var(--bg-dark);
}

.logout-btn {
    background: rgba(239, 68, 68, 0.2);
    border: none;
    color: #ef4444;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

.logout-btn:hover {
    background: rgba(239, 68, 68, 0.4);
}

/* Feed */
.feed-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 30px;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 30px;
}

.sidebar {
    position: sticky;
    top: 90px;
    height: fit-content;
}

.sidebar-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
}

.sidebar-card h3 {
    margin-bottom: 15px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 10px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    color: var(--text-secondary);
}

.stat-item i {
    color: var(--primary-light);
}

.stat-value {
    margin-right: auto;
    font-weight: bold;
    color: white;
}

/* Posts */
.feed-header {
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.feed-header i {
    color: #f59e0b;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
}

.post-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: 0.3s;
}

.post-card:hover {
    transform: translateY(-5px);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.post-header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.post-author {
    display: flex;
    align-items: center;
    gap: 10px;
}

.author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.author-info h4 {
    font-size: 0.95rem;
}

.post-time {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

/* صورتين جنب بعض */
.post-images-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    height: 220px;
}

.post-image-box {
    position: relative;
    overflow: hidden;
}

.post-image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
}

.post-card:hover .post-image-box img {
    transform: scale(1.05);
}

.image-label {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    color: white;
    z-index: 2;
}

.post-content {
    padding: 20px;
}

.trade-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
}

.trade-item {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
}

.trade-item i {
    color: var(--primary-light);
}

.trade-arrow {
    color: var(--secondary);
    font-size: 1.2rem;
    margin: 0 10px;
}

.tiktok-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    background: #ff0050;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    margin-bottom: 15px;
    transition: 0.3s;
}

.tiktok-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(255, 0, 80, 0.4);
}

.no-contact {
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 15px;
}

.post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 15px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    transition: 0.3s;
}

.like-btn:hover {
    background: rgba(236, 72, 153, 0.2);
    color: #ec4899;
}

.delete-btn {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
}

.delete-btn:hover {
    background: rgba(239, 68, 68, 0.4);
}

/* FAB */
.fab-btn {
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    transition: 0.3s;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fab-btn:hover {
    transform: scale(1.1) rotate(90deg);
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: rgba(20, 20, 35, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 25px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-modal {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
}

.close-modal:hover {
    background: rgba(239, 68, 68, 0.5);
    transform: rotate(90deg);
}

.form-section {
    margin-bottom: 20px;
}

.form-section h4 {
    color: var(--text-secondary);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.image-upload {
    position: relative;
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    transition: 0.3s;
    overflow: hidden;
}

.image-upload:hover {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.05);
}

.upload-placeholder {
    color: var(--text-secondary);
}

.upload-placeholder i {
    font-size: 2.5rem;
    margin-bottom: 10px;
    display: block;
    color: var(--primary-light);
}

.preview-image {
    display: none;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}

.remove-image {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    background: rgba(239, 68, 68, 0.9);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.remove-image:hover {
    background: #ef4444;
    transform: scale(1.1);
}

.modern-input {
    width: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: 0.3s;
}

.modern-input:focus {
    border-color: var(--primary);
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn-secondary, .btn-primary {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: 0.3s;
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
}

.btn-primary {
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
    .feed-container {
        grid-template-columns: 1fr;
        padding: 15px;
    }
    
    .sidebar {
        display: none;
    }
    
    .site-name {
        display: none;
    }
    
    .post-images-container {
        height: 180px;
    }
    
    .trade-info {
        flex-direction: column;
        gap: 10px;
    }
    
    .trade-arrow {
        transform: rotate(90deg);
    }
      }
      
