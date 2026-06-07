const page = document.querySelector(".page");
const insideRight = document.querySelector(".inside-right");
const thumb = document.querySelector(".slider-thumb");
const track = document.querySelector(".slider-track");
track.addEventListener("touchstart", () => {
    alert("touch ok");
});

let isOpen = false;
let dragging = false;

// ======================
// MỞ THIỆP
// ======================

function openCard() {

    if (isOpen) return;

    page.classList.add("open");

    setTimeout(() => {
        page.classList.add("move");
        insideRight.classList.add("move");
    }, 1800);

    isOpen = true;
}

// ======================
// ĐÓNG THIỆP
// ======================

function closeCard() {

    if (!isOpen) return;

    page.classList.remove("move");
    insideRight.classList.remove("move");

    setTimeout(() => {
        page.classList.remove("open");
    }, 1400);

    setTimeout(() => {
        thumb.style.left = "3px";
    }, 1800);

    isOpen = false;
}

// ======================
// HÀM KÉO CHUNG
// ======================

function moveThumb(clientX) {

    const rect = track.getBoundingClientRect();

    let x = clientX - rect.left;

    // tăng độ nhạy
    x *= 3;

    x = Math.max(3, Math.min(x, 190));

    thumb.style.left = x + "px";
}

// ======================
// PC
// ======================

thumb.addEventListener("mousedown", () => {

    if (isOpen) return;

    dragging = true;
});

document.addEventListener("mousemove", (e) => {

    if (!dragging || isOpen) return;

    moveThumb(e.clientX);
});

document.addEventListener("mouseup", () => {

    if (!dragging) return;

    dragging = false;

    const currentX = parseInt(thumb.style.left) || 3;

    if (currentX > 170) {

        thumb.style.left = "190px";

        openCard();

    } else {

        thumb.style.left = "3px";
    }
});

// ======================
// MOBILE
// ======================

thumb.addEventListener("touchstart", (e) => {

    if (isOpen) return;

    dragging = true;

    e.preventDefault();

}, { passive: false });

document.addEventListener("touchmove", (e) => {

    if (!dragging || isOpen) return;

    e.preventDefault();

    moveThumb(e.touches[0].clientX);

}, { passive: false });

document.addEventListener("touchend", () => {

    if (!dragging) return;

    dragging = false;

    const currentX = parseInt(thumb.style.left) || 3;

    if (currentX > 170) {

        thumb.style.left = "190px";

        openCard();

    } else {

        thumb.style.left = "3px";
    }
});

// ======================
// ĐÓNG THIỆP
// ======================

insideRight.addEventListener("click", () => {

    if (isOpen) {

        closeCard();
    }
});

insideRight.addEventListener("touchstart", () => {

    if (isOpen) {

        closeCard();
    }
});
