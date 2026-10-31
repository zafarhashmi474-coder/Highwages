/* =========================================
   INTRO ANIMATION
========================================= */
const introScreen = document.getElementById("introScreen");

window.addEventListener("load", function () {
    setTimeout(function () {
        if (introScreen) introScreen.classList.add("hide");
    }, 4000);
});

setTimeout(() => {
    if (introScreen) introScreen.classList.add('hide');
}, 3000);


/* =====================================
   DYNAMIC TABS FUNCTIONALITY (UPDATED)
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabImage = document.getElementById("tabImage");
    const mainTitle = document.getElementById("mainTitle");
    const tabBadge = document.getElementById("tabBadge");
    const tabTitleText = document.getElementById("tabTitleText");
    const tabDescText = document.getElementById("tabDescText");
    const dynamicSection = document.getElementById("dynamicTabs");

    // 3 Tab Data configurations (Theme colors for each option)
    const tabData = [
        {
            bgColor: "#f3f0ff", // Light Purple Theme
            themeColor: "#5b318e",
            image: "images/home_bg.webp",
            badge: "+3,000 bike references",
            title: "We actually equip you.",
            desc: "We give you access to our marketplace designed for the commute. Your teams pick, order, ride. And the Sustainable Mobility Allowance handles the rest."
        },
        {
            bgColor: "#fff1eb", // Light Peach / Orange Theme
            themeColor: "#e55a24",
            image: "images/Card-section2.webp",
            badge: "+5,000 bike racks installed",
            title: "We help you get started, by handling everything that usually gets in the way",
            desc: "Installation of secure bike racks, bike tests to find the right one, safety training to ride with confidence."
        },
        {
            bgColor: "#eafaf1", // Light Green Theme
            themeColor: "#1d6a44",
            image: "images/comment-section-3.webp",
            badge: "+10 cycling experts",
            title: "We don't leave you on your own. We support you from A to Z.",
            desc: "Choosing the right bike for your commute, understanding the options (folding, cargo...), activating available subsidies."
        }
    ];

    if (tabButtons.length > 0) {
        tabButtons.forEach((btn, index) => {
            btn.addEventListener("click", function () {
                // Remove active class from all buttons
                tabButtons.forEach(b => {
                    b.classList.remove("active");
                    b.style.color = ""; // Reset inactive color
                });
                
                // Add active class to clicked button
                this.classList.add("active");

                // Get corresponding data
                const data = tabData[index];
                
                // Apply active text color to clicked button matching current theme
                this.style.color = data.themeColor;
                
                // Apply background color, colors and content dynamically to all sections
                if (dynamicSection) dynamicSection.style.backgroundColor = data.bgColor;
                if (mainTitle) mainTitle.style.color = data.themeColor;
                if (tabBadge) tabBadge.style.color = data.themeColor;
                if (tabTitleText) tabTitleText.style.color = data.themeColor;
                if (tabDescText) tabDescText.style.color = data.themeColor;
                
                // Inject content
                if (tabImage) tabImage.src = data.image;
                if (tabBadge) tabBadge.textContent = data.badge;
                if (tabTitleText) tabTitleText.textContent = data.title;
                if (tabDescText) tabDescText.textContent = data.desc;
            });
        });

        // Set initial color for default active tab on load
        if (tabButtons[0]) {
            tabButtons[0].style.color = tabData[0].themeColor;
        }
    }
});