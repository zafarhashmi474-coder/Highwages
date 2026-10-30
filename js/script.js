/* =========================================
   INTRO ANIMATION
========================================= */

const introScreen = document.getElementById("introScreen");

window.addEventListener("load", function () {

    setTimeout(function () {
        introScreen.classList.add("hide");
    }, 4000);
});


/* =========================================
   STICKY HEADER
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");

const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("open");
});

/* Close menu after clicking navigation link */

const navLinks = navbar.querySelectorAll("a");
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");
    });
});


/* =========================================
   FOOTER CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();