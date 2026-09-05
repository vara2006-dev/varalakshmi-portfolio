/* =========================================================
   VARALAKSHMI K - PORTFOLIO SCRIPT
   FULL UPDATED VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typing = document.getElementById("typing");

    const texts = [
        "Aspiring Full Stack Developer",
        "Web Developer",
        "B.Sc. Computer Science Graduate",
        "Frontend Developer"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typing) return;

        const currentText = texts[textIndex];

        if (!deleting) {

            typing.textContent =
                currentText.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex >= currentText.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typing.textContent =
                currentText.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex <= 0) {

                charIndex = 0;
                deleting = false;

                textIndex =
                    (textIndex + 1) % texts.length;
            }
        }

        setTimeout(
            typeEffect,
            deleting ? 50 : 90
        );
    }

    typeEffect();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const icon =
                menuToggle.querySelector("i");

            if (!icon) return;

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    navLinks.classList.remove("active");

                    const icon =
                        menuToggle.querySelector("i");

                    if (!icon) return;

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                });

            });
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const hiddenElements =
        document.querySelectorAll(".hidden");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        hiddenElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        hiddenElements.forEach(function (element) {

            element.classList.add("show");

        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const navbar =
                    document.querySelector(".navbar");

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight + 25
                        : 80;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let current = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                current =
                    section.getAttribute("id");
            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                current &&
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* =============================================
                   GET FORM ELEMENTS
                ============================================= */

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");

                const formMessage =
                    document.getElementById("formMessage");

                const sendButton =
                    contactForm.querySelector(".send-btn");


                /* =============================================
                   GET VALUES
                ============================================= */

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* =============================================
                   CLEAR OLD MESSAGE
                ============================================= */

                clearFormMessage();


                /* =============================================
                   VALIDATION
                ============================================= */

                if (
                    name === "" ||
                    email === "" ||
                    message === ""
                ) {

                    showFormMessage(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;
                }


                /* =============================================
                   EMAIL VALIDATION
                ============================================= */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                /* =============================================
                   LENGTH VALIDATION
                ============================================= */

                if (name.length > 100) {

                    showFormMessage(
                        "Name is too long.",
                        "error"
                    );

                    return;
                }


                if (email.length > 150) {

                    showFormMessage(
                        "Email address is too long.",
                        "error"
                    );

                    return;
                }


                if (message.length > 5000) {

                    showFormMessage(
                        "Message is too long.",
                        "error"
                    );

                    return;
                }


                /* =============================================
                   SENDING MESSAGE
                ============================================= */

                showFormMessage(
                    "Sending your message...",
                    "sending"
                );


                /* =============================================
                   DISABLE BUTTON
                ============================================= */

                if (sendButton) {

                    sendButton.disabled = true;

                    sendButton.innerHTML =
                        '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }


                /* =============================================
                   CREATE FORM DATA
                ============================================= */

                const formData =
                    new FormData();

                formData.append(
                    "name",
                    name
                );

                formData.append(
                    "email",
                    email
                );

                formData.append(
                    "message",
                    message
                );


                /* =============================================
                   SEND TO PHP
                ============================================= */

                try {

                    const response =
                        await fetch(
                            "contact.php",
                            {
                                method: "POST",
                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    /* =============================================
                       CHECK HTTP STATUS
                    ============================================= */

                    if (!response.ok) {

                        throw new Error(
                            "HTTP Error: " +
                            response.status
                        );
                    }


                    /* =============================================
                       GET PHP RESPONSE
                    ============================================= */

                    const responseText =
                        await response.text();

                    console.log(
                        "PHP Response:",
                        responseText
                    );


                    /* =============================================
                       PARSE JSON
                    ============================================= */

                    let data;

                    try {

                        data =
                            JSON.parse(responseText);

                    } catch (jsonError) {

                        console.error(
                            "JSON Parse Error:",
                            jsonError
                        );

                        console.error(
                            "PHP Response:",
                            responseText
                        );

                        throw new Error(
                            "Invalid response from PHP."
                        );
                    }


                    /* =============================================
                       SUCCESS
                    ============================================= */

                    if (data.success === true) {

                        /*
                         * IMPORTANT:
                         * Show success message FIRST.
                         */

                        showFormMessage(
                            "✓ Thank you! Your message has been sent successfully.",
                            "success"
                        );


                        /*
                         * Clear form AFTER successful sending.
                         */

                        contactForm.reset();


                        /*
                         * Change button
                         */

                        if (sendButton) {

                            sendButton.disabled = true;

                            sendButton.innerHTML =
                                '<i class="fas fa-check"></i> Message Sent';
                        }


                        /*
                         * Keep success message visible
                         * for 5 seconds.
                         */

                        setTimeout(function () {

                            clearFormMessage();

                            if (sendButton) {

                                sendButton.disabled = false;

                                sendButton.innerHTML =
                                    '<i class="fas fa-paper-plane"></i> Send Message';
                            }

                        }, 5000);


                    } else {

                        /* =========================================
                           PHP RETURNED ERROR
                        ========================================= */

                        showFormMessage(
                            data.message ||
                            "Unable to send your message. Please try again.",
                            "error"
                        );


                        if (sendButton) {

                            sendButton.disabled = false;

                            sendButton.innerHTML =
                                '<i class="fas fa-paper-plane"></i> Send Message';
                        }
                    }


                } catch (error) {

                    /* =============================================
                       CONNECTION / SERVER ERROR
                    ============================================= */

                    console.error(
                        "Contact Form Error:",
                        error
                    );


                    showFormMessage(
                        "Unable to connect to the server. Please make sure Apache and PHP are running.",
                        "error"
                    );


                    if (sendButton) {

                        sendButton.disabled = false;

                        sendButton.innerHTML =
                            '<i class="fas fa-paper-plane"></i> Send Message';
                    }

                }

            }
        );
    }


    /* =====================================================
       SHOW FORM MESSAGE
    ===================================================== */

    function showFormMessage(message, type) {

        const formMessage =
            document.getElementById("formMessage");

        if (!formMessage) return;


        formMessage.textContent =
            message;


        formMessage.className =
            "form-message " + type;


        /*
         * Make absolutely sure it is visible.
         */

        formMessage.style.display =
            "block";


        /*
         * Scroll slightly so visitor can see
         * the success message on small screens.
         */

        if (type === "success") {

            setTimeout(function () {

                formMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            }, 100);
        }
    }


    /* =====================================================
       CLEAR FORM MESSAGE
    ===================================================== */

    function clearFormMessage() {

        const formMessage =
            document.getElementById("formMessage");

        if (!formMessage) return;


        formMessage.textContent = "";

        formMessage.className =
            "form-message";

        formMessage.style.display =
            "none";
    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            "© " +
            new Date().getFullYear() +
            " Varalakshmi K. All Rights Reserved.";
    }


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
