"use strict";

const CART_KEY = "effataAtelierCart";

document.addEventListener("DOMContentLoaded", () => {

    initialiseMobileMenu();
    initialiseCookieBanner();
    updateCartCount();

});


/* =========================================
   MOBILE NAVIGATION
========================================= */

function initialiseMobileMenu() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".nav-links");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


/* =========================================
   COOKIE BANNER
========================================= */

function initialiseCookieBanner() {

    const banner =
        document.getElementById("cookie-banner");

    const acceptButton =
        document.getElementById("accept-cookies");

    if (!banner || !acceptButton) {
        return;
    }

    const consent =
        localStorage.getItem(
            "effataCookieConsent"
        );

    if (consent === "accepted") {

        banner.hidden = true;

        return;
    }

    acceptButton.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "effataCookieConsent",
                "accepted"
            );

            banner.hidden = true;

        }
    );

}


/* =========================================
   CART STORAGE
========================================= */

function readCart() {

    try {

        const savedCart =
            localStorage.getItem(
                CART_KEY
            );

        if (!savedCart) {
            return [];
        }

        const parsedCart =
            JSON.parse(savedCart);

        return Array.isArray(parsedCart)
            ? parsedCart
            : [];

    } catch (error) {

        console.error(
            "Unable to read cart:",
            error
        );

        return [];

    }

}


function writeCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* =========================================
   CART COUNTER
========================================= */

function updateCartCount() {

    const cart =
        readCart();

    const itemCount =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),
            0
        );

    document
        .querySelectorAll(
            ".cart-count"
        )
        .forEach((counter) => {

            counter.textContent =
                String(itemCount);

        });

}


/* =========================================
   EXPOSE CART FUNCTIONS
========================================= */

window.EffataCart = {

    read:
        readCart,

    write:
        writeCart,

    updateCount:
        updateCartCount,

    key:
        CART_KEY

};