const cartItemsContainer =
    document.querySelector("#cartItems");

const cartSubtotalElement =
    document.querySelector("#cartSubtotal");

const cartDiscountElement =
    document.querySelector("#cartDiscount");

const cartTotalElement =
    document.querySelector("#cartTotal");

const checkoutButton =
    document.querySelector(".checkout-btn");

const CART_STORAGE_KEY = "traskisCart";
const DISCOUNT_RATE = 0.20;


/* =========================================
   KREPŠELIO DUOMENYS
========================================= */

function getCart() {
    try {
        const savedCart =
            JSON.parse(
                localStorage.getItem(
                    CART_STORAGE_KEY
                )
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


function saveCart(cart) {
    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

    renderCart();
    updateCartCount();
}


/* =========================================
   KAINOS IR SUMOS
========================================= */

function formatPrice(price) {
    const value =
        Number(price) || 0;

    return `${value
        .toFixed(2)
        .replace(".", ",")} €`;
}


function calculateCartSubtotal(cart) {
    return cart.reduce(
        (sum, item) => {
            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 0;

            return (
                sum +
                price * quantity
            );
        },
        0
    );
}


function calculateDiscount(subtotal) {
    return subtotal * DISCOUNT_RATE;
}


function calculateFinalTotal(
    subtotal,
    discount
) {
    return subtotal - discount;
}


function updateCartSummary(cart) {
    const subtotal =
        calculateCartSubtotal(cart);

    const discount =
        calculateDiscount(subtotal);

    const total =
        calculateFinalTotal(
            subtotal,
            discount
        );

    if (cartSubtotalElement) {
        cartSubtotalElement.textContent =
            formatPrice(subtotal);
    }

    if (cartDiscountElement) {
        cartDiscountElement.textContent =
            `−${formatPrice(discount)}`;
    }

    if (cartTotalElement) {
        cartTotalElement.textContent =
            formatPrice(total);
    }
}


/* =========================================
   KREPŠELIO PREKIŲ SKAIČIUS
========================================= */

function updateCartCount() {
    const cart = getCart();

    const totalQuantity =
        cart.reduce(
            (sum, item) => {
                return (
                    sum +
                    (
                        Number(
                            item.quantity
                        ) || 0
                    )
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
   KIEKIO KEITIMAS
========================================= */

function changeQuantity(
    index,
    amount
) {
    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    const currentQuantity =
        Number(
            cart[index].quantity
        ) || 0;

    cart[index].quantity =
        currentQuantity + amount;

    if (
        cart[index].quantity <= 0
    ) {
        cart.splice(index, 1);
    }

    saveCart(cart);
}


function removeCartItem(index) {
    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    saveCart(cart);
}


/* =========================================
   PADAŽAI IR GĖRIMAI
========================================= */

function normalizeChoices(
    item,
    pluralProperty,
    singleProperty
) {
    if (
        Array.isArray(
            item[pluralProperty]
        )
    ) {
        return item[pluralProperty]
            .filter(Boolean);
    }

    if (item[singleProperty]) {
        return [
            item[singleProperty]
        ];
    }

    return [];
}


function renderChoiceGroup(
    title,
    values
) {
    if (!values.length) {
        return "";
    }

    return `
        <div class="cart-choice-group">

            <strong>
                ${title}:
            </strong>

            <span>
                ${values.join(", ")}
            </span>

        </div>
    `;
}


/* =========================================
   TUŠČIAS KREPŠELIS
========================================= */

function renderEmptyCart() {
    if (!cartItemsContainer) {
        return;
    }

    cartItemsContainer.innerHTML = `
        <div class="empty-cart">

            <div class="empty-cart-icon">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>

            <h2>
                Jūsų krepšelis tuščias
            </h2>

            <p>
                Išsirinkite mėgstamiausius patiekalus iš mūsų meniu.
            </p>

            <a
                href="menu.html"
                class="empty-cart-btn"
            >
                Peržiūrėti meniu
            </a>

        </div>
    `;

    updateCartSummary([]);

    checkoutButton?.classList.add(
        "disabled"
    );

    checkoutButton?.setAttribute(
        "aria-disabled",
        "true"
    );
}


/* =========================================
   KREPŠELIO RODYMAS
========================================= */

function renderCart() {
    if (!cartItemsContainer) {
        return;
    }

    const cart = getCart();

    if (!cart.length) {
        renderEmptyCart();
        return;
    }

    checkoutButton?.classList.remove(
        "disabled"
    );

    checkoutButton?.removeAttribute(
        "aria-disabled"
    );

    cartItemsContainer.innerHTML =
        cart
            .map((item, index) => {
                const price =
                    Number(item.price) || 0;

                const quantity =
                    Math.max(
                        1,
                        Number(
                            item.quantity
                        ) || 1
                    );

                const itemTotal =
                    price * quantity;

                const sauces =
                    normalizeChoices(
                        item,
                        "sauces",
                        "sauce"
                    );

                const drinks =
                    normalizeChoices(
                        item,
                        "drinks",
                        "drink"
                    );

                return `
                    <article class="cart-item">

                        <div class="cart-item-image">

                            <img
                                src="${
                                    item.image ||
                                    "images/menu/placeholder.jpg"
                                }"
                                alt="${item.name || "Prekė"}"
                                onerror="
                                    this.onerror = null;
                                    this.src = 'images/menu/placeholder.jpg';
                                "
                            >

                        </div>

                        <div class="cart-item-info">

                            <h3>
                                ${item.name || "Prekė"}
                            </h3>

                            <div class="cart-item-options">

                                ${renderChoiceGroup(
                                    sauces.length === 1
                                        ? "Padažas"
                                        : "Padažai",
                                    sauces
                                )}

                                ${renderChoiceGroup(
                                    drinks.length === 1
                                        ? "Gėrimas"
                                        : "Gėrimai",
                                    drinks
                                )}

                            </div>

                            <span class="cart-item-price">
                                ${formatPrice(price)}
                            </span>

                        </div>

                        <div class="cart-quantity">

                            <button
                                type="button"
                                class="quantity-btn decrease-btn"
                                data-index="${index}"
                                aria-label="Sumažinti kiekį"
                            >
                                <i class="fa-solid fa-minus"></i>
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                class="quantity-btn increase-btn"
                                data-index="${index}"
                                aria-label="Padidinti kiekį"
                            >
                                <i class="fa-solid fa-plus"></i>
                            </button>

                        </div>

                        <strong class="cart-item-total">
                            ${formatPrice(itemTotal)}
                        </strong>

                        <button
                            type="button"
                            class="remove-item"
                            data-index="${index}"
                            aria-label="Pašalinti produktą"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </article>
                `;
            })
            .join("");

    updateCartSummary(cart);
}


/* =========================================
   PASPAUDIMAI
========================================= */

document.addEventListener(
    "click",
    event => {
        const increaseButton =
            event.target.closest(
                ".increase-btn"
            );

        if (increaseButton) {
            changeQuantity(
                Number(
                    increaseButton.dataset
                        .index
                ),
                1
            );

            return;
        }

        const decreaseButton =
            event.target.closest(
                ".decrease-btn"
            );

        if (decreaseButton) {
            changeQuantity(
                Number(
                    decreaseButton.dataset
                        .index
                ),
                -1
            );

            return;
        }

        const removeButton =
            event.target.closest(
                ".remove-item"
            );

        if (removeButton) {
            removeCartItem(
                Number(
                    removeButton.dataset
                        .index
                )
            );
        }
    }
);


checkoutButton?.addEventListener(
    "click",
    event => {
        if (!getCart().length) {
            event.preventDefault();
        }
    }
);


/* =========================================
   PALEIDIMAS
========================================= */

renderCart();
updateCartCount();