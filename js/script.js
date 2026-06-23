/* =========================================
   MENU MOVIL
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

/* =========================================
   CERRAR MENU AL SELECCIONAR OPCION
========================================= */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});

/* =========================================
   HEADER SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealElements = document.querySelectorAll(
".card, .benefit-card, .hex-card"
);

const revealObserver = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

},
{
    threshold: 0.15
}

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* =========================================
   SCROLL SUAVE BOTONES INTERNOS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});

console.log("HexaLink Tech v3.0 cargado correctamente");
