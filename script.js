document.addEventListener("DOMContentLoaded", function () {
    // Fade out the welcome screen and show the homepage
    const welcomeScreen = document.getElementById("welcomeScreen");
    const homePage = document.getElementById("homePage");
    const softwareDevText = document.querySelector(".software-dev");
    const supportText = document.querySelector(".left-half p:nth-child(2)");
    const descriptionText = document.querySelector(".left-half p:nth-child(3)");

    // Fade out the welcome screen after 3.7 seconds
    setTimeout(() => {
        welcomeScreen.style.opacity = "0";
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            homePage.classList.remove("hidden");
            homePage.style.opacity = "1";

            // Start text animations after homepage appears
            setTimeout(() => {
                softwareDevText.classList.add("animate-slideInLeft");
            }, 3500); 

            setTimeout(() => {
                supportText.classList.add("animate-fadeIn");
            }, 4500); 

            setTimeout(() => {
                descriptionText.classList.add("animate-typing");
            }, 5500); 

        }, 1000);
    }, 3700);

    // Add theme toggle functionality
    const modeToggle = document.getElementById("modeToggle");

    // Check localStorage for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        modeToggle.textContent = "🌙"; 
    } else {
        document.body.classList.add("light-mode");
        modeToggle.textContent = "🌕"; 
    }

    // Add click event to toggle the mode
    modeToggle.addEventListener("click", function () {
        if (document.body.classList.contains("light-mode")) {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            modeToggle.textContent = "🌙"; 
            localStorage.setItem("theme", "dark"); 
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            modeToggle.textContent = "🌕"; 
            localStorage.setItem("theme", "light"); 
        }
    });

    // Using IntersectionObserver to trigger the animation when sections come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                if (entry.target.id === "about") {
                    entry.target.querySelectorAll("h3, h4, p").forEach(element => {
                        element.classList.add("visible");
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    ["about", "portfolio", "contact"].forEach(section => {
        observer.observe(document.getElementById(section));
    });

    // Steering Wheel Rotation on Scroll
    const steeringWheel = document.getElementById("steering-wheel");
    let lastScrollY = window.scrollY;
    let currentRotation = 0;

    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        currentRotation += (currentScrollY - lastScrollY) * 0.2;
        steeringWheel.style.transform = `rotate(${currentRotation}deg)`;
        lastScrollY = currentScrollY;
    });
});

// Function to show popups **in place of the Tech Stack**
function showPopup(popupId, fromPortfolio = false) {
    // Hide all popups first
    document.getElementById("projects-popup").style.display = "none";
    document.getElementById("certifications-popup").style.display = "none";
    document.getElementById("experience-popup").style.display = "none";

    // Hide Tech Stack section
    let techStackSection = document.getElementById("skills");
    techStackSection.style.display = "none";

    // Show the selected popup in place of the Tech Stack
    let popup = document.getElementById(popupId);
    popup.style.display = "block";
    popup.style.position = "relative"; // Keep it in the same flow
    popup.style.marginTop = "-80px"; // Move slightly up for better alignment

    // If from the About section, scroll to the Portfolio first (otherwise, don't scroll)
    if (!fromPortfolio) {
        document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
    }
}

// Function to show Projects in place of Tech Stack
function showProjects(fromPortfolio = false) {
    showPopup("projects-popup", fromPortfolio);
}

// Function to show Certifications in place of Tech Stack
function showCertifications(fromPortfolio = false) {
    showPopup("certifications-popup", fromPortfolio);
}

// Function to show Experience in place of Tech Stack
function showExperience(fromPortfolio = false) {
    showPopup("experience-popup", fromPortfolio);
}

// Function to close any opened popup and restore Tech Stack
function closePopup() {
    document.getElementById("projects-popup").style.display = "none";
    document.getElementById("certifications-popup").style.display = "none";
    document.getElementById("experience-popup").style.display = "none";

    // Restore Tech Stack visibility
    let techStackSection = document.getElementById("skills");
    techStackSection.style.display = "block";
}

// Function to **restore the Tech Stack when clicking "Tech Stack"**
function showTechStack() {
    closePopup(); // Closes any active popup
    document.getElementById("skills").classList.add("visible"); // Makes skills section visible
}

// **Handling Links in the Popups**
document.querySelector("#projects-popup .project-link").addEventListener("click", function () {
    window.open("https://osanpaudel.itch.io/cosmic-escape", "_blank");
});

document.querySelector("#certifications-popup .cert-link").addEventListener("click", function () {
    window.open("https://example.com/certificate", "_blank"); // Replace with your link
});

document.querySelector("#experience-popup .experience-link").addEventListener("click", function () {
    window.open("https://example.com/experience", "_blank"); // Replace with your link
});

// Contact form submission handling
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    alert(`Thank you, ${name}! Your comment has been received.`);

    document.getElementById("contact-form").reset();
});
