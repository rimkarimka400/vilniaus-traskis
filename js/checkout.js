/* =========================================
   VILNIAUS TRAŠKIS – CHECKOUT
========================================= */

const RESTAURANT_PHONE = "+37065088000";
const CART_STORAGE_KEY = "traskisCart";
const DISCOUNT_RATE = 0.20;
const MIN_PREPARATION_MINUTES = 25;

const orderForm = document.querySelector("#orderForm");
const checkoutItems = document.querySelector("#checkoutItems");

const checkoutSubtotal = document.querySelector("#checkoutSubtotal");
const checkoutDiscount = document.querySelector("#checkoutDiscount");
const checkoutTotal = document.querySelector("#checkoutTotal");

const customerNameInput = document.querySelector("#customerName");
const customerPhoneInput = document.querySelector("#customerPhone");
const pickupTypeInput = document.querySelector("#pickupType");
const pickupTimeInput = document.querySelector("#pickupTime");
const customerCommentInput = document.querySelector("#customerComment");

const qrModal = document.querySelector("#qrModal");
const qrClose = document.querySelector("#qrClose");
const qrCodeContainer = document.querySelector("#qrCode");
const qrOrderNumber = document.querySelector("#qrOrderNumber");
const orderSentButton = document.querySelector("#orderSentBtn");

const smsConfirmModal = document.querySelector("#smsConfirmModal");
const smsSentButton = document.querySelector("#smsSentBtn");
const smsNotSentButton = document.querySelector("#smsNotSentBtn");

let smsConfirmationShown = false;


/* =========================================
   KREPŠELIO DUOMENYS
========================================= */

function getCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY)
        );

        return Array.isArray(savedCart)
            ? savedCart
            : [];
    } catch (error) {
        console.error(
            "Nepavyko perskaityti krepšelio:",
            error
        );

        return [];
    }
}


/* =========================================
   KAINOS
========================================= */

function formatPrice(price) {
    const value = Number(price) || 0;

    return `${value
        .toFixed(2)
        .replace(".", ",")} €`;
}


function calculateSubtotal(cart) {
    return cart.reduce(
        (sum, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;

            return sum + price * quantity;
        },
        0
    );
}


function calculateDiscount(subtotal) {
    return subtotal * DISCOUNT_RATE;
}


function calculateTotal(cart) {
    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal);

    return subtotal - discount;
}


/* =========================================
   PADAŽAI IR GĖRIMAI
========================================= */

function normalizeChoices(
    item,
    pluralProperty,
    singleProperty
) {
    if (Array.isArray(item[pluralProperty])) {
        return item[pluralProperty].filter(Boolean);
    }

    if (item[singleProperty]) {
        return [item[singleProperty]];
    }

    return [];
}


function getItemChoices(item) {
    return {
        sauces: normalizeChoices(
            item,
            "sauces",
            "sauce"
        ),

        drinks: normalizeChoices(
            item,
            "drinks",
            "drink"
        )
    };
}


function renderItemChoices(item) {
    const { sauces, drinks } =
        getItemChoices(item);

    if (!sauces.length && !drinks.length) {
        return "";
    }

    return `
        <div class="checkout-product-options">

            ${
                sauces.length
                    ? `
                        <small>
                            <strong>
                                ${
                                    sauces.length === 1
                                        ? "Padažas:"
                                        : "Padažai:"
                                }
                            </strong>

                            ${sauces.join(", ")}
                        </small>
                    `
                    : ""
            }

            ${
                drinks.length
                    ? `
                        <small>
                            <strong>
                                ${
                                    drinks.length === 1
                                        ? "Gėrimas:"
                                        : "Gėrimai:"
                                }
                            </strong>

                            ${drinks.join(", ")}
                        </small>
                    `
                    : ""
            }

        </div>
    `;
}


/* =========================================
   KREPŠELIO SKAIČIUS
========================================= */

function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce(
        (sum, item) => {
            return (
                sum +
                (Number(item.quantity) || 0)
            );
        },
        0
    );

    document
        .querySelectorAll(".cart-count")
        .forEach(element => {
            element.textContent =
                totalQuantity;
        });
}


/* =========================================
   CHECKOUT SUMOS
========================================= */

function updateCheckoutSummary(cart) {
    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal);
    const total = subtotal - discount;

    if (checkoutSubtotal) {
        checkoutSubtotal.textContent =
            formatPrice(subtotal);
    }

    if (checkoutDiscount) {
        checkoutDiscount.textContent =
            `−${formatPrice(discount)}`;
    }

    if (checkoutTotal) {
        checkoutTotal.textContent =
            formatPrice(total);
    }
}


/* =========================================
   CHECKOUT PREKĖS
========================================= */

function renderCheckout() {
    const cart = getCart();

    if (!checkoutItems || !checkoutTotal) {
        console.error(
            "Checkout HTML nerasti #checkoutItems arba #checkoutTotal elementai."
        );

        return;
    }

    const submitButton =
        orderForm?.querySelector(
            'button[type="submit"]'
        );

    if (!cart.length) {
        checkoutItems.innerHTML = `
            <div class="checkout-empty">

                <i class="fa-solid fa-cart-shopping"></i>

                <p>
                    Jūsų krepšelis tuščias.
                </p>

                <a href="menu.html">
                    Grįžti į meniu
                </a>

            </div>
        `;

        updateCheckoutSummary([]);

        if (submitButton) {
            submitButton.disabled = true;
        }

        return;
    }

    if (submitButton) {
        submitButton.disabled = false;
    }

    checkoutItems.innerHTML = cart
        .map(item => {
            const price =
                Number(item.price) || 0;

            const quantity =
                Math.max(
                    1,
                    Number(item.quantity) || 1
                );

            const itemTotal =
                price * quantity;

            return `
                <div class="checkout-product">

                    <div class="checkout-product-info">

                        <span>
                            ${quantity} ×
                            ${item.name || "Prekė"}
                        </span>

                        ${renderItemChoices(item)}

                    </div>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                </div>
            `;
        })
        .join("");

    updateCheckoutSummary(cart);
}


/* =========================================
   UŽSAKYMO NUMERIS
========================================= */

function generateOrderNumber() {
    const existingOrderNumber =
        sessionStorage.getItem(
            "traskisOrderNumber"
        );

    if (existingOrderNumber) {
        return existingOrderNumber;
    }

    const randomNumber = Math.floor(
        1000 + Math.random() * 9000
    );

    const orderNumber =
        `TR-${randomNumber}`;

    sessionStorage.setItem(
        "traskisOrderNumber",
        orderNumber
    );

    return orderNumber;
}


/* =========================================
   SMS TEKSTAS
========================================= */

function createOrderMessage(
    formData,
    cart,
    orderNumber
) {
    const productsText = cart
        .map(item => {
            const price =
                Number(item.price) || 0;

            const quantity =
                Math.max(
                    1,
                    Number(item.quantity) || 1
                );

            const itemTotal =
                price * quantity;

            const { sauces, drinks } =
                getItemChoices(item);

            const lines = [
                `${quantity} x ${
                    item.name || "Prekė"
                } – ${formatPrice(itemTotal)}`
            ];

            if (sauces.length) {
                lines.push(
                    `${
                        sauces.length === 1
                            ? "Padažas"
                            : "Padažai"
                    }: ${sauces.join(", ")}`
                );
            }

            if (drinks.length) {
                lines.push(
                    `${
                        drinks.length === 1
                            ? "Gėrimas"
                            : "Gėrimai"
                    }: ${drinks.join(", ")}`
                );
            }

            return lines.join("\n");
        })
        .join("\n\n");

    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal);
    const total = subtotal - discount;

    const comment =
        formData.comment || "Nėra";

    return `UŽSAKYMAS NR. ${orderNumber}

Vardas: ${formData.name}
Telefonas: ${formData.phone}

UŽSAKYMAS:
${productsText}

Prekių suma: ${formatPrice(subtotal)}
Nuolaida internetu -20 %: -${formatPrice(discount)}
MOKĖTI: ${formatPrice(total)}

Atsiėmimo būdas:
${formData.pickupType}

Pageidaujamas laikas:
${formData.pickupTime}

Komentaras:
${comment}`;
}


/* =========================================
   SMS NUORODA
========================================= */

function createSmsLink(message) {
    const encodedMessage =
        encodeURIComponent(message);

    const isIOS =
        /iPad|iPhone|iPod/.test(
            navigator.userAgent
        );

    const separator =
        isIOS ? "&" : "?";

    return (
        `sms:${RESTAURANT_PHONE}` +
        `${separator}body=${encodedMessage}`
    );
}


function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Mobile/i
        .test(navigator.userAgent);
}


/* =========================================
   QR KODAS
========================================= */

function showQrCode(
    smsLink,
    orderNumber
) {
    if (!qrModal || !qrCodeContainer) {
        console.error(
            "Nerastas QR langas arba #qrCode elementas."
        );

        return;
    }

    if (typeof QRCode === "undefined") {
        alert(
            "Nepavyko paleisti QR kodo bibliotekos."
        );

        return;
    }

    qrCodeContainer.innerHTML = "";

    try {
        new QRCode(qrCodeContainer, {
            text: smsLink,
            width: 320,
            height: 320,
            correctLevel:
                QRCode.CorrectLevel.L
        });
    } catch (error) {
        console.error(
            "QR kodo klaida:",
            error
        );

        alert(
            "Nepavyko sukurti QR kodo. Užsakymo tekstas gali būti per ilgas."
        );

        return;
    }

    if (qrOrderNumber) {
        qrOrderNumber.textContent =
            `Užsakymo numeris: ${orderNumber}`;
    }

    qrModal.classList.add("active");
    document.body.style.overflow =
        "hidden";
}


function closeQrModal() {
    qrModal?.classList.remove("active");

    document.body.style.overflow =
        "";
}


/* =========================================
   TELEFONO NUMERIS
========================================= */

function cleanPhoneNumber(phone) {
    return String(phone || "")
        .replace(/[\s()-]/g, "");
}


function normalizeLithuanianPhone(phone) {
    const cleanedPhone =
        cleanPhoneNumber(phone);

    if (/^86\d{7}$/.test(cleanedPhone)) {
        return `+370${cleanedPhone.slice(1)}`;
    }

    if (
        /^\+3706\d{7}$/.test(
            cleanedPhone
        )
    ) {
        return cleanedPhone;
    }

    return null;
}


customerPhoneInput?.addEventListener(
    "input",
    () => {
        customerPhoneInput
            .setCustomValidity("");
    }
);


customerPhoneInput?.addEventListener(
    "blur",
    () => {
        const normalizedPhone =
            normalizeLithuanianPhone(
                customerPhoneInput.value
            );

        if (normalizedPhone) {
            customerPhoneInput.value =
                normalizedPhone;

            customerPhoneInput
                .setCustomValidity("");
        }
    }
);


/* =========================================
   ATSIĖMIMO LAIKAS
========================================= */

function minutesToTime(totalMinutes) {
    const hours =
        Math.floor(totalMinutes / 60) % 24;

    const minutes =
        totalMinutes % 60;

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0")
    );
}


function getCurrentMinutes() {
    const now = new Date();

    return (
        now.getHours() * 60 +
        now.getMinutes()
    );
}


function getMinimumPickupTime() {
    return minutesToTime(
        getCurrentMinutes() +
        MIN_PREPARATION_MINUTES
    );
}


function validatePickupTime() {
    if (!pickupTimeInput?.value) {
        return false;
    }

    const [hours, minutes] =
        pickupTimeInput.value
            .split(":")
            .map(Number);

    const selectedMinutes =
        hours * 60 + minutes;

    const minimumMinutes =
        getCurrentMinutes() +
        MIN_PREPARATION_MINUTES;

    if (selectedMinutes < minimumMinutes) {
        pickupTimeInput.setCustomValidity(
            `Pasirinkite laiką ne anksčiau kaip po ${MIN_PREPARATION_MINUTES} minučių.`
        );

        pickupTimeInput.reportValidity();
        pickupTimeInput.focus();

        return false;
    }

    pickupTimeInput.setCustomValidity("");

    return true;
}


if (pickupTimeInput) {
    pickupTimeInput.min =
        getMinimumPickupTime();

    pickupTimeInput.addEventListener(
        "input",
        () => {
            pickupTimeInput
                .setCustomValidity("");
        }
    );
}


/* =========================================
   UŽSAKYMO PATEIKIMAS
========================================= */

orderForm?.addEventListener(
    "submit",
    event => {
        event.preventDefault();

        const cart = getCart();

        if (!cart.length) {
            alert(
                "Jūsų krepšelis tuščias."
            );

            return;
        }

        const customerName =
            customerNameInput
                ?.value
                .trim() || "";

        const customerPhone =
            normalizeLithuanianPhone(
                customerPhoneInput
                    ?.value
                    .trim() || ""
            );

        const pickupType =
            pickupTypeInput?.value || "";

        const pickupTime =
            pickupTimeInput?.value || "";

        const customerComment =
            customerCommentInput
                ?.value
                .trim() || "";

        if (!customerName) {
            customerNameInput?.focus();
            orderForm.reportValidity();

            return;
        }

        if (!customerPhone) {
            customerPhoneInput
                ?.setCustomValidity(
                    "Įveskite numerį formatu +3706XXXXXXX arba 86XXXXXXX."
                );

            customerPhoneInput
                ?.reportValidity();

            customerPhoneInput?.focus();

            return;
        }

        customerPhoneInput
            ?.setCustomValidity("");

        if (!pickupType) {
            pickupTypeInput?.focus();

            return;
        }

        if (!pickupTime) {
            pickupTimeInput?.focus();
            orderForm.reportValidity();

            return;
        }

        if (!validatePickupTime()) {
            return;
        }

        const orderNumber =
            generateOrderNumber();

        const formData = {
            name: customerName,
            phone: customerPhone,
            pickupType,
            pickupTime,
            comment: customerComment
        };

        const orderMessage =
            createOrderMessage(
                formData,
                cart,
                orderNumber
            );

        const smsLink =
            createSmsLink(orderMessage);

        if (typeof gtag === "function") {
            gtag(
                "event",
                "begin_checkout",
                {
                    currency: "EUR",
                    value:
                        calculateTotal(cart),

                    items:
                        cart.map(item => {
                            const choices =
                                getItemChoices(item);

                            return {
                                item_id:
                                    item.productId,

                                item_name:
                                    item.name,

                                item_variant: [
                                    ...choices.sauces,
                                    ...choices.drinks
                                ].join(" / "),

                                price:
                                    Number(
                                        item.price
                                    ) || 0,

                                quantity:
                                    Number(
                                        item.quantity
                                    ) || 1
                            };
                        })
                }
            );
        }

        if (isMobileDevice()) {
            sessionStorage.setItem(
                "traskisPendingSmsOrder",
                "true"
            );

            window.location.href =
                smsLink;
        } else {
            showQrCode(
                smsLink,
                orderNumber
            );
        }
    }
);


/* =========================================
   QR LANGO VALDYMAS
========================================= */

qrClose?.addEventListener(
    "click",
    closeQrModal
);


qrModal?.addEventListener(
    "click",
    event => {
        if (event.target === qrModal) {
            closeQrModal();
        }
    }
);


document.addEventListener(
    "keydown",
    event => {
        if (event.key === "Escape") {
            closeQrModal();
        }
    }
);


/* =========================================
   QR UŽSAKYMAS IŠSIŲSTAS
========================================= */

orderSentButton?.addEventListener(
    "click",
    () => {
        const orderNumber =
            sessionStorage.getItem(
                "traskisOrderNumber"
            ) || "";

        localStorage.removeItem(
            CART_STORAGE_KEY
        );

        sessionStorage.removeItem(
            "traskisOrderNumber"
        );

        if (qrModal) {
            qrModal.innerHTML = `
                <div class="qr-modal-content order-success">

                    <div class="order-success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <span class="qr-label">
                        UŽSAKYMAS PATEIKTAS
                    </span>

                    <h2>
                        Ačiū už užsakymą!
                    </h2>

                    <p>
                        Jūsų užsakymas perduotas kebabinei.
                        Lauksime jūsų atvykstant.
                    </p>

                    <strong>
                        Užsakymo numeris:
                        ${orderNumber}
                    </strong>

                    <a
                        href="menu.html"
                        class="order-success-link"
                    >
                        Grįžti į meniu
                    </a>

                </div>
            `;
        }

        updateCartCount();
    }
);


/* =========================================
   MOBILAUS SMS PATVIRTINIMAS
========================================= */

function openSmsConfirmation() {
    const pendingOrder =
        sessionStorage.getItem(
            "traskisPendingSmsOrder"
        );

    if (
        pendingOrder !== "true" ||
        smsConfirmationShown ||
        !smsConfirmModal
    ) {
        return;
    }

    smsConfirmationShown = true;

    smsConfirmModal.classList.add(
        "active"
    );

    smsConfirmModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeSmsConfirmation() {
    smsConfirmModal?.classList.remove(
        "active"
    );

    smsConfirmModal?.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


smsNotSentButton?.addEventListener(
    "click",
    () => {
        sessionStorage.removeItem(
            "traskisPendingSmsOrder"
        );

        smsConfirmationShown = false;

        closeSmsConfirmation();
    }
);


smsSentButton?.addEventListener(
    "click",
    () => {
        const orderNumber =
            sessionStorage.getItem(
                "traskisOrderNumber"
            ) || "";

        localStorage.removeItem(
            CART_STORAGE_KEY
        );

        sessionStorage.removeItem(
            "traskisOrderNumber"
        );

        sessionStorage.removeItem(
            "traskisPendingSmsOrder"
        );

        updateCartCount();
        renderCheckout();

        if (smsConfirmModal) {
            smsConfirmModal.innerHTML = `
                <div class="sms-confirm-content order-success">

                    <div class="order-success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <span class="qr-label">
                        UŽSAKYMAS PATEIKTAS
                    </span>

                    <h2>
                        Ačiū už užsakymą!
                    </h2>

                    <p>
                        Jūsų SMS užsakymas išsiųstas kebabinei.
                        Lauksime jūsų atvykstant.
                    </p>

                    <strong>
                        Užsakymo numeris:
                        ${orderNumber}
                    </strong>

                    <a
                        href="menu.html"
                        class="order-success-link"
                    >
                        Grįžti į meniu
                    </a>

                </div>
            `;
        }
    }
);


document.addEventListener(
    "visibilitychange",
    () => {
        if (
            document.visibilityState ===
            "visible"
        ) {
            setTimeout(
                openSmsConfirmation,
                350
            );
        }
    }
);


window.addEventListener(
    "pageshow",
    () => {
        setTimeout(
            openSmsConfirmation,
            350
        );
    }
);


/* =========================================
   PALEIDIMAS
========================================= */

renderCheckout();
updateCartCount();