document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // MENÚ HAMBURGUESA (móvil)
  // Ahora la web es una sola página: los enlaces del menú son
  // anclas (#reuniones, #ubicacion...) y el navegador hace el
  // scroll solo. El JavaScript solo abre y cierra el menú.
  // =========================================================
  const botonHamburguesa = document.querySelector('.boton-hamburguesa');
  const navegacion = document.querySelector('.navegacion');

  function cerrarMenu() {
    navegacion.classList.remove('abierto');
    botonHamburguesa.setAttribute('aria-expanded', 'false');
    botonHamburguesa.setAttribute('aria-label', 'Abrir menú');
  }

  if (botonHamburguesa && navegacion) {
    botonHamburguesa.addEventListener('click', () => {
      const abierto = navegacion.classList.toggle('abierto');
      botonHamburguesa.setAttribute('aria-expanded', abierto);
      botonHamburguesa.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });

    // Al tocar cualquier enlace del menú, se cierra
    navegacion.querySelectorAll('a').forEach(enlace => {
      enlace.addEventListener('click', cerrarMenu);
    });

    // Si se agranda la ventana a tamaño escritorio, cerramos el menú móvil
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) cerrarMenu();
    });
  }

  // =========================================================
  // CARRUSEL
  // =========================================================
  const carrusel = document.querySelector('.carrusel');
  const btnPrev = document.querySelector('.carrusel-btn.prev');
  const btnNext = document.querySelector('.carrusel-btn.next');
  let slides = Array.from(document.querySelectorAll('.carrusel-slide'));
  let slideActual = 0;
  let temporizador = null;

  // Quita las fotos que no existen (por ejemplo, si aún no has
  // subido foto2.jpg). Si no queda ninguna, oculta el carrusel.
  function quitarSlide(slide) {
    slide.remove();
    slides = slides.filter(s => s !== slide);
    if (slides.length === 0) {
      if (carrusel) carrusel.remove();
      return;
    }
    slideActual = 0;
    mostrarSlide(0);
    actualizarFlechas();
  }

  slides.forEach(slide => {
    const img = slide.querySelector('img');
    // La imagen pudo fallar antes de que este código se ejecutara
    if (img.complete && img.naturalWidth === 0) {
      quitarSlide(slide);
    } else {
      img.addEventListener('error', () => quitarSlide(slide));
    }
  });

  function mostrarSlide(index) {
    slides.forEach(slide => slide.classList.remove('activo'));
    if (slides[index]) slides[index].classList.add('activo');
  }

  function siguienteSlide() {
    if (slides.length < 2) return;
    slideActual = (slideActual + 1) % slides.length;
    mostrarSlide(slideActual);
  }

  function anteriorSlide() {
    if (slides.length < 2) return;
    slideActual = (slideActual - 1 + slides.length) % slides.length;
    mostrarSlide(slideActual);
  }

  // Con una sola foto no tienen sentido las flechas
  function actualizarFlechas() {
    const mostrar = slides.length > 1;
    if (btnPrev) btnPrev.hidden = !mostrar;
    if (btnNext) btnNext.hidden = !mostrar;
  }

  // Reinicia el cambio automático cuando el usuario pulsa una flecha,
  // así la foto no cambia justo después de que él la haya elegido
  function reiniciarTemporizador() {
    clearInterval(temporizador);
    temporizador = setInterval(siguienteSlide, 5000);
  }

  if (carrusel && slides.length > 0) {
    if (btnNext) btnNext.addEventListener('click', () => { siguienteSlide(); reiniciarTemporizador(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { anteriorSlide(); reiniciarTemporizador(); });
    reiniciarTemporizador();
  }
});
