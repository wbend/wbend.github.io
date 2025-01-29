// Check authentication status
function checkAuth() {
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Add logout functionality
function logout() {
    localStorage.removeItem('authenticated');
    window.location.href = 'index.html';
}

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', checkAuth);