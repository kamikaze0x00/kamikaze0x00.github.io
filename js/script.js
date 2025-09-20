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
                    behavior: '
