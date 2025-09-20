// Search and filter functionality

// Case data
const allCases = [
    {
        id: "charlotte-transit",
        title: "Charlotte Transit Case: \"What Enabled Him?\"",
        summary: "Investigation into institutional failures that enabled the Charlotte transit tragedy. Examining 14 arrests, judicial decisions, and systemic breakdowns that preceded the fatal incident.",
        category: "Judicial System",
        tags: ["judicial immunity", "pre-trial release", "mental health", "public safety", "institutional failure"],
        date: new Date("2025-08-22"),
        element: null
    }
];

// Filter functionality
function filterCases() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const tagFilter = document.getElementById('tagFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;

    let filteredCases = allCases.filter(caseItem => {
        const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm) ||
                            caseItem.summary.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || caseItem.category === categoryFilter;
        const matchesTag = !tagFilter || caseItem.tags.includes(tagFilter);

        return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort cases
    switch(sortFilter) {
        case 'oldest':
            filteredCases.sort((a, b) => a.date - b.date);
            break;
        case 'title':
            filteredCases.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'newest':
        default:
            filteredCases.sort((a, b) => b.date - a.date);
            break;
    }

    // Update display
    const casesContainer = document.getElementById('casesContainer');
    const allCaseElements = casesContainer.children;

    // Hide all cases first
    for (let element of allCaseElements) {
        element.style.display = 'none';
    }

    // Show filtered cases
    filteredCases.forEach(caseItem => {
        if (caseItem.element) {
            caseItem.element.style.display = 'block';
        } else {
            // Find the case element by data attributes
            for (let element of allCaseElements) {
                const category = element.getAttribute('data-category');
                const tags = element.getAttribute('data-tags');

                if (category === caseItem.category && tags && tags.includes(caseItem.tags[0])) {
                    element.style.display = 'block';
                    caseItem.element = element;
                    break;
                }
            }
        }
    });

    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `Showing ${filteredCases.length} of ${allCases.length} investigations`;
}

// Initialize search functionality
function initializeSearch() {
    // Initialize case elements
    allCases.forEach(caseItem => {
        caseItem.element = document.querySelector(`[data-case-id="${caseItem.id}"]`);
    });

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const tagFilter = document.getElementById('tagFilter');
    const sortFilter = document.getElementById('sortFilter');

    // Add event listeners
    searchInput.addEventListener('input', filterCases);
    categoryFilter.addEventListener('change', filterCases);
    tagFilter.addEventListener('change', filterCases);
    sortFilter.addEventListener('change', filterCases);

    // Initialize case elements
    const casesContainer = document.getElementById('casesContainer');
    const caseElements = casesContainer.children;

    for (let i = 0; i < caseElements.length && i < allCases.length; i++) {
        allCases[i].element = caseElements[i];
    }

    filterCases();
}

// Export for use in other modules
window.FilterModule = {
    allCases,
    filterCases,
    initializeSearch
};