// Tab system functionality

// Tab functionality - for top buttons (no scroll)
function openTabNoScroll(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab panels
    tabcontent = document.getElementsByClassName("tab-panel");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Remove active class from all top tab buttons
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Remove active class from all bottom tab buttons
    var bottomTablinks = document.getElementsByClassName("bottom-tab-button");
    for (i = 0; i < bottomTablinks.length; i++) {
        bottomTablinks[i].classList.remove("active");
    }

    // Show the selected tab panel
    var targetPanel = document.getElementById(tabName);
    if (targetPanel) {
        targetPanel.classList.add("active");
    }

    // Activate the clicked button
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }

    // Also activate corresponding bottom button
    var bottomButton = document.querySelector(`.bottom-tab-button[onclick*="${tabName}"]`);
    if (bottomButton) {
        bottomButton.classList.add("active");
    }

    // Save active section to localStorage and update URL hash for articles
    const isArticlePage = document.querySelector('#investigation, #timeline, #sources');
    if (!isArticlePage) {
        // Homepage: save to localStorage, don't update hash
        localStorage.setItem('homeActiveSection', tabName);
    } else {
        // Article: update URL hash for refresh persistence
        window.history.replaceState(null, null, '#' + tabName);
        console.log('openTabNoScroll: Updated URL hash to:', tabName);
    }
}

// Tab functionality - for bottom buttons (with scroll)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-panel");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Update both top and bottom tab buttons
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    var bottomTablinks = document.getElementsByClassName("bottom-tab-button");
    for (i = 0; i < bottomTablinks.length; i++) {
        bottomTablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    if (evt) evt.currentTarget.classList.add("active");

    // Also activate corresponding top button
    var topButton = document.querySelector(`.tab-button[onclick*="${tabName}"]`);
    if (topButton) topButton.classList.add("active");

    // Also activate button by tab name if no event (for page load restoration)
    if (!evt) {
        var button = document.querySelector(`[onclick*="${tabName}"]`);
        if (button) button.classList.add("active");
    }

    // Save active section to localStorage and update URL hash
    const isArticlePage = document.querySelector('#investigation, #timeline, #sources');
    if (!isArticlePage) {
        // Only save for homepage, never for articles
        localStorage.setItem('homeActiveSection', tabName);
    }
    window.history.replaceState(null, null, '#' + tabName);
}

// Restore active section from URL hash or localStorage on page load
function restoreActiveTab() {
    console.log('=== restoreActiveTab called ===');
    const fullUrl = window.location.href;
    const hash = window.location.hash.substring(1);
    console.log('Full URL:', fullUrl);
    console.log('Hash:', hash);

    // Check if we're in an article page
    const isArticlePage = document.querySelector('#investigation, #timeline, #sources');
    console.log('Is article page:', !!isArticlePage);

    if (isArticlePage) {
        // Article pages: use hash if valid, otherwise default to investigation
        console.log('ARTICLE: Checking for valid tab in hash');

        // Clear ALL localStorage (but keep hash logic)
        const oldActiveSection = localStorage.getItem('activeSection');
        const oldHomeSection = localStorage.getItem('homeActiveSection');
        const oldArticleSection = localStorage.getItem('articleActiveSection');
        console.log('Clearing localStorage - old activeSection:', oldActiveSection, 'homeActiveSection:', oldHomeSection, 'articleActiveSection:', oldArticleSection);

        localStorage.clear(); // Nuclear option

        // Check sessionStorage first (from homepage), then hash, then default
        const desiredTab = sessionStorage.getItem('desiredArticleTab');
        let targetSection = 'investigation'; // default

        if (desiredTab && (desiredTab === 'investigation' || desiredTab === 'timeline' || desiredTab === 'sources')) {
            targetSection = desiredTab;
            console.log('ARTICLE: Using sessionStorage tab:', targetSection);
            // Clear it after use
            sessionStorage.removeItem('desiredArticleTab');
        } else if (hash && (hash === 'investigation' || hash === 'timeline' || hash === 'sources')) {
            targetSection = hash;
            console.log('ARTICLE: Using hash tab:', targetSection);
        } else {
            console.log('ARTICLE: No valid source, using default investigation');
        }
        console.log('ARTICLE: Final target section:', targetSection);

        // Always activate the correct tab
        window.skipScroll = true;
        openTab(null, targetSection);
        window.skipScroll = false;

        // Always ensure we start at top for articles
        window.scrollTo(0, 0);
    } else {
        console.log('HOMEPAGE detected');
        // Homepage logic: use separate localStorage key
        const savedSection = localStorage.getItem('homeActiveSection');
        let targetSection = null;

        if (hash && (hash === 'investigations' || hash === 'about' || hash === 'methodology')) {
            targetSection = hash;
        } else if (savedSection && (savedSection === 'investigations' || savedSection === 'about' || savedSection === 'methodology')) {
            targetSection = savedSection;
        }

        console.log('HOMEPAGE: target section:', targetSection);

        // Only switch tabs if we need to change from the default 'investigations'
        if (targetSection && targetSection !== 'investigations') {
            window.skipScroll = true;
            openTab(null, targetSection);
            window.skipScroll = false;
        }
    }
}

// Export functions for global use
window.TabModule = {
    openTab,
    openTabNoScroll,
    restoreActiveTab
};

// Make functions globally available for onclick handlers
window.openTab = openTab;
window.openTabNoScroll = openTabNoScroll;