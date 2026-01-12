"use client"
import TechStack from "@/components/TechStack";
import React, {useEffect, useRef} from "react"
import Footer from "@/components/Footer"
import NavigationBar from "@/components/NavigationBar"
import gsap from "gsap";

export default function techStack() {

  const navRef = useRef<React.HTMLDivElement>(null)
  const techRef = useRef<React.HTMLDivElement>(null)
  const footerRef = useRef<React.HTMLDivElement>(null)

  useEffect(() => {
    const gsapContext = gsap.context(() => {
    const sections = [navRef.current,  techRef.current,  footerRef.current ];

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


 
  return <div className="w-full h-full bg-white ">
    <div ref={navRef}>
      <NavigationBar />
    </div>
    <div className="px-[5%]" ref={techRef}>
  <TechStack />
    </div>
    <div ref={footerRef} >
      <Footer />
    </div>
  </div>
}
