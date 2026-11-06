
/* =========================================
   HIGHWAGES INTRO CONTROL
========================================= */

window.addEventListener("load", function () {

    const introScreen = document.getElementById("introScreen");

    if (!introScreen) return;

    setTimeout(function () {

        introScreen.classList.add("hide");

    }, 5100);

});


/* =====================================
   DYNAMIC TABS FUNCTIONALITY (AUTO PLAY)
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabImage = document.getElementById("tabImage");
    const mainTitle = document.getElementById("mainTitle");
    const tabBadge = document.getElementById("tabBadge");
    const tabTitleText = document.getElementById("tabTitleText");
    const tabDescText = document.getElementById("tabDescText");
    const dynamicSection = document.getElementById("dynamicTabs");

    const tabData = [
        {
            bgColor: "#f3f0ff", 
            themeColor: "#5b318e",
            image: "images/home_bg.webp",
            badge: "+3,000 bike references",
            title: "We actually equip you.",
            desc: "We give you access to our marketplace designed for the commute. Your teams pick, order, ride. And the Sustainable Mobility Allowance handles the rest."
        },
        {
            bgColor: "#fff1eb", 
            themeColor: "#e55a24",
            image: "images/Card-section2.webp",
            badge: "+5,000 bike racks installed",
            title: "We help you get started, by handling everything that usually gets in the way",
            desc: "Installation of secure bike racks, bike tests to find the right one, safety training to ride with confidence."
        },
        {
            bgColor: "#eafaf1", 
            themeColor: "#1d6a44",
            image: "images/comment-section-3.webp",
            badge: "+10 cycling experts",
            title: "We don't leave you on your own. We support you from A to Z.",
            desc: "Choosing the right bike for your commute, understanding the options (folding, cargo...), activating available subsidies."
        }
    ];

    let currentIndex = 0;
    let autoPlayInterval = null;
    let animationFrame = null;
    let startTime = null;
    const duration = 5000; // 5 seconds mate
    let isUserInteracted = false; 

    // Helper: update tab interface
    function updateTab(index) {
        tabButtons.forEach(b => {
            b.classList.remove("active");
            b.style.color = ""; 
            b.querySelector('.tab-progress-fill').style.width = '0%'; // reset fill
        });
        
        tabButtons[index].classList.add("active");
        const data = tabData[index];
        tabButtons[index].style.color = data.themeColor;
        
        if (dynamicSection) dynamicSection.style.backgroundColor = data.bgColor;
        if (mainTitle) mainTitle.style.color = data.themeColor;
        if (tabBadge) tabBadge.style.color = data.themeColor;
        if (tabTitleText) tabTitleText.style.color = data.themeColor;
        if (tabDescText) tabDescText.style.color = data.themeColor;
        
        if (tabImage) {
            tabImage.style.opacity = '0';
            setTimeout(() => {
                tabImage.src = data.image;
                tabImage.style.opacity = '1';
            }, 150);
        }
        
        if (tabBadge) tabBadge.textContent = data.badge;
        if (tabTitleText) tabTitleText.textContent = data.title;
        if (tabDescText) tabDescText.textContent = data.desc;
    }

    // Custom Animation for Progress Bar
    function animateProgress(timestamp) {
        if (isUserInteracted) return; // Stop if clicked

        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duration;

        if (progress > 1) {
            progress = 1;
        }

        const activeFill = tabButtons[currentIndex].querySelector('.tab-progress-fill');
        if (activeFill) {
            activeFill.style.width = `${progress * 100}%`;
        }

        if (progress === 1) {
            startTime = null; 
            currentIndex++;
            if (currentIndex < tabData.length) {
                updateTab(currentIndex);
                animationFrame = requestAnimationFrame(animateProgress);
            } else {
                // Last item pr stop thase
                activeFill.style.width = '100%';
                cancelAnimationFrame(animationFrame);
            }
        } else {
            animationFrame = requestAnimationFrame(animateProgress);
        }
    }

    if (tabButtons.length > 0) {
        // Init manually click logic
        tabButtons.forEach((btn, index) => {
            btn.addEventListener("click", function () {
                isUserInteracted = true; // Click karyu etle auto-play bandh
                cancelAnimationFrame(animationFrame);
                
                // Click pachi current bar full kari nakho
                tabButtons.forEach(b => { b.querySelector('.tab-progress-fill').style.width = '0%'; });
                btn.querySelector('.tab-progress-fill').style.width = '100%';
                
                currentIndex = index;
                updateTab(index);
            });
        });

        // Initialize First Tab and start observer
        updateTab(0);

        // Run animation only when section is visible
        const tabObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isUserInteracted && currentIndex === 0 && !startTime) {
                    startTime = performance.now();
                    animationFrame = requestAnimationFrame(animateProgress);
                }
            });
        }, { threshold: 0.3 });

        if (dynamicSection) {
            tabObserver.observe(dynamicSection);
        }
    }
});

/* =====================================
   BENEFITS TOGGLE & SCROLL ANIMATION
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    const benefitGrids = document.querySelectorAll(".benefits-grid");
    const cardButtons = document.querySelectorAll(".card-btn");

    // 1. Scroll Detector for Buttons (Intersection Observer)
    const btnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jyare button screen par aave tyare visible class add thase
                entry.target.classList.add("btn-visible");
            }
        });
    }, {
        threshold: 0.1, // 10% button dekhay etle animation chalu thay
        rootMargin: "0px 0px -20px 0px"
    });

    // Baddhi buttons par observer lagavi do
    if (cardButtons.length > 0) {
        cardButtons.forEach(btn => btnObserver.observe(btn));
    }

    // 2. Toggle functionality
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                
                // Active class remove karo
                toggleButtons.forEach(b => b.classList.remove("active"));
                this.classList.add("active");

                const targetId = this.getAttribute("data-target");

                // Badha grids hide karo
                benefitGrids.forEach(grid => {
                    grid.classList.add("hidden");
                    
                    // Hidden thayela card na buttons mathi visible class kadhi lyo,
                    // jethi biji var tab open thay to fari thi properly animate thai shake.
                    const btns = grid.querySelectorAll(".card-btn");
                    btns.forEach(b => b.classList.remove("btn-visible"));
                });

                // Target grid show karo (CSS auto-animation chalu karse)
                const targetGrid = document.getElementById(targetId);
                if (targetGrid) {
                    targetGrid.classList.remove("hidden");
                }
            });
        });
    }
});

/* =====================================
   BACKGROUND LOOP SCROLL DETECTOR
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    
    const stackCards = document.querySelectorAll(".stack-card:not(.stack-image-card)");
    
    // Intersection Observer for drawing the SVG loop
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Card 40% screen par aave etle draw animation start thase
                entry.target.classList.add("draw-loop");
            } else {
                // Reverse scroll vakhate fari loop reset thase
                entry.target.classList.remove("draw-loop");
            }
        });
    }, {
        threshold: 0.4 
    });

    if (stackCards.length > 0) {
        stackCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});

/* =====================================
   MARKETPLACE SCROLL ANIMATIONS ('H' LOGO & TEXT)
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const animatedH = document.querySelector(".market-animated-h");
    const marketCard = document.querySelector(".market-card");

    if (marketCard) {
        const marketObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (animatedH) animatedH.classList.add("h-visible");
                    
                    entry.target.classList.add("content-visible");
                } else {
                    if (animatedH) animatedH.classList.remove("h-visible");
                    entry.target.classList.remove("content-visible");
                }
            });
        }, {
            threshold: 0.3
        });

        marketObserver.observe(marketCard);
    }
});

/* =====================================
   NETWORK SECTION SCROLL ANIMATION
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const networkContainer = document.querySelector(".network-container");

    if (networkContainer) {
        const netObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("content-visible");
                } else {
                    entry.target.classList.remove("content-visible");
                }
            });
        }, {
            threshold: 0.3 
        });

        netObserver.observe(networkContainer);
    }
});

/* =====================================
   TESTIMONIAL SLIDER & 10s TIMER
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".testi-slide");
    const prevBtn = document.getElementById("prevTesti");
    const nextBtn = document.getElementById("nextTesti");
    const counterDisplay = document.getElementById("testiCounter");
    const progressCircle = document.querySelector(".progress-circle");
    
    if (!slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 10000; // 10 seconds
    const circumference = 138; // Circle perimeter
    
    let timerInterval;
    let startTime;

    function updateCounter() {
        const current = String(currentIndex + 1).padStart(2, '0');
        const total = String(totalSlides).padStart(2, '0');
        counterDisplay.textContent = `${current} / ${total}`;
    }

    function showSlide(index) {
        // Hide all
        slides.forEach(slide => slide.classList.remove("active"));
        // Show current
        slides[index].classList.add("active");
        updateCounter();
        resetTimer();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // Animation frame timer for smooth SVG circle drawing
    function animateTimer(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Calculate progress (0 to 1)
        let progress = elapsed / slideDuration;
        
        if (progress >= 1) {
            nextSlide();
            return; // resetTimer will restart the animation loop
        }
        
        // Update SVG stroke-dashoffset
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = offset;
        
        timerInterval = requestAnimationFrame(animateTimer);
    }

    function resetTimer() {
        cancelAnimationFrame(timerInterval);
        progressCircle.style.strokeDashoffset = circumference;
        startTime = null;
        timerInterval = requestAnimationFrame(animateTimer);
    }

    // Button Listeners
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Initialize
    updateCounter();
    resetTimer(); // Start loop
});

/* =====================================
   TOUR SECTION SCROLL ANIMATION
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const tourCard = document.querySelector(".tour-card");
    const tourH = document.querySelector(".tour-animated-h");

    if (tourCard) {
        const tourObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tourCard.classList.add("content-visible");
                    if (tourH) tourH.classList.add("h-visible");
                } else {
                    tourCard.classList.remove("content-visible");
                    if (tourH) tourH.classList.remove("h-visible");
                }
            });
        }, {
            threshold: 0.3
        });

        tourObserver.observe(tourCard);
    }
});

/* =====================================
   FAQ ACCORDION SCRIPT
====================================== */
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        const answerDiv = item.querySelector(".faq-answer");

        // Set initial max-height for default active item
        if (item.classList.contains("active")) {
            answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
        }

        questionBtn.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close all items (Accordion behavior)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            // If it wasn't open, open it
            if (!isOpen) {
                item.classList.add("active");
                answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
            }
        });
    });
});

/* =====================================
   FOOTER DYNAMIC YEAR
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});



// EVENT DELEGATION: Direct Display 
document.addEventListener("click", function (e) {
    // 1. Hamburger Icon Click Logic
    const toggleBtn = e.target.closest(".menu-toggle");
    if (toggleBtn) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (navbar.classList.contains("open")) {
                navbar.classList.remove("open");
                // Direct JS thi CSS force none karo
                navbar.style.setProperty("display", "none", "important");
                document.body.style.overflow = "";
            } else {
                navbar.classList.add("open");
                navbar.style.setProperty("display", "flex", "important");
                document.body.style.overflow = "hidden";
            }
        }
    }

    const navLink = e.target.closest(".navbar a");
    if (navLink) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.remove("open");
            navbar.style.setProperty("display", "none", "important");
            document.body.style.overflow = "";
        }
    }
});

/* =========================================
   FOOTER ANIMATION OBSERVER
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".site-footer");
    if(!footer) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            footer.classList.add("visible"); 
        }
    }, { threshold: 0.2 }); 

    observer.observe(footer);
});