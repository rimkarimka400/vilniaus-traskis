/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
    "https://uzxwackufvrkfhmenhdy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_3ZLUZ_AAAuvwWJ3Ftr0jkQ_jwausLF0";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   REVIEWS FORM
========================= */

const reviewForm = document.querySelector("#reviewForm");
const reviewName = document.querySelector("#reviewName");
const reviewText = document.querySelector("#reviewText");
const reviewWebsite = document.querySelector("#reviewWebsite");

const reviewCharacterCount = document.querySelector(
    "#reviewCharacterCount"
);

const reviewFormMessage = document.querySelector(
    "#reviewFormMessage"
);

const reviewSubmitButton = reviewForm?.querySelector(
    ".submit-review-btn"
);


/* =========================
   CHARACTER COUNTER
========================= */

function updateReviewCharacterCount() {

    if (!reviewText || !reviewCharacterCount) {
        return;
    }

    const currentLength = reviewText.value.length;

    reviewCharacterCount.textContent = currentLength;

    const characterContainer =
        reviewCharacterCount.parentElement;

    characterContainer?.classList.remove(
        "limit-near",
        "limit-reached"
    );

    if (currentLength >= 300) {

        characterContainer?.classList.add(
            "limit-reached"
        );

    } else if (currentLength >= 250) {

        characterContainer?.classList.add(
            "limit-near"
        );

    }

}

reviewText?.addEventListener(
    "input",
    updateReviewCharacterCount
);


/* =========================
   FORM MESSAGE
========================= */

function showReviewMessage(message, type) {

    if (!reviewFormMessage) {
        return;
    }

    reviewFormMessage.textContent = message;

    reviewFormMessage.classList.remove(
        "success",
        "error",
        "show"
    );

    reviewFormMessage.classList.add(
        "show",
        type
    );

}

function clearReviewMessage() {

    if (!reviewFormMessage) {
        return;
    }

    reviewFormMessage.textContent = "";

    reviewFormMessage.classList.remove(
        "success",
        "error",
        "show"
    );

}


/* =========================
   REVIEW SUBMISSION
========================= */

reviewForm?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        clearReviewMessage();

        const selectedRating =
            reviewForm.querySelector(
                'input[name="rating"]:checked'
            );

        const name =
            reviewName.value.trim();

        const comment =
            reviewText.value.trim();

        const rating =
            Number(selectedRating?.value);

        /*
            Paslėptas laukas nuo robotų
        */

        if (reviewWebsite.value.trim() !== "") {
            return;
        }

        if (name.length < 2) {

            showReviewMessage(
                "Įrašykite savo vardą.",
                "error"
            );

            return;

        }

        if (!rating || rating < 1 || rating > 5) {

            showReviewMessage(
                "Pasirinkite įvertinimą žvaigždutėmis.",
                "error"
            );

            return;

        }

        if (comment.length < 10) {

            showReviewMessage(
                "Atsiliepimas turi būti bent 10 simbolių.",
                "error"
            );

            return;

        }

        reviewSubmitButton.disabled = true;
        reviewSubmitButton.textContent = "Siunčiama...";

        const { error } = await supabaseClient
            .from("reviews")
            .insert({
                name: name,
                rating: rating,
                comment: comment,
                approved: false
            });

        if (error) {

            console.error(
                "Atsiliepimo klaida:",
                error
            );

            showReviewMessage(
                "Atsiliepimo išsiųsti nepavyko. Bandykite dar kartą.",
                "error"
            );

            reviewSubmitButton.disabled = false;
            reviewSubmitButton.innerHTML = `
                <i class="fa-solid fa-paper-plane"></i>
                Pateikti atsiliepimą
            `;

            return;

        }

        showReviewMessage(
            "Ačiū! Atsiliepimas pateiktas ir bus rodomas po patvirtinimo.",
            "success"
        );

        reviewForm.reset();

        updateReviewCharacterCount();

        reviewSubmitButton.disabled = false;
        reviewSubmitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Pateikti atsiliepimą
        `;

    }
);
/* =========================
   LOAD APPROVED REVIEWS
========================= */

function escapeReviewHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}

async function loadApprovedReviews() {

    const reviewsContainer =
        document.querySelector("#reviewsList") ||
        document.querySelector(".reviews-list") ||
        document.querySelector(".reviews-empty")?.parentElement;

    if (!reviewsContainer) {
        console.error("Nerastas atsiliepimų sąrašo laukelis.");
        return;
    }

    reviewsContainer.innerHTML = `
        <div class="reviews-empty">
            <p>Kraunami atsiliepimai...</p>
        </div>
    `;

    const { data, error } = await supabaseClient
        .from("reviews")
        .select("id, name, rating, comment, created_at")
        .eq("approved", true)
        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(
            "Atsiliepimų užkrovimo klaida:",
            error
        );

        reviewsContainer.innerHTML = `
            <div class="reviews-empty">

                <div class="reviews-empty-icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>

                <h3>Nepavyko užkrauti</h3>

                <p>
                    Atnaujinkite puslapį ir bandykite dar kartą.
                </p>

            </div>
        `;

        return;
    }

    if (!data || data.length === 0) {

        reviewsContainer.innerHTML = `
            <div class="reviews-empty">

                <div class="reviews-empty-icon">
                    <i class="fa-solid fa-comment-dots"></i>
                </div>

                <h3>Būkite pirmieji!</h3>

                <p>
                    Pirmasis klientų atsiliepimas bus
                    parodytas šioje vietoje.
                </p>

            </div>
        `;

        return;
    }

    reviewsContainer.innerHTML = data
        .map(review => {

            const rating = Number(review.rating);

            const stars =
                "★".repeat(rating) +
                "☆".repeat(5 - rating);

            const date = new Date(
                review.created_at
            ).toLocaleDateString("lt-LT");

            return `
                <article class="review-card">

                    <div class="review-card-top">

                        <strong>
                            ${escapeReviewHtml(review.name)}
                        </strong>

                        <span class="review-date">
                            ${date}
                        </span>

                    </div>

                    <div
                        class="review-stars"
                        aria-label="${rating} žvaigždutės iš 5"
                    >
                        ${stars}
                    </div>

                    <p>
                        ${escapeReviewHtml(review.comment)}
                    </p>

                </article>
            `;

        })
        .join("");

}

/* =========================
   INITIAL STATE
========================= */

updateReviewCharacterCount();
loadApprovedReviews();