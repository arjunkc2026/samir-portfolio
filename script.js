// ================================
// CYBERPUNK PORTFOLIO - JAVASCRIPT
// ================================

// ================================
// PRELOADER
// ================================

document.body.classList.add('no-scroll');

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.classList.remove('no-scroll');
            setTimeout(() => preloader.remove(), 600);
        }
    }, 2000);
});

// ================================
// CURSOR TRAIL EFFECT
// ================================

const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const maxParticles = 50;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(191, 0, 255, ';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;
    }

    draw() {
        ctx.fillStyle = this.color + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('mousemove', (e) => {
    if (particles.length < maxParticles) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ================================
// SCROLL PROGRESS BAR
// ================================

const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = (window.pageYOffset / documentHeight) * 100;
    
    scrollProgressBar.style.width = scrolled + '%';
});

// ================================
// NAVIGATION
// ================================

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
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
    
    navLinkItems.forEach(link => {
        link.style.color = 'var(--text-secondary)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--neon-cyan)';
        }
    });
});

// ================================
// COUNTER ANIMATION
// ================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
}

// ================================
// INTERSECTION OBSERVER
// ================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
            
            // Add fade-in animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-number').forEach(stat => {
    stat.style.opacity = '0';
    observer.observe(stat);
});

document.querySelectorAll('.skill-progress').forEach(skill => {
    observer.observe(skill);
});

document.querySelectorAll('.project-card, .info-card, .skill-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ================================
// TYPING EFFECT
// ================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing animations when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTerminalLoop();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Terminal typing loop
function startTerminalLoop() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    function runTypingSequence() {
        // Clear all typing elements first
        typingElements.forEach(el => el.textContent = '');
        
        // First command: whoami
        setTimeout(() => {
            typeWriter(typingElements[0], 'who_am_i', 100);
        }, 500);
        
        // Second command: skills --list
        setTimeout(() => {
            typeWriter(typingElements[1], 'skills --list', 100);
        }, 2000);
        
        // Third command: click to visit
        setTimeout(() => {
            typeWriter(typingElements[2], 'click to visit →', 100);
        }, 3500);
        
        // Wait 5 seconds after completing, then restart the loop
        setTimeout(() => {
            runTypingSequence();
        }, 8000); // Total: 3.5s (last typing starts) + 1.5s (typing duration) + 3s (pause) = 8s
    }
    
    runTypingSequence();
}

const hero = document.querySelector('.hero');
if (hero) {
    heroObserver.observe(hero);
}

// ================================
// SMOOTH SCROLL
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
// GLITCH TEXT EFFECT
// ================================

function glitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            let iterations = 0;
            const text = element.getAttribute('data-text');
            const maxIterations = 10;
            
            const interval = setInterval(() => {
                element.textContent = text
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    })
                    .join('');
                
                if (iterations >= text.length) {
                    clearInterval(interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });
}

glitchEffect();

// ================================
// PARALLAX EFFECT
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero circles
    const circles = document.querySelectorAll('.hero-circle');
    circles.forEach((circle, index) => {
        const speed = 0.2 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for hologram
    const hologram = document.querySelector('.hologram');
    if (hologram) {
        hologram.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${scrolled * 0.05}deg)`;
    }
});

// ================================
// PROJECT CARDS INTERACTION
// ================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // 3D tilt effect
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('.btn-text').textContent;
        submitButton.querySelector('.btn-text').textContent = 'SENDING...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with your actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            formMessage.textContent = 'MESSAGE SENT SUCCESSFULLY! I\'LL GET BACK TO YOU SOON.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } catch (error) {
            // Error
            formMessage.textContent = 'OOPS! SOMETHING WENT WRONG. PLEASE TRY AGAIN.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button
            submitButton.querySelector('.btn-text').textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Lazy load images
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

// ================================
// REDUCE MOTION FOR ACCESSIBILITY
// ================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ================================
// CONSOLE EASTER EGG
// ================================

console.log('%c👾 WELCOME TO THE MATRIX 👾', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? 🔍', 'color: #ff006e; font-size: 14px;');
console.log('%cLet\'s build something amazing together!', 'color: #bf00ff; font-size: 12px;');
console.log('%cContact: samirxyz@gmail.com', 'color: #00f0ff; font-size: 12px;');

// ================================
// KEYBOARD SHORTCUTS
// ================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search or contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('name')?.focus();
            }, 500);
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ================================
// INITIALIZE ON LOAD
// ================================

window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger any initial animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }
    
    console.log('%c✨ Portfolio Loaded Successfully', 'color: #00f0ff; font-size: 12px;');
});

// ================================
// PAGE VISIBILITY API
// ================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        canvas.style.display = 'none';
    } else {
        // Resume animations when tab becomes visible
        canvas.style.display = 'block';
    }
});
