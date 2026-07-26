const cartItemsContainer = document.querySelector("#cartItems");
const cartTotalElement = document.querySelector("#cartTotal");
const checkoutButton = document.querySelector(".checkout-btn");

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("traskisCart")) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("traskisCart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
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

function calculateCartTotal(cart) {
    return cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
}

function changeQuantity(index, amount) {
    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
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

function renderEmptyCart() {
    cartItemsContainer.innerHTML = `
        <div class="empty-cart">

            <div class="empty-cart-icon">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>

            <h2>Jūsų krepšelis tuščias</h2>

            <p>
                Išsirinkite mėgstamiausius patiekalus iš mūsų meniu.
            </p>

            <a href="menu.html" class="empty-cart-btn">
                Peržiūrėti meniu
            </a>

        </div>
    `;

    cartTotalElement.textContent = formatPrice(0);

    checkoutButton.classList.add("disabled");
    checkoutButton.setAttribute("aria-disabled", "true");
}

function renderCart() {
    const cart = getCart();

    if (!cartItemsContainer || !cartTotalElement) {
        return;
    }

    if (cart.length === 0) {
        renderEmptyCart();
        return;
    }

    checkoutButton.classList.remove("disabled");
    checkoutButton.removeAttribute("aria-disabled");

    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;

        return `
            <article class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="this.src='images/menu/placeholder.jpg'"
                    >

                </div>

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <span class="cart-item-price">
                        ${formatPrice(item.price)}
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

                    <span>${item.quantity}</span>

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
    }).join("");

    const cartTotal = calculateCartTotal(cart);

    cartTotalElement.textContent = formatPrice(cartTotal);
}

document.addEventListener("click", event => {
    const increaseButton = event.target.closest(".increase-btn");

    if (increaseButton) {
        changeQuantity(Number(increaseButton.dataset.index), 1);
        return;
    }

    const decreaseButton = event.target.closest(".decrease-btn");

    if (decreaseButton) {
        changeQuantity(Number(decreaseButton.dataset.index), -1);
        return;
    }

    const removeButton = event.target.closest(".remove-item");

    if (removeButton) {
        removeCartItem(Number(removeButton.dataset.index));
    }
});

if (checkoutButton) {
    checkoutButton.addEventListener("click", event => {
        if (getCart().length === 0) {
            event.preventDefault();
        }
    });
}

renderCart();
updateCartCount();