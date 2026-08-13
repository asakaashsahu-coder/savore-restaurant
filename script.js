document.addEventListener("DOMContentLoaded", function () {


/* Mobile menu */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });

    });
}


/* Navbar effect */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* Menu filter */

const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.getAttribute("data-category");

        foodCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");

            if (
                category === "all" ||
                category === cardCategory
            ) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});


/* Reservation form */

const bookingForm =
    document.querySelector(".booking-form");

const bookingMessage =
    document.querySelector(".booking-message");


/* Set minimum date to today */

const dateInput =
    document.querySelector("#date");

if (dateInput) {

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.setAttribute("min", today);
}


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.querySelector("#name");

            const email =
                document.querySelector("#email");

            const phone =
                document.querySelector("#phone");

            const date =
                document.querySelector("#date");

            const time =
                document.querySelector("#time");

            const guests =
                document.querySelector("#guests");

            const message =
                document.querySelector("#message");


            if (
                !name ||
                !email ||
                !date ||
                !time ||
                !guests
            ) {
                return;
            }


            /* Check required fields */

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                date.value === "" ||
                time.value === "" ||
                guests.value === ""
            ) {

                if (bookingMessage) {

                    bookingMessage.textContent =
                        "Please fill in all the required details.";

                    bookingMessage.style.color = "#d88";
                }

                return;
            }


            /* Check email */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email.value.trim())) {

                if (bookingMessage) {

                    bookingMessage.textContent =
                        "Please enter a valid email address.";

                    bookingMessage.style.color = "#d88";
                }

                return;
            }


            /* Check selected date */

            const selectedDate =
                new Date(date.value + "T00:00:00");

            const today =
                new Date();

            today.setHours(0, 0, 0, 0);


            if (selectedDate < today) {

                if (bookingMessage) {

                    bookingMessage.textContent =
                        "Please select today or a future date.";

                    bookingMessage.style.color = "#d88";
                }

                return;
            }


            /*
             * Replace this number with the restaurant's
             * WhatsApp number.
             *
             * Example for India:
             * 919876543210
             */

            const restaurantWhatsApp =
                "916372415399";


            /* Create booking message */

            let whatsappMessage =
                "Hello, I would like to book a table.%0A%0A";


            whatsappMessage +=
                "Name: " +
                encodeURIComponent(name.value.trim()) +
                "%0A";


            whatsappMessage +=
                "Email: " +
                encodeURIComponent(email.value.trim()) +
                "%0A";


            if (phone && phone.value.trim() !== "") {

                whatsappMessage +=
                    "Phone: " +
                    encodeURIComponent(phone.value.trim()) +
                    "%0A";
            }


            whatsappMessage +=
                "Date: " +
                encodeURIComponent(date.value) +
                "%0A";


            whatsappMessage +=
                "Time: " +
                encodeURIComponent(time.value) +
                "%0A";


            whatsappMessage +=
                "Guests: " +
                encodeURIComponent(guests.value) +
                "%0A";


            if (message && message.value.trim() !== "") {

                whatsappMessage +=
                    "Special Request: " +
                    encodeURIComponent(
                        message.value.trim()
                    ) +
                    "%0A";
            }


            /* Open WhatsApp */

            const whatsappURL =
                "https://wa.me/" +
                restaurantWhatsApp +
                "?text=" +
                whatsappMessage;


            window.open(
                whatsappURL,
                "_blank"
            );


            /* Show confirmation */

            if (bookingMessage) {

                bookingMessage.textContent =
                    "Opening WhatsApp with your booking details...";

                bookingMessage.style.color =
                    "#c9a45c";
            }


            bookingForm.reset();


            /* Restore today's minimum date */

            if (dateInput) {

                const today =
                    new Date().toISOString().split("T")[0];

                dateInput.setAttribute("min", today);
            }

        }
    );

}


/* Back to top */

const topButton =
    document.querySelector(".top-btn");


if (topButton) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 400) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* Scroll reveal */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

} else {

    revealElements.forEach(
        function (element) {

            element.classList.add("show");

        }
    );

}


});
