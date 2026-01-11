"use client"

import HeaderComponents from "@/components/HeaderComponents"
import MainTechStack from "../components/TechStackComponents/TechStackMainComponent"

export default function Home() {
  return <div className="w-full h-screen py-10 flex flex-col gap-y-5 bg-white px-30">
    <div className="w-[90%] mx-[5%] h-[25vh]">
    <HeaderComponents />
    </div>
    <div className="w-[90%] mx-[5%] h-[40vh]">

      <MainTechStack />
    </div>
  </div>
}
