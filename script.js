// script.js - Updated with all new sections functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Navigation Toggle =====
    const navHamburger = document.querySelector('.club-nav-hamburger');
    const navList = document.querySelector('.club-nav-list');
    
    if (navHamburger) {
        navHamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.club-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navHamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // ===== Hero Slider Functionality =====
    const heroSlides = document.querySelectorAll('.club-slide');
    const heroIndicators = document.querySelectorAll('.club-indicator');
    const prevBtn = document.querySelector('.club-slider-prev');
    const nextBtn = document.querySelector('.club-slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Reset all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('club-slide-active');
        });
        
        heroIndicators.forEach(indicator => {
            indicator.classList.remove('club-indicator-active');
        });
        
        // Set current slide
        currentSlide = index;
        if (currentSlide >= heroSlides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = heroSlides.length - 1;
        
        // Show current slide
        heroSlides[currentSlide].classList.add('club-slide-active');
        heroIndicators[currentSlide].classList.add('club-indicator-active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Initialize slider
    function initHeroSlider() {
        if (heroSlides.length > 0) {
            // Start auto slide
            slideInterval = setInterval(nextSlide, 5000);
            
            // Add event listeners
            if (prevBtn) prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
            
            if (nextBtn) nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            
            // Add event listeners to indicators
            heroIndicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
            });
            
            // Pause on hover
            const heroSlider = document.querySelector('.club-hero-slider');
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // ===== Slider Player View Functionality =====
    const sliderPlayerTrack = document.querySelector('.club-slider-player-track');
    const sliderPlayerPrevBtn = document.querySelector('.club-slider-player-prev');
    const sliderPlayerNextBtn = document.querySelector('.club-slider-player-next');
    const sliderPlayerIndicatorsContainer = document.querySelector('.club-slider-player-indicators');
    let sliderPlayerCurrentSlide = 0;
    let sliderPlayerSlides = [];
    let sliderPlayerInterval;
    
    // Create player slides data
    const playerData = [
        {
            id: 1,
            name: "Alex Turner",
            role: "Batsman",
            image: "images/10.jfif",
            stats: "Avg: 42.5 | 8 Centuries"
        },
        {
            id: 2,
            name: "James Anderson",
            role: "Bowler",
            image: "images/6.jfif",
            stats: "Wickets: 127 | Econ: 4.2"
        },
        {
            id: 3,
            name: "David Miller",
            role: "All-Rounder",
            image: "images/4.jfif",
            stats: "Runs: 2745 | Wickets: 43"
        },
        {
            id: 4,
            name: "Steve Smith",
            role: "Wicket-Keeper",
            image: "images/7.jfif",
            stats: "Catches: 67 | Stumpings: 12"
        },
        {
            id: 5,
            name: "Chris Wilson",
            role: "Batsman",
            image: "images/5.jfif",
            stats: "Avg: 38.2 | 6 Centuries"
        },
        {
            id: 6,
            name: "Michael Brown",
            role: "Bowler",
            image: "images/6.jfif",
            stats: "Wickets: 89 | Econ: 4.8"
        }
    ];
    
    function createPlayerSlide(player) {
        return `
            <div class="club-slider-player-slide">
                <div class="club-slider-player-card">
                    <div class="club-slider-player-image">
                        <img src="${player.image}" alt="${player.name}">
                    </div>
                    <div class="club-slider-player-info">
                        <h3 class="club-slider-player-name">${player.name}</h3>
                        <p class="club-slider-player-role">${player.role}</p>
                        <p class="club-slider-player-stats">${player.stats}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function initSliderPlayerView() {
        if (sliderPlayerTrack) {
            // Create slides
            playerData.forEach(player => {
                const slideHTML = createPlayerSlide(player);
                sliderPlayerTrack.innerHTML += slideHTML;
            });
            
            // Get all slides after creation
            sliderPlayerSlides = document.querySelectorAll('.club-slider-player-slide');
            
            // Create indicators
            sliderPlayerSlides.forEach((_, index) => {
                const indicator = document.createElement('span');
                indicator.classList.add('club-slider-player-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    goToSlide(index);
                    resetSliderPlayerInterval();
                });
                sliderPlayerIndicatorsContainer.appendChild(indicator);
            });
            
            // Add event listeners for navigation
            if (sliderPlayerPrevBtn) {
                sliderPlayerPrevBtn.addEventListener('click', () => {
                    prevSliderPlayerSlide();
                    resetSliderPlayerInterval();
                });
            }
            
            if (sliderPlayerNextBtn) {
                sliderPlayerNextBtn.addEventListener('click', () => {
                    nextSliderPlayerSlide();
                    resetSliderPlayerInterval();
                });
            }
            
            // Calculate slides per view based on screen size
            function getSlidesPerView() {
                if (window.innerWidth >= 1024) return 4;
                if (window.innerWidth >= 768) return 3;
                if (window.innerWidth >= 576) return 2;
                return 1;
            }
            
            // Update slide width and position
            function updateSliderPlayer() {
                const slidesPerView = getSlidesPerView();
                const slideWidth = 100 / slidesPerView;
                const gap = 30; // pixels
                
                // Set slide width
                sliderPlayerSlides.forEach(slide => {
                    slide.style.minWidth = `calc(${slideWidth}% - ${gap * (slidesPerView - 1) / slidesPerView}px)`;
                });
                
                // Update track position
                const translateX = -sliderPlayerCurrentSlide * (100 / slidesPerView);
                sliderPlayerTrack.style.transform = `translateX(${translateX}%)`;
                
                // Update indicators
                const indicators = document.querySelectorAll('.club-slider-player-indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.remove('active');
                    if (index === sliderPlayerCurrentSlide) {
                        indicator.classList.add('active');
                    }
                });
            }
            
            function nextSliderPlayerSlide() {
                const slidesPerView = getSlidesPerView();
                const maxSlides = sliderPlayerSlides.length - slidesPerView;
                
                if (sliderPlayerCurrentSlide < maxSlides) {
                    sliderPlayerCurrentSlide++;
                } else {
                    sliderPlayerCurrentSlide = 0;
                }
                updateSliderPlayer();
            }
            
            function prevSliderPlayerSlide() {
                const slidesPerView = getSlidesPerView();
                
                if (sliderPlayerCurrentSlide > 0) {
                    sliderPlayerCurrentSlide--;
                } else {
                    const maxSlides = sliderPlayerSlides.length - slidesPerView;
                    sliderPlayerCurrentSlide = maxSlides;
                }
                updateSliderPlayer();
            }
            
            function goToSlide(index) {
                const slidesPerView = getSlidesPerView();
                const maxSlides = sliderPlayerSlides.length - slidesPerView;
                
                if (index >= 0 && index <= maxSlides) {
                    sliderPlayerCurrentSlide = index;
                    updateSliderPlayer();
                }
            }
            
            function resetSliderPlayerInterval() {
                clearInterval(sliderPlayerInterval);
                sliderPlayerInterval = setInterval(nextSliderPlayerSlide, 4000);
            }
            
            // Initialize
            updateSliderPlayer();
            sliderPlayerInterval = setInterval(nextSliderPlayerSlide, 4000);
            
            // Update on window resize
            window.addEventListener('resize', updateSliderPlayer);
            
            // Pause on hover
            const sliderContainer = document.querySelector('.club-slider-player-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(sliderPlayerInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                resetSliderPlayerInterval();
            });
        }
    }
    
    // ===== Date Wise Flicker Calendar Functionality =====
    function initDateFlicker() {
        const prevMonthBtn = document.querySelector('.club-date-flicker-prev-month');
        const nextMonthBtn = document.querySelector('.club-date-flicker-next-month');
        const currentMonthEl = document.querySelector('.club-date-flicker-current-month');
        const calendarEl = document.querySelector('.club-date-flicker-calendar');
        
        if (!calendarEl) return;
        
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        // Match dates for demonstration
        const matchDates = [
            { date: 12, month: 5, year: 2023, match: "Kingdom CC vs Lions CC" },
            { date: 5, month: 5, year: 2023, match: "Kingdom CC vs Tigers United" },
            { date: 29, month: 4, year: 2023, match: "Kingdom CC vs Eagles CC" },
            { date: 22, month: 4, year: 2023, match: "Kingdom CC vs Panthers XI" },
            { date: 15, month: 4, year: 2023, match: "Kingdom CC vs Rhinos CC" },
            { date: 8, month: 4, year: 2023, match: "Kingdom CC vs Hawks CC" },
            { date: 1, month: 4, year: 2023, match: "Kingdom CC vs Falcons CC" }
        ];
        
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        function renderCalendar(month, year) {
            // Update month name
            currentMonthEl.textContent = `${monthNames[month]} ${year}`;
            
            // Clear calendar
            calendarEl.innerHTML = '';
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.classList.add('club-date-flicker-day');
                dayEl.textContent = day;
                calendarEl.appendChild(dayEl);
            });
            
            // Get first day of month
            const firstDay = new Date(year, month, 1).getDay();
            
            // Get days in month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Add empty cells for days before first day
            for (let i = 0; i < firstDay; i++) {
                const emptyEl = document.createElement('div');
                emptyEl.classList.add('club-date-flicker-date', 'empty');
                calendarEl.appendChild(emptyEl);
            }
            
            // Add days of month
            for (let day = 1; day <= daysInMonth; day++) {
                const dateEl = document.createElement('div');
                dateEl.classList.add('club-date-flicker-date');
                dateEl.textContent = day;
                
                // Check if this date has a match
                const hasMatch = matchDates.some(match => 
                    match.date === day && match.month === month && match.year === year
                );
                
                if (hasMatch) {
                    dateEl.classList.add('match');
                }
                
                // Highlight today
                const today = new Date();
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dateEl.classList.add('active');
                }
                
                // Add click event
                dateEl.addEventListener('click', () => {
                    // Remove active class from all dates
                    document.querySelectorAll('.club-date-flicker-date').forEach(el => {
                        el.classList.remove('active');
                    });
                    
                    // Add active class to clicked date
                    dateEl.classList.add('active');
                    
                    // Update selected date display
                    const selectedDateEl = document.querySelector('.club-date-flicker-selected-date');
                    if (selectedDateEl) {
                        selectedDateEl.textContent = `${monthNames[month]} ${day}, ${year}`;
                    }
                });
                
                calendarEl.appendChild(dateEl);
            }
        }
        
        // Initial render
        renderCalendar(currentMonth, currentYear);
        
        // Add event listeners for month navigation
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar(currentMonth, currentYear);
            });
        }
        
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar(currentMonth, currentYear);
            });
        }
    }
    
    // ===== Gallery Tabs Functionality =====
    function initGalleryTabs() {
        const tabButtons = document.querySelectorAll('.club-gallery-tab');
        const tabContents = document.querySelectorAll('.club-gallery-content');
        
        if (tabButtons.length === 0) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Get tab id
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding content
                const content = document.querySelector(`.club-gallery-${tabId}`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
    
    // ===== Video Play Functionality =====
    function initVideoPlayers() {
        const videoPlayButtons = document.querySelectorAll('.club-video-play, .club-best-shot-play, .club-draft-catch-play, .club-best-bowling-play');
        
        videoPlayButtons.forEach(button => {
            button.addEventListener('click', function() {
                // In a real implementation, this would open a video player modal
                // For now, we'll just show an alert
                const videoCard = this.closest('.club-video-item, .club-best-shot-card, .club-draft-catch-card, .club-best-bowling-card');
                const title = videoCard.querySelector('h3')?.textContent || 'Video';
                alert(`Playing: ${title}\n\nIn a full implementation, this would open a video player with the actual video content.`);
            });
        });
    }
    
    // ===== Back to Top Button =====
    const backToTopBtn = document.querySelector('.club-back-to-top');
    
    function initBackToTop() {
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // ===== Theme Toggle Functionality =====
    const themeToggleBtn = document.querySelector('.club-theme-toggle');
    
    function initThemeToggle() {
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');
            
            // Check for saved theme or prefer-color-scheme
            const savedTheme = localStorage.getItem('club-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.body.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            themeToggleBtn.addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('club-theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('club-theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
        }
    }
    
    // ===== Smooth Scrolling =====
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== Animation on Scroll =====
    function initScrollAnimation() {
        const elements = document.querySelectorAll(
            '.club-player-view-card, .club-performance-option-card, ' +
            '.club-recent-match-card, .club-gallery-item, .club-video-item, ' +
            '.club-best-shot-card, .club-draft-catch-card, .club-best-bowling-card'
        );
        
        function animateOnScroll() {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Set initial state for animation
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // ===== Initialize All Functions =====
    initHeroSlider();
    initSliderPlayerView();
    initDateFlicker();
    initGalleryTabs();
    initVideoPlayers();
    initBackToTop();
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimation();
});