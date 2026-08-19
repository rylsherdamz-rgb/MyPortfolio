"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { socials, email } from "@/constants/socials"
import { ArrowRight } from "lucide-react"

export default function Socials() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
            Let&apos;s connect
          </p>
          <h2 className="font-[var(--font-roboto-slab)] text-3xl sm:text-4xl font-bold text-center text-black">
            Connect with Me
          </h2>
          <p className="text-center text-neutral-500 max-w-xl leading-relaxed">
            Feel free to reach out on any of the platforms below — I&apos;m
            always open to collaborations, projects, and great conversations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center rounded-2xl p-6 bg-neutral-50 border border-neutral-200 text-black shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-400 hover:shadow-lg"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white border border-neutral-200 mb-4 transition-all duration-300 group-hover:bg-black group-hover:border-black">
                <Icon
                  icon={social.icon}
                  className="h-7 w-7 text-neutral-700 transition-colors duration-300 group-hover:text-white"
                />
              </div>

              <span className="font-medium text-sm sm:text-base">
                {social.name}
              </span>
            </Link>
          ))}
        </div>

        <a
          href={`mailto:${email}`}
          className="group mt-6 inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-1"
        >
          {email}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}