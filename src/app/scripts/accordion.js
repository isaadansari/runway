/*------------------------------
Register plugins
------------------------------*/
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/*------------------------------
Init ScrollSmoother
------------------------------*/
const scrollerSmoother = ScrollSmoother.create({
  content: "#content",
  wrapper: "#wrapper",
  smooth: true,
  effects: false,
  normalizeScroll: false,
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".accordions",
    pin: true,
    start: "top top",
    end: "+=5000",
    scrub: 1,
    ease: "linear",
  },
});

tl.to(
  ".accordion-item",
  {
    stagger: 1,
    autoAlpha: 1,
  },
  "<"
);
tl.to(
  ".accordion-content",
  {
    height: 300,
    stagger: 1,
    autoAlpha: 1,
    marginTop: 20,
  },
  "<"
);
tl.to(
  ".object-span",
  {
    x: 300,
    stagger: 1,
  },
  "<"
);

tl.to(
  ".accordion-item .accordion-text",
  {
    stagger: 1,
    scale: 0.75,
    autoAlpha: 0,
  },
  1
);
tl.to(
  ".accordion-content",
  {
    height: 0,
    stagger: 1,
    marginTop: 0,
  },
  1
);
