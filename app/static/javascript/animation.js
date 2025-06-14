  // Selecciona el contenedor que agrupa todos los labels
  const container = document.querySelector('.flex.flex-wrap.justify-center');

  // Crea el observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Al entrar en viewport, reinicia las animaciones
        container.querySelectorAll('.animate-item').forEach(el => {
          el.style.animation = 'none';
          void el.offsetHeight;    // fuerza reflujo
          el.style.animation = ''; // vuelve a la definida en CSS
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(container);