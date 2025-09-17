/*
 * GOOGLE ANALYTICS 4 - REAL VISITOR TRACKING
 * For Broken Institutions - Investigative Journalism
 *
 * ⚠️  SETUP REQUIRED: Replace GA_MEASUREMENT_ID below with your actual Google Analytics 4 Measurement ID
 *
 * SETUP STEPS:
 * 1. Go to: https://analytics.google.com
 * 2. Create a Google Analytics 4 property for your site
 * 3. Add your website URL: https://brokeninstitutions.github.io/sources
 * 4. Copy the Measurement ID (format: G-XXXXXXXXXX)
 * 5. Replace 'GA_MEASUREMENT_ID' below with your actual ID
 *
 * INTEGRITY FIRST: No fake numbers, only real visitor data for transparency!
 */

// ✅ CONFIGURED - Real Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-MSVCCCB27J'; // Broken Institutions - Real visitor tracking active!

// Load Google Analytics 4 tracking
function loadGoogleAnalytics() {
    if (GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') {
        console.log('⚠️  Google Analytics setup required! See instructions in google-analytics.js');
        return;
    }

    // Add Google Analytics script dynamically
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    window.gtag = gtag; // Make available globally

    console.log('✅ Google Analytics 4 loaded - Real visitor tracking active!');
}

// Show real visitor counter (once GA4 is configured)
function updateVisitorCounter() {
    const countElement = document.getElementById('visit-count');

    if (GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') {
        // Setup required
        countElement.textContent = 'Setup Required';
        countElement.style.color = '#ffc107';
        console.log('📋 Setup Google Analytics to see real visitor counts');
        return;
    }

    // GA4 is configured - show tracking status
    countElement.textContent = 'Tracking Real Visitors';
    countElement.style.color = '#28a745';
    console.log('📊 Real visitor tracking active - no fake numbers!');

    // Future: Add Google Analytics Reporting API integration here
    // to display actual visitor counts from your GA4 dashboard
}

// Initialize real tracking
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadGoogleAnalytics();
        updateVisitorCounter();
    });
} else {
    // DOM already loaded
    loadGoogleAnalytics();
    updateVisitorCounter();
}