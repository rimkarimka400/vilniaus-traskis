const products = [

    {
        id: 1,
        name: "Traškūs vištienos sparneliai",
        category: "chicken",
        image: "images/menu/sparneliai.jpg",
        variants: [
            {
                name: "Maža porcija – 5 vnt.",
                price: 5.40
            },
            {
                name: "Didelė porcija – 6 vnt.",
                price: 6.10
            }
        ]
    },

    {
        id: 2,
        name: "Traškios vištienos krūtinėlės juostelės",
        category: "chicken",
        image: "images/menu/juosteles.jpg",
        variants: [
            {
                name: "Maža porcija – 5 vnt.",
                price: 6.10
            },
            {
                name: "Didelė porcija – 6 vnt.",
                price: 6.80
            }
        ]
    },

    {
    id: 3,
    name: "Gruzdintos bulvytės",
    category: "chicken",
    image: "images/menu/bulvytes.jpg",
    variants: [
        {
            name: "Bulvytės",
            price: 3.70
        },
        {
            name: "Bulvytės + sūris",
            price: 4.70
        }
    ]
},

    {
        id: 4,
        name: "Kapsalonas",
        category: "chicken",
        image: "images/menu/kapsalonas.jpg",
        description: "Gruzdintos bulvytės, traški vištiena, padažas, sūris, svogūnai, jalapenai.",
        price: 9.50
    },

    {
        id: 5,
        name: "Traškis Bowl",
        category: "chicken",
        image: "images/menu/traskis-bowl.jpg",
        description: "Traški vištiena, bulvytės, padažas, sūris, svogūnai, jalapenai, skrudintas lavašas.",
        price: 9.70
    },

    {
        id: 6,
        name: "Sparnelių kompleksas",
        category: "combos",
        image: "images/menu/sparneliu-kompleksas.jpg",
        description: "Gruzdintos bulvytės ir gėrimas.",
        variants: [
            {
                name: "Maža porcija 5 vnt.",
                price: 8.10
            },
            {
                name: "Didelė porcija 6 vnt.",
                price: 8.90
            }
        ]
    },

    {
        id: 7,
        name: "Traškios vištienos krūtinėlės kompleksas",
        category: "combos",
        image: "images/menu/juosteliu-kompleksas.jpg",
        description: "Gruzdintos bulvytės ir gėrimas.",
        variants: [
            {
                name: "Maža porcija 5vnt.",
                price: 8.90
            },
            {
                name: "Didelė porcija 6vnt.",
                price: 9.60
            }
        ]
    },

    {
    id: 8,
    name: "Burgerio kompleksas",
    category: "kompleksai",
    image: "images/menu/burgerio-kompleksas-su-traskia-vistiena.jpg",
    description: "Didelis burgerio kompleksas su gėrimu.",
    variants: [
        {
            name: "Burgeris su traškia vištiena, sūriu ir stiksais + gėrimas (didelis)",
            price: 8.50,
            image: "images/menu/burgerio-kompleksas-su-traskia-vistiena.jpg"
        },
        {
            name: "Burgeris su vištienos kebabo mėsa, stiksai + gėrimas (didelis)",
            price: 8.50,
            image: "images/menu/burgerio-kompleksas-su-kebabo-mesa.jpg"
        }
    ]
},

    {
        id: 9,
        name: "Traškio firminio kebabo kompleksas",
        category: "combos",
        image: "images/menu/firminio-kebabo-kompleksas.jpg",
        description: "Gruzdintos bulvytės ir gėrimas.",
        price: 9.90
    },

    {
        id: 10,
        name: "Kebabo kompleksas",
        category: "combos",
        image: "images/menu/kebabo-kompleksas.jpg",
        description: "Kebabas su vištiena, sūriu ir stiksais + bulvytės + gėrimas.",
        price: 9.90
    },

    {
        id: 11,
        name: "Didelis Traškio firminis kebabas",
        category: "main",
        image: "images/menu/firminis-kebabas.jpg",
        description: "Kebabas su traškia vištiena, sūriu ir bulvių stiksais.",
        price: 7.50
    },

    {
    id: 12,
    name: "Didelis vištienos kebabas",
    category: "kebabai",
    image: "images/menu/didelis-vistienos-kebabas.jpg",
    description: "Didelis vištienos kebabas su sūriu ir stiksais.",
    price: 7.50
},

    {
        id: 13,
        name: "Fish and Chips",
        category: "main",
        image: "images/menu/fish-and-chips.jpg",
        description: "Gruzdinta menkė tešloje, bulvytės, tartarų padažas.",
        price: 9.50
    },
{
    id: 25,
    name: "Gruzdinti kaimiški koldūnai 25vnt.",
    category: "main",
    image: "images/menu/gruzdinti-kaimiski-koldunai-25-vnt-su-suriu.jpg",
    variants: [
        {
            name: "Be sūrio",
            price: 7.00
        },
        {
            name: "Su sūriu",
            price: 8.00
        }
    ]
},
    {
    id: 14,
    name: "Burgeris",
    category: "burgeriai",
    image: "images/menu/burgeris-su-vistienos-kebabo-mesa.jpg",
    variants: [
        {
            name: "Burgeris su vištienos kebabo mėsa",
            price: 5.50,
            image: "images/menu/burgeris-su-vistienos-kebabo-mesa.jpg"
        },
        {
            name: "Burgeris su traškia vištiena ir sūriu",
            price: 5.50,
            image: "images/menu/burgeris-su-traskia-vistiena-ir-suriu.jpg"
        }
    ]
},

    {
        id: 15,
        name: "12 sparnelių rinkinys",
        category: "sets",
        image: "images/menu/14-sparneliu.jpg",
        description: "12 sparnelių, 2 bulvytės + 2 gėrimai + 2 padažai.",
        price: 16.00
    },

    {
        id: 16,
        name: "12 petelių rinkinys",
        category: "sets",
        image: "images/menu/18-sparneliu.jpg",
        description: "12 petelių, 2 bulvytės + 2 gėrimai + 2 padažai.",
        price: 23.00
    },

    {
        id: 17,
        name: "12 vištienos krūtinėlės juostelių rinkinys",
        category: "sets",
        image: "images/menu/14-juosteliu.jpg",
        description: "12 vištienos krūtinėlės juostelių, 2 bulvytės + 2 gėrimai + 2 padažai",
        price: 18.00
    },

    {
        id: 18,
        name: "18 vištienos krūtinėlės juostelių rinkinys",
        category: "sets",
        image: "images/menu/18-juosteliu.jpg",
        description: "18 vištienos krūtinėlės juostelių, 3 bulvytės + 3 gėrimai + 3 padažai.",
        price: 25.50
    },

    {
        id: 19,
        name: "18 vnt. sparnelių",
        category: "sets",
        image: "images/menu/mazasis-miksas.jpg",
        description: "18 sparnelių, 3 bulvytės + 3 gėrimai + padažai.",
        price: 23.00
    },

    {
        id: 20,
        name: "18 vnt. vištienos petelių",
        category: "sets",
        image: "images/menu/didysis-miksas.jpg",
        description: "18 vnt. vištienos petelių, 3 bulvytės + 3 gėrimai + 3 padažai.",
        price: 25.50
    },

    {
        id: 21,
        name: "Mozzarella lazdelės",
        category: "extras",
        image: "images/menu/mozzarella-lazdeles.jpg",
        price: 7.00
    },

    {
        id: 22,
        name: "Jalapenai su čederio sūriu",
        category: "extras",
        image: "images/menu/jalapenai-su-cederio-suriu.jpg",
        price: 7.00
    },

    {
    id: 23,
    name: "Padažas",
    category: "extras",
    image: "images/menu/padazai/tartaru.jpg",
    variants: [
        {
            name: "Tartarų padažas",
            price: 0.70,
            image: "images/menu/padazai/tartaru.jpg"
        },
        {
            name: "Agurkinis padažas",
            price: 0.70,
            image: "images/menu/padazai/agurkinis.jpg"
        },
        {
            name: "Česnakinis padažas",
            price: 0.70,
            image: "images/menu/padazai/cesnakinis.jpg"
        },
        {
            name: "BBQ padažas",
            price: 0.70,
            image: "images/menu/padazai/bbq.jpg"
        }
    ]
},


    {
    id: 24,
    name: "Gėrimas",
    category: "extras",
    image: "images/menu/gerimai/coca-cola-pepsi.jpg",
    variants: [
        {
            name: "Coca-Cola / Pepsi",
            price: 2.00,
            image: "images/menu/gerimai/coca-cola-pepsi.jpg"
        },
        {
            name: "Sprite / 7UP",
            price: 2.00,
            image: "images/menu/gerimai/sprite-7up.jpg"
        },
        {
            name: "Fanta / Mirinda",
            price: 2.00,
            image: "images/menu/gerimai/fanta-mirinda.jpg"
        },
        {
            name: "Gazuotas vanduo",
            price: 2.00,
            image: "images/menu/gerimai/gazuotas-vanduo.jpg"
        },
        {
            name: "Negazuotas vanduo",
            price: 2.00,
            image: "images/menu/gerimai/negazuotas-vanduo.jpg"
        }
    ]
}

];

window.products = products;

const menuGrid = document.querySelector("#menuGrid");

function formatPrice(price) {

    return `${price.toFixed(2).replace(".", ",")} €`;

}

function createProductCard(product) {

    const firstVariant = product.variants
        ? product.variants[0]
        : null;

    const firstPrice = firstVariant
        ? firstVariant.price
        : product.price;

    const firstImage = firstVariant?.image || product.image;

    const variantsHtml = product.variants
        ? `
            <select class="product-variant">

                ${product.variants.map((variant, index) => `
                    <option
                        value="${index}"
                        data-image="${variant.image || product.image}"
                    >
                        ${variant.name} – ${formatPrice(variant.price)}
                    </option>
                `).join("")}

            </select>
        `
        : "";

    return `
        <article
            class="menu-card"
            data-category="${product.category}"
            data-product-id="${product.id}"
        >

            <div class="menu-card-image">

                <img
                    src="${firstImage}"
                    alt="${product.name}"
                    onerror="this.onerror=null; this.src='images/menu/placeholder.jpg';"
                >

            </div>

            <div class="menu-card-content">

                <h3>${product.name}</h3>

                ${
                    product.description
                        ? `<p>${product.description}</p>`
                        : `<p>Šviežiai paruoštas patiekalas.</p>`
                }

                ${variantsHtml}

                <div class="menu-card-bottom">

                    <strong class="product-price">
                        ${formatPrice(firstPrice)}
                    </strong>

                    <button
                        class="add-to-cart"
                        type="button"
                        data-product-id="${product.id}"
                    >

                        <i class="fa-solid fa-cart-plus"></i>

                        Pridėti

                    </button>

                </div>

            </div>

        </article>
    `;

}

function renderProducts(category = "all") {

    if (!menuGrid) {
        return;
    }

    const filteredProducts = category === "all"
        ? products
        : products.filter(product => product.category === category);

    menuGrid.innerHTML = filteredProducts
        .map(createProductCard)
        .join("");

}

function getCart() {

    try {

        return JSON.parse(localStorage.getItem("traskisCart")) || [];

    } catch {

        return [];

    }

}

function saveCart(cart) {

    localStorage.setItem("traskisCart", JSON.stringify(cart));

    updateCartCount();

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

function addProductToCart(productId, card) {

    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    let selectedName = product.name;
    let selectedPrice = product.price;
    let selectedImage = product.image;

    if (product.variants) {

        const select = card.querySelector(".product-variant");

        if (!select) {
            return;
        }

        const variantIndex = Number(select.value);
        const selectedVariant = product.variants[variantIndex];

        if (!selectedVariant) {
            return;
        }

        selectedName = `${product.name} – ${selectedVariant.name}`;
        selectedPrice = selectedVariant.price;
        selectedImage = selectedVariant.image || product.image;

    }

    const cart = getCart();

    const existingItem = cart.find(item =>
        item.productId === product.id &&
        item.name === selectedName
    );

    if (existingItem) {

        existingItem.quantity += 1;
        existingItem.image = selectedImage;

    } else {

        cart.push({
            productId: product.id,
            name: selectedName,
            price: selectedPrice,
            quantity: 1,
            image: selectedImage
        });

    }

    saveCart(cart);

}

document.addEventListener("change", event => {

    if (!event.target.matches(".product-variant")) {
        return;
    }

    const card = event.target.closest(".menu-card");

    const productId = Number(
        card.querySelector(".add-to-cart").dataset.productId
    );

    const product = products.find(item => item.id === productId);

    const variant = product.variants[Number(event.target.value)];

    card.querySelector(".product-price").textContent =
        formatPrice(variant.price);

});

document.addEventListener("click", event => {

    const addButton = event.target.closest(".add-to-cart");

    if (addButton) {

        const card = addButton.closest(".menu-card");

        const productId = Number(addButton.dataset.productId);

        addProductToCart(productId, card);

        const originalText = addButton.innerHTML;

        addButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Pridėta
        `;

        setTimeout(() => {

            addButton.innerHTML = originalText;

        }, 1000);

    }

    const filterButton = event.target.closest(".filter-btn");

    if (filterButton) {

        document.querySelectorAll(".filter-btn").forEach(button => {

            button.classList.remove("active");

        });

        filterButton.classList.add("active");

        renderProducts(filterButton.dataset.category);

    }

});

renderProducts();

updateCartCount();/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle?.addEventListener("click", () => {
    navbar?.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navbar?.classList.contains("active")) {
        icon?.classList.remove("fa-bars");
        icon?.classList.add("fa-xmark");
        menuToggle.setAttribute("aria-expanded", "true");
    } else {
        icon?.classList.remove("fa-xmark");
        icon?.classList.add("fa-bars");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

navbar?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");

        const icon = menuToggle?.querySelector("i");

        icon?.classList.remove("fa-xmark");
        icon?.classList.add("fa-bars");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

document.addEventListener("click", event => {
    if (
        navbar?.classList.contains("active") &&
        !navbar.contains(event.target) &&
        !menuToggle?.contains(event.target)
    ) {
        navbar.classList.remove("active");

        const icon = menuToggle?.querySelector("i");

        icon?.classList.remove("fa-xmark");
        icon?.classList.add("fa-bars");
        menuToggle?.setAttribute("aria-expanded", "false");
    }
});/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const currentPage = window.location.pathname
    .split("/")
    .pop() || "index.html";

document.querySelectorAll(".navbar a").forEach(link => {
    const linkPage = link.getAttribute("href");

    link.classList.toggle("active", linkPage === currentPage);
});/* =========================
   ADD TO CART FEEDBACK
========================= */

(() => {
    let notificationTimeout;

    function getCartNotification() {
        let notification = document.querySelector(".cart-notification");

        if (!notification) {
            notification = document.createElement("div");

            notification.className = "cart-notification";
            notification.setAttribute("role", "status");
            notification.setAttribute("aria-live", "polite");

            notification.innerHTML = `
                <i class="fa-solid fa-check"></i>

                <div>
                    <strong>Pridėta į krepšelį</strong>
                    <span class="cart-notification-product"></span>
                </div>
            `;

            document.body.appendChild(notification);
        }

        return notification;
    }

    function showCartNotification(productName) {
        const notification = getCartNotification();

        const productElement = notification.querySelector(
            ".cart-notification-product"
        );

        productElement.textContent = productName || "Produktas";

        notification.classList.remove("show");

        requestAnimationFrame(() => {
            notification.classList.add("show");
        });

        clearTimeout(notificationTimeout);

        notificationTimeout = setTimeout(() => {
            notification.classList.remove("show");
        }, 2600);
    }

    function animateCartIcon() {
        document.querySelectorAll(".cart").forEach(cart => {
            cart.classList.remove("cart-bump");

            void cart.offsetWidth;

            cart.classList.add("cart-bump");
        });
    }

    document.addEventListener("click", event => {
        const addButton = event.target.closest(".add-cart-btn");

        if (!addButton || addButton.disabled) {
            return;
        }

        const productCard = addButton.closest(".product-card");

        const productName = productCard
            ?.querySelector("h2, h3, .product-name")
            ?.textContent
            ?.trim();

        setTimeout(() => {
            showCartNotification(productName);
            animateCartIcon();
        }, 50);
    });
})();/* =========================
   CURRENT YEAR
========================= */

document.querySelectorAll(".current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
});/* =========================
   HERO IMAGE LIGHTBOX
========================= */

(() => {
    const galleryImages = document.querySelectorAll(
        ".hero-gallery img"
    );

    if (!galleryImages.length) {
        return;
    }

    const lightbox = document.createElement("div");

    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
        <div class="image-lightbox-content">

            <button
                type="button"
                class="image-lightbox-close"
                aria-label="Uždaryti nuotrauką"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

            <img
                class="image-lightbox-image"
                src=""
                alt=""
            >

        </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(
        ".image-lightbox-image"
    );

    const closeButton = lightbox.querySelector(
        ".image-lightbox-close"
    );

    function openLightbox(image) {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Vilniaus Traškio nuotrauka";

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        setTimeout(() => {
            lightboxImage.src = "";
        }, 250);
    }

    galleryImages.forEach(image => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute(
            "aria-label",
            `${image.alt || "Nuotrauka"} – atidaryti didesnę`
        );

        image.addEventListener("click", () => {
            openLightbox(image);
        });

        image.addEventListener("keydown", event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {
            closeLightbox();
        }
    });
})();/* =========================
   MOBILE BOTTOM NAVIGATION
========================= */

(() => {
    if (document.querySelector(".mobile-bottom-nav")) {
        return;
    }

    const mobileNavigation = document.createElement("nav");

    mobileNavigation.className = "mobile-bottom-nav";
    mobileNavigation.setAttribute(
        "aria-label",
        "Greitoji telefono navigacija"
    );

    mobileNavigation.innerHTML = `
        <a href="menu.html" data-page="menu.html">

            <i class="fa-solid fa-utensils"></i>

            <span>Meniu</span>

        </a>

        <a href="tel:+37065088000">

            <i class="fa-solid fa-phone"></i>

            <span>Skambinti</span>

        </a>

        <a href="cart.html" data-page="cart.html">

            <i class="fa-solid fa-cart-shopping"></i>

            <span>Krepšelis</span>

            <strong class="cart-count mobile-cart-count">
                0
            </strong>

        </a>
    `;

    document.body.appendChild(mobileNavigation);

    const page =
        window.location.pathname.split("/").pop() ||
        "index.html";

    mobileNavigation
        .querySelectorAll("[data-page]")
        .forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.page === page
            );
        });
})();/* =========================
   VARIANT IMAGE CHANGE
========================= */

menuGrid?.addEventListener("change", event => {

    const variantSelect = event.target.closest(
        ".product-variant"
    );

    if (!variantSelect) {
        return;
    }

    const selectedOption =
        variantSelect.options[variantSelect.selectedIndex];

    const selectedImage = selectedOption.dataset.image;

    if (!selectedImage) {
        return;
    }

    const productCard = variantSelect.closest(".menu-card");

    const productImage = productCard?.querySelector(
        ".menu-card-image img"
    );

    if (productImage) {
        productImage.src = selectedImage;
    }

});