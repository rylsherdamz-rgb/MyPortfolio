"use client"

import { ArrowRight, MapPin, Mail, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { stats } from "@/constants/achievements"

const roles = ["Full-Stack Developer", "Data Analyst", "Blockchain Developer"]

export default function HeroComponent() {
  const router = useRouter()

  const handleEmail = () => {
    window.location.href = "mailto:richiechristiandeguzman11@gmail.com"
  }

  return (
    <section className="w-full flex justify-center px-6 md:px-20 py-16 md:py-24">
      <div className="w-full max-w-6xl flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-sm md:text-base uppercase tracking-widest text-gray-400">
            Hi, I&apos;m Richie Christian De Guzman
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Antipolo, Philippines</span>
            </div>

            <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />

            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <h1
            style={{ fontVariationSettings: '"wdth" 135, "wght" 800' }}
            className="font-[var(--font-roboto-flex)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-black max-w-4xl mt-2"
          >
            Crafting{" "}
            <span className="text-gray-400">beautiful</span> and{" "}
            <span className="text-gray-400">scalable</span> digital products —
            from the web to the blockchain.
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed mt-2">
            I build polished full-stack applications, analyze data for real
            insight, and ship smart contracts and decentralized apps. A
            hackathon champion, Google Cloud Arcade Facilitator, and lifelong
            learner who loves turning bold ideas into working products.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={handleEmail}
            className="group flex items-center gap-2 h-12 px-6 rounded-full bg-black text-white border border-black transition-all duration-300 hover:bg-transparent hover:text-black hover:-translate-y-1 active:translate-y-0"
          >
            <Mail className="w-4 h-4" />
            Let&apos;s Talk
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="px-6 focus:outline-none py-3 h-12 flex items-center text-gray-500 hover:text-black transition"
          >
            View Work →
          </button>

          <button
            onClick={() => window.open("https://github.com/rylsherdamz-rgb", "_blank")}
            className="flex items-center gap-2 h-12 px-6 rounded-full border border-neutral-200 text-neutral-700 transition-all duration-300 hover:border-black hover:text-black hover:-translate-y-1 active:translate-y-0"
          >
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mt-6 pt-8 border-t border-neutral-100">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold text-black font-[var(--font-roboto-flex)]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs md:text-sm text-gray-500 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}