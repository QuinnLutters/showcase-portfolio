const nav = document.getElementById("main-nav");
const startOffset = window.innerHeight * 0.81;
const stickyTop = 30;
const stickyTrigger = startOffset - stickyTop;

window.addEventListener("scroll", () => {
    if (window.scrollY >= stickyTrigger) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});
