"use strict";

const CUSTOMER_PROFILE_KEY =
    "effataAtelierCustomer";

const CUSTOMER_SESSION_KEY =
    "effataAtelierSession";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initialiseRegistration();
        initialiseLogin();
        initialiseAccountPanel();

    }
);


function initialiseRegistration() {

    const form =
        document.getElementById(
            "register-form"
        );


    if (!form) {
        return;
    }


    const message =
        document.getElementById(
            "register-message"
        );


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (!form.checkValidity()) {

                form.reportValidity();

                return;

            }


            const firstName =
                document
                    .getElementById(
                        "first-name"
                    )
                    .value
                    .trim();


            const lastName =
                document
                    .getElementById(
                        "last-name"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "register-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const phone =
                document
                    .getElementById(
                        "register-phone"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "register-password"
                    )
                    .value;


            const confirmation =
                document
                    .getElementById(
                        "confirm-password"
                    )
                    .value;


            if (password.length < 8) {

                showAccountMessage(
                    message,
                    "Password must contain at least 8 characters.",
                    false
                );

                return;

            }


            if (
                password !== confirmation
            ) {

                showAccountMessage(
                    message,
                    "The passwords do not match.",
                    false
                );

                return;

            }


            const profile = {
                firstName,
                lastName,
                email,
                phone
            };


            /*
                Passwords are deliberately not
                stored by this front-end prototype.
            */

            localStorage.setItem(
                CUSTOMER_PROFILE_KEY,
                JSON.stringify(profile)
            );


            sessionStorage.setItem(
                CUSTOMER_SESSION_KEY,
                JSON.stringify(profile)
            );


            showAccountMessage(
                message,
                "Account created. Redirecting to the account page.",
                true
            );


            window.setTimeout(
                () => {

                    window.location.href =
                        "account.html";

                },
                700
            );

        }
    );

}


function initialiseLogin() {

    const form =
        document.getElementById(
            "login-form"
        );


    if (!form) {
        return;
    }


    const message =
        document.getElementById(
            "login-message"
        );


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (!form.checkValidity()) {

                form.reportValidity();

                return;

            }


            const email =
                document
                    .getElementById(
                        "login-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const savedProfile =
                readStoredProfile();


            if (!savedProfile) {

                showAccountMessage(
                    message,
                    "No demo account exists yet. Please create an account first.",
                    false
                );

                return;

            }


            if (
                savedProfile.email !== email
            ) {

                showAccountMessage(
                    message,
                    "The email address does not match the registered demo account.",
                    false
                );

                return;

            }


            sessionStorage.setItem(
                CUSTOMER_SESSION_KEY,
                JSON.stringify(savedProfile)
            );


            showAccountMessage(
                message,
                "Signed in successfully.",
                true
            );


            window.setTimeout(
                () => {

                    window.location.href =
                        "account.html";

                },
                500
            );

        }
    );

}


function initialiseAccountPanel() {

    const panel =
        document.getElementById(
            "account-panel"
        );


    if (!panel) {
        return;
    }


    const session =
        readSession();


    if (!session) {

        window.location.href =
            "login.html";

        return;

    }


    const nameElement =
        document.getElementById(
            "account-name"
        );

    const emailElement =
        document.getElementById(
            "account-email"
        );

    const phoneElement =
        document.getElementById(
            "account-phone"
        );

    const signOutButton =
        document.getElementById(
            "sign-out"
        );


    if (nameElement) {

        nameElement.textContent =
            `${session.firstName} ${session.lastName}`;

    }


    if (emailElement) {

        emailElement.textContent =
            session.email;

    }


    if (phoneElement) {

        phoneElement.textContent =
            session.phone || "Not provided";

    }


    if (signOutButton) {

        signOutButton.addEventListener(
            "click",
            () => {

                sessionStorage.removeItem(
                    CUSTOMER_SESSION_KEY
                );


                window.location.href =
                    "login.html";

            }
        );

    }

}


function readStoredProfile() {

    try {

        const profile =
            localStorage.getItem(
                CUSTOMER_PROFILE_KEY
            );


        if (!profile) {
            return null;
        }


        return JSON.parse(profile);

    } catch (error) {

        return null;

    }

}


function readSession() {

    try {

        const session =
            sessionStorage.getItem(
                CUSTOMER_SESSION_KEY
            );


        if (!session) {
            return null;
        }


        return JSON.parse(session);

    } catch (error) {

        return null;

    }

}


function showAccountMessage(
    element,
    text,
    successful
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.className =
        successful
            ? "form-message success-message"
            : "form-message error-message";

}