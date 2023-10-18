"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import extractedData from "./data.json";

export default function Accordion() {
  const accordionRef = useRef<HTMLDivElement | null>(null);
  console.log(extractedData)
  useEffect(() => {
    const tl = gsap.timeline({ reverse: true });

    const accordionItems = accordionRef.current?.querySelectorAll('.accordion-item');

    if (accordionItems) {
      accordionItems.forEach((item, index) => {
        tl.to(item, {
          duration: 0.5,
          ease: "Power4.easeOut",
          backgroundColor: "#b3b3ff",
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            markers: true, // for debugging, you can remove this in production
            toggleActions: 'play none none none',
          },
        });
      });
    }
  }, []);

  return (
    <>
      <div className="spacing"></div>


      <div className="accordion" ref={accordionRef}>
        {extractedData.data.accordionCollection.items.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2>{item.title}</h2>
            <h4>{item.description}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

