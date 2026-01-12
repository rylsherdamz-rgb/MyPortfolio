"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { socials } from "@/constants/socials"

export default function Socials() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Connect with Me
        </h2>
        <p className="text-center text-gray-500 max-w-xl">
          Feel free to reach out on any of the platforms below.
        </p>

        {/* Social Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              className="group flex flex-col items-center justify-center rounded-xl p-6 bg-gray-50 border border-gray-200 text-black shadow-sm transition hover:shadow-md hover:-translate-y-1 hover:scale-105"
            >
              {/* Icon */}
              <div className="p-4 rounded-full bg-gray-200 mb-4 group-hover:bg-gray-300 transition-all duration-300">
                <Icon icon={social.icon} className="h-8 w-8" />
              </div>

              {/* Name */}
              <span className="font-medium text-sm sm:text-base text-center">
                {social.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

