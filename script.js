// ===============================
// PORTFOLIO SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // MOBILE MENU
    // ===============================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    // ===============================
    // SMOOTH SCROLL
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

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


    // ===============================
    // ACTIVE NAV LINK
    // ===============================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });


    // ===============================
    // CONTACT FORM
    // ===============================

    const contactForm = document.getElementById("contactForm");
    const sendButton = document.getElementById("sendMessageBtn");

    // IMPORTANT:
    // Your HTML should use:
    // <div id="formMessage" class="form-message"></div>

    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            // -------------------------------
            // CHECK ELEMENTS
            // -------------------------------

            if (!formMessage) {
                console.error("formMessage element not found.");
                return;
            }

            // -------------------------------
            // GET FORM VALUES
            // -------------------------------

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            // -------------------------------
            // BASIC VALIDATION
            // -------------------------------

            if (!name || !email || !message) {

                formMessage.textContent =
                    "Please fill in all fields.";

                formMessage.className =
                    "form-message error";

                return;
            }

            // -------------------------------
            // EMAIL VALIDATION
            // -------------------------------

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.className =
                    "form-message error";

                return;
            }

            // -------------------------------
            // SHOW SENDING
            // -------------------------------

            if (sendButton) {
                sendButton.disabled = true;
                sendButton.dataset.originalText =
                    sendButton.innerHTML;

                sendButton.innerHTML =
                    '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            formMessage.textContent =
                "Sending your message...";

            formMessage.className =
                "form-message sending";


            // -------------------------------
            // CREATE FORM DATA
            // -------------------------------

            const formData = new FormData(contactForm);


            // -------------------------------
            // SEND TO INFINITYFREE PHP
            // -------------------------------

            try {

                const response = await fetch(
                    "https://varalakshmi-dev.free.nf/contact.php",
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                // -------------------------------
                // CHECK HTTP RESPONSE
                // -------------------------------

                if (!response.ok) {

                    throw new Error(
                        `Server returned ${response.status}`
                    );
                }


                // -------------------------------
                // READ JSON RESPONSE
                // -------------------------------

                const data = await response.json();


                // -------------------------------
                // SUCCESS
                // -------------------------------

                if (data.success === true) {

                    formMessage.textContent =
                        data.message ||
                        "Message sent successfully!";

                    formMessage.className =
                        "form-message success";

                    contactForm.reset();

                }

                // -------------------------------
                // PHP ERROR
                // -------------------------------

                else {

                    formMessage.textContent =
                        data.message ||
                        "Unable to send your message.";

                    formMessage.className =
                        "form-message error";
                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                formMessage.textContent =
                    "Unable to send your message. Please try again.";

                formMessage.className =
                    "form-message error";

            }


            // -------------------------------
            // RESTORE BUTTON
            // -------------------------------

            if (sendButton) {

                sendButton.disabled = false;

                sendButton.innerHTML =
                    sendButton.dataset.originalText ||
                    "Send Message";
            }

        });
    }


    // ===============================
    // SCROLL REVEAL ANIMATION
    // ===============================

    const revealElements =
        document.querySelectorAll(
            ".project-card, .skill-card, .about-card, .contact-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }


    // ===============================
    // TYPING EFFECT
    // ===============================

    const typingElement =
        document.querySelector(".typing-text");

    if (typingElement) {

        const text =
            typingElement.dataset.text ||
            typingElement.textContent.trim();

        typingElement.textContent = "";

        let index = 0;

        function typeText() {

            if (index < text.length) {

                typingElement.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(typeText, 80);
            }
        }

        typeText();
    }


    // ===============================
    // CURRENT YEAR
    // ===============================

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }

});
