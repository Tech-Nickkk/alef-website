"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/HomeCom/Hero";
import AboutTeaser from "./components/HomeCom/AboutTeaser";
import ResearchTopics from "./components/HomeCom/ResearchTopics";
import CrisisTeaser from "./components/HomeCom/CrisisTeaser";
import FacesOfCorruption from "./components/HomeCom/FacesOfCorruption";
import Resources from "./components/HomeCom/Resources";
import Newsletter from "./components/HomeCom/Newsletter";
import Footer from "./components/CommonCom/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    // Dynamic Footer Height Calculation
    const updateFooterHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);

    // ResizeObserver for more robust sizing (e.g. content load)
    const resizeObserver = new ResizeObserver(updateFooterHeight);
    if (footerRef.current) resizeObserver.observe(footerRef.current);

    return () => {
      window.removeEventListener("resize", updateFooterHeight);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // The parallax animation
    // Only run if checking height to avoid jumpiness
    if (footerHeight === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { yPercent: -1 }, // Start shifted up (behind content)
        {
          yPercent: 0, // Slide down to natural position
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current, // Trigger based on main content
            start: "bottom bottom", // When content bottom meets viewport bottom
            end: `+=${footerHeight}`, // Duration is exactly the height of the footer
            scrub: true,
          },
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [footerHeight]);

  return (
    <main className="w-full font-optima text-white">
      {/* Main Content with Dynamic Margin */}
      <div
        ref={contentRef}
        className="relative z-10 bg-white shadow-2xl"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <Hero />
        <AboutTeaser />
        <ResearchTopics />
        <CrisisTeaser />
        <FacesOfCorruption />
        <Resources />
        <Newsletter />
      </div>

      {/* Fixed Footer */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0"
      >
        <Footer />
      </div>
    </main>
  );
}