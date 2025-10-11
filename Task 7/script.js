document.addEventListener("DOMContentLoaded", () => {
    // Check which page is currently loaded
    const path = window.location.pathname.split("/").pop();

    if (path === 'index.html' || path === '') {
        setupAuthForms();
    } else if (path === 'dashboard.html' || path === 'admin.html') {
        setupDashboard();
    }
});

/**
 * Sets up the functionality for the login and registration forms.
 */
function setupAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');

    // Toggle between forms
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Handle Registration
    document.getElementById('register').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        // Basic Validation
        if (!username || !email || !password) {
            showToast("All fields are required!", "error");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username || user.email === email);

        if (userExists) {
            showToast("Username or email already exists.", "error");
        } else {
            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            showToast("Registration successful! Please login.", "success");
            // Switch to login form
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        }
    });

    // Handle Login
    document.getElementById('login').addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-username').value; // Can be username or email
        const password = document.getElementById('login-password').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => (user.username === identifier || user.email === identifier) && user.password === password);

        if (user) {
            // Use sessionStorage to keep user logged in only for the session
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            showToast("Login successful!", "success");

            // Redirect based on role
            setTimeout(() => {
                if (user.username === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }, 1000); // Wait 1 second before redirect
        } else {
            showToast("Invalid credentials. Please try again.", "error");
        }
    });
}

/**
 * Sets up the dashboard, handles authentication, and logout.
 */
function setupDashboard() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const path = window.location.pathname.split("/").pop();

    // Protect the routes
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Ensure correct user is on the correct dashboard
    if (path === 'admin.html' && loggedInUser.username !== 'admin') {
        window.location.href = 'dashboard.html'; // Redirect non-admins away
        return;
    }
     if (path === 'dashboard.html' && loggedInUser.username === 'admin') {
        window.location.href = 'admin.html'; // Redirect admin to their own dashboard
        return;
    }


    // Display welcome message
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${loggedInUser.username}!`;
    }

    // Handle Logout
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            showToast("You have been logged out.", "success");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
}

/**
 * Displays a toast notification.
 * @param {string} message - The message to display.
 * @param {string} type - 'success' or 'error'.
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return; // Guard against pages without a toast element
    toast.textContent = message;
    toast.className = `show ${type}`;
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}