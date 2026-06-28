// ============================================================
// 1. NAVBAR DYNAMIQUE - Change de style au scroll
// ============================================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================================
// 2. DARK MODE - Toggle avec localStorage
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;

    // 2.1 Vérifier si un thème est sauvegardé dans localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
        }
    }

    // 2.2 Écouter le clic sur le bouton toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Sauvegarder le choix dans localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
            }
        });
    }
});

// ============================================================
// 3. BOUTON RETOUR EN HAUT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // 3.1 Afficher/masquer le bouton selon le scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // 3.2 Remonter en haut au clic (smooth scroll)
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})


// ============================================================
// 4. COMPTEURS ANIMÉS - Intersection Observer
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    // Vérifier s'il y a des compteurs sur la page
    if (counters.length === 0) return;

    // Fonction pour animer un compteur
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 150;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    }

    // Observer pour détecter l'apparition des compteurs
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Arrêter d'observer une fois animé
            }
        });
    }, {
        threshold: 0.3, // Déclencher quand 30% de l'élément est visible
        rootMargin: '0px 0px -50px 0px' // Déclencher un peu avant que l'élément soit visible
    });

    // Observer chaque compteur
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// ============================================================
// 5. ANIMATIONS FADE-IN - Intersection Observer
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Vérifier s'il y a des éléments à animer
    if (fadeElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Arrêter d'observer une fois animé
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================================
// 6. ANNÉE DYNAMIQUE DANS LE FOOTER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// ============================================================
// 7. ACTIVER LE DARK MODE SUR LE BOUTON (si présent)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        // Vérifier si le mode sombre est activé
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
        }
    }
});

