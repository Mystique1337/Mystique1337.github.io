// ===================================
// MODERN PORTFOLIO - INTERACTIVE FEATURES
// ===================================

(function() {
    'use strict';

    // ===================================
    // 1. INITIALIZATION
    // ===================================
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
        initThemeToggle();
        initTypingEffect();
        initPersonaFilters();
        
        // Delay scroll animations slightly to ensure DOM is fully rendered
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
        
        initCounters();
        initContactForm();
        initBackToTop();
        initSmoothScroll();
    });

    // ===================================
    // 2. NAVIGATION
    // ===================================
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Active link highlighting
        const sections = document.querySelectorAll('.section, .hero');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px 0px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ===================================
    // 3. THEME TOGGLE
    // ===================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'light';

        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // ===================================
    // 4. TYPING EFFECT
    // ===================================
    function initTypingEffect() {
        const typedElement = document.querySelector('.typed-text');
        if (!typedElement) return;

        const texts = [
            'ML Engineer',
            'Chemical Engineer',
            'AI Researcher',
            'Data Scientist',
            'Problem Solver'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // ===================================
    // 5. PERSONA FILTERS
    // ===================================
    function initPersonaFilters() {
        const chips = document.querySelectorAll('.persona-chip');
        const filterableItems = document.querySelectorAll('[data-personas]');

        // Make sure all items are visible initially
        filterableItems.forEach(item => {
            item.style.display = '';
        });

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const persona = chip.dataset.persona;
                
                // Update active chip
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // Filter items
                filterableItems.forEach(item => {
                    const personas = item.dataset.personas.split(',').map(p => p.trim());
                    
                    if (persona === 'all' || personas.includes(persona)) {
                        item.style.display = '';
                        item.classList.add('fade-in');
                        setTimeout(() => item.classList.remove('fade-in'), 500);
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update URL
                const url = new URL(window.location);
                if (persona === 'all') {
                    url.searchParams.delete('persona');
                } else {
                    url.searchParams.set('persona', persona);
                }
                window.history.pushState({}, '', url);
            });
        });

        // Check URL for initial filter
        const urlParams = new URLSearchParams(window.location.search);
        const urlPersona = urlParams.get('persona');
        
        if (urlPersona) {
            const chip = document.querySelector(`[data-persona="${urlPersona}"]`);
            if (chip) chip.click();
        } else {
            // Ensure all items are visible on page load
            filterableItems.forEach(item => {
                item.style.display = '';
            });
        }
    }

    // ===================================
    // 6. SCROLL ANIMATIONS
    // ===================================
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.experience-card, .project-card, .skill-category, .highlight-card, .education-card, .leadership-card');
        
        const observerOptions = {
            threshold: 0.01,
            rootMargin: '50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('slide-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Check if element is already in viewport
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInViewport) {
                // Make immediately visible if already in viewport
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            } else {
                // Otherwise observe for scroll
                observer.observe(el);
            }
        });
    }

    // ===================================
    // 7. ANIMATED COUNTERS
    // ===================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    counters.forEach(counter => animateCounter(counter));
                }
            });
        }, observerOptions);

        if (counters.length > 0) {
            observer.observe(counters[0].parentElement.parentElement);
        }

        function animateCounter(counter) {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        }
    }

    // ===================================
    // 8. CONTACT FORM
    // ===================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                showFormStatus('error', 'Oops! Something went wrong. Please try again or email me directly.');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });

        function showFormStatus(type, message) {
            formStatus.className = `form-status ${type}`;
            formStatus.textContent = message;
            formStatus.style.display = 'block';

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // ===================================
    // 9. BACK TO TOP BUTTON
    // ===================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // 10. SMOOTH SCROLL
    // ===================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // 11. LAZY LOADING IMAGES
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // 12. KEYBOARD ACCESSIBILITY
    // ===================================
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const mobileToggle = document.getElementById('mobileToggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ===================================
    // 13. PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    const optimizedScroll = throttle(() => {
        // Handle scroll events
    }, 100);

    window.addEventListener('scroll', optimizedScroll);

    // ===================================
    // 14. PRELOAD CRITICAL RESOURCES
    // ===================================
    function preloadResources() {
        const criticalImages = [
            'assets/img/about/ashinze.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadResources();

})();
