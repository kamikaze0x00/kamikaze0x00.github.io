// Matrix background animation
document.addEventListener('DOMContentLoaded', function() {
    const matrixBg = document.getElementById('matrix-bg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);
    
    function createMatrix() {
        for (let i = 0; i < columns; i++) {
            const char = document.createElement('div');
            char.classList.add('matrix-char');
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = (i * fontSize) + 'px';
            char.style.animationDuration = (Math.random() * 5 + 3) + 's';
            char.style.animationDelay = (Math.random() * 2) + 's';
            char.style.opacity = Math.random();
            matrixBg.appendChild(char);
            
            // Remove character after animation completes
            setTimeout(() => {
                if (char.parentNode === matrixBg) {
                    matrixBg.removeChild(char);
                }
            }, (parseFloat(char.style.animationDuration) + parseFloat(char.style.animationDelay || 0)) * 1000);
        }
        
        setTimeout(createMatrix, 100);
    }
    
    createMatrix();
});
