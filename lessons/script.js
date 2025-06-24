document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContainer = document.querySelector('.dropdown-container');
    const lessonsDropdownMenu = document.getElementById('lessonsDropdown');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResultsDiv = document.getElementById('searchResults');

    // --- Define our "25 pages" (Lesson 1 to Lesson 25) ---
    // For a real site, these URLs would point to actual HTML pages.
    // We add keywords for better search.
    const N5Pages = [];
    for (let i = 1; i <= 25; i++) {
        N5Pages.push({
            title: `Lesson ${i}`,
            url: `lessons/lesson-${i}.html`, // e.g., lessons/lesson-1.html
            keywords: [`lesson ${i}`, `chapter ${i}`, `unit ${i}`, `N5 lesson ${i}`] // Basic keywords
        });
    }

    // --- Populate Dropdown Menu ---
    function populateDropdown() {
        if (!lessonsDropdownMenu) return;
        lessonsDropdownMenu.innerHTML = ''; // Clear existing items
        N5Pages.forEach(page => {
            const link = document.createElement('a');
            link.href = page.url;
            link.textContent = page.title;
            lessonsDropdownMenu.appendChild(link);
        });
    }

    // --- Dropdown Toggle Functionality ---
    if (dropdownToggle && dropdownContainer) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link navigation
            dropdownContainer.classList.toggle('open');
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!dropdownContainer.contains(e.target) && e.target !== dropdownToggle) {
                dropdownContainer.classList.remove('open');
            }
        });
    }

    // --- Search Functionality ---
    function performSearch() {
        if (!searchResultsDiv || !searchInput) return;

        const searchTerm = searchInput.value.toLowerCase().trim();
        searchResultsDiv.innerHTML = ''; // Clear previous results

        if (searchTerm === '') {
            searchResultsDiv.innerHTML = '<p>Enter a term in the search bar above to find lessons (e.g., "Lesson 5").</p>';
            return;
        }

        const results = N5Pages.filter(page => {
            const titleMatch = page.title.toLowerCase().includes(searchTerm);
            // Check if any keyword matches the search term
            const keywordsMatch = page.keywords.some(kw => kw.toLowerCase().includes(searchTerm));
            return titleMatch || keywordsMatch;
        });

        if (results.length > 0) {
            results.forEach(page => {
                const link = document.createElement('a');
                link.href = page.url;
                link.textContent = page.title;
                searchResultsDiv.appendChild(link);
            });
        } else {
            searchResultsDiv.innerHTML = '<p>No lessons found matching your search term.</p>';
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    if (searchInput) {
        // Search as user types
        searchInput.addEventListener('input', performSearch);
        // Or search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Initial population
    populateDropdown();
    // Initial search prompt
    if (searchResultsDiv && searchInput && searchInput.value === '') {
         searchResultsDiv.innerHTML = '<p>Enter a term in the search bar above to find lessons (e.g., "Lesson 5").</p>';
    }
});