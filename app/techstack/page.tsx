"use client"
import TechStack from "@/components/TechStack";
import React, {useEffect, useRef} from "react"
import Footer from "@/components/Footer"
import NavigationBar from "@/components/NavigationBar"
import gsap from "gsap";

export default function TechStackPage() {

  const navRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

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


 
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div ref={navRef}>
        <NavigationBar />
      </div>
      <div className="px-[5%] flex-1" ref={techRef}>
        <TechStack />
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}
