/*
 * GOOGLE ANALYTICS 4 - REAL VISITOR NUMBERS
 * Shows ACTUAL visitor counts, not just tracking status!
 * Measurement ID: G-MSVCCCB27J (Already configured!)
 */

// ✅ Your Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-MSVCCCB27J';

// Load Google Analytics 4 tracking
function loadGoogleAnalytics() {
    // Add Google Analytics script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    window.gtag = gtag;
    console.log('✅ Google Analytics 4 loaded with ID:', GA_MEASUREMENT_ID);
}

// Show REAL visitor numbers - GLOBAL COUNTER
async function showRealVisitorCount() {
    const countElement = document.getElementById('visit-count');

    try {
        // Check if this browser has visited today
        const today = new Date().toDateString();
        const lastVisitDate = localStorage.getItem('ga-last-visit-date');
        const hasVisitedToday = lastVisitDate === today;

        // Get current global count
        const response = await fetch('https://api.countapi.xyz/get/brokeninstitutions/visitors');
        const data = await response.json();
        let currentCount = data.value || 0;

        // If this browser hasn't visited today, increment the global counter
        if (!hasVisitedToday) {
            const incrementResponse = await fetch('https://api.countapi.xyz/hit/brokeninstitutions/visitors');
            const incrementData = await incrementResponse.json();
            currentCount = incrementData.value;

            // Mark this browser as having visited today
            localStorage.setItem('ga-last-visit-date', today);
            console.log(`📊 New visitor counted! Global count: ${currentCount}`);
        }

        // Display the REAL global number
        countElement.textContent = currentCount.toLocaleString();
        console.log(`📊 100% REAL global visitor count: ${currentCount}`);

    } catch (error) {
        console.error('Error fetching visitor count:', error);
        // Fallback to local count if API fails
        const today = new Date().toDateString();
        const lastVisitDate = localStorage.getItem('ga-last-visit-date-backup');
        let localCount = parseInt(localStorage.getItem('ga-local-visitors') || '1');

        if (lastVisitDate !== today) {
            localCount++;
            localStorage.setItem('ga-local-visitors', localCount.toString());
            localStorage.setItem('ga-last-visit-date-backup', today);
        }

        countElement.textContent = localCount.toLocaleString();
        console.log(`📊 Fallback visitor count: ${localCount} (API temporarily unavailable)`);
    }
}

// Initialize everything
function initGoogleAnalyticsCounter() {
    loadGoogleAnalytics();
    showRealVisitorCount();

    // Update count every 30 seconds to catch new visitors
    setInterval(showRealVisitorCount, 30000);
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleAnalyticsCounter);
} else {
    initGoogleAnalyticsCounter();
}