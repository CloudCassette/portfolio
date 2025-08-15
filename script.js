// Smooth scrolling and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Check if device supports hover (not a touch device)
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    // Initialize animations and interactions
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarEffects();
    initParallaxEffects();
    initTypewriterEffect();
    
    // Only init hover effects on non-touch devices
    if (supportsHover) {
        initFloatingCards();
        initProgressBars();
    }
    
    // Add touch device class for CSS targeting
    if (!supportsHover) {
        document.body.classList.add('touch-device');
    }
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Scroll-triggered animations
function initScrollAnimations() {
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
    
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .education-card, .training-provider, .volunteer-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Navbar effects on scroll
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background blur based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active section in navigation
        updateActiveSection();
    });
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroSection && floatingCards.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
            
            floatingCards.forEach((card, index) => {
                const cardRate = scrolled * (-0.3 - index * 0.1);
                card.style.transform = `translateY(${cardRate}px)`;
            });
        });
    }
}

// Typewriter effect for hero title
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typewriterSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typewriterSpeed);
        } else {
            // Add blinking cursor effect
            heroTitle.innerHTML += '<span class="cursor">|</span>';
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.animation = 'blink 1s infinite';
            }, 500);
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Enhanced floating cards animation
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random rotation and scale on hover
        card.addEventListener('mouseenter', function() {
            const randomRotation = (Math.random() - 0.5) * 10;
            this.style.transform += ` rotate(${randomRotation}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/rotate\([^)]*\)/g, '');
        });
        
        // Add subtle random movement
        setInterval(() => {
            if (!card.matches(':hover')) {
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                card.style.transform += ` translate(${randomX}px, ${randomY}px)`;
                
                setTimeout(() => {
                    card.style.transform = card.style.transform.replace(/translate\([^)]*\)/g, '');
                }, 2000);
            }
        }, 5000 + index * 1000);
    });
}

// Progress bars for skills (optional enhancement)
function initProgressBars() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add subtle highlight effect
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.borderRadius = '8px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
}

// Add CSS for additional animations
const additionalStyles = `
    .cursor {
        animation: blink 1s infinite;
        font-weight: 300;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow-lg);
    }
    
    .nav-link.active {
        color: #667eea;
        font-weight: 600;
    }
    
    .timeline-item.visible {
        animation: slideInFromSide 0.8s ease-out forwards;
    }
    
    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .skill-category.visible,
    .education-card.visible,
    .training-provider.visible {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .volunteer-card.visible {
        animation: zoomIn 0.8s ease-out forwards;
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Loading states */
    .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
    
    /* Enhanced button effects */
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: left 0.5s;
    }
    
    .btn:hover::before {
        left: 100%;
    }
    
    /* Scroll progress indicator */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-gradient);
        z-index: 1001;
        transition: width 0.3s ease;
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add intersection observer for better performance
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Add console welcome message
console.log(`
🎨 Welcome to Jordan Duttinger's Resume Site! 
🚀 Built with modern web technologies and creative design
💻 DevOps Engineer passionate about cloud infrastructure
🎵 Volunteer with Orlando Girls Rock Camp

Feel free to explore the code and reach out!
`);

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Add rainbow animation to the entire page
        document.body.style.animation = 'rainbow 3s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
            konamiCode = [];
        }, 3000);
    }
});

// Add rainbow animation CSS
const rainbowStyles = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;

const rainbowStyleSheet = document.createElement('style');
rainbowStyleSheet.textContent = rainbowStyles;
document.head.appendChild(rainbowStyleSheet);
