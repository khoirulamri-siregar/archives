document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const allContentContainers = document.querySelectorAll('.content-container');
    const bugListContainer = document.getElementById('bug-list-container');
    const roadmapContainer = document.querySelector('.roadmap-container');
    const toolsContainer = document.querySelector('.tools-list-container');
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar-button');

    // State management
    let currentLanguage = 'id';
    let currentBugModule = null;

    // ... (translations and data definitions remain the same as before) ...

    // Fixed toggle sidebar function
    window.toggleSidebar = function() {
        sidebar.classList.toggle('active');
        
        // Update toggle button icon
        if (sidebar.classList.contains('active')) {
            toggleSidebarBtn.textContent = '✕';
            toggleSidebarBtn.style.left = '250px';
        } else {
            toggleSidebarBtn.textContent = '☰';
            toggleSidebarBtn.style.left = '10px';
        }
    }

    // Fixed show content function
    window.showContent = function(id) {
        hideAllContent();
        const content = document.getElementById(`content-${id}`);
        if (content) {
            content.classList.add('active');
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    }

    // Fixed bug module function
    window.showBugModule = function(id) {
        hideAllContent();
        currentBugModule = id;
        
        // Remove existing module if any
        const oldModule = document.getElementById(`content-${id}`);
        if (oldModule) oldModule.remove();
        
        // Create new module
        const moduleContainer = document.createElement('div');
        moduleContainer.id = `content-${id}`;
        moduleContainer.className = 'content-container active bug-module';
        moduleContainer.innerHTML = getBugModuleContent(id);
        document.querySelector('.content-wrapper').appendChild(moduleContainer);
        
        // Scroll to top
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    }

    // Helper function to hide all content
    function hideAllContent() {
        allContentContainers.forEach(container => {
            container.classList.remove('active');
        });
    }

    // Fixed filter bugs function
    window.filterBugs = function() {
        const filter = searchInput.value.toLowerCase();
        const bugCards = bugListContainer.querySelectorAll('.bug-card');

        bugCards.forEach(card => {
            const title = card.querySelector('.bug-card-title').textContent.toLowerCase();
            const desc = card.querySelector('.bug-card-description').textContent.toLowerCase();
            
            if (title.includes(filter) || desc.includes(filter)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Fixed theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.innerHTML = isLight ? '<span class="theme-icon">🌙</span>' : '<span class="theme-icon">☀️</span>';
    });

    // Fixed language toggle
    langToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
        updateLanguage(currentLanguage);
        langToggle.textContent = currentLanguage.toUpperCase();
        
        // Refresh current bug module if open
        if (currentBugModule) {
            showBugModule(currentBugModule);
        }
    });

    // Initialize content
    function initializeContent() {
        populateBugList();
        populateRoadmap();
        populateToolsList();
        
        // Set welcome content as default
        document.getElementById('content-welcome').classList.add('active');
        
        // Handle sidebar on resize
        handleSidebarVisibility();
    }

    // Handle sidebar visibility on resize
    function handleSidebarVisibility() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('active');
            mainContent.style.marginLeft = '300px';
            toggleSidebarBtn.style.display = 'none';
        } else {
            sidebar.classList.remove('active');
            mainContent.style.marginLeft = '0';
            toggleSidebarBtn.style.display = 'block';
        }
    }

    // Initialize everything
    initializeContent();

    // Event listeners
    window.addEventListener('resize', handleSidebarVisibility);
});
