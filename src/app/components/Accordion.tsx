"use client"
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import extractedData from "./data.json";


const Accordion = () => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".accordions",
        pin: true,
        start: "top top",
        scrub: 1,
        markers: true,
        end: "+=5000"
      },
    });



    gsap.utils.toArray(".accordion").forEach((accordion, index) => {
      ScrollTrigger.create({
        trigger: accordion as gsap.DOMTarget,
        start: "top top",
        // end: "bottom bottom",
        end: "+=4000",
        onToggle: (self) => {
          if (self.isActive) {
            setOpenAccordion(index);
            document.querySelectorAll(".accordion__text").forEach((text, i) => {
              console.log(index)
              if (i === index) {
                text.classList.add("open");
                tl.to(text, {
                  height: 100,
                  display: "block",
                  stagger: 0.5,
                }, "<");

              } else {
                text.classList.remove("open");
              }
            });
          } else if (index !== 0) {
            setOpenAccordion(null);
            document.querySelectorAll(".accordion__text").forEach((text) => {
              text.classList.remove("open");
            });
          }
        },
      });
    });

  }, []);
  const toggleAccordion = (index: number) => {
    const accordionTexts = document.querySelectorAll(".accordion__text");

    if (openAccordion === index && index !== 0) {
      setOpenAccordion(null);
      accordionTexts[index].classList.remove("open")

    } else {
      setOpenAccordion(index);
      accordionTexts[index].classList.add("open")
    }
  };




  return (
    <div id="wrapper">
      <div id="content">
        <div className="spacer"></div>
        <div className="parallax-container">
          <div className="stack-item">Your Stack Item 1</div>
          <div className="stack-item">Your Stack Item 2</div>
          <div className="stack-item">Your Stack Item 3</div>
        </div>
        <div className="accordions">
          {extractedData.data.accordionCollection.items.map((item, index) => (
            <div
              ref={accordionRef}
              className={`accordion ${index == 0 ? "open-x" : "close-x"}`}
              key={index}
              onClick={() => toggleAccordion(index)}
            >
              <div className="accordion__title">
                <h2 className="accordion__heading">{item.title}</h2>
              </div>
              <div className={`accordion__text ${index == 0 ? "open" : ""}`}
              >
                <p className="accordion__para">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
      </div>
    </div>
  );
};

export default Accordion;