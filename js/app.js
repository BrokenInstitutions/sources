// Main application initialization

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    if (window.ThemeModule) {
        window.ThemeModule.applyThemeClass();
        window.ThemeModule.initializeThemeToggle();
    }

    // Initialize tabs
    if (window.TabModule) {
        window.TabModule.restoreActiveTab();
    }

    // Initialize search/filters
    if (window.FilterModule) {
        window.FilterModule.initializeSearch();
    }

    console.log('Application initialized successfully');
});

// Theme initialization is now handled inline in HTML head to prevent flicker

// Scroll to top when navigating from homepage to investigation
function scrollToTopOnNavigation(event) {
    // Save current scroll position for potential return
    sessionStorage.setItem('homepageScrollPosition', window.scrollY);

    // Set desired tab for article page
    sessionStorage.setItem('desiredArticleTab', 'investigation');

    // Let the navigation proceed normally, but when the new page loads,
    // it should scroll to top automatically (browser default)
    // No need to prevent default as we want normal navigation
}