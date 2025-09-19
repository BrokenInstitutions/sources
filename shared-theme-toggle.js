/*
 * UNIFIED THEME TOGGLE SYSTEM
 * Uses the exact same code as homepage for consistency
 */

// CSS Styles - copied exactly from index.html
const TOGGLE_CSS = `
.theme-toggle {
    background: #4a5568;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    width: 60px;
    height: 30px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    outline: none;
    overflow: hidden;
    position: relative;
    float: right;
    margin-bottom: 20px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.theme-toggle:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.theme-toggle:focus {
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.3);
}

.theme-toggle.light {
    background: #e2e8f0;
}

.theme-toggle.light:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.theme-toggle::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2;
}

.theme-toggle.light::before {
    transform: translateX(30px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toggle-icon {
    position: absolute;
    font-size: 12px;
    transition: all 0.4s ease;
    z-index: 1;
    opacity: 1.0;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.toggle-icon.moon {
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
}

.toggle-icon.sun {
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
}

.theme-toggle:not(.light) .toggle-icon.moon {
    opacity: 1;
    color: white;
}

.theme-toggle.light .toggle-icon.sun {
    opacity: 1;
    color: #f56565;
}
`;

// Toggle functionality - synchronized with homepage
function toggleTheme(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const body = document.body;
    const toggles = document.querySelectorAll('.theme-toggle');

    // Toggle body class
    body.classList.toggle('light-theme');

    // Also update document element class for better CSS targeting
    document.documentElement.classList.toggle('light-theme');

    // Update localStorage
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');

    // Update toggle buttons
    toggles.forEach(toggle => {
        toggle.classList.toggle('light');
    });

    console.log('Theme toggled to:', body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Apply saved theme - copied exactly from index.html
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.querySelectorAll('.theme-toggle').forEach(toggle => {
            toggle.classList.add('light');
        });
    }
}

// Create toggle button
function createThemeToggle() {
    // Check if toggle already exists
    if (document.querySelector('.theme-toggle')) {
        return;
    }

    // Find where to insert the toggle
    const backLink = document.querySelector('.back-link');
    if (!backLink) {
        return;
    }

    // Create toggle HTML - same structure as homepage
    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = `
        <span class="toggle-icon moon">🌙</span>
        <span class="toggle-icon sun">☀️</span>
    `;

    // Insert after back link
    backLink.parentNode.insertBefore(toggle, backLink.nextSibling);
}

// Add CSS styles
function addToggleStyles() {
    if (document.getElementById('theme-toggle-styles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'theme-toggle-styles';
    style.textContent = TOGGLE_CSS;
    document.head.appendChild(style);
}

// Setup event listeners - copied exactly from index.html
function setupEventListeners() {
    document.querySelectorAll('.theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
        toggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleTheme(e);
        });
    });
}

// Initialize everything
function initThemeToggle() {
    addToggleStyles();
    createThemeToggle();
    applySavedTheme();
    setupEventListeners();
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}