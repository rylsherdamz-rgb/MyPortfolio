"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";

import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer"
import TechStack from "@/components/TechStack";
import HeroComponents from "@/components/HeroComponents";
import Socials from "@/components/Social"
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Home() {
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElemetnt>(null)
  const techRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapContext = gsap.context(() => {
    const sections = [navRef.current, heroRef.current, techRef.current, projectsRef.current, socialRef.current, footerRef.current ];

    gsap.from(sections, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
    });

    })
   return () => gsapContext.revert() 


  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-5 bg-white">
      <div ref={navRef}>
        <NavigationBar />
      </div>

      <div ref={heroRef}>
        <HeroComponents />
      </div>

      <div ref={techRef}>
        <TechStack />
      </div>

      <div ref={projectsRef}>
        <ProjectCarousel />
      </div>
      <div ref={socialRef}>
        <Socials />
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
}

