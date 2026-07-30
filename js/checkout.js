const RESTAURANT_PHONE = "+37065088000";

const orderForm = document.querySelector("#orderForm");
const checkoutItems = document.querySelector("#checkoutItems");
const checkoutTotal = document.querySelector("#checkoutTotal");
const pickupTimeInput = document.querySelector(
    "#pickupTime"
);
const qrModal = document.querySelector("#qrModal");
const qrClose = document.querySelector("#qrClose");
const qrCodeContainer = document.querySelector("#qrCode");
const orderSentButton = document.querySelector("#orderSentBtn");
const smsConfirmModal = document.querySelector("#smsConfirmModal");
const smsSentButton = document.querySelector("#smsSentBtn");
const smsNotSentButton = document.querySelector("#smsNotSentBtn");
const customerPhoneInput = document.querySelector(
    "#customerPhone"
);
let smsConfirmationShown = false;
const qrOrderNumber = document.querySelector("#qrOrderNumber");

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("traskisCart")) || [];
    } catch {
        return [];
    }
}

function formatPrice(price) {
    return `${price.toFixed(2).replace(".", ",")} €`;
}

function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = totalQuantity;
    });
}

function calculateTotal(cart) {
    return cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
}

function renderCheckout() {
    const cart = getCart();

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="checkout-empty">
                <i class="fa-solid fa-cart-shopping"></i>

                <p>Jūsų krepšelis tuščias.</p>

                <a href="menu.html">
                    Grįžti į meniu
                </a>
            </div>
        `;

        checkoutTotal.textContent = "0,00 €";

        const submitButton = orderForm?.querySelector(".send-order-btn");

        if (submitButton) {
            submitButton.disabled = true;
        }

        return;
    }

    checkoutItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;

        return `
            <div class="checkout-product">

                <span>
                    ${item.quantity} × ${item.name}
                </span>

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </div>
        `;
    }).join("");

    checkoutTotal.textContent = formatPrice(calculateTotal(cart));
}

function generateOrderNumber() {
    const savedOrderNumber = sessionStorage.getItem(
        "traskisOrderNumber"
    );

    if (savedOrderNumber) {
        return savedOrderNumber;
    }

    const randomNumber = Math.floor(
        1000 + Math.random() * 9000
    );

    const orderNumber = `TR-${randomNumber}`;

    sessionStorage.setItem(
        "traskisOrderNumber",
        orderNumber
    );

    return orderNumber;
}

function createOrderMessage(formData, cart, orderNumber) {
    const productsText = cart.map(item => {
        const itemTotal = item.price * item.quantity;

        return `${item.quantity} x ${item.name} - ${formatPrice(itemTotal)}`;
    }).join("\n");

    const total = calculateTotal(cart);

    const comment = formData.comment
        ? formData.comment
        : "Nėra";

    return `UŽSAKYMAS NR. ${orderNumber}

Vardas: ${formData.name}
Telefonas: ${formData.phone}

UŽSAKYMAS:
${productsText}

Viso: ${formatPrice(total)}

Atsiėmimo būdas:
${formData.pickupType}

Pageidaujamas laikas:
${formData.pickupTime}

Komentaras:
${comment}`;
}

function createSmsLink(message) {
    const encodedMessage = encodeURIComponent(message);

    const isIOS = /iPad|iPhone|iPod/.test(
        navigator.userAgent
    );

    const separator = isIOS ? "&" : "?";

    return `sms:${RESTAURANT_PHONE}${separator}body=${encodedMessage}`;
}

function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(
        navigator.userAgent
    );
}

function showQrCode(smsLink, orderNumber) {
    if (!qrModal || !qrCodeContainer) {
        return;
    }

    qrCodeContainer.innerHTML = "";

    new QRCode(qrCodeContainer, {
        text: smsLink,
        width: 220,
        height: 220,
        correctLevel: QRCode.CorrectLevel.M
    });

    qrOrderNumber.textContent = `Užsakymo numeris: ${orderNumber}`;

    qrModal.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeQrModal() {
    qrModal?.classList.remove("active");

    document.body.style.overflow = "";
}
/* =========================
   PHONE NUMBER VALIDATION
========================= */

function cleanPhoneNumber(phone) {
    return phone.replace(/[\s()-]/g, "");
}

function normalizeLithuanianPhone(phone) {
    const cleanedPhone = cleanPhoneNumber(phone);

    if (/^86\d{7}$/.test(cleanedPhone)) {
        return `+370${cleanedPhone.slice(1)}`;
    }

    if (/^\+3706\d{7}$/.test(cleanedPhone)) {
        return cleanedPhone;
    }

    return null;
}

customerPhoneInput?.addEventListener("input", () => {
    customerPhoneInput.setCustomValidity("");
});

customerPhoneInput?.addEventListener("blur", () => {
    const normalizedPhone = normalizeLithuanianPhone(
        customerPhoneInput.value
    );

    if (normalizedPhone) {
        customerPhoneInput.value = normalizedPhone;
        customerPhoneInput.setCustomValidity("");
    }


});
orderForm?.addEventListener("submit", event => {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
        return;
    }

    const customerName = document
        .querySelector("#customerName")
        .value
        .trim();

    const enteredPhone = customerPhoneInput.value.trim();

const customerPhone = normalizeLithuanianPhone(
    enteredPhone
);
if (typeof gtag === "function") {
    gtag("event", "begin_checkout", {
        currency: "EUR",
        value: calculateTotal(cart),
        items: cart.map(item => ({
            item_id: item.productId,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
        }))
    });
}

if (!customerPhone) {
    customerPhoneInput.setCustomValidity(
        "Įveskite teisingą Lietuvos mobiliojo telefono numerį."
    );

    customerPhoneInput.reportValidity();
    customerPhoneInput.focus();

    return;
}

customerPhoneInput.setCustomValidity("");

    const pickupType = document
        .querySelector("#pickupType")
        .value;

    const pickupTime = document

 .querySelector("#pickupTime")
    .value;

    const customerComment = document
        .querySelector("#customerComment")
        .value
        .trim();

    if (
        !customerName ||
        !customerPhone ||
        !pickupTime
    ) {
        orderForm.reportValidity();
        return;
    }

    const orderNumber = generateOrderNumber();

    const formData = {
        name: customerName,
        phone: customerPhone,
        pickupType,
        pickupTime,
        comment: customerComment
    };

    const orderMessage = createOrderMessage(
        formData,
        cart,
        orderNumber
    );

    const smsLink = createSmsLink(orderMessage);

    if (isMobileDevice()) {
    sessionStorage.setItem(
        "traskisPendingSmsOrder",
        "true"
    );

    window.location.href = smsLink;
} else {showQrCode(smsLink, orderNumber);
}
});

qrClose?.addEventListener("click", closeQrModal);

qrModal?.addEventListener("click", event => {
    if (event.target === qrModal) {
        closeQrModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeQrModal();
    }
});

orderSentButton?.addEventListener("click", () => {
    const orderNumber =
        sessionStorage.getItem("traskisOrderNumber") || "";

    localStorage.removeItem("traskisCart");
    sessionStorage.removeItem("traskisOrderNumber");

    qrModal.innerHTML = `
        <div class="qr-modal-content order-success">

            <div class="order-success-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <span class="qr-label">UŽSAKYMAS PATEIKTAS</span>

            <h2>Ačiū už užsakymą!</h2>

            <p>
                Jūsų užsakymas perduotas kebabinei.
                Lauksime jūsų atvykstant.
            </p>

            <strong>
                Užsakymo numeris: ${orderNumber}
            </strong>

            <a href="menu.html" class="order-success-link">
                Grįžti į meniu
            </a>

        </div>
    `;

    updateCartCount();
})

;function openSmsConfirmation() {
    const pendingOrder = sessionStorage.getItem(
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

    smsConfirmModal.classList.add("active");
    smsConfirmModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function closeSmsConfirmation() {
    smsConfirmModal?.classList.remove("active");
    smsConfirmModal?.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

smsNotSentButton?.addEventListener("click", () => {
    sessionStorage.removeItem("traskisPendingSmsOrder");

    smsConfirmationShown = false;

    closeSmsConfirmation();
});

smsSentButton?.addEventListener("click", () => {
    const orderNumber =
        sessionStorage.getItem("traskisOrderNumber") || "";

    localStorage.removeItem("traskisCart");
    sessionStorage.removeItem("traskisOrderNumber");
    sessionStorage.removeItem("traskisPendingSmsOrder");

    updateCartCount();
    renderCheckout();

    smsConfirmModal.innerHTML = `
        <div class="sms-confirm-content order-success">

            <div class="order-success-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <span class="qr-label">
                UŽSAKYMAS PATEIKTAS
            </span>

            <h2>Ačiū už užsakymą!</h2>

            <p>
                Jūsų SMS užsakymas išsiųstas kebabinei.
                Lauksime jūsų atvykstant.
            </p>

            <strong>
                Užsakymo numeris: ${orderNumber}
            </strong>

            <a href="menu.html" class="order-success-link">
                Grįžti į meniu
            </a>

        </div>
    `;
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        setTimeout(openSmsConfirmation, 350);
    }
});

window.addEventListener("pageshow", () => {
    setTimeout(openSmsConfirmation, 350);
});

renderCheckout();
updateCartCount();