"use client"

import { Icon } from "@iconify/react"
import { techStack } from "@/constants/techstack"
import { usePathname, useRouter } from "next/navigation"

export default function TechStack() {
  const router = useRouter()
  const pathname = usePathname()

  const isFullPage = pathname === "/techstack"

  const categories = Object.entries(techStack).filter(([category]) =>
    isFullPage
      ? true
      : category === "Frontend" || category === "Backend" || category === "Mobile"
  )
  const handleNavigation = () => {
    router.push("/techstack")
  }
  return (
    <section
      className={`${
        isFullPage ? "w-full h-full p-6" : "w-[90%] mx-[5%] px-6 py-2 rounded-2xl border border-neutral-200"
      }  bg-white text-black flex flex-col`}
    >
      <div className="flex flex-row justify-between items-center">
        <h2 className={`mb-6 text-lg font-semibold tracking-tight`}>
          Tech Stack
        </h2>

        {!isFullPage && (
          <button onClick={handleNavigation} className="hover:underline">
            <p>See More</p>
          </button>
        )}
      </div>

      <div className={`space-y-6 flex-1 overflow-y-auto`}>
        {categories.map(([category, items]) => (
          <div key={category}>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
              {category.replace(/([A-Z])/g, " $1")}
            </p>

            <div className="flex flex-wrap gap-3">
              {items.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:border-neutral-400"
                >
                  <Icon icon={icon} className="h-4 w-4" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

