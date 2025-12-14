/**
 * PORTFOLIO - MAIN JAVASCRIPT
 * Gestion des animations, scroll effects, et interactions
 */

// ===================================
// VARIABLES GLOBALES
// ===================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('.section, .hero');

// ===================================
// NAVIGATION - STICKY & SCROLL SPY
// ===================================
window.addEventListener('scroll', () => {
    // Sticky navbar avec effet de fond au scroll
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll spy - mise en évidence du lien actif
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// ===================================
// HAMBURGER MENU MOBILE
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// INTERSECTION OBSERVER - ANIMATIONS AU SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec animations
const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
);
animatedElements.forEach(el => observer.observe(el));

// ===================================
// SMOOTH SCROLL POUR LES LIENS D'ANCRE
// ===================================
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

// ===================================
// PARALLAX EFFECT - HERO SECTION
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
});

// ===================================
// FORMULAIRE DE CONTACT - VALIDATION
// ===================================
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Validation en temps réel
formInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
            validateField(input);
        }
    });
});

// Fonction de validation d'un champ
function validateField(field) {
    const formGroup = field.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Vérifier si le champ est vide
    if (field.value.trim() === '') {
        isValid = false;
        message = 'Ce champ est requis';
    }

    // Validation spécifique pour l'email
    if (field.type === 'email' && field.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Veuillez entrer un email valide';
        }
    }

    // Validation spécifique pour le message
    if (field.name === 'message' && field.value.trim() !== '') {
        if (field.value.trim().length < 10) {
            isValid = false;
            message = 'Le message doit contenir au moins 10 caractères';
        }
    }

    // Appliquer ou retirer la classe d'erreur
    if (isValid) {
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
    } else {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    }

    return isValid;
}

// Soumission du formulaire
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Valider tous les champs
    let formIsValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            formIsValid = false;
        }
    });

    if (formIsValid) {
        // Simuler l'envoi du formulaire
        const formStatus = document.querySelector('.form-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Désactiver le bouton pendant l'envoi
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        // Simuler un délai d'envoi
        setTimeout(() => {
            // Afficher le message de succès
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Message envoyé avec succès ! Je vous répondrai bientôt.';

            // Réinitialiser le formulaire
            contactForm.reset();

            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';

            // Masquer le message après 5 secondes
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 2000);
    }
});

// ===================================
// ANIMATION DES CARTES PROJET
// ===================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ===================================
// EFFET DE TYPING POUR LE TITRE HERO
// ===================================
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

// Appliquer l'effet au chargement de la page
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 80);
    }
});

// ===================================
// CURSOR CUSTOM EFFECT (OPTIONNEL)
// ===================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Animation du follower avec delay
function animateCursorFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursorFollower);
}
animateCursorFollower();

// Effet hover sur les éléments interactifs
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Ajouter les styles pour le curseur custom
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor,
    .cursor-follower {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    }

    .custom-cursor {
        background: white;
        transform: translate(-50%, -50%);
    }

    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        background: transparent;
        transform: translate(-50%, -50%);
    }

    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);

// ===================================
// PERFORMANCE - THROTTLE SCROLL EVENTS
// ===================================
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
    };
}

// Appliquer le throttle aux événements de scroll
const scrollHandler = throttle(() => {
    // Code optimisé pour le scroll
}, 100);

window.addEventListener('scroll', scrollHandler);

// ===================================
// DARK MODE TOGGLE (BONUS - OPTIONNEL)
// ===================================
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle glass-effect';
darkModeToggle.innerHTML = '🌙';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    display: none; /* Désactivé par défaut car déjà en dark mode */
`;
document.body.appendChild(darkModeToggle);

// ===================================
// CONSOLE SIGNATURE
// ===================================
console.log(
    '%c🚀 Portfolio créé avec passion 🚀',
    'color: #6366f1; font-size: 20px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cTech Stack: HTML5, CSS3, JavaScript, Three.js',
    'color: #8b5cf6; font-size: 14px; padding: 5px;'
);
