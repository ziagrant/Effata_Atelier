"use strict";


const PRODUCTS = [

    {
        id: 1,

        name: "Coin Purse",

        category: "bags",

        categoryLabel: "Bags",

        price: 350,

        stock: 20,

        image:
            "./assets/images/blue white coin purse V2.jpeg",

        description:
            "A functional textile coin purse featuring original Effata Atelier artwork.",

        designs: [

            {
                id: "blue-white",

                name: "Blue & White",

                image:
                    "./assets/images/blue white coin purse V2.jpeg"
            },

            {
                id: "gold-navy",

                name: "Gold & Navy",

                image:
                    "./assets/images/gold navy coin purse V2.jpeg"
            },

            {
                id: "orange-navy",

                name: "Orange & Navy",

                image:
                    "./assets/images/orange navy coin purse V2.jpeg"
            },

            {
                id: "pink-blue",

                name: "Pink & Blue",

                image:
                    "./assets/images/pink blue coin purse V2.jpeg"
            },

            {
                id: "pink-green",

                name: "Pink & Green",

                image:
                    "./assets/images/pink green coin purse V2.jpeg"
            },

            {
                id: "red-blue",

                name: "Red & Blue",

                image:
                    "./assets/images/red blue coin purse V2.jpeg"
            },

            {
                id: "white-green",

                name: "White & Green",

                image:
                    "./assets/images/white green coin purse V2.jpeg"
            },

            {
                id: "white-orange",

                name: "White & Orange",

                image:
                    "./assets/images/white orange coin purse V2.jpeg"
            },

            {
                id: "white-yellow-green",

                name: "White, Yellow & Green",

                image:
                    "./assets/images/white yellow green coin purse V2.jpeg"
            }

        ],

        specifications: [

            "Original Effata Atelier textile design",

            "Multiple colourways available",

            "Designed as functional everyday art",

            "Select a design before adding to cart"

        ]

    },


    {
        id: 2,

        name: "Textile Homeware",

        category: "homeware",

        categoryLabel: "Homeware",

        price: 420,

        stock: 10,

        image:
            "./assets/images/textured coin purse close up.jpeg",

        description:
            "A homeware placeholder presenting the texture, print quality and detail of Effata Atelier textiles.",

        designs: [

            {
                id: "textured-detail",

                name: "Textured Detail",

                image:
                    "./assets/images/textured coin purse close up.jpeg"
            },

            {
                id: "textured-bird",

                name: "Textured Bird",

                image:
                    "./assets/images/textured bird coin purse.jpeg"
            },

            {
                id: "pink-green-detail",

                name: "Pink & Green Detail",

                image:
                    "./assets/images/pink green coin purse side.jpeg"
            }

        ],

        specifications: [

            "Textile homeware placeholder",

            "Detailed printed artwork",

            "Multiple design options",

            "Replace with final homeware photographs later"

        ]

    },


    {
        id: 3,

        name: "Art-Inspired Wearable",

        category: "wearables",

        categoryLabel: "Wearables",

        price: 899,

        stock: 8,

        image:
            "./assets/images/white orange bird coin purse with card.jpeg",

        description:
            "A wearable-product placeholder representing Effata Atelier artwork translated into functional fashion.",

        designs: [

            {
                id: "white-orange",

                name: "White & Orange",

                image:
                    "./assets/images/white orange bird coin purse with card.jpeg"
            },

            {
                id: "pink-green",

                name: "Pink & Green",

                image:
                    "./assets/images/pink green coin purse waterproof.jpeg"
            },

            {
                id: "gold-navy",

                name: "Gold & Navy",

                image:
                    "./assets/images/gold navy bird coin purse.jpeg"
            }

        ],

        specifications: [

            "Wearables category placeholder",

            "Artwork-inspired textile design",

            "Multiple colourways",

            "Replace with final wearable photographs later"

        ]

    },


    {
        id: 4,

        name: "Canvas Art Collection",

        category: "canvas",

        categoryLabel: "Canvas Art",

        price: 850,

        stock: 6,

        image:
            "./assets/images/pink burgundy bird coin purse.jpeg",

        description:
            "A canvas-art placeholder showcasing the colours and artwork used throughout the Effata Atelier collection.",

        designs: [

            {
                id: "pink-burgundy",

                name: "Pink & Burgundy",

                image:
                    "./assets/images/pink burgundy bird coin purse.jpeg"
            },

            {
                id: "red-blue",

                name: "Red & Blue",

                image:
                    "./assets/images/red blue bird coin purse.jpeg"
            },

            {
                id: "white-green",

                name: "White & Green",

                image:
                    "./assets/images/white green bird coin purse.jpeg"
            },

            {
                id: "white-orange",

                name: "White & Orange",

                image:
                    "./assets/images/white orange bird coin purse.jpeg"
            }

        ],

        specifications: [

            "Canvas art category placeholder",

            "Original artwork presentation",

            "Multiple artwork options",

            "Replace with final canvas photographs later"

        ]

    }

];


document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById(
                "products-container"
            )
        ) {
            initialiseShop();
        }


        if (
            document.getElementById(
                "product-content"
            )
        ) {
            initialiseProduct();
        }

    }
);


/* =========================================================
   SHOP
========================================================= */

function initialiseShop() {

    const container =
        document.getElementById(
            "products-container"
        );


    const categoryFilter =
        document.getElementById(
            "category-filter"
        );


    const searchInput =
        document.getElementById(
            "search-input"
        );


    const resultMessage =
        document.getElementById(
            "shop-result-message"
        );


    const requestedCategory =
        new URLSearchParams(
            window.location.search
        ).get("category");


    if (
        categoryFilter &&
        requestedCategory
    ) {

        const categoryExists =
            Array
                .from(
                    categoryFilter.options
                )
                .some(
                    function (option) {

                        return (
                            option.value ===
                            requestedCategory
                        );

                    }
                );


        if (categoryExists) {

            categoryFilter.value =
                requestedCategory;

        }

    }


    function updatePageAddress(
        category
    ) {

        const address =
            new URL(
                window.location.href
            );


        if (
            category &&
            category !== "all"
        ) {

            address.searchParams.set(
                "category",
                category
            );

        } else {

            address.searchParams.delete(
                "category"
            );

        }


        window.history.replaceState(
            {},
            "",
            address
        );

    }


    function renderShop() {

        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const searchTerm =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const filteredProducts =
            PRODUCTS.filter(
                function (product) {

                    const categoryMatch =
                        selectedCategory ===
                            "all" ||
                        product.category ===
                            selectedCategory;


                    const searchableText =
                        `${product.name}
                         ${product.categoryLabel}
                         ${product.description}`
                            .toLowerCase();


                    const searchMatch =
                        !searchTerm ||
                        searchableText.includes(
                            searchTerm
                        );


                    return (
                        categoryMatch &&
                        searchMatch
                    );

                }
            );


        if (!filteredProducts.length) {

            container.innerHTML = `

                <div class="empty-state">

                    <h2>
                        No Products Found
                    </h2>

                    <p>
                        Try another category
                        or search term.
                    </p>

                </div>

            `;

        } else {

            container.innerHTML =
                filteredProducts
                    .map(
                        function (product) {

                            return `

                                <article
                                    class="product-card">

                                    <a
                                        href="product.html?id=${product.id}"
                                        class="product-image-link">

                                        <img
                                            src="${product.image}"
                                            alt="${escapeText(
                                                product.name
                                            )}">

                                    </a>


                                    <div
                                        class="product-details">

                                        <span
                                            class="product-category">

                                            ${escapeText(
                                                product.categoryLabel
                                            )}

                                        </span>


                                        <h2
                                            class="product-title">

                                            ${escapeText(
                                                product.name
                                            )}

                                        </h2>


                                        <p
                                            class="product-price">

                                            ${formatPrice(
                                                product.price
                                            )}

                                        </p>


                                        <a
                                            href="product.html?id=${product.id}"
                                            class="btn-primary">

                                            Choose Design

                                        </a>

                                    </div>

                                </article>

                            `;

                        }
                    )
                    .join("");

        }


        if (resultMessage) {

            resultMessage.textContent =
                `${filteredProducts.length} ${
                    filteredProducts.length === 1
                        ? "product"
                        : "products"
                } found`;

        }

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            function () {

                updatePageAddress(
                    categoryFilter.value
                );

                renderShop();

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderShop
        );

    }


    renderShop();

}


/* =========================================================
   PRODUCT PAGE
========================================================= */

function initialiseProduct() {

    const container =
        document.getElementById(
            "product-content"
        );


    const productId =
        Number(
            new URLSearchParams(
                window.location.search
            ).get("id")
        );


    const product =
        PRODUCTS.find(
            function (item) {

                return (
                    item.id === productId
                );

            }
        );


    if (!product) {

        container.innerHTML = `

            <div class="empty-state">

                <h1>
                    Product Not Found
                </h1>

                <p>
                    The selected product
                    could not be found.
                </p>

                <a
                    href="shop.html"
                    class="btn-primary">

                    Return To Shop

                </a>

            </div>

        `;

        return;

    }


    document.title =
        `${product.name} | Effata Atelier`;


    const designButtons =
        product.designs
            .map(
                function (design) {

                    return `

                        <button
                            type="button"
                            class="design-option"
                            data-design-id="${design.id}"
                            data-design-name="${escapeText(
                                design.name
                            )}"
                            data-design-image="${design.image}"
                            aria-pressed="false">

                            <img
                                src="${design.image}"
                                alt="${escapeText(
                                    design.name
                                )} design">

                            <span>
                                ${escapeText(
                                    design.name
                                )}
                            </span>

                        </button>

                    `;

                }
            )
            .join("");


    const specifications =
        product.specifications
            .map(
                function (item) {

                    return `

                        <li>
                            ${escapeText(item)}
                        </li>

                    `;

                }
            )
            .join("");


    container.innerHTML = `

        <div class="product-page-layout">

            <div>

                <img
                    id="main-product-image"
                    class="main-product-image"
                    src="${product.image}"
                    alt="${escapeText(
                        product.name
                    )}">


                <div class="design-grid">

                    ${designButtons}

                </div>

            </div>


            <div>

                <span class="product-category">

                    ${escapeText(
                        product.categoryLabel
                    )}

                </span>


                <h1 class="product-page-title">

                    ${escapeText(
                        product.name
                    )}

                </h1>


                <p class="product-price">

                    ${formatPrice(
                        product.price
                    )}

                </p>


                <p>

                    ${escapeText(
                        product.description
                    )}

                </p>


                <div class="product-specs">

                    <h2>
                        Product Details
                    </h2>

                    <ul>
                        ${specifications}
                    </ul>

                </div>


                <fieldset class="design-fieldset">

                    <legend>
                        Choose Your Design
                    </legend>

                    <p id="selected-design-label">
                        No design selected
                    </p>

                </fieldset>


                <div class="quantity-wrapper">

                    <label for="product-quantity">
                        Quantity
                    </label>

                    <input
                        type="number"
                        id="product-quantity"
                        value="1"
                        min="1"
                        max="${product.stock}">

                </div>


                <button
                    type="button"
                    id="add-to-cart"
                    class="btn-primary"
                    disabled>

                    Add To Cart

                </button>


                <p
                    id="add-to-cart-message"
                    class="form-message"
                    aria-live="polite">
                </p>

            </div>

        </div>

    `;


    initialiseDesignSelection(
        product
    );

}


/* =========================================================
   DESIGN SELECTION AND CART
========================================================= */

function initialiseDesignSelection(
    product
) {

    let selectedDesign =
        null;


    const buttons =
        document.querySelectorAll(
            ".design-option"
        );


    const addButton =
        document.getElementById(
            "add-to-cart"
        );


    const message =
        document.getElementById(
            "add-to-cart-message"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }
                    );


                    button.classList.add(
                        "selected"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    selectedDesign = {

                        id:
                            button.dataset.designId,

                        name:
                            button.dataset.designName,

                        image:
                            button.dataset.designImage

                    };


                    document.getElementById(
                        "main-product-image"
                    ).src =
                        selectedDesign.image;


                    document.getElementById(
                        "selected-design-label"
                    ).textContent =
                        `Selected: ${
                            selectedDesign.name
                        }`;


                    addButton.disabled =
                        false;


                    message.textContent =
                        "";

                }
            );

        }
    );


    addButton.addEventListener(
        "click",
        function () {

            if (!selectedDesign) {

                message.textContent =
                    "Please select a design.";

                message.className =
                    "form-message error-message";

                return;

            }


            const quantityInput =
                document.getElementById(
                    "product-quantity"
                );


            let quantity =
                Math.floor(
                    Number(
                        quantityInput.value
                    )
                );


            if (
                !Number.isFinite(quantity) ||
                quantity < 1
            ) {

                quantity = 1;

            }


            quantity =
                Math.min(
                    quantity,
                    product.stock
                );


            const cart =
                window.EffataCart
                    ? window.EffataCart.read()
                    : [];


            const cartKey =
                `${product.id}-${selectedDesign.id}`;


            const existing =
                cart.find(
                    function (item) {

                        return (
                            item.cartKey ===
                            cartKey
                        );

                    }
                );


            if (existing) {

                existing.quantity =
                    Math.min(
                        Number(
                            existing.quantity
                        ) +
                        quantity,
                        product.stock
                    );

            } else {

                cart.push({

                    cartKey:
                        cartKey,

                    id:
                        product.id,

                    name:
                        product.name,

                    category:
                        product.category,

                    designId:
                        selectedDesign.id,

                    designName:
                        selectedDesign.name,

                    price:
                        product.price,

                    image:
                        selectedDesign.image,

                    quantity:
                        quantity

                });

            }


            if (window.EffataCart) {

                window.EffataCart.write(
                    cart
                );

            } else {

                localStorage.setItem(
                    "effataAtelierCart",
                    JSON.stringify(cart)
                );

            }


            message.textContent =
                `${product.name} in ${
                    selectedDesign.name
                } was added to your cart.`;


            message.className =
                "form-message success-message";


            quantityInput.value =
                "1";

        }
    );

}


/* =========================================================
   UTILITIES
========================================================= */

function formatPrice(value) {

    return `R${Number(value).toFixed(2)}`;

}


function escapeText(value) {

    const element =
        document.createElement("div");


    element.textContent =
        String(value);


    return element.innerHTML;

}