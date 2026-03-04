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

const showAnim = gsap.from('.main-nav', { 
  yPercent: -100,
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: "max",
  // markers: true,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});
