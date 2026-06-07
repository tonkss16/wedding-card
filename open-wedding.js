const page = document.querySelector(".page");
const insideRight = document.querySelector(".inside-right");
const thumb = document.querySelector(".slider-thumb");
const track = document.querySelector(".slider-track");
let isOpen = false;
let dragging = false;
function openCard() {
    if (isOpen) return;
    page.classList.add("open");
    setTimeout(() => {
        page.classList.add("move");
        insideRight.classList.add("move");
    }, 1800);
    isOpen = true;
}
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
thumb.addEventListener("mousedown", () => {
    if (isOpen) return;
    dragging = true;
});

document.addEventListener("mousemove", (e) => {
    if (!dragging || isOpen) return;
    const rect = track.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(3, Math.min(x, 190));
    thumb.style.left = x + "px";
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
insideRight.addEventListener("click", () => {
    if (isOpen) {
        closeCard();
    }
});