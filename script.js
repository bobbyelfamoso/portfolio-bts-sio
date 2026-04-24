// Fixed script with correct selectors
document.addEventListener('DOMContentLoaded', function () {
    console.log('%c SYSTEM INITIALIZING... ', 'background: #000; color: #0f0; font-size: 20px; font-family: monospace;');

    // Typewriter removed by user request


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
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Force visibility class just in case intersection observer misses it
                setTimeout(() => {
                    target.classList.add('visible');
                }, 500);
            }
        });
    });

    console.log('%c SYSTEM READY ', 'background: #0f0; color: #000; font-size: 16px;');
});

// Particles
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
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

// Language switcher with translation support
const translations = {
    'fr': {
        'nav-blocs': '▸ BLOCS DE COMPÉTENCES',
        'nav-alternance': '▸ ALTERNANCE',
        'nav-projets': '▸ PROJETS & LABS',
        'nav-doc': '▸ DOCUMENTATION',
        'nav-contact': '▸ CONTACT',
        'title-blocs': 'BLOCS_COMPETENCES_SIO.EXE',
        'subtitle-blocs': '★ TRAVAUX ACADÉMIQUES & PROJETS ★',
        'title-alternance': 'APPRENTICESHIP_WORK.LOG',
        'subtitle-alternance': '★ MISSIONS EN ENTREPRISE ★',
        'title-projets': 'SIDE_PROJECTS_&_LABS.EXE',
        'subtitle-projets': '★ HACKING, HARDWARE & PENTEST ★',
        'title-doc': 'DOCUMENTATION_GLPI.LOG <span class="comp-badge">[C1, C4]</span>',
        'title-doc-glpi': 'DOCUMENTATION_GLPI.LOG <span class="comp-badge">[C1, C4]</span>',
        'title-doc-c7': 'SUPPORT_TICKETING.LOG <span class="comp-badge">[C7]</span>',
        'title-doc-c11': 'VISIBILITY_SEO.LOG <span class="comp-badge">[C11]</span>',
        'title-doc-c14': 'PROJECT_PLANNING.LOG <span class="comp-badge">[C14]</span>',
        'title-doc-c17': 'SERVICE_DEPLOYMENT.LOG <span class="comp-badge">[C17]</span>',
        'title-doc-e4': 'TABLEAU_SYNTHESE_E4.SYS',
        'subtitle-doc': '★ SUPPORT INFORMATIQUE & INVENTAIRE ★',
        // Blocs Cards
        'b1-title': 'Gérer le patrimoine informatique <span class="comp-badge">[C1, C4, C5]</span>',
        'b1-item1': '▸ Installation serveur GLPI et agents (C1, C4)',
        'b1-item2': '▸ Réalisation de snapshots de VM (C5)',
        'b2-title': 'Répondre aux incidents <span class="comp-badge">[C2]</span>',
        'b2-item1': '▸ Support utilisateur niveau 1/2 (Scolaire)',
        'b2-item2': '▸ Analyse de trafic réseau & Surveillance passive (Wireshark) (C2)',
        'b3-title': 'Développer la présence en ligne <span class="comp-badge">[C3, C10, C11, C17]</span>',
        'b3-item1': '▸ Déploiement GLPI sur Microsoft Azure (C17)',
        'b3-item2': '▸ Pentest Web : Fuzzing & Exploitation de vulnérabilités (Stage)',
        'b3-item3': '▸ Promotion via Instagram @workfishofficial (C10)',
        'b3-item4': "▸ Analyse d'audience via Google Analytics (C11)",
        'b3-item5': '▸ Design UX/UI Landing Page (C3)',
        'b4-title': 'Travailler en mode projet <span class="comp-badge">[C15, C16]</span>',
        'b4-item1': '▸ Rédiger le cahier des charges (C16)',
        'b4-item2': '▸ Gestion du dépôt GitHub & Agile (C15)',
        'b4-item3': '▸ Fine-tuning de modèles IA (C16)',
        'b5-title': 'Mettre à disposition un service <span class="comp-badge">[C12, C13, C14, C17]</span>',
        'b5-item1': '▸ Déploiement PHP/SQL sur Netify (C17)',
        'b5-item2': "▸ Développement d'API & User Flow (C12, C13)",
        'b5-item3': '▸ Dashboard de statistiques (C14)',
        'b6-title': 'Développement professionnel <span class="comp-badge">[C18]</span>',
        'b6-item1': "▸ Présentation orale d'architecture (C18)",
        'b6-item2': '▸ Veille technologique & Certifications',
        // Apprenticeship
        'alt-item1': '▸ Gestion des onboarding / offboarding sur Azure et Intra',
        'alt-item2': '▸ Préparation user guide KeePass / Outil GRC',
        'alt-item3': '▸ Dépannage et remplacement matériel défectueux',
        'alt-item4': '▸ Alerting incidents credentials (CTI Darkweb) & conformité',
        'alt-item5': '▸ Animation webinar awareness Cyber',
        'alt-item6': '▸ Organisation contrôles certification ISO27001',
        // Projects
        'cat-pentest': 'STAGE PENTEST (02/2025 - 03/2025)',
        'pent-item1': '▸ Pentest Web : Fuzzing & Exploitation de vulnérabilités',
        'pent-item2': '▸ Burp Suite : Analyse de requêtes HTTP/S',
        'pent-item3': '▸ Reconnaissance : OSINT & Énumération (Nmap)',
        'pent-item4': '▸ Analyse Réseau : Wireshark & Responder',
        'pent-item5': "▸ Rédaction de livrables d'audit technique",
        'cat-ctf': 'CHALLENGES & CTF',
        'ctf-item1': '▸ Promotion des métiers de la Cyber pour les femmes',
        'cat-hardware': 'HARDWARE & ELECTRONIQUE',
        'hard-item1': '▸ Projets Arduino : Contrôle LED & Servo-moteurs',
        'hard-item2': "▸ Initiation à l'électronique de loisir"
    },
    'en': {
        'nav-blocs': '▸ COMPETENCY BLOCKS',
        'nav-alternance': '▸ APPRENTICESHIP',
        'nav-projets': '▸ PROJECTS & LABS',
        'nav-doc': '▸ DOCUMENTATION',
        'nav-contact': '▸ CONTACT',
        'title-blocs': 'COMPETENCY_BLOCKS_SIO.EXE',
        'subtitle-blocs': '★ ACADEMIC WORKS & PROJECTS ★',
        'title-alternance': 'APPRENTICESHIP_MISSIONS.LOG',
        'subtitle-alternance': '★ CORPORATE MISSIONS ★',
        'title-projets': 'SIDE_PROJECTS_&_LABS.EXE',
        'subtitle-projets': '★ HACKING, HARDWARE & PENTEST ★',
        'title-doc': 'GLPI_DOCUMENTATION.LOG <span class="comp-badge">[C1, C4]</span>',
        'title-doc-glpi': 'GLPI_DOCUMENTATION.LOG <span class="comp-badge">[C1, C4]</span>',
        'title-doc-c7': 'SUPPORT_TICKETING.LOG <span class="comp-badge">[C7]</span>',
        'title-doc-c11': 'VISIBILITY_SEO.LOG <span class="comp-badge">[C11]</span>',
        'title-doc-c14': 'PROJECT_PLANNING.LOG <span class="comp-badge">[C14]</span>',
        'title-doc-c17': 'SERVICE_DEPLOYMENT.LOG <span class="comp-badge">[C17]</span>',
        'title-doc-e4': 'E4_SYNTHESIS_TABLE.SYS',
        'subtitle-doc': '★ IT SUPPORT & INVENTORY ★',
        // Blocs Cards
        'b1-title': 'Manage IT Estate <span class="comp-badge">[C1, C4, C5]</span>',
        'b1-item1': '▸ GLPI Server & Agent installation (C1, C4)',
        'b1-item2': '▸ VM Snapshots & Backup (C5)',
        'b2-title': 'Respond to incidents <span class="comp-badge">[C2]</span>',
        'b2-item1': '▸ Level 1/2 User Support (Academic)',
        'b2-item2': '▸ Network traffic analysis (Wireshark) (C2)',
        'b3-title': 'Develop Online Presence <span class="comp-badge">[C3, C10, C11, C17]</span>',
        'b3-item1': '▸ GLPI deployment on Microsoft Azure (C17)',
        'b3-item2': '▸ Web Pentest: Fuzzing & Vulnerability Exploitation (Internship)',
        'b3-item3': '▸ Instagram promotion @workfishofficial (C10)',
        'b3-item4': '▸ Audience analysis via Google Analytics (C11)',
        'b3-item5': '▸ UX/UI Landing Page Design (C3)',
        'b4-title': 'Work in Project Mode <span class="comp-badge">[C15, C16]</span>',
        'b4-item1': '▸ Requirements specification (C16)',
        'b4-item2': '▸ GitHub repository management & Agile (C15)',
        'b4-item3': '▸ AI model fine-tuning (C16)',
        'b5-title': 'Provide an IT Service <span class="comp-badge">[C12, C13, C14, C17]</span>',
        'b5-item1': '▸ PHP/SQL deployment on Netify (C17)',
        'b5-item2': '▸ API Development & User Flow (C12, C13)',
        'b5-item3': '▸ Statistics Dashboard (C14)',
        'b6-title': 'Professional Development <span class="comp-badge">[C18]</span>',
        'b6-item1': '▸ Architectural oral presentation (C18)',
        'b6-item2': '▸ Continuous Training & Certifications',
        // Apprenticeship
        'alt-item1': '▸ Onboarding / offboarding management on Azure and Intra',
        'alt-item2': '▸ KeePass / GRC Tool user guide preparation',
        'alt-item3': '▸ Faulty hardware troubleshooting and replacement',
        'alt-item4': '▸ Credentials incident alerting (CTI Darkweb) & compliance',
        'alt-item5': '▸ Cyber awareness webinar hosting',
        'alt-item6': '▸ ISO27001 certification controls organization',
        // Projects
        'cat-pentest': 'PENTEST INTERNSHIP (02/2025 - 03/2025)',
        'pent-item1': '▸ Web Pentest: Fuzzing & Vulnerability Exploitation',
        'pent-item2': '▸ Burp Suite: HTTP/S request analysis',
        'pent-item3': '▸ Reconnaissance: OSINT & Enumeration (Nmap)',
        'pent-item4': '▸ Network Analysis: Wireshark & Responder',
        'pent-item5': "▸ Writing technical audit deliverables",
        'cat-ctf': 'CHALLENGES & CTF',
        'ctf-item1': '▸ Promotion of Cyber careers for women',
        'cat-hardware': 'HARDWARE & ELECTRONICS',
        'hard-item1': '▸ Arduino Projects: LED & Servo-motor control',
        'hard-item2': "▸ Introduction to hobby electronics"
    }
};

function switchLanguage(lang) {
    console.log('Switching to:', lang);

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update text content for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Save preference
    localStorage.setItem('preferred-lang', lang);
}

// Global function to switch between documents in the Documentation section
function showDoc(docId) {
    // Hide all doc items
    document.querySelectorAll('.doc-item').forEach(doc => {
        doc.classList.remove('active');
    });

    // Remove active class from all nav buttons
    document.querySelectorAll('.doc-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected doc
    const targetDoc = document.getElementById(`doc-${docId}`);
    if (targetDoc) {
        targetDoc.classList.add('active');
    }

    // Set active class on the corresponding button
    const activeBtn = Array.from(document.querySelectorAll('.doc-nav-btn')).find(btn => 
        btn.getAttribute('onclick').includes(`'${docId}'`)
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Update the documentation section title
    const titleEl = document.getElementById('doc-active-title');
    if (titleEl) {
        // Find current language
        const lang = localStorage.getItem('preferred-lang') || 'fr';
        const titleKey = `title-doc-${docId}`;
        if (translations[lang] && translations[lang][titleKey]) {
            titleEl.innerHTML = translations[lang][titleKey];
            titleEl.setAttribute('data-i18n', titleKey);
        }
    }
}
window.switchLanguage = switchLanguage;

// Check for preferred language on load - FORCE SYNC
document.addEventListener('DOMContentLoaded', () => {
    // If it's the first time or 'fr', ensure UI matches
    const savedLang = localStorage.getItem('preferred-lang') || 'fr';
    switchLanguage(savedLang);
});
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