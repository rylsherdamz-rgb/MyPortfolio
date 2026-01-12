"use client"
import ProjectCarousel from "@/components/ProjectCarousel";
import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"
import React, {useEffect, useRef} from "react"
import gsap from "gsap"


export default function Projects() {
  const navRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gsapContext = gsap.context(() => {
    const sections = [navRef.current,  projectRef.current,  footerRef.current ];

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


  return <div className="w-full bg-white relative   h-screen">
    <div ref={navRef}>
    <NavigationBar /> 
    </div>
    <div className="px-[5%]" ref={projectRef}>
 <ProjectCarousel /> 
    </div>
    <div className="absolute bottom-0 w-full " ref={footerRef}>
    <Footer />
    </div>
  </div>
}
