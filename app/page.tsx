"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";

import NavigationBar from "@/components/NavigationBar";
import TechStack from "@/components/TechStack";
import HeroComponents from "@/components/HeroComponents";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Home() {
  // Refs for each section
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapContext = gsap.context(() => {
    const sections = [navRef.current, heroRef.current, techRef.current, projectsRef.current];

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
    </div>
  );
}

