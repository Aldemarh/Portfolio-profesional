
// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de las barras de habilidades al hacer scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Funcionalidad de scroll horizontal para proyectos
function scrollProjects(direction) {
    const wrapper = document.getElementById('projectsWrapper');
    if (!wrapper) return;

    const scrollAmount = 380; // Ancho aproximado de cada tarjeta + gap
    const currentScroll = wrapper.scrollLeft;

    if (direction === 'left') {
        wrapper.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    } else if (direction === 'right') {
        wrapper.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Control de scroll con el mouse wheel
const projectsWrapper = document.getElementById('projectsWrapper');
if (projectsWrapper) {
    projectsWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        projectsWrapper.scrollLeft += e.deltaY;
    });
}

// Control de scroll con teclas de flecha
document.addEventListener('keydown', (e) => {
    const wrapper = document.getElementById('projectsWrapper');
    if (!wrapper) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollProjects('left');
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollProjects('right');
    }
});

// Efecto de desvanecimiento en los bordes del contenedor de scroll
function updateScrollIndicators() {
    const wrapper = document.getElementById('projectsWrapper');
    if (!wrapper) return;

    const { scrollLeft, scrollWidth, clientWidth } = wrapper;

    // Mostrar/ocultar botones según posición
    const leftBtn = document.querySelector('.scroll-nav.left');
    const rightBtn = document.querySelector('.scroll-nav.right');

    if (leftBtn) {
        leftBtn.style.opacity = scrollLeft > 10 ? '1' : '0';
        leftBtn.style.pointerEvents = scrollLeft > 10 ? 'auto' : 'none';
    }

    if (rightBtn) {
        rightBtn.style.opacity = scrollLeft < (scrollWidth - clientWidth - 10) ? '1' : '0';
        rightBtn.style.pointerEvents = scrollLeft < (scrollWidth - clientWidth - 10) ? 'auto' : 'none';
    }
}

// Escuchar eventos de scroll para actualizar indicadores
if (projectsWrapper) {
    projectsWrapper.addEventListener('scroll', updateScrollIndicators);
    // Inicializar estado de los indicadores
    updateScrollIndicators();
}


const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const text = document.getElementById("message").value.trim();

    if (!name || !email || !text) {

        message.style.color = "red";
        message.innerText = "Por favor completa todos los campos.";

        return;

    }

    try {
        // Envío asíncrono con Formspree
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            message.style.color = "green";
            message.innerText = "¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.";
            form.reset();
        } else {
            message.style.color = "red";
            message.innerText = "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.";
        }
    } catch (error) {
        message.style.color = "red";
        message.innerText = "Hubo un error de conexión.";
    }

});

