
import { ArrowRight } from "lucide-react"
import {useRouter} from "next/navigation"

export default function HeroComponent() {
  const router= useRouter()
  return (
    <section className="w-full flex justify-center px-6 md:px-20 py-16 md:py-24">
      <div className="w-full max-w-6xl flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p className="text-sm md:text-base uppercase tracking-widest text-gray-400">
            Hi, I’m Richie Christian De Guzman
          </p>

          <h1
            style={{ fontVariationSettings: '"wdth" 135, "wght" 800' }}
            className="font-[var(--font-roboto-flex)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-black max-w-4xl"
          >
            Full-Stack Developer crafting{" "}
            <span className="text-gray-400">beautiful</span> and{" "}
            <span className="text-gray-400">scalable</span> digital products.
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            I specialize in frontend development with a strong focus on visual
            design, interaction, and performance — turning ideas into polished
            user experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="group border border-black rounded-2xl px-6 py-3 h-12 flex items-center gap-2 text-black transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-1 active:translate-y-0">
            Let&apos;s Talk
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="px-6 focus:outline-none py-3 h-12 flex items-center text-gray-500 hover:text-black transition"
          >
            View Work →
          </button>
        </div>
      </div>
    </section>
  )
}

