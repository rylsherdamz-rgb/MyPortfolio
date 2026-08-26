"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { socials, email } from "@/constants/socials"
import { ArrowRight } from "lucide-react"

export default function Socials() {
  return (
    <section className="w-full bg-neutral-50 px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Let&apos;s connect
          </p>
          <h2 className="font-[var(--font-roboto-slab)] text-3xl font-bold text-black sm:text-4xl">
            Connect with <span className="text-neutral-400">Me</span>
          </h2>
          <p className="max-w-xl leading-relaxed text-neutral-600">
            Feel free to reach out on any of the platforms below: I&apos;m
            always open to collaborations, projects, and great conversations.
          </p>
        </div>

        <div
          data-sc-in
          data-sc-stagger="70"
          className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6 text-black shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-neutral-200 bg-white transition-all duration-300 group-hover:border-black group-hover:bg-black">
                <Icon
                  icon={social.icon}
                  className="h-7 w-7 text-neutral-700 transition-colors duration-300 group-hover:text-white"
                />
              </div>

              <span className="text-sm font-medium sm:text-base">
                {social.name}
              </span>
            </Link>
          ))}
        </div>

        <a
          href={`mailto:${email}`}
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
        >
          {email}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}