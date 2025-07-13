document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});

function initializeCarousel(carouselElement) {
    const track = carouselElement.querySelector('.carousel-track');
    const prevBtn = carouselElement.querySelector('.carousel-btn.prev');
    const nextBtn = carouselElement.querySelector('.carousel-btn.next');
    const items = carouselElement.querySelectorAll('.carousel-item');
    let index = 0; 
  
    if (!track || items.length === 0) {
        console.warn("Advertencia: No se encontraron todos los elementos para inicializar un carrusel en:", carouselElement);
        return;
    }

  
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

        if (index > maxIndex) {
            index = maxIndex;
        }
        if (index < 0) {
            index = 0;
        }

        track.style.transform = `translateX(-${index * itemWidth}px)`;

    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (items.length === 0) return;
            const itemWidth = items[0].offsetWidth;
            const trackWidth = track.offsetWidth;
            let visibleItems = Math.floor(trackWidth / itemWidth);
            if (visibleItems === 0) visibleItems = 1;

            const maxIndex = items.length - visibleItems;

            if (index >= maxIndex) {
                index = 0;
            } else {
                index++;
            }
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
        
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

    window.addEventListener('resize', updateCarousel);

    window.addEventListener('load', updateCarousel);
    document.addEventListener('DOMContentLoaded', updateCarousel);
}

document.addEventListener('DOMContentLoaded', () => {
    const allCarousels = document.querySelectorAll('.carousel-wrapper');
    allCarousels.forEach(carouselElement => {
        initializeCarousel(carouselElement);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
      
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
                darkModeToggle.setAttribute('aria-label', 'Alternar modo claro');
            }
        } else {
            localStorage.setItem('darkMode', 'disabled');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; 
                darkModeToggle.setAttribute('aria-label', 'Alternar modo oscuro');
            }
        }
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
      
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Alternar modo claro');
        }
    } else {
      
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Alternar modo oscuro');
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const icon = header.querySelector('i');

            accordionHeaders.forEach(otherHeader => {
                const otherAccordionItem = otherHeader.closest('.accordion-item');
                const otherAccordionContent = otherAccordionItem.querySelector('.accordion-content');
                const otherIcon = otherHeader.querySelector('i');

                if (otherHeader !== header && otherAccordionContent.classList.contains('active')) {
                    otherAccordionContent.classList.remove('active');
                    otherHeader.classList.remove('active'); 
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });

            accordionContent.classList.toggle('active');
            header.classList.toggle('active');

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
