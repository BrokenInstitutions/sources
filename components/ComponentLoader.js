/**
 * ComponentLoader - Dynamic component loading system
 * Manages loading and rendering of reusable HTML components
 *
 * @author BrokenInstitutions Team
 * @version 1.0.0
 */

class ComponentLoader {
    constructor(templateEngine) {
        this.templateEngine = templateEngine;
        this.loadedComponents = new Set();
    }

    /**
     * Load component into target element
     * @param {string} componentName - Name of component to load
     * @param {string|HTMLElement} target - Target selector or element
     * @param {Object} data - Data to bind to component
     * @param {Object} options - Loading options
     */
    async loadInto(componentName, target, data = {}, options = {}) {
        const {
            append = false,
            prepend = false,
            replace = true
        } = options;

        try {
            // Get target element
            const targetElement = typeof target === 'string'
                ? document.querySelector(target)
                : target;

            if (!targetElement) {
                throw new Error(`Target element not found: ${target}`);
            }

            // Load and render component
            const componentHtml = await this.templateEngine.loadComponent(
                `templates/components/${componentName}.html`
            );
            const renderedHtml = this.templateEngine.render(componentHtml, data);

            // Insert into target
            if (append) {
                targetElement.insertAdjacentHTML('beforeend', renderedHtml);
            } else if (prepend) {
                targetElement.insertAdjacentHTML('afterbegin', renderedHtml);
            } else if (replace) {
                targetElement.innerHTML = renderedHtml;
            }

            // Mark as loaded
            this.loadedComponents.add(componentName);

            // Initialize component JavaScript if exists
            await this.initializeComponent(componentName, targetElement);

            return targetElement;

        } catch (error) {
            console.error(`Failed to load component ${componentName}:`, error);
            return null;
        }
    }

    /**
     * Load multiple components in parallel
     * @param {Array} components - Array of component definitions
     * @returns {Promise<Array>} Array of loaded elements
     */
    async loadMultiple(components) {
        const promises = components.map(({ name, target, data, options }) =>
            this.loadInto(name, target, data, options)
        );

        return Promise.all(promises);
    }

    /**
     * Initialize component-specific JavaScript
     * @param {string} componentName - Name of component
     * @param {HTMLElement} element - Component element
     */
    async initializeComponent(componentName, element) {
        // Check if component has initialization script
        const initMethod = `init${this.capitalizeFirst(componentName)}`;

        if (typeof window[initMethod] === 'function') {
            try {
                window[initMethod](element);
            } catch (error) {
                console.warn(`Component initialization failed for ${componentName}:`, error);
            }
        }

        // Dispatch component loaded event
        element.dispatchEvent(new CustomEvent('componentLoaded', {
            detail: { componentName, element },
            bubbles: true
        }));
    }

    /**
     * Refresh a loaded component with new data
     * @param {string} componentName - Name of component to refresh
     * @param {string|HTMLElement} target - Target selector or element
     * @param {Object} newData - New data for component
     */
    async refresh(componentName, target, newData = {}) {
        return this.loadInto(componentName, target, newData, { replace: true });
    }

    /**
     * Check if component is loaded
     * @param {string} componentName - Name of component
     * @returns {boolean} True if component is loaded
     */
    isLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    /**
     * Unload component (remove from DOM and clear cache)
     * @param {string} componentName - Name of component to unload
     * @param {string|HTMLElement} target - Target selector or element
     */
    unload(componentName, target) {
        const targetElement = typeof target === 'string'
            ? document.querySelector(target)
            : target;

        if (targetElement) {
            targetElement.innerHTML = '';
        }

        this.loadedComponents.delete(componentName);
    }

    /**
     * Load component with lazy loading support
     * @param {string} componentName - Name of component
     * @param {string|HTMLElement} target - Target selector or element
     * @param {Object} data - Data to bind
     * @param {Object} lazyOptions - Lazy loading options
     */
    async loadLazy(componentName, target, data = {}, lazyOptions = {}) {
        const {
            rootMargin = '100px',
            threshold = 0.1
        } = lazyOptions;

        const targetElement = typeof target === 'string'
            ? document.querySelector(target)
            : target;

        if (!targetElement) {
            console.error(`Target element not found: ${target}`);
            return null;
        }

        // Create intersection observer for lazy loading
        const observer = new IntersectionObserver(
            async (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    observer.disconnect();
                    await this.loadInto(componentName, targetElement, data);
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(targetElement);
        return observer;
    }

    /**
     * Preload components for faster rendering
     * @param {Array<string>} componentNames - Names of components to preload
     */
    async preload(componentNames) {
        const promises = componentNames.map(name =>
            this.templateEngine.loadComponent(`templates/components/${name}.html`)
        );

        try {
            await Promise.all(promises);
            console.log(`Preloaded ${componentNames.length} components`);
        } catch (error) {
            console.warn('Failed to preload some components:', error);
        }
    }

    /**
     * Capitalize first letter of string
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Get all loaded components
     * @returns {Set<string>} Set of loaded component names
     */
    getLoadedComponents() {
        return new Set(this.loadedComponents);
    }

    /**
     * Clear all loaded components
     */
    clear() {
        this.loadedComponents.clear();
    }
}

// Export for use in modules
window.ComponentLoader = ComponentLoader;