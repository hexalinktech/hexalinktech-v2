(function () {
    "use strict";

    const body = document.body;
    const header = document.getElementById("siteHeader");
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const revealItems = document.querySelectorAll(".reveal");

    const closeMenu = () => {
        body.classList.remove("nav-open");

        if (navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Abrir menu de navegacion");
        }
    };

    const openMenu = () => {
        body.classList.add("nav-open");

        if (navToggle) {
            navToggle.setAttribute("aria-expanded", "true");
            navToggle.setAttribute("aria-label", "Cerrar menu de navegacion");
        }
    };

    const toggleMenu = () => {
        if (body.classList.contains("nav-open")) {
            closeMenu();
            return;
        }

        openMenu();
    };

    const updateHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    const updateActiveLink = () => {
        const sections = Array.from(navLinks)
            .map((link) => {
                const target = document.querySelector(link.getAttribute("href"));
                return target ? { link, target } : null;
            })
            .filter(Boolean);

        let currentLink = sections[0] ? sections[0].link : null;
        const offset = 140;

        sections.forEach(({ link, target }) => {
            if (target.offsetTop - offset <= window.scrollY) {
                currentLink = link;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link === currentLink);
        });
    };

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", toggleMenu);
    }

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();
            closeMenu();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080) {
            closeMenu();
        }
    });

    window.addEventListener("scroll", () => {
        updateHeader();
        updateActiveLink();
    }, { passive: true });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.14,
            rootMargin: "0px 0px -60px 0px"
        });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }

    updateHeader();
    updateActiveLink();
})();
