"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"
import TechStack from "@/components/TechStack"
import RoomCanvas from "@/components/RoomCanvas"
import HeroComponents from "@/components/HeroComponents"
import Socials from "@/components/Social"
import ProjectCarousel from "@/components/ProjectCarousel"

export default function Home() {
  const navRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          navRef.current,
          heroRef.current,
          techRef.current,
          projectsRef.current,
          socialRef.current,
          footerRef.current,
        ],
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          stagger: 0.3,
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full flex flex-col gap-y-8 bg-white">
      
      <div ref={navRef}>
        <NavigationBar />
      </div>

      <div
        ref={heroRef}
        className="relative w-full min-h-[80vh] flex items-center px-6 md:px-12"
      >
        <div className="z-10 w-full md:w-[60%] lg:w-[55%]">
          <HeroComponents />
        </div>

        <div
          className="
            absolute
            z-0
            top-1/2
            -translate-y-1/2
            hidden
            md:block
            md:right-[-10%]
            md:w-[70%]
            md:h-[50%]
            lg:right-0
            lg:w-[45%]
            lg:h-[70%]
            pointer-events-none
          "
        >
          <RoomCanvas />
        </div>
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

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}
