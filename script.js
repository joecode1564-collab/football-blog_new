/* LiveScores Platform - Livesport.com Inspired JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the platform
    initPlatform();
    
    // Set up live updates simulation
    setupLiveUpdates();
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Set up sport switching
    initSportSwitching();
    
    // Set up league tabs
    initLeagueTabs();
    
    // Set up mobile menu
    initMobileMenu();
    
    // Set up notifications
    initNotifications();
    
    // Set up keyboard shortcuts
    initKeyboardShortcuts();
    
    // Make globally available for debugging
    window.liveScoresPlatform = {
        updateMatchScore: updateMatchScore,
        addMatchEvent: addMatchEvent,
        changeMatchStatus: changeMatchStatus,
        refreshSportData: refreshSportData
    };
});

/* ================================================
   PLATFORM INITIALIZATION
   ================================================ */

function initPlatform() {
    // Add entrance animations to visible elements
    const elementsToAnimate = document.querySelectorAll('.live-match-item, .match-card, .section-title');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Use IntersectionObserver for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transitionDelay = `${index * 0.05}s`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(el);
    });
    
    // Add pulse animation to live match times
    const liveMatchTimes = document.querySelectorAll('.live-match-item.live .match-time');
    liveMatchTimes.forEach(time => {
        time.style.animation = 'pulse 2s infinite';
    });
}

/* ================================================
   LIVE UPDATES SIMULATION
   ================================================ */

function setupLiveUpdates() {
    // Simulate live match updates (in a real app, this would come from WebSocket/API)
    setInterval(() => {
        updateLiveMatches();
        updateMatchEvents();
        updateMatchTimes();
    }, 8000); // Update every 8 seconds
    
    // Also update fixture times for upcoming matches
    setInterval(() => {
        updateUpcomingMatchTimes();
    }, 30000); // Update every 30 seconds
}

function updateLiveMatches() {
    const liveMatches = document.querySelectorAll('.live-match-item.live');
    
    liveMatches.forEach((match, index) => {
        // Simulate score changes for some matches
        if (Math.random() > 0.8) { // 20% chance to score
            const homeScoreEl = match.querySelector('.home-score');
            const awayScoreEl = match.querySelector('.away-score');
            
            if (homeScoreEl && awayScoreEl) {
                const homeScore = parseInt(homeScoreEl.textContent) || 0;
                const awayScore = parseInt(awayScoreEl.textContent) || 0;
                
                // Randomly decide which team scores
                if (Math.random() > 0.5) {
                    // Home team scores
                    homeScoreEl.textContent = homeScore + 1;
                    addMatchEvent(match, 'goal', 'home', getRandomScorer('home'));
                } else {
                    // Away team scores
                    awayScoreEl.textContent = awayScore + 1;
                    addMatchEvent(match, 'goal', 'away', getRandomScorer('away'));
                }
                
                // Add visual update indicator
                match.classList.add('updated');
                setTimeout(() => match.classList.remove('updated'), 1000);
            }
        }
        
        // Simulate card events
        if (Math.random() > 0.9) { // 10% chance for card
            const isHome = Math.random() > 0.5;
            const cardType = Math.random() > 0.7 ? 'yellow' : 'red';
            addMatchEvent(match, 'card', isHome ? 'home' : 'away', getRandomPlayer(isHome ? 'home' : 'away'), cardType);
        }
        
        // Simulate substitutions
        if (Math.random() > 0.95) { // 5% chance for substitution
            const isHome = Math.random() > 0.5;
            addMatchEvent(match, 'sub', isHome ? 'home' : 'away', 
                        `${getRandomPlayer(isHome ? 'home' : 'away')} (for ${getRandomPlayer(isHome ? 'home' : 'away')})`);
        }
    });
}

function updateMatchEvents() {
    // Add occasional new events to ongoing matches
    const liveMatches = document.querySelectorAll('.live-match-item.live');
    
    liveMatches.forEach(match => {
        if (Math.random() > 0.95) { // Very rare new event
            const eventTypes = ['goal', 'card', 'sub'];
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const isHome = Math.random() > 0.5;
            
            let playerName, eventClass;
            
            if (eventType === 'goal') {
                playerName = getRandomScorer(isHome ? 'home' : 'away');
                eventClass = 'goal';
            } else if (eventType === 'card') {
                playerName = getRandomPlayer(isHome ? 'home' : 'away');
                eventClass = Math.random() > 0.7 ? 'yellow' : 'red';
            } else if (eventType === 'sub') {
                playerName = `${getRandomPlayer(isHome ? 'home' : 'away')} (for ${getRandomPlayer(isHome ? 'home' : 'away')})`;
                eventClass = 'sub';
            }
            
            addMatchEvent(match, eventType, isHome ? 'home' : 'away', playerName, eventClass);
        }
    });
}

function updateMatchTimes() {
    // Update live match times
    const liveMatches = document.querySelectorAll('.live-match-item.live');
    
    liveMatches.forEach(match => {
        const timeEl = match.querySelector('.match-time');
        if (timeEl) {
            const currentTime = parseInt(timeEl.textContent.replace(/['″]/g, '')) || 0;
            // Increment time by 1-3 minutes every update
            const newTime = currentTime + Math.floor(Math.random() * 3) + 1;
            timeEl.textContent = `${newTime}′`;
            
            // Change status if match is ending
            if (newTime >= 90) {
                setTimeout(() => {
                    changeMatchStatus(match, 'finished');
                }, 30000); // Finish after 30 seconds of extra time simulation
            }
        }
    });
    
    // Update upcoming match times
    updateUpcomingMatchTimes();
}

function updateUpcomingMatchTimes() {
    const upcomingMatches = document.querySelectorAll('.live-match-item.upcoming');
    
    upcomingMatches.forEach(match => {
        const timeEl = match.querySelector('.match-time');
        if (timeEl) {
            let timeText = timeEl.textContent;
            let minutes = 0;
            
            if (timeText.includes('In')) {
                // Extract minutes from "In XX'"
                const match = timeText.match(/In\s+(\d+)/);
                if (match) {
                    minutes = parseInt(match[1]);
                }
            } else if (timeText.endsWith('′')) {
                // Extract minutes from "XX′"
                const match = timeText.match(/(\d+)′/);
                if (match) {
                    minutes = parseInt(match[1]);
                }
            }
            
            // Decrease time
            const newMinutes = Math.max(0, minutes - 1);
            
            if (newMinutes <= 0) {
                // Match is starting now - change to live
                setTimeout(() => {
                    changeMatchStatus(match, 'live');
                }, 1000); // Small delay for realism
            } else {
                // Update time display
                timeEl.textContent = `In ${newMinutes}′`;
            }
        }
    });
}

function addMatchEvent(matchElement, eventType, teamSide, playerName, eventClass = '') {
    const eventsContainer = matchElement.querySelector('.match-events');
    if (!eventsContainer) return;
    
    // Determine team class
    const teamClass = teamSide === 'home' ? 'home' : 'away';
    
    // Create event element
    const eventEl = document.createElement('span');
    eventEl.className = `event ${teamSide} ${eventClass || eventType}`;
    eventEl.innerHTML = getEventIcon(eventType) + ` ${playerName}`;
    
    // Add to container
    eventsContainer.appendChild(eventEl);
    
    // Scroll to show new event if needed
    eventsContainer.scrollLeft = eventsContainer.scrollWidth;
    
    // Add slight animation
    eventEl.style.opacity = '0';
    eventEl.style.transform = 'translateY(-5px)';
    setTimeout(() => {
        eventEl.style.transition = 'all 0.3s ease';
        eventEl.style.opacity = '1';
        eventEl.style.transform = 'translateY(0)';
    }, 50);
    
    // Limit number of events shown (keep only last 5)
    const events = eventsContainer.querySelectorAll('.event');
    if (events.length > 5) {
        eventsContainer.removeChild(events[0]);
    }
}

function changeMatchStatus(matchElement, newStatus) {
    // Remove all status classes
    matchElement.classList.remove('live', 'upcoming', 'recent', 'finished');
    
    // Add new status class
    matchElement.classList.add(newStatus);
    
    // Update status badge
    const statusEl = matchElement.querySelector('.match-status');
    if (statusEl) {
        statusEl.textContent = newStatus.toUpperCase();
        
        // Update status styling
        statusEl.className = 'match-status';
        statusEl.classList.add(newStatus);
        
        // Update colors based on status
        if (newStatus === 'live') {
            statusEl.style.backgroundColor = 'rgba(107, 207, 127, 0.2)';
            statusEl.style.color = var('--status-live');
        } else if (newStatus === 'upcoming') {
            statusEl.style.backgroundColor = 'rgba(78, 205, 196, 0.2)';
            statusEl.style.color = var('--status-upcoming');
        } else if (newStatus === 'recent' || newStatus === 'finished') {
            statusEl.style.backgroundColor = 'rgba(176, 176, 176, 0.2)';
            statusEl.style.color = var(--status-recent);
        }
    }
    
    // Update time display for finished matches
    if (newStatus === 'finished' || newStatus === 'recent') {
        const timeEl = matchElement.querySelector('.match-time');
        if (timeEl) {
            timeEl.textContent = 'FT';
        }
    }
    
    // Update border color
    matchElement.style.borderLeftColor = getStatusColor(newStatus);
    
    // Update background color intensity
    if (newStatus === 'live') {
        matchElement.style.backgroundColor = 'rgba(107, 207, 127, 0.08)';
    } else if (newStatus === 'upcoming') {
        matchElement.style.backgroundColor = 'rgba(78, 205, 196, 0.04)';
    } else if (newStatus === 'recent' || newStatus === 'finished') {
        matchElement.style.backgroundColor = 'rgba(176, 176, 176, 0.03)';
    } else {
        matchElement.style.backgroundColor = var('--bg-secondary');
    }
}

function getStatusColor(status) {
    switch (status) {
        case 'live': return var('--status-live');
        case 'upcoming': return var('--status-upcoming');
        case 'recent':
        case 'finished': return var('--status-recent);
        default: return var('--border-color);
    }
}

function getEventIcon(eventType) {
    const icons = {
        'goal': '⚽',
        'card': '🟨',
        'sub': '🔄',
        'yellow': '🟨',
        'red': '🟥'
    };
    return icons[eventType] || '•';
}

function getRandomScorer(teamSide) {
    const scorers = {
        home: ['Rashford', 'Bruno Fernandes', 'Haaland', 'Salah', 'Mbappé', 'Vinícius Jr.', 'Lewandowski', 'Kane'],
        away: ['Salah', 'Núñez', 'Jota', 'Diaz', 'Gakpo', ' Elliott', 'Jones', 'Morton']
    };
    return scorers[teamSide][Math.floor(Math.random() * scorers[teamSide].length)];
}

function getRandomPlayer(teamSide) {
    const players = {
        home: ['Rashford', 'Bruno Fernandes', 'Casemiro', 'Varane', 'Shaw', 'Dalot', 'Eriksen', 'Antony', 'Martinez'],
        away: ['Salah', 'Núñez', 'Jota', 'Van Dijk', 'Alexander-Arnold', 'Robertson', 'Alisson', 'Fabinho', 'Thiago']
    };
    return players[teamSide][Math.floor(Math.random() * players[teamSide].length)];
}

/* ================================================
   UI INTERACTIONS
   ================================================ */

function initSportSwitching() {
    const sportItems = document.querySelectorAll('.sport-nav li');
    
    sportItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            sportItems.forEach(i => i.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get sport type
            const sport = this.dataset.sport;
            
            // Hide all sport content
            const sportContents = document.querySelectorAll('.sport-content');
            sportContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected sport content
            const selectedContent = document.querySelector(`.sport-content[data-sport="${sport}"]`);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                
                // Trigger re-animation
                triggerContentAnimation(selectedContent);
            }
        });
    });
}

function initLeagueTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get league type
            const league = this.dataset.league;
            
            // Hide all league tables
            const leagueTables = document.querySelectorAll('.league-table');
            leagueTables.forEach(table => {
                table.style.display = 'none';
            });
            
            // Show selected league table
            const selectedTable = document.querySelector(`.league-table[data-league="${league}"]`);
            if (selectedTable) {
                selectedTable.style.display = 'block';
            }
        });
    });
}

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sportNav = document.querySelector('.sport-nav');
    
    if (mobileMenuToggle && sportNav) {
        mobileMenuToggle.addEventListener('click', function() {
            sportNav.classList.toggle('open');
            // Animate hamburger to X
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !sportNav.contains(e.target)) {
                sportNav.classList.remove('open');
                const hamburger = mobileMenuToggle.querySelector('.hamburger');
                hamburger.classList.remove('active');
            }
        });
    }
}

function initNotifications() {
    const notificationsBtn = document.querySelector('.notifications-btn');
    
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            showNotificationPanel();
        });
    }
    
    // Simulate occasional notifications
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance
            const notificationCountEl = document.querySelector('.notification-count');
            if (notificationCountEl) {
                let count = parseInt(notificationCountEl.textContent) || 0;
                count++;
                notificationCountEl.textContent = count;
                
                // Add pulse animation
                notificationCountEl.style.animation = 'pulseNotification 0.5s ease';
                setTimeout(() => {
                    notificationCountEl.style.animation = '';
                }, 500);
            }
        }
    }, 15000); // Check every 15 seconds
}

function showNotificationPanel() {
    // In a real app, this would open a modal/panel
    alert('Notification Panel:\n• Manchester United 2-1 Liverpool (GOAL! Rashford 89\')\n• Barcelona 0-0 Real Madrid (HALF TIME)\n• Chelsea vs Arsenal starting in 5 minutes\n\nClick OK to dismiss');
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Focus search with /
        if (e.key === '/' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            // In a real app, this would focus search
            showNotification('Search focused (in full implementation)');
        }
        
        // Refresh with F5 or Ctrl+R
        if ((e.key === 'F5' || (e.ctrlKey && e.key === 'r')) && !e.target.matches('input, textarea')) {
            e.preventDefault();
            refreshAllData();
            showNotification('Data refreshed');
        }
        
        // Navigate sports with number keys
        if (e.key >= '1' && e.key <= '6' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const sportIndex = parseInt(e.key) - 1;
            const sportItems = document.querySelectorAll('.sport-nav li');
            if (sportItems[sportIndex]) {
                sportItems[sportIndex].click();
            }
        }
    });
}

function initScrollAnimations() {
    // Animate elements as they enter viewport
    const animatedElements = document.querySelectorAll(
        '.section-title, .live-matches-container > *, .matches-grid > *, .league-table'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function triggerContentAnimation(element) {
    // Re-trigger animation for content switching
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    requestAnimationFrame(() => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

/* ================================================
   DATA UPDATE FUNCTIONS
   ================================================ */

function updateMatchScore(matchId, homeScore, awayScore) {
    const matchEl = document.querySelector(`.live-match-item[data-match-id="${matchId}"]`);
    if (matchEl) {
        const homeScoreEl = matchEl.querySelector('.home-score');
        const awayScoreEl = matchEl.querySelector('.away-score');
        
        if (homeScoreEl) homeScoreEl.textContent = homeScore;
        if (awayScoreEl) awayScoreEl.textContent = awayScore;
        
        // Add update highlight
        matchEl.classList.add('updated');
        setTimeout(() => matchEl.classList.remove('updated'), 1000);
    }
}

function addMatchEvent(matchId, eventType, teamSide, playerName, eventClass = '') {
    const matchEl = document.querySelector(`.live-match-item[data-match-id="${matchId}"]`);
    if (matchEl) {
        addMatchEvent(matchEl, eventType, teamSide, playerName, eventClass);
    }
}

function changeMatchStatus(matchId, newStatus) {
    const matchEl = document.querySelector(`.live-match-item[data-match-id="${matchId}"]`);
    if (matchEl) {
        changeMatchStatus(matchEl, newStatus);
    }
}

function refreshSportData(sport = 'football') {
    // In a real app, this would fetch fresh data from API
    showNotification(`Refreshing ${sport} data...`);
    // Trigger re-initialization of animations
    initScrollAnimations();
}

function refreshAllData() {
    showNotification('Refreshing all sports data...');
    initScrollAnimations();
}

/* ================================================
   HELPER FUNCTIONS
   ================================================ */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Make key functions available globally for debugging/testing */
window.updateMatchScore = updateMatchScore;
window.addMatchEvent = addMatchEvent;
window.changeMatchStatus = changeMatchStatus;
window.refreshSportData = refreshSportData;
window.refreshAllData = refreshAllData;