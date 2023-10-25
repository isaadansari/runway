"use client"
import { gsap } from "gsap/dist/gsap";
// import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


import { useEffect, useRef, useState } from "react";

import extractedData from "./data.json";


const Accordion2 = () => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
    // const scrollerSmoother = ScrollSmoother.create({
    //   content: '#content',
    //   wrapper: '#wrapper',
    //   smooth: true,
    //   effects: false,
    //   normalizeScroll: false
    // })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.accordions',
        pin: true,
        start: 'top top',
        end: '+=5000',
        scrub: 1,
      }
    })


    tl.to('.accordion-item', {
      stagger: 1,
      autoAlpha: 1
    }, '<')
    tl.to('.accordion-content', {
      height: 300,
      stagger: 1,
      autoAlpha: 1, marginTop: 20
    }, '<')
    tl.to('.object-span', {
      x: 300,
      stagger: 1,
    }, '<')


    tl.to('.accordion-item .accordion-text', {
      stagger: 1,
      scale: .75,
      autoAlpha: 0
    }, 1)
    tl.to('.accordion-content', {
      height: 0,
      stagger: 1,

    }, 1)


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

        <div className="accordions">
          {extractedData.data.accordionCollection.items.map((item, index) => (
            <div ref={accordionRef}
              className={`accordion-item ${index == 0 ? "open-x" : "close-x"}`}
              key={index}
              onClick={() => toggleAccordion(index)}>

              <div className="accordion-title">
                {item.title}
              </div>
              <div className="accordion-content">
                <div className="accordion-text">
                  <div className="accordion-heading">
                    {item.description}
                  </div>
                  <div className="accordion-object">
                    <span className="object-span"></span>
                  </div>
                  {item.body}
                </div>
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

export default Accordion2;