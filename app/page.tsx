"use client"

import NavigationBar from "@/components/NavigationBar"
import TechStack from "@/components/TechStack"
import HeroComponents from "@/components/HeroComponents"


export default function Home() {
  return <div className="w-full h-full flex flex-col bg-white">
    <NavigationBar />
    <HeroComponents />
    <TechStack />
  </div>
}
