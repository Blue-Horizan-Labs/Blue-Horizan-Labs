
/* =========================================================
   BLUE HORIZON LABS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initNavbar();
    initScrollReveal();
    initCounters();
    initActiveNavigation();
    initSmoothLinks();
    setCurrentYear();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;


    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (mobileMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;


    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener("scroll", updateNavbar);

    updateNavbar();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".product-featured, " +
        ".future-products, " +
        ".capability-card, " +
        ".philosophy-box, " +
        ".process-step, " +
        ".cta-box"
    );


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters = document.querySelectorAll(
        "[data-counter]"
    );

    if (!counters.length) return;


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const targetValue =
                    element.getAttribute("data-counter");


                if (targetValue === "∞") {

                    element.textContent = "∞";

                    observer.unobserve(element);

                    return;

                }


                const target = Number(targetValue);

                let current = 0;

                const duration = 1200;

                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const progress =
                        Math.min(
                            (currentTime - startTime) / duration,
                            1
                        );


                    const eased =
                        1 - Math.pow(1 - progress, 3);


                    current =
                        Math.floor(target * eased);


                    element.textContent = current;


                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        element.textContent = target;

                    }

                }


                requestAnimationFrame(updateCounter);

                observer.unobserve(element);

            });

        },
        {
            threshold: 0.7
        }
    );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (!sections.length || !navLinks.length) return;


    function updateActiveLink() {

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

}


/* =========================================================
   SMOOTH LINK HANDLING
========================================================= */

function initSmoothLinks() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) return;


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const navbar =
                document.querySelector(".navbar");


            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function setCurrentYear() {

    const year =
        document.getElementById("currentYear");


    if (!year) return;


    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   PRODUCT CARD MICRO INTERACTION
========================================================= */

document.querySelectorAll(
    ".capability-card"
).forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        const mobileMenu =
            document.getElementById("mobileMenu");

        const menuBtn =
            document.getElementById("menuBtn");


        if (
            mobileMenu &&
            mobileMenu.classList.contains("active")
        ) {

            mobileMenu.classList.remove("active");


            const icon =
                menuBtn?.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    }
);

