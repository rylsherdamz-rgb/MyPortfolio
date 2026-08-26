"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { socials, email } from "@/constants/socials"
import { ArrowRight } from "lucide-react"

export default function Socials() {
  return (
    <section className="w-full px-6 py-16 md:px-20 md:py-24">
      <div className="dots-bg mx-auto flex w-full max-w-6xl flex-col items-center gap-8 border-2 border-[var(--line)] bg-white p-10 shadow-[6px_6px_0_0_var(--shadow-hard)] md:p-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="border-2 border-[var(--line)] bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white">
            Let&apos;s connect
          </p>
          <h2 className="font-display text-4xl uppercase leading-none text-black sm:text-5xl">
            Connect with <span className="text-accent">Me</span>
          </h2>
          <p className="max-w-xl leading-relaxed text-neutral-600">
            Reach out on any platform below: I&apos;m always open to
            collaborations, projects, and great conversations.
          </p>
        </div>

        <div
          data-sc-in
          data-sc-stagger="70"
          className="grid w-full max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4"
        >
          {socials.map((social, i) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-hard group flex flex-col items-center justify-center bg-white p-6 text-black ${
                i % 2 === 0 ? "-rotate-1" : "rotate-1"
              } hover:rotate-0`}
            >
              <div className="mb-4 grid h-14 w-14 place-items-center border-2 border-[var(--line)] bg-neutral-100 transition-colors duration-200 group-hover:bg-accent">
                <Icon
                  icon={social.icon}
                  className="h-7 w-7 text-black transition-colors duration-200 group-hover:text-white"
                />
              </div>

              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                {social.name}
              </span>
            </Link>
          ))}
        </div>

        <a
          href={`mailto:${email}`}
          className="btn-accent-hover mt-4 inline-flex items-center gap-2 border-2 border-[var(--line)] bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[4px_4px_0_0_var(--shadow-hard)] transition-transform hover:-translate-y-0.5"
        >
          {email}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}