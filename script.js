// Fixed script with correct selectors
document.addEventListener('DOMContentLoaded', function () {
    console.log('%c SYSTEM INITIALIZING... ', 'background: #000; color: #0f0; font-size: 20px; font-family: monospace;');

    // Typewriter
    const text = 'CYBERSECURITY | PENTESTER | CTF PLAYER | SPEAKER';
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        let i = 0;
        function type() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        setTimeout(type, 500);
    }

    // Scroll animations - FIXED selector
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const fadeInElements = entry.target.querySelectorAll('.fade-in-text');
                fadeInElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    sections.forEach(section => observer.observe(section));

    // Skill bars
    const skillBars = document.querySelectorAll('.progress-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                setTimeout(() => {
                    entry.target.style.width = progress + '%';
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => skillObserver.observe(bar));

    // Smooth scroll for nav
    document.querySelectorAll('.nav-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
            }
        });
    });

    console.log('%c SYSTEM READY ', 'background: #0f0; color: #000; font-size: 16px;');
});

// Particles
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;
            ctx.fillStyle = 'rgba(0, 255, 65, ' + p.opacity + ')';
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Language switcher (simple version)
function switchLanguage(lang) {
    console.log('Switching to:', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}
window.switchLanguage = switchLanguage;
// Konami Code Logic
const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
    'Enter' // Added Enter as requested
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    // Check if key matches current position in sequence
    // Handle both lowercase and uppercase for letters
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const targetKey = konamiCode[konamiIndex].length === 1 ? konamiCode[konamiIndex].toLowerCase() : konamiCode[konamiIndex];

    if (key === targetKey || (key === 'Enter' && targetKey === 'Enter')) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateKonami();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0; // Reset if mistake
    }

    // Allow closing with Escape
    if (e.key === 'Escape') {
        closeKonami();
    }
});

function activateKonami() {
    const popup = document.getElementById('konami-message');
    if (popup) {
        popup.classList.add('active');
        console.log('%c 🎮 SECRET UNLOCKED! 🎮 ', 'background: #ff00ff; color: #fff; font-size: 20px;');
    }
}

// Make globally available
window.closeKonami = function () {
    const popup = document.getElementById('konami-message');
    if (popup) popup.classList.remove('active');
};