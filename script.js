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
    
    // Simple live match update simulation (for demo)
    const liveScores = document.querySelectorAll('.live-tracker .score');
    liveScores.forEach(score => {
        // In a real app, this would come from an API
        setInterval(() => {
            const currentScore = parseInt(score.textContent);
            // Randomly update score for demo purposes
            if (Math.random() > 0.7) { // 30% chance to update
                const newScore = currentScore + (Math.random() > 0.5 ? 1 : 0);
                score.textContent = newScore;
            }
        }, 10000); // Update every 10 seconds
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