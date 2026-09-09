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
const ONLINE_ORDER_ENABLED = false;
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
function getSauceLetter(sauce) {

    switch (sauce) {

        case "Tartarų":
        case "Tartarų padažas":
            return "T";

        case "Agurkinis":
        case "Agurkinis padažas":
            return "A";

        case "Česnakinis":
        case "Česnakinis padažas":
            return "Č";

        case "BBQ":
        case "BBQ padažas":
            return "B";

        default:
            return "";
    }

}

function getDrinkNumber(drink) {

    switch (drink) {

        case "Coca-Cola":
        case "Coca-Cola / Pepsi":
            return "1";

        case "Sprite":
        case "Sprite / 7UP":
            return "2";

        case "Fanta":
        case "Fanta / Mirinda":
            return "3";

        case "Gazuotas vanduo":
            return "4";

        case "Negazuotas vanduo":
            return "5";

        default:
            return "";
    }

}
function createOrderMessage(
    formData,
    cart,
    orderNumber
) {

    const productsText = cart
        .map(item => {

let line = `${item.orderNumber}`;

if (item.name.includes("Maža")) {
    line += "M";
}

if (item.name.includes("Didelė")) {
    line += "D";
}

if (
    item.name.includes("+ sūris") ||
    item.name.includes("sūriu")
) {
    line += "S";
}if (item.orderNumber == 17) {

    if (item.name.includes("kebabo")) {
        line += "K";
    }

    if (item.name.includes("traškia")) {
        line += "T";
    }

}// Atskirai perkami padažai (21)
if (item.orderNumber == 21) {

    if (item.name.includes("Tartar")) line += " T";
    if (item.name.includes("Agurkin")) line += " A";
    if (item.name.includes("Česn")) line += " Č";
    if (item.name.includes("BBQ")) line += " B";

}

// Atskirai perkami gėrimai (20)
if (item.orderNumber == 20) {

    if (item.name.includes("Coca")) line += " 1";
    if (item.name.includes("Sprite")) line += " 2";
    if (item.name.includes("Fanta")) line += " 3";
    if (item.name.includes("Gazuotas")) line += " 4";
    if (item.name.includes("Negazuotas")) line += " 5";

}
if (item.orderNumber == 19) {

    if (item.name.includes("Jalapenai")) {
        line += " JAL";
    }

}


line += ` x${item.quantity}`;            if (item.sauce) {

                let sauce = "";

                switch (item.sauce) {

                    case "Tartarų":
                    case "Tartarų padažas":
                        sauce = "T";
                        break;

                    case "Agurkinis":
                    case "Agurkinis padažas":
                        sauce = "A";
                        break;

                    case "Česnakinis":
                    case "Česnakinis padažas":
                        sauce = "Č";
                        break;

                    case "BBQ":
                    case "BBQ padažas":
                        sauce = "B";
                        break;
                }

                if (sauce) {
                    line += ` ${sauce}`;
                }

            }

            if (item.drink) {

                let drink = "";

                switch (item.drink) {

                    case "Coca-Cola":
                    case "Coca-Cola / Pepsi":
                        drink = "1";
                        break;

                    case "Sprite":
                    case "Sprite / 7UP":
                        drink = "2";
                        break;

                    case "Fanta":
                    case "Fanta / Mirinda":
                        drink = "3";
                        break;

                    case "Gazuotas vanduo":
                        drink = "4";
                        break;

                    case "Negazuotas vanduo":
                        drink = "5";
                        break;
                }

                if (drink) {

                    if (item.sauce)
                        line += `-${drink}`;
                    else
                        line += ` ${drink}`;

                }

            }

            return line;

        })
        .join("\n");

    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal);
    const total = subtotal - discount;

    return (
        formData.name +
        "\n\n" +
        productsText +
        "\n\n" +
        formatPrice(total) +
        "\n\n" +
        formData.pickupTime
    );

}


/* =========================================
   SMS NUORODA
========================================= */

function createSmsLink(message, phoneNumber) {

    return `sms:${phoneNumber || RESTAURANT_PHONE}?body=${encodeURIComponent(message)}`;

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

      const kioskModal = document.createElement("div");

kioskModal.innerHTML = `
    <div style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.7);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:99999;
    ">

        <div style="
            background:#1b1b1b;
            color:#fff;
            width:90%;
            max-width:430px;
            border-radius:15px;
            padding:30px;
            text-align:center;
        ">

            <h2 style="margin-bottom:10px;">
                Pasirinkite kebabinę
            </h2>

            <p style="margin-bottom:25px;color:#aaa;">
                Į kurią kebabinę siunčiate užsakymą?
            </p>

            <button
                id="orderJust"
                type="button"
                style="
                    width:100%;
                    padding:16px;
                    margin-bottom:15px;
                    font-size:18px;
                    cursor:pointer;
                "
            >
                📍 Justiniškės
                <br>
                066617557
            </button>

            <button
                id="orderRygos"
                type="button"
                style="
                    width:100%;
                    padding:16px;
                    margin-bottom:15px;
                    font-size:18px;
                    cursor:pointer;
                "
            >
                📍 Rygos
                <br>
                066617558
            </button>

            <button
                id="closeKioskModal"
                type="button"
                style="
                    margin-top:10px;
                    background:none;
                    border:none;
                    color:#aaa;
                    cursor:pointer;
                "
            >
                Uždaryti
            </button>

        </div>
    </div>
`;

document.body.appendChild(kioskModal);

function sendOrderToKiosk(phoneNumber) {

    const selectedSmsLink =
        createSmsLink(
            orderMessage,
            phoneNumber
        );

    kioskModal.remove();

    if (isMobileDevice()) {

        sessionStorage.setItem(
            "traskisPendingSmsOrder",
            "true"
        );

        window.location.href =
            selectedSmsLink;

    } else {

        showQrCode(
            selectedSmsLink,
            orderNumber
        );

    }
}

document
    .getElementById("orderJust")
    .onclick = () => {
        sendOrderToKiosk("066617557");
    };

document
    .getElementById("orderRygos")
    .onclick = () => {
        sendOrderToKiosk("066617558");
    };

document
    .getElementById("closeKioskModal")
    .onclick = () => {
        kioskModal.remove();
    };

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