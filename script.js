// ================================
// MODERN PORTFOLIO - JAVASCRIPT
// ================================

// ================================
// NAVIGATION
// ================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll('.skill-card, .timeline-item, .portfolio-item, .stat-card');
animateElements.forEach(el => observer.observe(el));

// ================================
// BACK TO TOP BUTTON
// ================================

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form inputs
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (message.length < 10) {
        showMessage('Message must be at least 10 characters long', 'error');
        return;
    }
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    try {
        // Simulate form submission (replace with actual backend call)
        await simulateFormSubmission({
            name,
            email,
            subject,
            message
        });
        
        // Show success message
        showMessage('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log submission (for demo purposes)
        console.log('Form submitted successfully:', { name, email, subject, message });
        
    } catch (error) {
        showMessage('Oops! Something went wrong. Please try again later.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve(data);
            } else {
                reject(new Error('Submission failed'));
            }
        }, 1500);
    });
}

// Real-time validation for email field
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
});

// Clear error styling on focus
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--color-primary)';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
});

// Auto-resize textarea
const messageTextarea = document.getElementById('message');
messageTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// CURSOR EFFECTS (OPTIONAL)
// ================================

// Smoke trail cursor effect (desktop only)
if (window.innerWidth > 968) {
    const smokeTrail = [];
    const maxSmokeParticles = 20;
    const colors = [
        'rgba(0, 212, 255, 0.7)',   // Cyan
        'rgba(255, 107, 107, 0.7)', // Coral
        'rgba(255, 217, 61, 0.7)',  // Gold
    ];
    
    // Add CSS for smoke cursor
    const style = document.createElement('style');
    style.textContent = `
        .smoke-particle {
            position: fixed;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: smokeDisappear 1.2s ease-out forwards;
            filter: blur(8px);
        }
        
        @keyframes smokeDisappear {
            0% {
                opacity: 1;
                transform: scale(0.3) translateY(0);
            }
            50% {
                opacity: 0.6;
                transform: scale(1.5) translateY(-10px);
            }
            100% {
                opacity: 0;
                transform: scale(2.5) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    let lastX = 0, lastY = 0;
    let throttleTimer = null;
    
    document.addEventListener('mousemove', (e) => {
        // Throttle particle creation for better performance
        if (throttleTimer) return;
        
        throttleTimer = setTimeout(() => {
            throttleTimer = null;
        }, 25);
        
        // Only create particles if mouse has moved significantly
        const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
        
        if (distance > 3) {
            createSmokeParticle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    function createSmokeParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        // Random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size variation
        const size = 20 + Math.random() * 20;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random offset for more natural spread
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        
        particle.style.left = (x - size / 2 + offsetX) + 'px';
        particle.style.top = (y - size / 2 + offsetY) + 'px';
        particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        
        document.body.appendChild(particle);
        smokeTrail.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            const index = smokeTrail.indexOf(particle);
            if (index > -1) {
                smokeTrail.splice(index, 1);
            }
        }, 1200);
        
        // Limit number of particles
        if (smokeTrail.length > maxSmokeParticles) {
            const oldParticle = smokeTrail.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.remove();
            }
        }
    }
}

// ================================
// PARALLAX EFFECT FOR HERO
// ================================

const hero = document.querySelector('.hero');
const heroDecorations = document.querySelectorAll('.hero-decorations > *');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        heroDecorations.forEach((deco, index) => {
            const speed = parallaxSpeed * (index + 1);
            deco.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ================================
// TYPING ANIMATION FOR HERO
// ================================

const heroSubtitleAccent = document.querySelector('.hero-subtitle-accent');
if (heroSubtitleAccent) {
    const text = heroSubtitleAccent.textContent;
    heroSubtitleAccent.textContent = '';
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < text.length) {
            heroSubtitleAccent.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeText, 1500);
}

// ================================
// PORTFOLIO HOVER EFFECTS
// ================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const gradient = this.querySelector('.portfolio-gradient');
        if (gradient) {
            gradient.style.transform = 'scale(1.1) rotate(5deg)';
            gradient.style.transition = 'all 0.5s ease';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const gradient = this.querySelector('.portfolio-gradient');
        if (gradient) {
            gradient.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ================================
// STATS COUNTER ANIMATION
// ================================

const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const number = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[0-9]/g, '');
            
            let current = 0;
            const increment = number / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    target.textContent = number + suffix;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
            
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

// ================================
// TIMELINE ANIMATION
// ================================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ================================
// PREVENT MULTIPLE FORM SUBMISSIONS
// ================================

let isSubmitting = false;
contactForm.addEventListener('submit', (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    isSubmitting = true;
    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});

// ================================
// LOG INITIALIZATION
// ================================

console.log('%c🚀 Portfolio Initialized Successfully!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cDesigned and developed with ❤️', 'color: #ff6b6b; font-size: 12px;');

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Lazy load images (if you add actual images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events for better performance
function debounce(func, wait = 10) {
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);