// java.js

// MENÚ MOBILE
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});

// Lógica para MÚLTIPLES CAROUSELES (CÓDIGO ACTUALIZADO PARA BUCLE INFINITO)
// Envuelve la lógica del carrusel en una función reutilizable
function initializeCarousel(carouselElement) {
    const track = carouselElement.querySelector('.carousel-track');
    const prevBtn = carouselElement.querySelector('.carousel-btn.prev');
    const nextBtn = carouselElement.querySelector('.carousel-btn.next');
    const items = carouselElement.querySelectorAll('.carousel-item');
    let index = 0; // Índice LOCAL para este carrusel específico

    // Si no se encuentran los elementos necesarios, salimos
    if (!track || items.length === 0) {
        console.warn("Advertencia: No se encontraron todos los elementos para inicializar un carrusel en:", carouselElement);
        return;
    }

    // Función que mueve el carrusel
    function updateCarousel() {
        if (items.length === 0) return;

        const itemWidth = items[0].offsetWidth;
        if (itemWidth === 0) {
            setTimeout(updateCarousel, 200);
            return;
        }

        const trackWidth = track.offsetWidth;
        let visibleItems = Math.floor(trackWidth / itemWidth);
        if (visibleItems === 0) visibleItems = 1;

        const maxIndex = items.length - visibleItems;

        // Asegura que el índice esté dentro de los límites válidos para la transformación
        // (aunque para el bucle, el índice se ajustará en los listeners)
        if (index > maxIndex) {
            index = maxIndex; // Esto es más una salvaguarda, la lógica de bucle lo manejará
        }
        if (index < 0) {
            index = 0; // Esto es más una salvaguarda, la lógica de bucle lo manejará
        }

        track.style.transform = `translateX(-${index * itemWidth}px)`;

        // *** ELIMINAR: Ya no deshabilitamos los botones en un carrusel infinito ***
        // if (prevBtn) {
        //     prevBtn.disabled = (index === 0);
        // }
        // if (nextBtn) {
        //     nextBtn.disabled = (index >= maxIndex);
        // }
    }

    // Event listener para el botón 'Siguiente'
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (items.length === 0) return;
            const itemWidth = items[0].offsetWidth;
            const trackWidth = track.offsetWidth;
            let visibleItems = Math.floor(trackWidth / itemWidth);
            if (visibleItems === 0) visibleItems = 1;

            const maxIndex = items.length - visibleItems;

            // Lógica para bucle: si estamos en el último índice, volvemos al principio (0)
            if (index >= maxIndex) {
                index = 0;
            } else {
                index++;
            }
            updateCarousel();
        });
    }

    // Event listener para el botón 'Anterior'
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            // Lógica para bucle: si estamos en el primer índice (0), vamos al final (maxIndex)
            if (index === 0) {
                const itemWidth = items[0].offsetWidth;
                const trackWidth = track.offsetWidth;
                let visibleItems = Math.floor(trackWidth / itemWidth);
                if (visibleItems === 0) visibleItems = 1;
                const maxIndex = items.length - visibleItems;
                index = maxIndex;
            } else {
                index--;
            }
            updateCarousel();
        });
    }

    // Recalcular posición al cambiar el tamaño de la ventana
    window.addEventListener('resize', updateCarousel);

    // Inicializa la posición del carrusel al cargar o al renderizar el DOM
    window.addEventListener('load', updateCarousel);
    document.addEventListener('DOMContentLoaded', updateCarousel);
}

// Este código se ejecuta cuando el DOM está completamente cargado.
// Encuentra todos los contenedores de carrusel en la página e inicialízalos.
document.addEventListener('DOMContentLoaded', () => {
    const allCarousels = document.querySelectorAll('.carousel-wrapper');
    allCarousels.forEach(carouselElement => {
        initializeCarousel(carouselElement);
    });
});


// --- Lógica del Modo Oscuro (si ya la tenías o la quieres añadir) ---
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Función para alternar el modo oscuro
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        // Guardar la preferencia del usuario en localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambiar a ícono de sol
                darkModeToggle.setAttribute('aria-label', 'Alternar modo claro');
            }
        } else {
            localStorage.setItem('darkMode', 'disabled');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Cambiar a ícono de luna
                darkModeToggle.setAttribute('aria-label', 'Alternar modo oscuro');
            }
        }
    }

    // Cargar la preferencia del usuario al cargar la página (para persistencia)
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        // Asegurarse de que el ícono sea el correcto al cargar si el modo oscuro está activado
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Alternar modo claro');
        }
    } else {
        // Asegurarse de que el ícono sea el correcto al cargar si el modo oscuro está desactivado
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Alternar modo oscuro');
        }
    }

    // Event listener para el botón de modo oscuro
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});

// Lógica para el Acordeón de Servicios
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const icon = header.querySelector('i');

            // Cierra todos los otros acordeones abiertos (opcional, para que solo uno esté abierto a la vez)
            accordionHeaders.forEach(otherHeader => {
                const otherAccordionItem = otherHeader.closest('.accordion-item');
                const otherAccordionContent = otherAccordionItem.querySelector('.accordion-content');
                const otherIcon = otherHeader.querySelector('i');

                if (otherHeader !== header && otherAccordionContent.classList.contains('active')) {
                    otherAccordionContent.classList.remove('active');
                    otherHeader.classList.remove('active'); // Remover clase 'active' también del header
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });

            // Alterna la clase 'active' en el contenido
            accordionContent.classList.toggle('active');
            header.classList.toggle('active'); // También toggle en el header para el ícono

            // Cambia el ícono de '+' a '-' y viceversa
            if (icon) {
                if (accordionContent.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
});