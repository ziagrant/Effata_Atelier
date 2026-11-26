document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.querySelector(
            ".contact-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }

            alert(
                "Thank you. Your message has been received by the website prototype."
            );

            form.reset();

        }
    );

});