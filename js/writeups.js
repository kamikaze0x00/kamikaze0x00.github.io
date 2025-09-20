// Writeups page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const platformFilter = document.getElementById('platform-filter');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const writeupCards = document.querySelectorAll('.writeup-card');
    
    // Check if we're on the writeups page
    if (categoryFilter && difficultyFilter && platformFilter && applyFiltersBtn) {
        // Apply filters from URL parameters if present
        const params = getUrlParams();
        if (params.category) {
            categoryFilter.value = params.category;
        }
        if (params.difficulty) {
            difficultyFilter.value = params.difficulty;
        }
        if (params.platform) {
            platformFilter.value = params.platform;
        }
        
        // Apply initial filters
        applyFilters();
        
        // Add event listeners
        applyFiltersBtn.addEventListener('click', applyFilters);
        
        // Also apply filters when select values change
        categoryFilter.addEventListener('change', applyFilters);
        difficultyFilter.addEventListener('change', applyFilters);
        platformFilter.addEventListener('change', applyFilters);
    }
    
    function applyFilters() {
        const categoryValue = categoryFilter.value;
        const difficultyValue = difficultyFilter.value;
        const platformValue = platformFilter.value;
        
        writeupCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardDifficulty = card.getAttribute('data-difficulty');
            const cardPlatform = card.getAttribute('data-platform');
            
            const categoryMatch = categoryValue === 'all' || categoryValue === cardCategory;
            const difficultyMatch = difficultyValue === 'all' || difficultyValue === cardDifficulty;
            const platformMatch = platformValue === 'all' || platformValue === cardPlatform;
            
            if (categoryMatch && difficultyMatch && platformMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update URL with filter parameters
        const params = new URLSearchParams();
        if (categoryValue !== 'all') params.set('category', categoryValue);
        if (difficultyValue !== 'all') params.set('difficulty', difficultyValue);
        if (platformValue !== 'all') params.set('platform', platformValue);
        
        const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            // If search is empty, show all cards
            writeupCards.forEach(card => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            });
            return;
        }
        
        writeupCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.querySelector('.category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortWriteups);
    }
    
    function sortWriteups() {
        const sortValue = sortSelect.value;
        const writeupsContainer = document.querySelector('.writeups-grid');
        const writeupsArray = Array.from(writeupCards);
        
        writeupsArray.sort((a, b) => {
            if (sortValue === 'date-newest') {
                const dateA = new Date(a.querySelector('.date').textContent);
                const dateB = new Date(b.querySelector('.date').textContent);
                return dateB - dateA;
            } else if (sortValue === 'date-oldest') {
                const dateA = new Date(a.querySelector('.date').textContent);
                const dateB = new Date(b.querySelector('.date').textContent);
                return dateA - dateB;
            } else if (sortValue === 'difficulty') {
                const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
                const difficultyA = a.querySelector('.difficulty').classList[1];
                const difficultyB = b.querySelector('.difficulty').classList[1];
                return difficultyOrder[difficultyA] - difficultyOrder[difficultyB];
            } else if (sortValue === 'title') {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                return titleA.localeCompare(titleB);
            }
            return 0;
        });
        
        // Reappend sorted writeups
        writeupsArray.forEach(writeup => {
            writeupsContainer.appendChild(writeup);
        });
    }
});
