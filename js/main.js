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

const footer = document.querySelector('footer');
const observer = new IntersectionObserver(
    ([entry]) => {
        nav.classList.toggle('nav--hidden', entry.isIntersecting);
    },
    {
        root: null,      
        threshold: 0.85   
    }
);
observer.observe(footer);

