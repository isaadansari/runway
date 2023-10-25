"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import AccordionItem from "./AccordionItem";
import extractedData from "./data.json";

const Accordion = () => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  let tl: any;
  tl = gsap.timeline({
    defaults: { overwrite: true },
    start: "top center",
  });
  const playAccordionTimeline = (currentAccordion: HTMLElement) => {

    const accordionContent = currentAccordion.querySelector(".accordion-content")
    const accordionObjectSpan = currentAccordion.querySelector(".object-span")
    const accordionText = currentAccordion.querySelector(".accordion-text")

    tl.to(currentAccordion, {
      background: "red",
      autoAlpha: 1,
      scrollTrigger: {
        trigger: currentAccordion,
        start: "top top",
        end: "+=500",
        scrub: true,
        markers: true,
        toggleActions: "start none none reverse"
      }
    }, "<");

    tl.to(accordionContent, {
      height: 300,
      autoAlpha: 1,
      marginTop: 20,

    }, "<");

    // tl.to(accordionObjectSpan, {
    //   x: 300,
    //   stagger: 1,
    // }, "<");

    // tl.to(accordionText, {
    //   stagger: 1,
    //   scale: 0.75,
    //   autoAlpha: 0,
    // }, 1);

    // tl.to(accordionContent, {
    //   height: 0,
    //   stagger: 1,
    //   marginTop: 0,
    // }, 1);

  }
  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray<HTMLElement>(".accordion-item").forEach((accordionItem, index) => {
      ScrollTrigger.create({
        trigger: accordionItem,
        // pin: true,
        markers: true,
        start: "top top",
        end: "bottom bottom",
        // pinSpacing: true,
        onEnter: (index) => {
          playAccordionTimeline(accordionItem)
          console.log("ennter")
        }, onLeave: () => {
          console.log("leave")
        }
      })
    })
  })

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