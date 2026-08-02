/* =========================================
   VILNIAUS TRAŠKIS
   MENIU, PASIRINKIMAI IR KREPŠELIS
========================================= */

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
        description:
            "Gruzdintos bulvytės, traški vištiena, padažas, sūris, svogūnai, jalapenai.",
        price: 9.50
    },

    {
        id: 5,
        name: "Traškis Bowl",
        category: "chicken",
        image: "images/menu/traskis-bowl.jpg",
        description:
            "Traški vištiena, bulvytės, padažas, sūris, svogūnai, jalapenai, skrudintas lavašas.",
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
        ],
        drinkCount: 1
    },

    {
        id: 7,
        name: "Traškios vištienos krūtinėlės kompleksas",
        category: "combos",
        image: "images/menu/juosteliu-kompleksas.jpg",
        description: "Gruzdintos bulvytės ir gėrimas.",
        variants: [
            {
                name: "Maža porcija 5 vnt.",
                price: 8.90
            },
            {
                name: "Didelė porcija 6 vnt.",
                price: 9.60
            }
        ],
        drinkCount: 1
    },

    {
        id: 8,
        name: "Burgerio kompleksas",
        category: "kompleksai",
        image:
            "images/menu/burgerio-kompleksas-su-traskia-vistiena.jpg",
        description: "Didelis burgerio kompleksas su gėrimu.",
        variants: [
            {
                name:
                    "Burgeris su traškia vištiena, sūriu ir stiksais + gėrimas",
                price: 8.50,
                image:
                    "images/menu/burgerio-kompleksas-su-traskia-vistiena.jpg"
            },
            {
                name:
                    "Burgeris su vištienos kebabo mėsa, stiksai + gėrimas",
                price: 8.50,
                image:
                    "images/menu/burgerio-kompleksas-su-kebabo-mesa.jpg"
            }
        ],
        drinkCount: 1
    },

    {
        id: 9,
        name: "Traškio firminio kebabo kompleksas",
        category: "combos",
        image: "images/menu/firminio-kebabo-kompleksas.jpg",
        description: "Gruzdintos bulvytės ir gėrimas.",
        price: 9.90,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 10,
        name: "Kebabo kompleksas",
        category: "combos",
        image: "images/menu/kebabo-kompleksas.jpg",
        description:
            "Kebabas su vištiena, sūriu ir stiksais + bulvytės + gėrimas.",
        price: 9.90,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 11,
        name: "Didelis Traškio firminis kebabas",
        category: "main",
        image: "images/menu/firminis-kebabas.jpg",
        description:
            "Kebabas su traškia vištiena, sūriu ir bulvių stiksais.",
        price: 7.50,
        sauceCount: 1
    },

    {
        id: 12,
        name: "Didelis vištienos kebabas",
        category: "kebabai",
        image: "images/menu/didelis-vistienos-kebabas.jpg",
        description:
            "Didelis vištienos kebabas su sūriu ir stiksais.",
        price: 7.50,
        sauceCount: 1
    },

    {
        id: 13,
        name: "Fish and Chips",
        category: "main",
        image: "images/menu/fish-and-chips.jpg",
        description:
            "Gruzdinta menkė tešloje, bulvytės, tartarų padažas.",
        price: 9.50
    },

    {
        id: 25,
        name: "Gruzdinti kaimiški koldūnai 25 vnt.",
        category: "main",
        image:
            "images/menu/gruzdinti-kaimiski-koldunai-25-vnt-su-suriu.jpg",
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
        image:
            "images/menu/burgeris-su-vistienos-kebabo-mesa.jpg",
        variants: [
            {
                name: "Burgeris su vištienos kebabo mėsa",
                price: 5.50,
                image:
                    "images/menu/burgeris-su-vistienos-kebabo-mesa.jpg"
            },
            {
                name: "Burgeris su traškia vištiena ir sūriu",
                price: 5.50,
                image:
                    "images/menu/burgeris-su-traskia-vistiena-ir-suriu.jpg"
            }
        ]
    },

    {
        id: 15,
        name: "12 sparnelių rinkinys",
        category: "sets",
        image: "images/menu/14-sparneliu.jpg",
        description:
            "12 sparnelių, 2 bulvytės + 2 gėrimai + 2 padažai.",
        price: 16.00,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 16,
        name: "12 petelių rinkinys",
        category: "sets",
        image: "images/menu/18-sparneliu.jpg",
        description:
            "12 petelių, 2 bulvytės + 2 gėrimai + 2 padažai.",
        price: 23.00,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 17,
        name: "12 vištienos krūtinėlės juostelių rinkinys",
        category: "sets",
        image: "images/menu/14-juosteliu.jpg",
        description:
            "12 vištienos krūtinėlės juostelių, 2 bulvytės + 2 gėrimai + 2 padažai.",
        price: 18.00,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 18,
        name: "18 vištienos krūtinėlės juostelių rinkinys",
        category: "sets",
        image: "images/menu/18-juosteliu.jpg",
        description:
            "18 vištienos krūtinėlės juostelių, 3 bulvytės + 3 gėrimai + 3 padažai.",
        price: 25.50,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 19,
        name: "18 vnt. sparnelių rinkinys",
        category: "sets",
        image: "images/menu/mazasis-miksas.jpg",
        description:
            "18 sparnelių, 3 bulvytės + 3 gėrimai + 3 padažai.",
        price: 23.00,
        sauceCount: 1,
        drinkCount: 1
    },

    {
        id: 20,
        name: "18 vnt. vištienos petelių rinkinys",
        category: "sets",
        image: "images/menu/didysis-miksas.jpg",
        description:
            "18 vnt. vištienos petelių, 3 bulvytės + 3 gėrimai + 3 padažai.",
        price: 25.50,
        sauceCount: 1,
        drinkCount: 1
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
                image:
                    "images/menu/gerimai/coca-cola-pepsi.jpg"
            },
            {
                name: "Sprite / 7UP",
                price: 2.00,
                image:
                    "images/menu/gerimai/sprite-7up.jpg"
            },
            {
                name: "Fanta / Mirinda",
                price: 2.00,
                image:
                    "images/menu/gerimai/fanta-mirinda.jpg"
            },
            {
                name: "Gazuotas vanduo",
                price: 2.00,
                image:
                    "images/menu/gerimai/gazuotas-vanduo.jpg"
            },
            {
                name: "Negazuotas vanduo",
                price: 2.00,
                image:
                    "images/menu/gerimai/negazuotas-vanduo.jpg"
            }
        ]
    }
];

window.products = products;

const SAUCES = [
    "Tartarų padažas",
    "Agurkinis padažas",
    "Česnakinis padažas",
    "BBQ padažas"
];

const DRINKS = [
    "Coca-Cola / Pepsi",
    "Sprite / 7UP",
    "Fanta / Mirinda",
    "Gazuotas vanduo",
    "Negazuotas vanduo"
];

const CART_KEY = "traskisCart";

const menuGrid =
    document.querySelector("#menuGrid");

function formatPrice(value) {
    const price = Number(value) || 0;

    return `${price
        .toFixed(2)
        .replace(".", ",")} €`;
}

function getCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem(CART_KEY)
        );

        return Array.isArray(cart)
            ? cart
            : [];
    } catch (error) {
        console.error(
            "Nepavyko nuskaityti krepšelio.",
            error
        );

        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
}

function updateCartCount() {
    const quantity = getCart().reduce(
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
            element.textContent = quantity;
        });
}

function createOptions(
    values
) {
    return values
        .map(value => {
            return `
                <option value="${value}">
                    ${value}
                </option>
            `;
        })
        .join("");
}

function createVariantField(product) {
    if (!Array.isArray(product.variants)) {
        return "";
    }

    return `
        <div class="product-option">

            <label>
                Pasirinkite variantą
            </label>

            <select
                class="product-variant"
                aria-label="${product.name} variantas"
            >
                ${product.variants
                    .map((variant, index) => {
                        return `
                            <option
                                value="${index}"
                                data-image="${
                                    variant.image ||
                                    product.image
                                }"
                            >
                                ${variant.name} –
                                ${formatPrice(
                                    variant.price
                                )}
                            </option>
                        `;
                    })
                    .join("")}
            </select>

        </div>
    `;
}

function createChoiceFields(
    type,
    count,
    choices
) {
    if (!count) {
        return "";
    }

    const title =
        type === "sauce"
            ? "padažą"
            : "gėrimą";

    const fields = [];

    for (
        let index = 0;
        index < count;
        index += 1
    ) {
        const numberText =
            count > 1
                ? ` ${index + 1}`
                : "";

        fields.push(`
            <div class="product-option">

                <label>
                    Pasirinkite ${title}${numberText} *
                </label>

                <select
                    class="product-choice product-${type}"
                    data-choice-type="${type}"
                    data-choice-index="${index}"
                    aria-label="Pasirinkite ${title}${numberText}"
                >
                    <option value="">
                        Pasirinkite ${title}
                    </option>

                    ${createOptions(choices)}
                </select>

                <small
                    class="product-option-error"
                    aria-live="polite"
                ></small>

            </div>
        `);
    }

    return fields.join("");
}

function createProductCard(product) {
    const firstVariant =
        product.variants?.[0];

    const price =
        firstVariant?.price ??
        product.price ??
        0;

    const image =
        firstVariant?.image ||
        product.image ||
        "images/menu/placeholder.jpg";

    return `
        <article
            class="menu-card"
            data-product-id="${product.id}"
            data-category="${product.category}"
        >

            <div class="menu-card-image">

                <img
                    src="${image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="
                        this.onerror = null;
                        this.src = 'images/menu/placeholder.jpg';
                    "
                >

            </div>

            <div class="menu-card-content">

                <div class="menu-card-main">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${
                            product.description ||
                            "Šviežiai paruoštas patiekalas."
                        }
                    </p>

                    <div class="menu-card-options">

                        ${createVariantField(product)}

                        ${createChoiceFields(
                            "sauce",
                            product.sauceCount || 0,
                            SAUCES
                        )}

                        ${createChoiceFields(
                            "drink",
                            product.drinkCount || 0,
                            DRINKS
                        )}

                    </div>

                </div>

                <div class="menu-card-bottom">

                    <strong class="product-price">
                        ${formatPrice(price)}
                    </strong>

                    <button
                        class="add-to-cart"
                        type="button"
                        data-product-id="${product.id}"
                    >
                        <i class="fa-solid fa-cart-plus"></i>

                        <span>
                            Pridėti
                        </span>
                    </button>

                </div>

            </div>

        </article>
    `;
}

function renderProducts(
    category = "all"
) {
    if (!menuGrid) {
        return;
    }

    const filtered =
        category === "all"
            ? products
            : products.filter(product => {
                return (
                    product.category ===
                    category
                );
            });

    menuGrid.innerHTML =
        filtered
            .map(createProductCard)
            .join("");
}

function getSelectedChoices(
    card,
    selector,
    label
) {
    const selects =
        Array.from(
            card.querySelectorAll(selector)
        );

    const values = [];

    for (const select of selects) {
        const error =
            select
                .closest(".product-option")
                ?.querySelector(
                    ".product-option-error"
                );

        if (!select.value) {
            select.classList.add(
                "input-error"
            );

            if (error) {
                error.textContent =
                    `Pasirinkite ${label}.`;
            }

            select.focus();

            return null;
        }

        select.classList.remove(
            "input-error"
        );

        if (error) {
            error.textContent = "";
        }

        values.push(select.value);
    }

    return values;
}

function getSelectedProduct(
    product,
    card
) {
    let name = product.name;
    let price =
        Number(product.price) || 0;

    let image =
        product.image ||
        "images/menu/placeholder.jpg";

    if (product.variants) {
        const variantSelect =
            card.querySelector(
                ".product-variant"
            );

        const variant =
            product.variants[
                Number(variantSelect?.value)
            ];

        if (!variant) {
            return null;
        }

        name =
            `${product.name} – ${variant.name}`;

        price =
            Number(variant.price) || 0;

        image =
            variant.image ||
            product.image ||
            image;
    }

    const sauces =
        getSelectedChoices(
            card,
            ".product-sauce",
            "padažą"
        );

    if (sauces === null) {
        return null;
    }

    const drinks =
        getSelectedChoices(
            card,
            ".product-drink",
            "gėrimą"
        );

    if (drinks === null) {
        return null;
    }

    return {
        name,
        price,
        image,
        sauces,
        drinks
    };
}

function createConfigurationKey(
    productId,
    selected
) {
    return JSON.stringify({
        productId,
        name: selected.name,
        sauces: selected.sauces,
        drinks: selected.drinks
    });
}

function addProductToCart(
    productId,
    card
) {
    const product =
        products.find(item => {
            return item.id === productId;
        });

    if (!product || !card) {
        return false;
    }

    const selected =
        getSelectedProduct(
            product,
            card
        );

    if (!selected) {
        return false;
    }

    const cart = getCart();

    const configurationKey =
        createConfigurationKey(
            product.id,
            selected
        );

    const existingItem =
        cart.find(item => {
            return (
                item.configurationKey ===
                configurationKey
            );
        });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: product.id,
            configurationKey,
            name: selected.name,
            price: selected.price,
            image: selected.image,
            quantity: 1,
            sauces: selected.sauces,
            drinks: selected.drinks,

            sauce:
                selected.sauces[0] ||
                "",

            drink:
                selected.drinks[0] ||
                ""
        });
    }

    saveCart(cart);

    if (typeof gtag === "function") {
        gtag("event", "add_to_cart", {
            currency: "EUR",
            value: selected.price,

            items: [
                {
                    item_id: product.id,
                    item_name:
                        selected.name,

                    item_variant: [
                        ...selected.sauces,
                        ...selected.drinks
                    ].join(" / "),

                    price: selected.price,
                    quantity: 1
                }
            ]
        });
    }

    showCartNotification(
        selected.name
    );

    animateCartIcon();

    return true;
}

let notificationTimeout;

function showCartNotification(
    productName
) {
    let notification =
        document.querySelector(
            ".cart-notification"
        );

    if (!notification) {
        notification =
            document.createElement("div");

        notification.className =
            "cart-notification";

        notification.setAttribute(
            "role",
            "status"
        );

        notification.setAttribute(
            "aria-live",
            "polite"
        );

        notification.innerHTML = `
            <i class="fa-solid fa-check"></i>

            <div>
                <strong>
                    Pridėta į krepšelį
                </strong>

                <span
                    class="cart-notification-product"
                ></span>
            </div>
        `;

        document.body.appendChild(
            notification
        );
    }

    const productElement =
        notification.querySelector(
            ".cart-notification-product"
        );

    if (productElement) {
        productElement.textContent =
            productName;
    }

    notification.classList.remove(
        "show"
    );

    requestAnimationFrame(() => {
        notification.classList.add(
            "show"
        );
    });

    clearTimeout(
        notificationTimeout
    );

    notificationTimeout =
        setTimeout(() => {
            notification.classList.remove(
                "show"
            );
        }, 2600);
}

function animateCartIcon() {
    document
        .querySelectorAll(
            ".cart, .cart-link"
        )
        .forEach(element => {
            element.classList.remove(
                "cart-bump"
            );

            void element.offsetWidth;

            element.classList.add(
                "cart-bump"
            );
        });
}

document.addEventListener(
    "click",
    event => {
        const addButton =
            event.target.closest(
                ".add-to-cart"
            );

        if (addButton) {
            const card =
                addButton.closest(
                    ".menu-card"
                );

            const productId =
                Number(
                    addButton.dataset
                        .productId
                );

            const added =
                addProductToCart(
                    productId,
                    card
                );

            if (!added) {
                return;
            }

            const oldContent =
                addButton.innerHTML;

            addButton.disabled = true;

            addButton.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>Pridėta</span>
            `;

            setTimeout(() => {
                addButton.innerHTML =
                    oldContent;

                addButton.disabled =
                    false;
            }, 1000);

            return;
        }

        const filterButton =
            event.target.closest(
                ".filter-btn"
            );

        if (filterButton) {
            document
                .querySelectorAll(
                    ".filter-btn"
                )
                .forEach(button => {
                    button.classList.remove(
                        "active"
                    );
                });

            filterButton.classList.add(
                "active"
            );

            renderProducts(
                filterButton.dataset
                    .category
            );
        }
    }
);

document.addEventListener(
    "change",
    event => {
        const select = event.target;

        if (
            select.matches(
                ".product-choice"
            )
        ) {
            select.classList.remove(
                "input-error"
            );

            const error =
                select
                    .closest(
                        ".product-option"
                    )
                    ?.querySelector(
                        ".product-option-error"
                    );

            if (error) {
                error.textContent = "";
            }

            return;
        }

        if (
            select.matches(
                ".product-variant"
            )
        ) {
            const card =
                select.closest(
                    ".menu-card"
                );

            const productId =
                Number(
                    card?.dataset
                        .productId
                );

            const product =
                products.find(item => {
                    return (
                        item.id ===
                        productId
                    );
                });

            const variant =
                product?.variants?.[
                    Number(select.value)
                ];

            if (!variant) {
                return;
            }

            const price =
                card.querySelector(
                    ".product-price"
                );

            if (price) {
                price.textContent =
                    formatPrice(
                        variant.price
                    );
            }

            const image =
                card.querySelector(
                    ".menu-card-image img"
                );

            if (image) {
                image.src =
                    variant.image ||
                    product.image;
            }
        }
    }
);

/* =========================================
   MOBILUS MENIU
========================================= */

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );

const navbar =
    document.querySelector(
        ".navbar"
    );

function closeMobileMenu() {
    navbar?.classList.remove(
        "active"
    );

    const icon =
        menuToggle?.querySelector("i");

    icon?.classList.remove(
        "fa-xmark"
    );

    icon?.classList.add(
        "fa-bars"
    );

    menuToggle?.setAttribute(
        "aria-expanded",
        "false"
    );
}

menuToggle?.addEventListener(
    "click",
    event => {
        event.stopPropagation();

        navbar?.classList.toggle(
            "active"
        );

        const isOpen =
            navbar?.classList.contains(
                "active"
            );

        const icon =
            menuToggle.querySelector("i");

        icon?.classList.toggle(
            "fa-bars",
            !isOpen
        );

        icon?.classList.toggle(
            "fa-xmark",
            Boolean(isOpen)
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(Boolean(isOpen))
        );
    }
);

navbar
    ?.querySelectorAll("a")
    .forEach(link => {
        link.addEventListener(
            "click",
            closeMobileMenu
        );
    });

document.addEventListener(
    "click",
    event => {
        if (
            navbar?.classList.contains(
                "active"
            ) &&
            !navbar.contains(event.target) &&
            !menuToggle?.contains(
                event.target
            )
        ) {
            closeMobileMenu();
        }
    }
);

/* =========================================
   AKTYVI NUORODA
========================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() ||
    "index.html";

document
    .querySelectorAll(
        ".navbar a"
    )
    .forEach(link => {
        const href =
            link.getAttribute("href");

        const page =
            href
                ?.split("/")
                .pop()
                ?.split("?")[0]
                ?.split("#")[0];

        link.classList.toggle(
            "active",
            page === currentPage
        );
    });

/* =========================================
   MOBILI APATINĖ NAVIGACIJA
========================================= */

function initializeMobileBottomNavigation() {
    if (
        document.querySelector(
            ".mobile-bottom-nav"
        )
    ) {
        return;
    }

    const navigation =
        document.createElement("nav");

    navigation.className =
        "mobile-bottom-nav";

    navigation.setAttribute(
        "aria-label",
        "Greitoji telefono navigacija"
    );

    navigation.innerHTML = `
        <a
            href="menu.html"
            data-page="menu.html"
        >
            <i class="fa-solid fa-utensils"></i>
            <span>Meniu</span>
        </a>

        <a href="tel:+37065088000">
            <i class="fa-solid fa-phone"></i>
            <span>Skambinti</span>
        </a>

        <a
            href="cart.html"
            data-page="cart.html"
        >
            <i class="fa-solid fa-cart-shopping"></i>

            <span>
                Krepšelis
            </span>

            <strong
                class="cart-count mobile-cart-count"
            >
                0
            </strong>
        </a>
    `;

    document.body.appendChild(
        navigation
    );

    navigation
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.page ===
                    currentPage
            );
        });
}

/* =========================================
   HERO NUOTRAUKŲ PERŽIŪRA
========================================= */

function initializeHeroLightbox() {
    const images =
        document.querySelectorAll(
            ".hero-gallery img"
        );

    if (!images.length) {
        return;
    }

    const lightbox =
        document.createElement("div");

    lightbox.className =
        "image-lightbox";

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

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

    document.body.appendChild(
        lightbox
    );

    const largeImage =
        lightbox.querySelector(
            ".image-lightbox-image"
        );

    const closeButton =
        lightbox.querySelector(
            ".image-lightbox-close"
        );

    function openLightbox(image) {
        largeImage.src =
            image.currentSrc ||
            image.src;

        largeImage.alt =
            image.alt ||
            "Vilniaus Traškio nuotrauka";

        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

        setTimeout(() => {
            largeImage.src = "";
        }, 250);
    }

    images.forEach(image => {
        image.addEventListener(
            "click",
            () => openLightbox(image)
        );
    });

    closeButton?.addEventListener(
        "click",
        closeLightbox
    );

    lightbox.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                lightbox
            ) {
                closeLightbox();
            }
        }
    );

    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key ===
                "Escape"
            ) {
                closeLightbox();
            }
        }
    );
}

/* =========================================
   ANALITIKA
========================================= */

document.addEventListener(
    "click",
    event => {
        const phone =
            event.target.closest(
                'a[href^="tel:"]'
            );

        if (
            phone &&
            typeof gtag === "function"
        ) {
            gtag(
                "event",
                "phone_click",
                {
                    phone_number:
                        phone
                            .getAttribute(
                                "href"
                            )
                            .replace(
                                "tel:",
                                ""
                            )
                }
            );
        }

        const map =
            event.target.closest(
                'a[href*="google.com/maps"], a[href*="maps.app.goo.gl"]'
            );

        if (
            map &&
            typeof gtag === "function"
        ) {
            gtag(
                "event",
                "map_click",
                {
                    destination:
                        map.href
                }
            );
        }
    }
);

document
    .querySelectorAll(
        ".current-year"
    )
    .forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });

renderProducts();
initializeMobileBottomNavigation();
initializeHeroLightbox();
updateCartCount();