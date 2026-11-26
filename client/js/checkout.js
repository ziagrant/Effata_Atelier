"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initialiseCheckout
);


function initialiseCheckout() {

    const checkoutForm =
        document.getElementById(
            "checkout-form"
        );


    const itemsContainer =
        document.getElementById(
            "checkout-items"
        );


    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    const cart =
        getCheckoutCart();


    /* =====================================
       EMPTY CART
    ===================================== */

    if (cart.length === 0) {

        window.location.replace(
            "cart.html"
        );

        return;

    }


    /* =====================================
       SHOW PRODUCTS
    ===================================== */

    if (itemsContainer) {

        itemsContainer.innerHTML =
            cart
                .map(
                    function (item) {

                        const price =
                            Number(item.price) || 0;


                        const quantity =
                            Number(item.quantity) || 1;


                        const total =
                            price * quantity;


                        return `

                            <div class="summary-item">

                                <div>

                                    <strong>

                                        ${escapeCheckoutText(
                                            item.name
                                        )}

                                    </strong>

                                    <br>

                                    <small>

                                        Design:
                                        ${escapeCheckoutText(
                                            item.designName ||
                                            "Selected design"
                                        )}

                                        × ${quantity}

                                    </small>

                                </div>


                                <span>

                                    ${formatCheckoutPrice(
                                        total
                                    )}

                                </span>

                            </div>

                        `;

                    }
                )
                .join("");

    }


    const productTotal =
        calculateCheckoutTotal(
            cart
        );


    if (totalElement) {

        totalElement.textContent =
            formatCheckoutPrice(
                productTotal
            );

    }


    /* =====================================
       SUBMIT ORDER
    ===================================== */

    if (!checkoutForm) {
        return;
    }


    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (
                !checkoutForm.checkValidity()
            ) {

                checkoutForm.reportValidity();

                return;

            }


            const orderReference =
                `EA-${Date.now()
                    .toString()
                    .slice(-8)}`;


            sessionStorage.setItem(
                "effataLastOrder",
                JSON.stringify({

                    reference:
                        orderReference,

                    productTotal:
                        productTotal

                })
            );


            /*
                Clear cart AFTER order
                is submitted.
            */

            saveCheckoutCart([]);


            window.location.href =
                "order-success.html";

        }
    );

}


/* =========================================
   GET CART
========================================= */

function getCheckoutCart() {

    if (
        window.EffataCart &&
        typeof window.EffataCart.read ===
            "function"
    ) {

        return window.EffataCart.read();

    }


    try {

        const saved =
            localStorage.getItem(
                "effataAtelierCart"
            );


        const parsed =
            saved
                ? JSON.parse(saved)
                : [];


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        return [];

    }

}


/* =========================================
   SAVE CART
========================================= */

function saveCheckoutCart(cart) {

    if (
        window.EffataCart &&
        typeof window.EffataCart.write ===
            "function"
    ) {

        window.EffataCart.write(
            cart
        );

        return;

    }


    localStorage.setItem(
        "effataAtelierCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   TOTAL
========================================= */

function calculateCheckoutTotal(cart) {

    return cart.reduce(
        function (total, item) {

            return (
                total +
                (Number(item.price) || 0) *
                (Number(item.quantity) || 0)
            );

        },
        0
    );

}


/* =========================================
   UTILITIES
========================================= */

function formatCheckoutPrice(value) {

    return `R${Number(value).toFixed(2)}`;

}


function escapeCheckoutText(value) {

    const element =
        document.createElement("div");


    element.textContent =
        String(value || "");


    return element.innerHTML;

}