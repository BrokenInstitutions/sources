// Theme toggle functionality
// Extends the existing shared-theme-toggle.js

// Apply theme BEFORE CSS loads - prevents flicker
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.className = 'light-theme';
    }
}

// Apply theme class to body based on data attribute
function applyThemeClass() {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        document.body.className = 'light-theme';
    }
}

// Theme toggle functionality
function toggleTheme(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const body = document.body;
    const html = document.documentElement;
    const toggles = document.querySelectorAll('.theme-toggle');

    // Toggle both body class and html data attribute
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    }

    toggles.forEach(toggle => {
        toggle.classList.toggle('light');
    });

    console.log('Theme toggled to:', body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Initialize theme toggle listeners
function initializeThemeToggle() {
    // Sync toggle buttons with current theme WITHOUT animation
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        document.querySelectorAll('.theme-toggle').forEach(toggle => {
            // Temporarily disable transitions
            toggle.style.transition = 'none';
            toggle.classList.add('light');
            // Re-enable transitions after sync
            setTimeout(() => {
                toggle.style.transition = '';
            }, 10);
        });
    }

    // Add robust theme toggle listeners
    document.querySelectorAll('.theme-toggle, .theme-toggle-inline').forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
        toggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleTheme(e);
        });
    });
}

// Export functions for use in other modules
window.ThemeModule = {
    initializeTheme,
    applyThemeClass,
    toggleTheme,
    initializeThemeToggle
};