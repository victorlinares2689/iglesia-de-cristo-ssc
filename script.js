document.addEventListener('DOMContentLoaded', () => {
  const enlaces = document.querySelectorAll('[data-seccion]');
  const enlacesSubmenu = document.querySelectorAll('[data-subseccion]');
  const secciones = document.querySelectorAll('.seccion');
  const subsecciones = document.querySelectorAll('.subseccion');
  const menu = document.querySelector('.menu');
  const botonHamburguesa = document.querySelector('.boton-hamburguesa');
  const tieneSubmenu = document.querySelector('.tiene-submenu');

  // --- Cambiar de sección principal ---
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      const id = enlace.getAttribute('data-seccion');

      if (enlace.parentElement.classList.contains('tiene-submenu')) {
        if (tieneSubmenu) tieneSubmenu.classList.toggle('abierto');
      }

      secciones.forEach(sec => sec.classList.remove('activa'));
      const destino = document.getElementById(id);
      if (destino) destino.classList.add('activa');

      enlaces.forEach(a => a.classList.remove('activo'));
      enlace.classList.add('activo');

      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (window.innerWidth <= 768) {
        menu.classList.remove('abierto');
        botonHamburguesa.setAttribute('aria-expanded', false);
      }
    });
  });

  // --- Cambiar de subsección ---
  enlacesSubmenu.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      const id = enlace.getAttribute('data-subseccion');

      subsecciones.forEach(sub => sub.classList.remove('activa'));
      const destino = document.getElementById(id);
      if (destino) destino.classList.add('activa');

      secciones.forEach(sec => sec.classList.remove('activa'));
      document.getElementById('quienes-somos').classList.add('activa');

      if (window.innerWidth <= 768) {
        menu.classList.remove('abierto');
        botonHamburguesa.setAttribute('aria-expanded', false);
        if (tieneSubmenu) tieneSubmenu.classList.remove('abierto');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // --- Cerrar submenú al hacer clic fuera ---
  document.addEventListener('click', (e) => {
    if (tieneSubmenu && !tieneSubmenu.contains(e.target)) {
      tieneSubmenu.classList.remove('abierto');
    }
  });

  // --- Menú hamburguesa ---
  if (botonHamburguesa && menu) {
    botonHamburguesa.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      botonHamburguesa.setAttribute('aria-expanded', abierto);
    });
  }

  // --- Carrusel ---
  const slides = document.querySelectorAll('.carrusel-slide');
  const btnPrev = document.querySelector('.carrusel-btn.prev');
  const btnNext = document.querySelector('.carrusel-btn.next');
  let slideActual = 0;

  function mostrarSlide(index) {
    slides.forEach(slide => slide.classList.remove('activo'));
    slides[index].classList.add('activo');
  }

  function siguienteSlide() {
    slideActual = (slideActual + 1) % slides.length;
    mostrarSlide(slideActual);
  }

  function anteriorSlide() {
    slideActual = (slideActual - 1 + slides.length) % slides.length;
    mostrarSlide(slideActual);
  }

  if (slides.length > 0) {
    if (btnNext) btnNext.addEventListener('click', siguienteSlide);
    if (btnPrev) btnPrev.addEventListener('click', anteriorSlide);
    setInterval(siguienteSlide, 5000);
  }
});