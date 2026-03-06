
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

