
document.addEventListener("DOMContentLoaded", function () {

    // 1. Header load
    fetch("components/header.html")
        .then(response => {
            if (!response.ok) throw new Error("Header not found");
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById("header-placeholder");
            headerPlaceholder.innerHTML = data;

            // Mobile menu toggle
            const menuToggle = document.getElementById("menuToggle");
            const navbar = document.getElementById("navbar");

            if (menuToggle && navbar) {
                menuToggle.addEventListener("click", function () {
                    navbar.classList.toggle("open");
                });
            }

            // Header scroll effect
            const header = document.getElementById("header");

            window.addEventListener("scroll", function () {
                if (header) {
                    header.classList.toggle("scrolled", window.scrollY > 50);
                }
            });
        })
        .catch(error => console.error("Header fetch error:", error));


    // 2. Footer load
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (footerPlaceholder) {
        fetch("components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Footer not found");
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Footer fetch error:", error));
    }


    // 3. Amazon Logo strip animation failsafe
    const logoStrip = document.querySelector(".client-logo-strip");

    if (logoStrip) {
        logoStrip.style.opacity = "1";
        logoStrip.style.transform = "translateY(0)";
    }

});
