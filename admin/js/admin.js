document.addEventListener("DOMContentLoaded", () => {

    initialiseProductForm();
    initialiseOrderFilter();

});

function initialiseProductForm() {

    const form =
        document.getElementById("admin-product-form");

    const productList =
        document.getElementById("admin-product-list");

    const message =
        document.getElementById("product-form-message");

    if (!form || !productList) {
        return;
    }

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("admin-product-name")
                .value
                .trim();

        const categorySelect =
            document.getElementById("admin-category");

        const category =
            categorySelect.options[
                categorySelect.selectedIndex
            ].text;

        const price =
            Number(
                document.getElementById("admin-price").value
            );

        const stock =
            Number(
                document.getElementById("admin-stock").value
            );

        if (!name || price < 0 || stock < 0) {

            if (message) {

                message.textContent =
                    "Please enter valid product information.";

            }

            return;
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(name)}</td>

            <td>${escapeHTML(category)}</td>

            <td>R${price.toFixed(2)}</td>

            <td>
                ${stock > 0 ? `${stock} available` : "Out of stock"}
            </td>

            <td>
                <button
                    type="button"
                    class="table-action">
                    Edit
                </button>
            </td>
        `;

        productList.appendChild(row);

        if (message) {

            message.textContent =
                "Product added to the front-end catalogue preview.";

        }

        form.reset();

    });

}

function initialiseOrderFilter() {

    const filter =
        document.getElementById("order-filter");

    if (!filter) {
        return;
    }

    const rows =
        document.querySelectorAll(
            ".admin-table tbody tr[data-status]"
        );

    filter.addEventListener("change", () => {

        const selectedStatus =
            filter.value;

        rows.forEach((row) => {

            const rowStatus =
                row.dataset.status;

            if (
                selectedStatus === "all" ||
                selectedStatus === rowStatus
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent =
        String(value);

    return element.innerHTML;

}