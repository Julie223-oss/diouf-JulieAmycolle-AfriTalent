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