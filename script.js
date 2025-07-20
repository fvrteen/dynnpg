// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const fadeElements = document.querySelectorAll('.fade-in');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonials carousel
let currentSlide = 0;
const totalSlides = testimonialCards.length;

function showSlide(index) {
    // Hide all slides
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance testimonials every 5 seconds
// setInterval(nextSlide, 5000);

// Manual dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Carousel arrow navigation
carouselPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

carouselNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

// Scroll animations
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

// Observe all fade-in elements
fadeElements.forEach(element => {
    observer.observe(element);
});

// Add fade-in class to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .feature-item, .value-item');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// CTA button functionality
const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Scroll to contact section or open contact modal
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback: scroll to footer
            document.querySelector('.footer').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero) {
        const rate = scrolled * -0.5;
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    }
});

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature item hover effects
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Value item hover effects
const valueItems = document.querySelectorAll('.value-item');
valueItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 300));
    });
});

// Smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Add CSS for revealed sections
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
    
    body.loaded .hero-title,
    body.loaded .hero-subtitle,
    body.loaded .cta-button {
        transition: all 0.8s ease-out;
    }
    
    .nav-link.active {
        color: var(--secondary-blue) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
    revealSections();
}, 16)); // ~60fps

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Show first testimonial
    showSlide(0);
    
    // Initialize scroll animations
    revealSections();
    
    // Add loading class to body
    document.body.classList.add('loaded');
    
    console.log('Recruit Partner landing page loaded successfully!');
}); 