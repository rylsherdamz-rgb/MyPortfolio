import { Icon } from "@iconify/react"
import { techStack } from "@/constants/techstack"
import {useRouter} from "next/navigation"

export default function TechStack() {
  const router = useRouter()
  const categories = Object.entries(techStack).filter(
    ([category]) =>
      category === "Frontend" ||
      category === "Backend" ||
      category === "Mobile"
  )

  return (
    <section className="w-[90%] mx-[5%] rounded-2xl border border-neutral-200 bg-white px-6 py-2 text-black">
    <div className="flex flex-row justify-between">
      <h2 className="mb-6 text-lg font-semibold tracking-tight">
        Tech Stack
      </h2>
      <button  onClick={() => router.push("/textstack")} className="hover:underline">
        <p className="">See More</p>
      </button>
    </div>
   


      <div className="space-y-6">
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

