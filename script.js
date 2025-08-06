document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour vérifier si un élément est visible à l'écran
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Fonction pour gérer l'animation des sections
  function handleScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('visible');
      }
    });
  }

  // Écouteur d'événement pour le défilement
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Vérifier les sections visibles au chargement de la page
  handleScrollAnimation();

  // Animation fluide pour les liens de navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Gestion du thème
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Vérifier le thème sauvegardé ou la préférence système
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  // Basculer entre les thèmes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  // Mettre à jour l'icône du thème
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeIcon.style.transform = 'rotate(0deg)';
    } else {
      themeIcon.textContent = '🌙';
      themeIcon.style.transform = 'rotate(0deg)';
    }
  }

  // Écouter le clic sur le bouton de thème
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Détection de la visibilité des sections pour les animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Gestion du clic sur le bouton email
  document.getElementById('emailButton')?.addEventListener('click', function() {
    window.location.href = 'mailto:charleskamgapr@gmail.com';
    return false;
  });

  // Navigation fluide
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Ne pas intercepter les liens externes ou les liens mailto/tel
      if (this.getAttribute('href').startsWith('http') || 
          this.getAttribute('href').startsWith('mailto:') || 
          this.getAttribute('href').startsWith('tel:')) {
        return;
      }
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});
