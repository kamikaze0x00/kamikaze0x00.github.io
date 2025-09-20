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
});
