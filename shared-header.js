// Shared header component for consistent branding across all pages
function createSharedHeader() {
    return `
        <div class="shared-header">
            <div class="theme-toggle mobile-header-toggle" onclick="toggleTheme()">
                <span class="toggle-icon moon">🌙</span>
                <span class="toggle-icon sun">☀️</span>
            </div>
            <div class="logo">BI</div>
            <h1>Broken Institutions</h1>
            <div class="tagline">Institutional failures worldwide. We name names.</div>
            <div class="description">
                Independent accountability journalism. Exposing broken systems and demanding real consequences - from courts to governments, from social media to influencers.
            </div>
        </div>
    `;
}

// Shared header styles
function getSharedHeaderStyles() {
    return `
        .shared-header {
            text-align: center;
            border-bottom: 3px solid #dc3545;
            margin-bottom: 40px;
            padding-bottom: 30px;
            position: relative;
        }

        .logo {
            background-color: #dc3545;
            color: white;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 20px;
            box-shadow: 0 6px 12px rgba(220, 53, 69, 0.4);
        }

        .shared-header h1 {
            color: #e1e5e9;
            margin-bottom: 15px;
            font-size: 2.8em;
            font-weight: 700;
        }

        .tagline {
            color: #adb5bd;
            font-weight: 400;
            margin-bottom: 20px;
            font-size: 1.3em;
        }

        .description {
            color: #6c757d;
            font-size: 1.1em;
            max-width: 600px;
            margin: 0 auto;
        }

        .description a {
            color: #dc3545;
            text-decoration: none;
        }

        .description a:hover {
            text-decoration: underline;
        }

        /* Theme Toggle - consistent across all pages */
        .theme-toggle {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px;
            position: relative;
            width: 60px;
            height: 30px;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
            outline: none;
            overflow: hidden;
        }

        .theme-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .theme-toggle:focus {
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3);
        }

        .theme-toggle.light {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        }

        .theme-toggle.light:hover {
            box-shadow: 0 8px 25px rgba(252, 182, 159, 0.4);
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

        .mobile-header-toggle {
            display: none;
        }

        @media (max-width: 768px) {
            .mobile-header-toggle {
                position: absolute;
                top: 20px;
                right: 20px;
                margin: 0;
                display: block;
            }
        }
    `;
}

// Function to inject shared header into pages
function injectSharedHeader(containerId = 'header-container') {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = createSharedHeader();
    }
}

// Initialize shared header when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-inject if header container exists
    if (document.getElementById('header-container')) {
        injectSharedHeader();
    }
});