// Kingdom Cricket Club - Complete JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kingdom Cricket Club - Website Loaded');
    
    // ==================== 1. MOBILE NAVIGATION ====================
    const hamburger = document.querySelector('.club-nav-hamburger');
    const navList = document.querySelector('.club-nav-list');
    const navLinks = document.querySelectorAll('.club-nav-link');
    
    if (hamburger && navList) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Toggle body scroll
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navList.classList.contains('active') && 
                !navList.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==================== 2. HERO SLIDER ====================
    const heroSlides = document.querySelectorAll('.club-slide');
    const heroIndicators = document.querySelectorAll('.club-indicator');
    const heroPrevBtn = document.querySelector('.club-slider-prev');
    const heroNextBtn = document.querySelector('.club-slider-next');
    let currentHeroSlide = 0;
    let heroSlideInterval;
    
    if (heroSlides.length > 0) {
        function showHeroSlide(index) {
            // Reset all slides
            heroSlides.forEach(slide => slide.classList.remove('club-slide-active'));
            heroIndicators.forEach(indicator => indicator.classList.remove('club-indicator-active'));
            
            // Set current slide
            currentHeroSlide = index;
            if (currentHeroSlide >= heroSlides.length) currentHeroSlide = 0;
            if (currentHeroSlide < 0) currentHeroSlide = heroSlides.length - 1;
            
            // Show current slide
            heroSlides[currentHeroSlide].classList.add('club-slide-active');
            heroIndicators[currentHeroSlide].classList.add('club-indicator-active');
        }
        
        function nextHeroSlide() {
            showHeroSlide(currentHeroSlide + 1);
        }
        
        function prevHeroSlide() {
            showHeroSlide(currentHeroSlide - 1);
        }
        
        function resetHeroInterval() {
            clearInterval(heroSlideInterval);
            startHeroInterval();
        }
        
        function startHeroInterval() {
            heroSlideInterval = setInterval(nextHeroSlide, 5000);
        }
        
        // Initialize
        showHeroSlide(0);
        startHeroInterval();
        
        // Add event listeners
        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                prevHeroSlide();
                resetHeroInterval();
            });
        }
        
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                nextHeroSlide();
                resetHeroInterval();
            });
        }
        
        // Indicators
        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showHeroSlide(index);
                resetHeroInterval();
            });
        });
        
        // Pause on hover
        const heroSlider = document.querySelector('.club-hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(heroSlideInterval);
            });
            
            heroSlider.addEventListener('mouseleave', () => {
                startHeroInterval();
            });
        }
    }
    
    // ==================== 3. PLAYER SLIDER VIEW ====================
    const sliderPlayerTrack = document.querySelector('.club-slider-player-track');
    const sliderPlayerPrevBtn = document.querySelector('.club-slider-player-prev');
    const sliderPlayerNextBtn = document.querySelector('.club-slider-player-next');
    const sliderPlayerIndicatorsContainer = document.querySelector('.club-slider-player-indicators');
    
    if (sliderPlayerTrack) {
        // Player data
        const playerData = [
            { id: 1, name: "Alex Turner", role: "Batsman", image: "images/10.jfif", stats: "Avg: 42.5 | 8 Centuries" },
            { id: 2, name: "James Anderson", role: "Bowler", image: "images/6.jfif", stats: "Wickets: 127 | Econ: 4.2" },
            { id: 3, name: "David Miller", role: "All-Rounder", image: "images/4.jfif", stats: "Runs: 2745 | Wickets: 43" },
            { id: 4, name: "Steve Smith", role: "Wicket-Keeper", image: "images/7.jfif", stats: "Catches: 67 | Stumpings: 12" },
            { id: 5, name: "Chris Wilson", role: "Batsman", image: "images/5.jfif", stats: "Avg: 38.2 | 6 Centuries" },
            { id: 6, name: "Michael Brown", role: "Bowler", image: "images/6.jfif", stats: "Wickets: 89 | Econ: 4.8" }
        ];
        
        let currentPlayerSlide = 0;
        let playerSlides = [];
        let playerSlideInterval;
        
        // Create player slide HTML
        function createPlayerSlide(player) {
            return `
                <div class="club-slider-player-slide">
                    <div class="club-slider-player-card">
                        <div class="club-slider-player-image">
                            <img src="${player.image}" alt="${player.name}" onerror="this.src='images/default-player.jpg'">
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
        
        // Create slides
        playerData.forEach(player => {
            sliderPlayerTrack.innerHTML += createPlayerSlide(player);
        });
        
        // Get all slides after creation
        playerSlides = document.querySelectorAll('.club-slider-player-slide');
        
        // Create indicators
        playerSlides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('club-slider-player-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                goToPlayerSlide(index);
                resetPlayerInterval();
            });
            sliderPlayerIndicatorsContainer.appendChild(indicator);
        });
        
        // Get slides per view based on screen size
        function getSlidesPerView() {
            if (window.innerWidth >= 1024) return 4;
            if (window.innerWidth >= 768) return 3;
            if (window.innerWidth >= 576) return 2;
            return 1;
        }
        
        // Update slider
        function updatePlayerSlider() {
            const slidesPerView = getSlidesPerView();
            const slideWidth = 100 / slidesPerView;
            const gap = 20;
            
            // Set slide width
            playerSlides.forEach(slide => {
                slide.style.minWidth = `calc(${slideWidth}% - ${gap * (slidesPerView - 1) / slidesPerView}px)`;
                slide.style.marginRight = `${gap}px`;
            });
            
            // Update track position
            const translateX = -currentPlayerSlide * (100 / slidesPerView);
            sliderPlayerTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            const indicators = document.querySelectorAll('.club-slider-player-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active');
                if (index === currentPlayerSlide) {
                    indicator.classList.add('active');
                }
            });
        }
        
        function nextPlayerSlide() {
            const slidesPerView = getSlidesPerView();
            const maxSlides = playerSlides.length - slidesPerView;
            
            if (currentPlayerSlide < maxSlides) {
                currentPlayerSlide++;
            } else {
                currentPlayerSlide = 0;
            }
            updatePlayerSlider();
        }
        
        function prevPlayerSlide() {
            const slidesPerView = getSlidesPerView();
            
            if (currentPlayerSlide > 0) {
                currentPlayerSlide--;
            } else {
                const maxSlides = playerSlides.length - slidesPerView;
                currentPlayerSlide = maxSlides;
            }
            updatePlayerSlider();
        }
        
        function goToPlayerSlide(index) {
            const slidesPerView = getSlidesPerView();
            const maxSlides = playerSlides.length - slidesPerView;
            
            if (index >= 0 && index <= maxSlides) {
                currentPlayerSlide = index;
                updatePlayerSlider();
            }
        }
        
        function resetPlayerInterval() {
            clearInterval(playerSlideInterval);
            startPlayerInterval();
        }
        
        function startPlayerInterval() {
            playerSlideInterval = setInterval(nextPlayerSlide, 4000);
        }
        
        // Initialize
        updatePlayerSlider();
        startPlayerInterval();
        
        // Event listeners
        if (sliderPlayerPrevBtn) {
            sliderPlayerPrevBtn.addEventListener('click', () => {
                prevPlayerSlide();
                resetPlayerInterval();
            });
        }
        
        if (sliderPlayerNextBtn) {
            sliderPlayerNextBtn.addEventListener('click', () => {
                nextPlayerSlide();
                resetPlayerInterval();
            });
        }
        
        // Window resize
        window.addEventListener('resize', updatePlayerSlider);
        
        // Pause on hover
        const playerSliderContainer = document.querySelector('.club-slider-player-container');
        if (playerSliderContainer) {
            playerSliderContainer.addEventListener('mouseenter', () => {
                clearInterval(playerSlideInterval);
            });
            
            playerSliderContainer.addEventListener('mouseleave', () => {
                startPlayerInterval();
            });
        }
    }
    
    // ==================== 4. DATE FLICKER CALENDAR ====================
    const dateFlickerCalendar = document.querySelector('.club-date-flicker-calendar');
    if (dateFlickerCalendar) {
        const prevMonthBtn = document.querySelector('.club-date-flicker-prev-month');
        const nextMonthBtn = document.querySelector('.club-date-flicker-next-month');
        const currentMonthEl = document.querySelector('.club-date-flicker-current-month');
        
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        // Match dates for demonstration
        const matchDates = [
            { date: 12, month: 5, year: 2023 },
            { date: 5, month: 5, year: 2023 },
            { date: 29, month: 4, year: 2023 },
            { date: 22, month: 4, year: 2023 },
            { date: 15, month: 4, year: 2023 },
            { date: 8, month: 4, year: 2023 },
            { date: 1, month: 4, year: 2023 }
        ];
        
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        function renderCalendar(month, year) {
            // Update month name
            currentMonthEl.textContent = `${monthNames[month]} ${year}`;
            
            // Clear calendar
            dateFlickerCalendar.innerHTML = '';
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.classList.add('club-date-flicker-day');
                dayEl.textContent = day;
                dateFlickerCalendar.appendChild(dayEl);
            });
            
            // Get first day of month
            const firstDay = new Date(year, month, 1).getDay();
            
            // Get days in month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Add empty cells for days before first day
            for (let i = 0; i < firstDay; i++) {
                const emptyEl = document.createElement('div');
                emptyEl.classList.add('club-date-flicker-date', 'empty');
                dateFlickerCalendar.appendChild(emptyEl);
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
                    dateEl.title = 'Match Day';
                }
                
                // Highlight today
                const today = new Date();
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dateEl.classList.add('today');
                }
                
                // Add click event
                dateEl.addEventListener('click', function() {
                    // Remove active class from all dates
                    document.querySelectorAll('.club-date-flicker-date').forEach(el => {
                        el.classList.remove('active');
                    });
                    
                    // Add active class to clicked date
                    this.classList.add('active');
                    
                    // Update selected date display
                    const selectedDateEl = document.querySelector('.club-date-flicker-selected-date');
                    if (selectedDateEl) {
                        selectedDateEl.textContent = `${monthNames[month]} ${day}, ${year}`;
                    }
                });
                
                dateFlickerCalendar.appendChild(dateEl);
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
    
    // ==================== 5. GALLERY TABS ====================
    const galleryTabs = document.querySelectorAll('.club-gallery-tab');
    const galleryContents = document.querySelectorAll('.club-gallery-content');
    
    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                galleryTabs.forEach(t => t.classList.remove('active'));
                galleryContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const content = document.querySelector(`.club-gallery-${tabId}`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
    
    // ==================== 6. VIDEO PLAY FUNCTIONALITY ====================
    const videoPlayButtons = document.querySelectorAll('.club-video-play, .club-best-shot-play, .club-draft-catch-play, .club-best-bowling-play');
    
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.club-video-item, .club-best-shot-card, .club-draft-catch-card, .club-best-bowling-card');
            const title = card.querySelector('h3')?.textContent || 'Video';
            
            // Create video modal
            const modal = document.createElement('div');
            modal.className = 'club-video-modal';
            modal.innerHTML = `
                <div class="club-video-modal-content">
                    <button class="club-video-modal-close">&times;</button>
                    <h3>${title}</h3>
                    <div class="club-video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Video player would appear here</p>
                        <p>In a real implementation, this would embed a YouTube/Vimeo player</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal on close button click
            const closeBtn = modal.querySelector('.club-video-modal-close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close modal on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Add styles for modal
            const style = document.createElement('style');
            style.textContent = `
                .club-video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }
                
                .club-video-modal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    max-width: 800px;
                    width: 90%;
                    position: relative;
                }
                
                .club-video-modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                }
                
                .club-video-placeholder {
                    background: #f5f5f5;
                    padding: 60px;
                    text-align: center;
                    border-radius: 8px;
                    margin-top: 20px;
                }
                
                .club-video-placeholder i {
                    font-size: 48px;
                    color: #1a365d;
                    margin-bottom: 15px;
                }
            `;
            document.head.appendChild(style);
        });
    });
    
    // ==================== 7. TESTIMONIALS SLIDER (About Page) ====================
    const testimonials = document.querySelectorAll('.club-testimonial-card');
    const testimonialIndicators = document.querySelectorAll('.club-testimonial-indicator');
    const prevTestimonialBtn = document.querySelector('.club-testimonial-prev');
    const nextTestimonialBtn = document.querySelector('.club-testimonial-next');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        let testimonialInterval;
        
        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('club-testimonial-active'));
            testimonialIndicators.forEach(i => i.classList.remove('club-testimonial-active'));
            
            testimonials[index].classList.add('club-testimonial-active');
            testimonialIndicators[index].classList.add('club-testimonial-active');
            currentTestimonial = index;
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Initialize
        showTestimonial(0);
        
        // Start auto slide
        testimonialInterval = setInterval(nextTestimonial, 5000);
        
        // Add event listeners
        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener('click', () => {
                nextTestimonial();
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }
        
        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', () => {
                prevTestimonial();
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }
        
        // Click on indicators
        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showTestimonial(index);
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        });
        
        // Pause on hover
        const testimonialsContainer = document.querySelector('.club-testimonials-slider');
        if (testimonialsContainer) {
            testimonialsContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialsContainer.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }
    }
    
    // ==================== 8. BACK TO TOP BUTTON ====================
    const backToTopBtn = document.querySelector('.club-back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== 9. THEME TOGGLE ====================
    const themeToggleBtn = document.querySelector('.club-theme-toggle');
    
    if (themeToggleBtn) {
        // Check for saved theme
        const savedTheme = localStorage.getItem('kingdom-cricket-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-theme');
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
        
        // Toggle theme on click
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            const icon = themeToggleBtn.querySelector('i');
            
            // Update icon
            if (icon) {
                if (isDark) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
            
            // Save preference
            localStorage.setItem('kingdom-cricket-theme', isDark ? 'dark' : 'light');
        });
    }
    
    // ==================== 10. SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate offset (accounting for fixed header)
                const headerHeight = document.querySelector('.club-main-nav')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, href);
            }
        });
    });
    
    // ==================== 11. ACTIVE NAV LINK ====================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPage = link.getAttribute('href');
            
            // Check if this is the current page
            if ((currentPage === 'index.html' && linkPage === 'index.html') ||
                (currentPage === linkPage) ||
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active nav on page load
    setActiveNavLink();
    
    // ==================== 12. SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.club-player-view-card, .club-performance-option-card, ' +
            '.club-recent-match-card, .club-coach-card, ' +
            '.club-facility-card, .club-trophy-card'
        );
        
        function checkAnimation() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Set initial state
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Check on load and scroll
        window.addEventListener('load', checkAnimation);
        window.addEventListener('scroll', checkAnimation);
    }
    
    initScrollAnimations();
    
    // ==================== 13. FORM VALIDATION (Contact Page) ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = this.querySelector('[name="name"]')?.value.trim();
            const email = this.querySelector('[name="email"]')?.value.trim();
            const phone = this.querySelector('[name="phone"]')?.value.trim();
            const message = this.querySelector('[name="message"]')?.value.trim();
            
            // Basic validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!phone || !/^[\d\s\-\+\(\)]{10,}$/.test(phone)) {
                isValid = false;
                errorMessage += 'Please enter a valid phone number.\n';
            }
            
            if (!message || message.length < 10) {
                isValid = false;
                errorMessage += 'Please enter a message with at least 10 characters.\n';
            }
            
            if (isValid) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please correct the following errors:\n' + errorMessage);
            }
        });
    }
    
    // ==================== 14. IMAGE ERROR HANDLING ====================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-family="Arial" font-size="10" fill="%23999">No Image</text></svg>';
        });
    });
    
    // ==================== 15. PAGE LOAD ANIMATION ====================
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // Add CSS for page load animation
        const style = document.createElement('style');
        style.textContent = `
            .page-loaded .club-hero-section {
                animation: fadeIn 1s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    });
    
    console.log('All JavaScript functionality initialized');
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename + ':' + e.lineno);
});

// Resize observer for responsive adjustments
if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(entries => {
        // Re-initialize sliders on resize
        const playerSliderTrack = document.querySelector('.club-slider-player-track');
        if (playerSliderTrack) {
            // Trigger custom event for slider resize
            window.dispatchEvent(new Event('sliderResize'));
        }
    });
    
    resizeObserver.observe(document.body);
}
  // Mobile menu toggle
        const hamburger = document.querySelector('.club-nav-hamburger');
        const navMenu = document.querySelector('.club-nav-list');
        
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Generate random CAPTCHA code
        function generateCaptcha() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let captcha = '';
            for (let i = 0; i < 5; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return captcha;
        }

        // Initialize CAPTCHA
        let currentCaptcha = generateCaptcha();
        document.getElementById('captchaCode').textContent = currentCaptcha;

        // Refresh CAPTCHA
        document.getElementById('refreshCaptcha').addEventListener('click', function() {
            currentCaptcha = generateCaptcha();
            document.getElementById('captchaCode').textContent = currentCaptcha;
            document.getElementById('captchaInput').value = '';
            document.getElementById('captchaError').classList.remove('show');
        });

        // Form validation
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function hideError(elementId) {
            document.getElementById(elementId).classList.remove('show');
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.classList.remove('show'));
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const captchaInput = document.getElementById('captchaInput').value.trim().toUpperCase();
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                showError('nameError', 'Please enter your full name');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                showError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (!subject) {
                showError('subjectError', 'Please enter a subject');
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                showError('messageError', 'Please enter your message');
                isValid = false;
            } else if (message.length < 20) {
                showError('messageError', 'Message must be at least 20 characters');
                isValid = false;
            }
            
            // Validate CAPTCHA
            if (!captchaInput) {
                showError('captchaError', 'Please enter the CAPTCHA code');
                isValid = false;
            } else if (captchaInput !== currentCaptcha) {
                showError('captchaError', 'Incorrect CAPTCHA code. Please try again');
                isValid = false;
                
                // Generate new CAPTCHA on wrong attempt
                currentCaptcha = generateCaptcha();
                document.getElementById('captchaCode').textContent = currentCaptcha;
                document.getElementById('captchaInput').value = '';
            }
            
            // If valid, submit form
            if (isValid) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    successMessage.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Generate new CAPTCHA
                    currentCaptcha = generateCaptcha();
                    document.getElementById('captchaCode').textContent = currentCaptcha;
                    
                    // Reset button
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    }, 2000);
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }, 1500);
            }
        });

        // Real-time validation
        const inputs = document.querySelectorAll('.form-control, .captcha-input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                if (errorId && document.getElementById(errorId)) {
                    hideError(errorId);
                }
            });
        });

        // CAPTCHA real-time validation
        document.getElementById('captchaInput').addEventListener('input', function() {
            hideError('captchaError');
        });