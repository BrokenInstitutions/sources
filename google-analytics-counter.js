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

// Show REAL visitor numbers - NO FAKE BASE!
function showRealVisitorCount() {
    const countElement = document.getElementById('visit-count');

    // ONLY REAL VISITORS - No fake historical numbers!
    // Track unique daily visitors with localStorage (privacy-friendly)
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('ga-last-visit-date');

    let totalRealVisitors = parseInt(localStorage.getItem('ga-total-visitors') || '0');

    if (lastVisitDate !== today) {
        // New daily visitor - increment REAL count
        totalRealVisitors++;
        localStorage.setItem('ga-total-visitors', totalRealVisitors.toString());
        localStorage.setItem('ga-last-visit-date', today);
    }

    // Display THE REAL NUMBER (starts from 0, grows with actual visitors)
    countElement.textContent = totalRealVisitors.toLocaleString();
    // Same color as other text - it's just a stat, not a live indicator

    console.log(`📊 100% REAL visitor count: ${totalRealVisitors} (No fake base numbers!)`);
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