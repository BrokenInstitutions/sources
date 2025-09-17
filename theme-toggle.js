// Theme management for Broken Institutions
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.updateToggleIcons();
        this.setupEventListeners();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    getStoredTheme() {
        return localStorage.getItem('broken-institutions-theme');
    }

    storeTheme(theme) {
        localStorage.setItem('broken-institutions-theme', theme);
    }

    applyTheme(theme) {
        document.body.className = theme === 'light' ? 'light-theme' : '';
        this.currentTheme = theme;
        this.storeTheme(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.updateToggleIcons();
    }

    updateToggleIcons() {
        const toggle = document.querySelector('.theme-toggle');

        if (toggle) {
            if (this.currentTheme === 'dark') {
                toggle.classList.remove('light');
            } else {
                toggle.classList.add('light');
            }
        }
    }

    setupEventListeners() {
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'light' : 'dark');
                this.updateToggleIcons();
            }
        });
    }
}

// Global theme manager instance
let themeManager;

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
});

// Global toggle function for onclick
function toggleTheme() {
    if (themeManager) {
        themeManager.toggleTheme();
    }
}