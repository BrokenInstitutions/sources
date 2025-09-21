/**
 * ArticleRenderer - Specialized renderer for investigation articles
 * Handles loading and composition of article components with data binding
 *
 * @author BrokenInstitutions Team
 * @version 1.0.0
 */

class ArticleRenderer {
    constructor(templateEngine, componentLoader) {
        this.templateEngine = templateEngine;
        this.componentLoader = componentLoader;
        this.currentArticle = null;
    }

    /**
     * Render complete article from data
     * @param {string} articleId - ID of article to render
     * @param {Object} options - Rendering options
     * @returns {Promise<void>}
     */
    async renderArticle(articleId, options = {}) {
        const { container = 'body', basePath = '' } = options;

        try {
            // Load article data
            const articleData = await this.loadArticleData(articleId, basePath);
            this.currentArticle = articleData;

            // Setup paths for assets
            const paths = this.setupAssetPaths(articleId, basePath);

            // Prepare rendering data
            const renderData = {
                ...articleData.metadata,
                ...paths,
                lang: 'en',
                clickHandler: 'openTabNoScroll',
                victim: articleData.victim,
                perpetrator: articleData.perpetrator,
                investigation: articleData.investigation,
                tabs: articleData.tabs,
                navigation: articleData.navigation
            };

            // Load and render article layout
            await this.renderArticleLayout(container, renderData);

            // Load article content into tabs
            await this.loadTabContent(articleData);

            // Initialize article-specific functionality
            this.initializeArticle();

            console.log(`Article ${articleId} rendered successfully`);

        } catch (error) {
            console.error(`Failed to render article ${articleId}:`, error);
            this.renderErrorState(container, error);
        }
    }

    /**
     * Load article data from JSON files
     * @param {string} articleId - Article identifier
     * @param {string} basePath - Base path for assets
     * @returns {Promise<Object>} Article data
     */
    async loadArticleData(articleId, basePath = '') {
        const dataPath = `${basePath}data/cases/${articleId}/content.json`;

        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`Article data not found: ${dataPath}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Failed to load article data:`, error);
            throw error;
        }
    }

    /**
     * Setup asset paths for rendering
     * @param {string} articleId - Article identifier
     * @param {string} basePath - Base path
     * @returns {Object} Path configuration
     */
    setupAssetPaths(articleId, basePath) {
        return {
            cssBasePath: basePath || '../../',
            jsBasePath: basePath || '../../',
            assetsPath: `${basePath}cases/${articleId}/assets/`,
            casePath: `${basePath}cases/${articleId}/`
        };
    }

    /**
     * Render the article layout structure
     * @param {string} container - Target container
     * @param {Object} data - Rendering data
     */
    async renderArticleLayout(container, data) {
        // Define component composition for article
        const composition = {
            layout: 'article',
            components: [
                {
                    name: 'head',
                    target: 'head',
                    data: {
                        ...data,
                        title: `${data.title} | Broken Institutions`,
                        articlePage: true
                    }
                },
                {
                    name: 'article-nav',
                    target: 'articleNav',
                    data: data.navigation
                },
                {
                    name: 'article-header',
                    target: 'articleHeader',
                    data: {
                        title: data.title,
                        subtitle: data.subtitle,
                        metadata: {
                            investigationDate: data.investigationDate,
                            status: data.status,
                            statusClass: data.statusClass,
                            location: data.location,
                            sourcesCount: data.sourcesCount
                        }
                    }
                },
                {
                    name: 'tab-navigation',
                    target: 'tabNavigation',
                    data: { tabs: data.tabs, clickHandler: data.clickHandler }
                }
            ]
        };

        // Render composition
        const html = await this.templateEngine.compose(composition, data);

        // Insert into container
        const targetElement = document.querySelector(container);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    }

    /**
     * Load content into article tabs
     * @param {Object} articleData - Article data object
     */
    async loadTabContent(articleData) {
        const tabContentContainer = document.querySelector('.tab-content');
        if (!tabContentContainer) {
            console.error('Tab content container not found');
            return;
        }

        // Create tab panels
        const tabPanels = articleData.tabs.map(tab => {
            const isActive = tab.active ? 'active' : '';
            return `<div id="${tab.id}" class="tab-panel ${isActive}" role="tabpanel" aria-labelledby="${tab.id}-tab">
                <div id="${tab.id}-content"></div>
            </div>`;
        }).join('');

        tabContentContainer.innerHTML = tabPanels;

        // Load investigation content
        await this.loadInvestigationContent(articleData);
    }

    /**
     * Load investigation tab content
     * @param {Object} articleData - Article data
     */
    async loadInvestigationContent(articleData) {
        const investigationContainer = document.querySelector('#investigation-content');
        if (!investigationContainer) return;

        // Render victim memorial
        await this.componentLoader.loadInto(
            'victim-memorial',
            investigationContainer,
            articleData.victim,
            { append: true }
        );

        // Render investigation summary
        const summaryHtml = `
            <p>${articleData.investigation.summary}</p>
            <p>${articleData.investigation.analysis}</p>
            <h2>The Judicial Officials Who Failed</h2>
            <p>${articleData.investigation.keyFinding}</p>
        `;
        investigationContainer.insertAdjacentHTML('beforeend', summaryHtml);

        // Render judicial profiles
        for (const official of articleData.judicialOfficials) {
            await this.componentLoader.loadInto(
                'judge-profile',
                investigationContainer,
                official,
                { append: true }
            );
        }
    }

    /**
     * Initialize article-specific functionality
     */
    initializeArticle() {
        // Initialize theme system
        if (window.ThemeModule) {
            window.ThemeModule.applyThemeClass();
            window.ThemeModule.initializeThemeToggle();
        }

        // Initialize tabs
        if (window.TabModule && this.currentArticle) {
            window.TabModule.restoreActiveTab();
        }

        // Dispatch article ready event
        document.dispatchEvent(new CustomEvent('articleReady', {
            detail: { article: this.currentArticle }
        }));
    }

    /**
     * Render error state
     * @param {string} container - Target container
     * @param {Error} error - Error object
     */
    renderErrorState(container, error) {
        const errorHtml = `
            <div class="error-state">
                <h1>Article Failed to Load</h1>
                <p>Sorry, we couldn't load this investigation.</p>
                <p class="error-details">${error.message}</p>
                <a href="../../index.html" class="back-link">Back to Archive</a>
            </div>
        `;

        const targetElement = document.querySelector(container);
        if (targetElement) {
            targetElement.innerHTML = errorHtml;
        }
    }

    /**
     * Get current article data
     * @returns {Object|null} Current article data
     */
    getCurrentArticle() {
        return this.currentArticle;
    }

    /**
     * Reload current article
     */
    async reload() {
        if (this.currentArticle) {
            await this.renderArticle(this.currentArticle.metadata.id);
        }
    }
}

// Export for use in modules
window.ArticleRenderer = ArticleRenderer;