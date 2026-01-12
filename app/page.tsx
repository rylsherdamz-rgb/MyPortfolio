"use client"

import NavigationBar from "@/components/NavigationBar"
import TechStack from "@/components/TechStack"
import HeroComponents from "@/components/HeroComponents"
import ProjectCarousel from "@/components/ProjectCarousel"


export default function Home() {
  return <div className="w-full h-full flex flex-col gap-y-5 bg-white">
    <NavigationBar />
    <HeroComponents />
    <TechStack />
    <ProjectCarousel />
  </div>
}
