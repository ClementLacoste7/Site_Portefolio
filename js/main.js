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

// ===================================
// CONFIGURATION EMAILJS
// ===================================
// Initialiser EmailJS avec votre clé publique
// IMPORTANT: Remplacez 'YOUR_PUBLIC_KEY' par votre clé après inscription sur emailjs.com
(function(){
    // Pour l'instant, on utilise une configuration par défaut
    // Vous devrez créer un compte sur https://www.emailjs.com/ et remplacer ces valeurs
    emailjs.init("Q_7dn9PE2KB71_kPi"); // À remplacer
})();

// Soumission du formulaire avec EmailJS
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Valider tous les champs
    let formIsValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            formIsValid = false;
        }
    });

    if (!formIsValid) {
        return;
    }

    // Afficher un message de chargement
    const formStatus = document.querySelector('.form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    formStatus.className = 'form-status';
    formStatus.style.display = 'block';
    formStatus.textContent = 'Envoi du message en cours...';

    // Envoyer l'email via EmailJS
    // IMPORTANT: Remplacez 'YOUR_SERVICE_ID' et 'YOUR_TEMPLATE_ID' après configuration sur emailjs.com
    emailjs.sendForm('service_l6o3rci', 'template_49orf57', contactForm)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);

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

        }, function(error) {
            console.log('FAILED...', error);

            // Afficher le message d'erreur
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.';

            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';

            // Masquer le message après 7 secondes
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 7000);
        });
});

// ===================================
// ANIMATION DES CARTES PROJET
// ===================================
const allProjectCards = document.querySelectorAll('.project-card');
allProjectCards.forEach(card => {
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
// COMPTEUR DE VISITES (LOCAL STORAGE)
// ===================================
function initVisitCounter() {
    let visits = localStorage.getItem('portfolioVisits');

    if (visits === null) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }

    localStorage.setItem('portfolioVisits', visits);

    // Animation du compteur
    const counterElement = document.getElementById('visit-counter');
    if (counterElement) {
        let currentCount = 0;
        const increment = visits / 50;
        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= visits) {
                counterElement.textContent = visits;
                clearInterval(timer);
            } else {
                counterElement.textContent = Math.floor(currentCount);
            }
        }, 20);
    }
}

// Initialiser le compteur au chargement
window.addEventListener('load', initVisitCounter);

// ===================================
// CARROUSEL DE PROJETS
// ===================================
const carousel = document.querySelector('.projects-carousel');
const projectCards = document.querySelectorAll('.projects-carousel .project-card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const dots = document.querySelectorAll('.carousel-dots .dot');

let currentSlide = 0;
let filteredProjects = Array.from(projectCards);

function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    // Mettre à jour les dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % filteredProjects.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + filteredProjects.length) % filteredProjects.length;
    updateCarousel();
}

// Event listeners pour les boutons
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Event listeners pour les dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-play du carrousel (optionnel)
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause au survol
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Support du swipe sur mobile
let touchStartX = 0;
let touchEndX = 0;

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

// ===================================
// SYSTÈME DE FILTRAGE DES PROJETS
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Filtrer les projets
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.classList.add('scale-in');
            } else {
                card.style.display = 'none';
            }
        });

        // Réinitialiser le carrousel
        currentSlide = 0;
        updateCarousel();
    });
});

// ===================================
// DARK MODE TOGGLE
// ===================================
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle glass-effect';
darkModeToggle.innerHTML = '☀️';
darkModeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
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
    transition: transform 0.3s ease;
`;
document.body.appendChild(darkModeToggle);

// Charger la préférence sauvegardée
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    darkModeToggle.innerHTML = '🌙';
}

// Toggle du mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        darkModeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        darkModeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    }

    // Animation du bouton
    darkModeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        darkModeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

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
