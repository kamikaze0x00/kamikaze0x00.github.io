// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Terminal typing effect
    const terminalText = "ls -la writeups/";
    const typingElement = document.querySelector('.typing');
    let i = 0;
    
    function typeTerminalText() {
        if (i < terminalText.length) {
            typingElement.parentElement.textContent += terminalText.charAt(i);
            i++;
            setTimeout(typeTerminalText, 100);
        } else {
            setTimeout(() => {
                typingElement.parentElement.textContent = typingElement.parentElement.textContent.slice(0, -terminalText.length);
                i = 0;
                typeTerminalText();
            }, 2000);
        }
    }
    
    if (typingElement) {
        setTimeout(typeTerminalText, 1000);
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
    
    // Smooth scrolling for navigation links
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
                
                // Close mobile menu if open
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
            }
        });
    });
    
    // Glitch effect on hover for CTF cards
    const writeupCards = document.querySelectorAll('.writeup-card');
    
    writeupCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('glitch-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('glitch-effect');
        });
    });
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value && isValidEmail(emailInput.value)) {
                // Simulate successful subscription
                this.innerHTML = '<p class="success-message">Successfully subscribed! Thank you.</p>';
            } else {
                emailInput.style.borderColor = 'red';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Platform hover effect
    const platforms = document.querySelectorAll('.platform');
    
    platforms.forEach(platform => {
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add binary background effect to sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('binary-bg');
    });
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'red';
                isValid = false;
            } else {
                nameInput.style.borderColor = '';
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            } else {
                emailInput.style.borderColor = '';
            }
            
            if (!subjectInput.value.trim()) {
                subjectInput.style.borderColor = 'red';
                isValid = false;
            } else {
                subjectInput.style.borderColor = '';
            }
            
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'red';
                isValid = false;
            } else {
                messageInput.style.borderColor = '';
            }
            
            if (isValid) {
                // Simulate form submission
                contactForm.innerHTML = '<p class="success-message">Thank you for your message! I\'ll get back to you soon.</p>';
            }
        });
    }
    
    // Initialize matrix background if element exists
    const matrixBg = document.getElementById('matrix-bg');
    if (matrixBg) {
        initMatrixBackground();
    }
});

// Matrix background animation
function initMatrixBackground() {
    const matrixBg = document.getElementById('matrix-bg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    // Create columns
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.classList.add('matrix-column');
        column.style.left = (i * fontSize) + 'px';
        column.style.animationDelay = (Math.random() * 5) + 's';
        matrixBg.appendChild(column);
        
        // Create initial characters
        updateColumn(column, chars);
    }
}

function updateColumn(column, chars) {
    // Clear column
    column.innerHTML = '';
    
    // Calculate number of characters to show
    const charsCount = Math.floor(Math.random() * 10) + 5;
    
    // Create new characters
    for (let i = 0; i < charsCount; i++) {
        const char = document.createElement('span');
        char.classList.add('matrix-char');
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.animationDelay = (i * 0.1) + 's';
        char.style.opacity = (Math.random() * 0.5) + 0.5;
        column.appendChild(char);
    }
    
    // Schedule next update
    setTimeout(() => {
        updateColumn(column, chars);
    }, 100 + Math.random() * 200);
}

// Utility function to get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    
    return params;
}
