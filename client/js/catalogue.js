"use strict";

window.effataProducts = [

    {
        id: 1,
        name: "Luxury Tote Bag",
        category: "bags",
        categoryLabel: "Bags",
        price: 350,
        stock: 12,
        image: "./assets/images/products/product1.jpg",

        description:
            "A hand-crafted textile tote designed to bring original artwork into everyday life.",

        specifications: [
            "Approximately 48 cm × 45 cm",
            "Printed velvet fabric",
            "100% polyester",
            "300 GSM",
            "Ready stock"
        ]
    },

    {
        id: 2,
        name: "Cosmetic Bag",
        category: "bags",
        categoryLabel: "Bags",
        price: 290,
        stock: 10,
        image: "./assets/images/products/product2.jpg",

        description:
            "A compact textile cosmetic bag combining practical storage with artistic detail.",

        specifications: [
            "Approximately 21 cm × 16 cm",
            "Printed velvet fabric",
            "100% polyester",
            "Ready stock"
        ]
    },

    {
        id: 3,
        name: "Original Canvas Print",
        category: "canvas",
        categoryLabel: "Canvas Art",
        price: 850,
        stock: 6,
        image: "./assets/images/products/product3.jpg",

        description:
            "Original canvas artwork created to bring African-inspired artistry into contemporary spaces.",

        specifications: [
            "Original artwork",
            "Canvas presentation",
            "Ready stock",
            "Indoor display"
        ]
    },

    {
        id: 4,
        name: "Luxury Cushion Cover",
        category: "homeware",
        categoryLabel: "Homeware",
        price: 420,
        stock: 8,
        image: "./assets/images/products/product4.jpg",

        description:
            "A decorative textile cushion cover combining comfort with original artistic detail.",

        specifications: [
            "Printed velvet fabric",
            "100% polyester",
            "300 GSM",
            "Ready stock"
        ]
    },

    {
        id: 5,
        name: "Luxury Wash Bag",
        category: "bags",
        categoryLabel: "Bags",
        price: 450,
        stock: 9,
        image: "./assets/images/products/product5.jpg",

        description:
            "A spacious hand-crafted wash bag designed for travel and everyday organisation.",

        specifications: [
            "Approximately 28 cm × 20 cm × 8 cm",
            "Printed velvet fabric",
            "100% polyester",
            "Ready stock"
        ]
    },

    {
        id: 6,
        name: "Art-Inspired Kimono",
        category: "wearables",
        categoryLabel: "Wearables",
        price: 899,
        stock: 5,
        image: "./assets/images/products/product6.jpg",

        description:
            "An art-inspired wearable piece combining expressive textile design with an elegant silhouette.",

        specifications: [
            "Art-inspired textile design",
            "Lightweight wearable piece",
            "Ready stock"
        ]
    }

];


window.getEffataProduct = function (productId) {

    const id =
        Number(productId);

    if (!Number.isInteger(id)) {
        return null;
    }

    return (
        window.effataProducts.find(
            (product) =>
                product.id === id
        ) || null
    );

};


window.formatEffataPrice = function (price) {

    const number =
        Number(price);

    if (!Number.isFinite(number)) {
        return "R0.00";
    }

    return `R${number.toFixed(2)}`;

};