// Check authentication status
function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'index.html';
        }
    });
}

// Add logout functionality
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', checkAuth);