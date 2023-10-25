"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import AccordionItem from "./AccordionItem";
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
        end: "top bottom",
        scrub: 10,
      },
    });

    tl.to(".accordion-item", {
      stagger: 1,
      autoAlpha: 1,
    }, "<");

    tl.to(".accordion-content", {
      height: 300,
      stagger: 1,
      autoAlpha: 1,
      marginTop: 20,
    }, "<");

    tl.to(".object-span", {
      x: 300,
      stagger: 1,
    }, "<");

    tl.to(".accordion-item .accordion-text", {
      stagger: 1,
      scale: 0.75,
      autoAlpha: 0,
    }, 1);

    tl.to(".accordion-content", {
      height: 0,
      stagger: 1,
      marginTop: 0,
    }, 1);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(index === openAccordion ? null : index);
  };

  return (
    <div id="wrapper">
      <div id="content">
        <div className="spacer"></div>

        <div className="accordions">
          {extractedData.data.accordionCollection.items.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={index === openAccordion}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
      </div>
    </div>
  );
};

export default Accordion;