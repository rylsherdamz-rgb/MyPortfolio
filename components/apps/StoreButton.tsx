import { SiGoogleplay } from "react-icons/si"
import type { PublishedApp } from "@/constants/apps"

export default function StoreButton({ app }: { app: PublishedApp }) {
  const body = (
    <>
      <SiGoogleplay className="h-5 w-5" />
      <span className="flex flex-col leading-none">
        <span className="text-[9px] tracking-[0.2em] opacity-80">
          {app.status === "live" ? "Get it on" : "Coming soon to"}
        </span>
        <span className="mt-1 text-sm">Google Play</span>
      </span>
    </>
  )

  const base =
    "inline-flex items-center gap-3 border-2 border-[var(--line)] px-5 py-2.5 font-mono font-bold uppercase tracking-widest shadow-[3px_3px_0_0_var(--shadow-hard)]"

  if (app.status !== "live") {
    return (
      <span aria-disabled className={`${base} cursor-default bg-white text-neutral-500`}>
        {body}
      </span>
    )
  }

  return (
    <a
      href={app.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} btn-accent-hover bg-accent text-white transition-transform hover:-translate-y-0.5`}
    >
      {body}
    </a>
  )
}
