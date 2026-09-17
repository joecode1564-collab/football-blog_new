// Football Focus - Enhanced Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Animate hamburger to X
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }
    
    // Search toggle functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    
    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', function() {
            searchBox.classList.toggle('active');
            // Focus on search input when opened
            if (searchBox.classList.contains('active')) {
                const searchInput = searchBox.querySelector('input[type="text"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                // In a real app, this would submit to a backend
                showNotification('Thank you for subscribing! You\'ll receive the latest football updates.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Add active class to current nav item based on URL (simplified)
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-menu ul li a');
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
    
    // Enhanced live match update simulation (Livesport.com inspired)
    const liveMatchItems = document.querySelectorAll('.live-tracker .live-match-item');
    liveMatchItems.forEach((item, index) => {
        // In a real app, this would come from an API with match status
        setInterval(() => {
            // Simulate different match statuses
            const statuses = ['live', 'upcoming', 'recent'];
            const currentStatus = statuses[index % statuses.length];
            
            // Update status class
            item.className = 'live-match-item ' + currentStatus;
            
            // Update score for live matches
            if (currentStatus === 'live') {
                const scoreEl = item.querySelector('.score');
                if (scoreEl) {
                    const currentScore = parseInt(scoreEl.textContent) || 0;
                    // Randomly update score (more frequent for live matches)
                    if (Math.random() > 0.8) { // 20% chance to update
                        const newScore = currentScore + (Math.random() > 0.5 ? 1 : 0);
                        scoreEl.textContent = newScore;
                    }
                }
            }
            
            // Update time for upcoming/recent matches
            const timeEl = item.querySelector('.match-time');
            if (timeEl) {
                if (currentStatus === 'upcoming') {
                    // Simulate countdown to kickoff
                    const minutes = Math.floor(Math.random() * 120) + 5; // 5-125 mins away
                    timeEl.textContent = `${minutes}'`;
                } else if (currentStatus === 'recent') {
                    // Simulate time since match ended
                    const minutes = Math.floor(Math.random() * 90) + 10; // 10-100 mins ago
                    timeEl.textContent = `${minutes}′`;
                } else {
                    // Live match - show elapsed time
                    const minutes = Math.floor(Math.random() * 90) + 1; // 1-90 mins played
                    timeEl.textContent = `${minutes}′`;
                }
            }
        }, 8000 + Math.random() * 4000); // Staggered updates between 8-12 seconds
    });
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy load images (basic implementation)
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Add hover effect to article cards for better UX
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Make showNotification globally available
    window.showNotification = showNotification;
    
    // Initialize article card animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all article cards for animation
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        // Reset initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
});