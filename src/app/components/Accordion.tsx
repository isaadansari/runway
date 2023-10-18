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
        let itemBody = item.querySelector(".accordion-item__body")
        tl.to(item, {
          duration: 0.5,
          ease: "Power4.easeOut",
          backgroundColor: "#b3b3ff",
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            // pin: true,
            markers: true, // for debugging, you can remove this in production
            toggleActions: 'play none none none',
            onEnter() {
              tl.to(itemBody, {
                duration: 0.5,
                // height: "100%",
                display: "block"
              });
            },
          },
        })

      });
    }
  }, []);

  return (
    <>
      <div className="spacing"></div>


      <div className="accordion" ref={accordionRef}>
        {extractedData.data.accordionCollection.items.map((item, index) => (
          <div className="accordion-item" key={index}>
            <div className="accordion-item__title">
              <h2>{item.title}</h2>
            </div>
            <div className="accordion-item__body">
              <h4>{item.description}</h4>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

