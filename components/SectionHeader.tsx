import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export default function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  eyebrow?: string
  title: ReactNode
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-12 flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border-2 border-[var(--line)] bg-accent text-white shadow-[3px_3px_0_0_var(--shadow-hard)]">
              <Icon className="h-5 w-5" />
            </span>
            {eyebrow ? (
              <p className="border-2 border-[var(--line)] bg-white px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-black">
                {eyebrow}
              </p>
            ) : null}
          </div>

          <h2 className="font-display text-4xl uppercase leading-none text-black sm:text-5xl">
            {title}
          </h2>

          {description ? (
            <p className="leading-relaxed text-neutral-600">{description}</p>
          ) : null}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}