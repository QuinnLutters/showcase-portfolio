import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* -----------------------------
   Scroll smoother
------------------------------ */
ScrollSmoother.create({
  smooth: 1,
  effects: true
});

/* -----------------------------
   Elements
------------------------------ */
const nav = document.querySelector(".main-nav");
const landing = document.querySelector(".landing");
const footer = document.querySelector(".footer");

/* -----------------------------
   State
------------------------------ */
let isFixed = false;
let isHidden = false;
let isInFooter = false;

/* -----------------------------
    Animations
------------------------------ */
const hideNav = () => {
    if (isHidden) return;
    isHidden = true;
    gsap.to(nav, {
        yPercent: -120,
        duration: 0.25,
        ease: "power2.out"
    });
    };

    const showNav = () => {
    if (!isHidden) return;
    isHidden = false;
    gsap.to(nav, {
        yPercent: 0,
        duration: 0.25,
        ease: "power2.out"
    });
};

/* -----------------------------
    Fix nav after landing
------------------------------ */
ScrollTrigger.create({
    trigger: landing,
    start: "bottom top",
    onEnter: () => {
    isFixed = true;
    nav.classList.add("is-fixed");

    // IMPORTANT: reset transform so no jump happens
    gsap.set(nav, { yPercent: 0 });
    isHidden = false;
    },
    onLeaveBack: () => {
    isFixed = false;
    nav.classList.remove("is-fixed");

    // always visible on landing
    gsap.set(nav, { yPercent: 0 });
    isHidden = false;
    }
});

/* -----------------------------
    Hide / show on scroll direction
------------------------------ */
ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: self => {
        if (!isFixed) return;
        if (isInFooter) return;

        if (self.direction === 1) {
        hideNav();
        } else {
        showNav();
        }
    }
});

/* -----------------------------
    Footer override
------------------------------ */
ScrollTrigger.create({
    trigger: footer,
    start: "top 80%",
    end: "bottom bottom",
    onEnter: () => {
        isInFooter = true;
        hideNav();
    },
    onEnterBack: () => {
        isInFooter = true;
        hideNav();
    },
    onLeaveBack: () => {
        isInFooter = false;
        showNav();
    }
});

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

