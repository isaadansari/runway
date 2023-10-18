"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);


function TextReveal() {
  const lettersRef = useRef<Array<HTMLSpanElement>>([]);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.";

  useEffect(() => {
    const anim = gsap.to(lettersRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
        start: "top center",
        end: "bottom 85%"
      },
      color: "#2A2A2A",
      duration: 5,
      stagger: 0.1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <>
      <div className="spacing-small"></div>
      <div className="reveal">
        <div ref={triggerRef}>
          {text.split("").map((letter, index) => (
            <span className="reveal-text" key={index} ref={(ref) => ref && lettersRef.current.push(ref)}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className="spacing"></div>
    </>
  );
}

export default TextReveal;
