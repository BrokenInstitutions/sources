/**
 * TemplateEngine - Core template system for Broken Institutions
 * Handles dynamic HTML component loading and data binding
 *
 * @author BrokenInstitutions Team
 * @version 1.0.0
 */

class TemplateEngine {
    constructor() {
        this.cache = new Map();
        this.config = null;
        this.basePath = '';
    }

    /**
     * Initialize the template engine with configuration
     * @param {Object} config - Site configuration
     */
    async init(config = {}) {
        this.config = config;
        this.basePath = config.basePath || '';

        // Load site configuration if not provided
        if (!this.config.siteName) {
            try {
                const response = await fetch(`${this.basePath}data/site-config.json`);
                const siteConfig = await response.json();
                this.config = { ...siteConfig, ...config };
            } catch (error) {
                console.warn('Site config not found, using defaults');
                this.config = this.getDefaultConfig();
            }
        }
    }

    /**
     * Load and cache HTML component
     * @param {string} componentPath - Path to component file
     * @returns {Promise<string>} Component HTML content
     */
    async loadComponent(componentPath) {
        if (this.cache.has(componentPath)) {
            return this.cache.get(componentPath);
        }

        try {
            const response = await fetch(`${this.basePath}${componentPath}`);
            if (!response.ok) {
                throw new Error(`Component not found: ${componentPath}`);
            }

            const html = await response.text();
            this.cache.set(componentPath, html);
            return html;
        } catch (error) {
            console.error(`Failed to load component: ${componentPath}`, error);
            return `<!-- Component failed to load: ${componentPath} -->`;
        }
    }

    /**
     * Render template with data binding
     * @param {string} template - HTML template string
     * @param {Object} data - Data to bind to template
     * @returns {string} Rendered HTML
     */
    render(template, data = {}) {
        if (!template) return '';

        // Merge with global config data
        const mergedData = {
            ...this.config,
            ...data,
            // Helper functions
            formatDate: this.formatDate,
            escapeHtml: this.escapeHtml
        };

        // Process conditional blocks {{#condition}}...{{/condition}}
        template = this.processConditionals(template, mergedData);

        // Process negative conditionals {{^condition}}...{{/condition}}
        template = this.processNegativeConditionals(template, mergedData);

        // Process loops {{#array}}...{{/array}}
        template = this.processLoops(template, mergedData);

        // Replace template variables {{variable}}
        return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
            const value = this.getNestedValue(mergedData, key.trim());
            return value !== undefined ? value : '';
        });
    }

    /**
     * Process conditional template blocks
     * @param {string} template - Template string
     * @param {Object} data - Data object
     * @returns {string} Processed template
     */
    processConditionals(template, data) {
        return template.replace(/\{\{#([^}]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, condition, content) => {
            const value = this.getNestedValue(data, condition.trim());
            if (Array.isArray(value)) {
                // Handle as loop in processLoops
                return match;
            }
            return value ? content : '';
        });
    }

    /**
     * Process negative conditional template blocks
     * @param {string} template - Template string
     * @param {Object} data - Data object
     * @returns {string} Processed template
     */
    processNegativeConditionals(template, data) {
        return template.replace(/\{\{\^([^}]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, condition, content) => {
            const value = this.getNestedValue(data, condition.trim());
            return !value || (Array.isArray(value) && value.length === 0) ? content : '';
        });
    }

    /**
     * Process loop template blocks
     * @param {string} template - Template string
     * @param {Object} data - Data object
     * @returns {string} Processed template
     */
    processLoops(template, data) {
        return template.replace(/\{\{#([^}]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, arrayPath, content) => {
            const array = this.getNestedValue(data, arrayPath.trim());
            if (!Array.isArray(array)) {
                return '';
            }

            return array.map(item => {
                // For simple arrays (strings, numbers), use {{.}}
                const itemData = typeof item === 'object' ? { ...data, ...item } : { ...data, '.': item };
                return this.render(content, itemData);
            }).join('');
        });
    }

    /**
     * Compose multiple components into a complete page
     * @param {Object} composition - Component composition definition
     * @param {Object} data - Data for rendering
     * @returns {Promise<string>} Complete HTML page
     */
    async compose(composition, data = {}) {
        const { layout, components = [] } = composition;

        // Load base layout
        let html = await this.loadComponent(`templates/layouts/${layout}.html`);

        // Load and render components
        for (const component of components) {
            const { name, target, data: componentData = {} } = component;
            const componentHtml = await this.loadComponent(`templates/components/${name}.html`);
            const renderedComponent = this.render(componentHtml, { ...data, ...componentData });

            // Replace placeholder in layout
            html = html.replace(`{{${target}}}`, renderedComponent);
        }

        // Final render with data
        return this.render(html, data);
    }

    /**
     * Get nested object value using dot notation
     * @param {Object} obj - Object to search
     * @param {string} path - Dot notation path (e.g., 'user.profile.name')
     * @returns {*} Value at path or undefined
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    /**
     * Format date for display
     * @param {string|Date} date - Date to format
     * @returns {string} Formatted date
     */
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        if (typeof text !== 'string') return text;
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Clear component cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get default configuration
     * @returns {Object} Default config
     */
    getDefaultConfig() {
        return {
            siteName: 'Broken Institutions',
            tagline: 'Institutional failures worldwide. We name names.',
            description: 'Independent accountability journalism. Exposing broken systems and demanding real consequences.',
            author: '@brokeninstitutions',
            baseUrl: 'https://brokeninstitutions.github.io/sources/',
            version: '1.0.0'
        };
    }
}

// Export for use in modules
window.TemplateEngine = TemplateEngine;

// Create global instance
window.templateEngine = new TemplateEngine();