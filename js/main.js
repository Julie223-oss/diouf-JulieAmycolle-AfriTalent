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



// ============================================================
// 9. FILTRAGE DYNAMIQUE DES FREELANCES
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    // Vérifier si on est sur la page freelances
    if (filterButtons.length === 0 || freelanceCards.length === 0) return;

    // Ajouter l'événement click sur chaque bouton
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 9.1 Retirer la classe "active" de tous les boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // 9.2 Ajouter la classe "active" au bouton cliqué
            this.classList.add('active');

            // 9.3 Récupérer la catégorie sélectionnée
            const category = this.getAttribute('data-category');

            // 9.4 Filtrer les cartes
            freelanceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'block';
                    // Ajouter une animation d'apparition
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// ============================================================
// 10. VALIDATION DU FORMULAIRE DE CONTACT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Vérifier si on est sur la page contact
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher l'envoi réel

        let isValid = true;

        // 10.1 Vérifier tous les champs requis
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            const errorDiv = document.getElementById(input.id + 'Error');
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                if (errorDiv) {
                    errorDiv.textContent = 'Ce champ est requis.';
                    errorDiv.style.display = 'block';
                }
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                if (errorDiv) {
                    errorDiv.textContent = '';
                    errorDiv.style.display = 'none';
                }
            }
        });

        // 10.2 Vérifier le format de l'email
        const emailInput = document.getElementById('email');
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorDiv = document.getElementById('emailError');
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
                if (errorDiv) {
                    errorDiv.textContent = 'Veuillez entrer une adresse email valide.';
                    errorDiv.style.display = 'block';
                }
                isValid = false;
            }
        }

        // 10.3 Vérifier la longueur du message (minimum 20 caractères)
        const messageInput = document.getElementById('message');
        if (messageInput && messageInput.value.trim()) {
            const errorDiv = document.getElementById('messageError');
            if (messageInput.value.trim().length < 20) {
                messageInput.classList.add('is-invalid');
                messageInput.classList.remove('is-valid');
                if (errorDiv) {
                    errorDiv.textContent = 'Le message doit contenir au moins 20 caractères.';
                    errorDiv.style.display = 'block';
                }
                isValid = false;
            }
        }

        // 10.4 Afficher le message de succès ou d'erreur
        if (isValid) {
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = '✅ Votre message a été envoyé avec succès !';
                successMessage.style.display = 'block';
                
                // Réinitialiser le formulaire
                form.reset();
                form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        } else {
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.className = 'alert alert-danger mt-3';
                successMessage.textContent = '❌ Veuillez corriger les erreurs ci-dessus.';
                successMessage.style.display = 'block';
            }
            // Faire défiler jusqu'au premier champ invalide
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
});

// ============================================================
// 11. ANIMATION D'APPARITION POUR LE FILTRAGE
// ============================================================
// Ajouter cette règle CSS dynamiquement pour l'animation fadeIn
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

