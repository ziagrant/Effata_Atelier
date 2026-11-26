"use strict";

document.addEventListener("DOMContentLoaded", function () {

    initialiseCartPage();

});


function initialiseCartPage() {

    const cartItems =
        document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    renderCart();

}


/* =========================================
   GET CART
========================================= */

function getStoredCart() {

    /*
        Use main.js when available.
    */

    if (
        window.EffataCart &&
        typeof window.EffataCart.read === "function"
    ) {

        return window.EffataCart.read();

    }


    try {

        const saved =
            localStorage.getItem(
                "effataAtelierCart"
            );


        if (!saved) {
            return [];
        }


        const parsed =
            JSON.parse(saved);


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Unable to read cart:",
            error
        );

        return [];

    }

}


/* =========================================
   SAVE CART
========================================= */

function saveStoredCart(cart) {

    if (
        window.EffataCart &&
        typeof window.EffataCart.write === "function"
    ) {

        window.EffataCart.write(cart);

        return;

    }


    localStorage.setItem(
        "effataAtelierCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    const emptyMessage =
        document.getElementById(
            "empty-cart-message"
        );


    const cartTable =
        document.getElementById(
            "cart-table"
        );


    const checkoutButton =
        document.getElementById(
            "checkout-link"
        );


    const cart =
        getStoredCart();


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        if (emptyMessage) {
            emptyMessage.hidden = false;
        }


        if (cartTable) {
            cartTable.hidden = true;
        }


        if (checkoutButton) {
            checkoutButton.hidden = true;
        }


        updateCartTotals(0);

        return;

    }


    /* CART HAS PRODUCTS */

    if (emptyMessage) {
        emptyMessage.hidden = true;
    }


    if (cartTable) {
        cartTable.hidden = false;
    }


    if (checkoutButton) {
        checkoutButton.hidden = false;
    }


    cart.forEach(function (item) {

        const row =
            document.createElement("tr");


        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const total =
            price * quantity;


        const cartKey =
            item.cartKey ||
            `${item.id}-${item.designId || "default"}`;


        row.innerHTML = `

            <td>

                <div class="cart-product">

                    <img
                        src="${item.image}"
                        alt="${escapeCartText(item.name)}">


                    <div>

                        <strong>

                            ${escapeCartText(
                                item.name
                            )}

                        </strong>

                        <br>

                        <span>

                            Design:
                            ${escapeCartText(
                                item.designName ||
                                "Selected design"
                            )}

                        </span>

                    </div>

                </div>

            </td>


            <td>

                ${formatCartPrice(price)}

            </td>


            <td>

                <input
                    type="number"
                    class="cart-quantity"
                    data-cart-key="${escapeCartText(
                        cartKey
                    )}"
                    value="${quantity}"
                    min="1"
                    max="99">

            </td>


            <td>

                ${formatCartPrice(total)}

            </td>


            <td>

                <button
                    type="button"
                    class="table-action remove-cart-item"
                    data-cart-key="${escapeCartText(
                        cartKey
                    )}">

                    Remove

                </button>

            </td>

        `;


        cartItems.appendChild(row);

    });


    initialiseQuantityButtons();

    initialiseRemoveButtons();

    initialiseCheckoutButton();


    const subtotal =
        calculateCartSubtotal(cart);


    updateCartTotals(subtotal);

}


/* =========================================
   REMOVE BUTTONS
========================================= */

function initialiseRemoveButtons() {

    const buttons =
        document.querySelectorAll(
            ".remove-cart-item"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const cartKey =
                    button.dataset.cartKey;


                const cart =
                    getStoredCart();


                const updatedCart =
                    cart.filter(
                        function (item) {

                            const itemKey =
                                item.cartKey ||
                                `${item.id}-${
                                    item.designId ||
                                    "default"
                                }`;


                            return (
                                itemKey !== cartKey
                            );

                        }
                    );


                saveStoredCart(updatedCart);


                renderCart();

            }
        );

    });

}


/* =========================================
   QUANTITY
========================================= */

function initialiseQuantityButtons() {

    const inputs =
        document.querySelectorAll(
            ".cart-quantity"
        );


    inputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                const cartKey =
                    input.dataset.cartKey;


                let quantity =
                    Math.floor(
                        Number(input.value)
                    );


                if (
                    !Number.isFinite(quantity) ||
                    quantity < 1
                ) {

                    quantity = 1;

                }


                const cart =
                    getStoredCart();


                const item =
                    cart.find(
                        function (cartItem) {

                            const itemKey =
                                cartItem.cartKey ||
                                `${cartItem.id}-${
                                    cartItem.designId ||
                                    "default"
                                }`;


                            return (
                                itemKey === cartKey
                            );

                        }
                    );


                if (!item) {
                    return;
                }


                item.quantity =
                    quantity;


                saveStoredCart(cart);


                renderCart();

            }
        );

    });

}


/* =========================================
   CHECKOUT BUTTON
========================================= */

function initialiseCheckoutButton() {

    const checkoutButton =
        document.getElementById(
            "checkout-link"
        );


    if (!checkoutButton) {
        return;
    }


    checkoutButton.onclick =
        function (event) {

            event.preventDefault();


            const cart =
                getStoredCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            window.location.href =
                "checkout.html";

        };

}


/* =========================================
   CALCULATIONS
========================================= */

function calculateCartSubtotal(cart) {

    return cart.reduce(
        function (total, item) {

            const price =
                Number(item.price) || 0;


            const quantity =
                Number(item.quantity) || 0;


            return (
                total +
                price * quantity
            );

        },
        0
    );

}


/* =========================================
   DISPLAY TOTALS
========================================= */

function updateCartTotals(total) {

    const subtotalElement =
        document.getElementById(
            "cart-subtotal"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    const formatted =
        formatCartPrice(total);


    if (subtotalElement) {

        subtotalElement.textContent =
            formatted;

    }


    if (totalElement) {

        totalElement.textContent =
            formatted;

    }

}


/* =========================================
   UTILITIES
========================================= */

function formatCartPrice(value) {

    return `R${Number(value).toFixed(2)}`;

}


function escapeCartText(value) {

    const element =
        document.createElement("div");


    element.textContent =
        String(value || "");


    return element.innerHTML;

}