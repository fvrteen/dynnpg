// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.nav-overlay');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        } else {
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Testimonials carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }

    // Initialize carousel
    if (dots.length > 0) {
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Arrow navigation
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Auto-advance carousel
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Smart contact button - Email for PC, WhatsApp for mobile
    const contactButton = document.getElementById('contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if device is mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // WhatsApp for mobile
                const message = encodeURIComponent('Hola! Me gustaría agendar una consulta con Recruit Partner para conocer más sobre sus servicios de reclutamiento.');
                const whatsappUrl = `https://wa.me/51989750136?text=${message}`;
                window.open(whatsappUrl, '_blank');
            } else {
                // Email for desktop
                window.open('https://mail.google.com/mail/?view=cm&fs=1&to=recruitceopartner@gmail.com&su=Consulta%20Recruit%20Partner', '_blank');
            }
        });
    }

    // Other CTA buttons scroll to contact
    const otherCtaButtons = document.querySelectorAll('.cta-button:not(#contact-button)');
    otherCtaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Navbar auto-hide on scroll (mobile) ---
    let lastScrollY = window.scrollY;
    let navbarHidden = false;
    function handleNavbarAutoHide() {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            navbar.style.top = '0';
            return;
        }
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            // Scrolling down
            if (!navbarHidden) {
                navbar.style.top = '-80px';
                navbarHidden = true;
            }
        } else {
            // Scrolling up
            if (navbarHidden || window.scrollY < 80) {
                navbar.style.top = '0';
                navbarHidden = false;
            }
        }
        lastScrollY = window.scrollY;
    }
    window.addEventListener('scroll', handleNavbarAutoHide);
    window.addEventListener('resize', handleNavbarAutoHide);
    // --- End Navbar auto-hide ---

    // --- Swipe gesture for testimonials carousel (mobile) ---
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.getElementById('testimonials-carousel');
    if (carousel && window.innerWidth <= 768) {
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });
        function handleSwipeGesture() {
            if (touchEndX < touchStartX - 40) {
                nextSlide();
            }
            if (touchEndX > touchStartX + 40) {
                prevSlide();
            }
        }
    }
    // --- End Swipe gesture ---

    // --- WhatsApp FAB visibility (visible on all devices) ---
    function toggleFabVisibility() {
        const fab = document.getElementById('fab-whatsapp');
        if (!fab) return;
        // Always show WhatsApp button on all devices
        fab.style.display = 'flex';
        fab.style.visibility = 'visible';
        fab.style.opacity = '1';
    }
    
    // Ensure button is visible on page load
    document.addEventListener('DOMContentLoaded', toggleFabVisibility);
    window.addEventListener('resize', toggleFabVisibility);
    toggleFabVisibility();
    // --- End FAB visibility ---
}); 