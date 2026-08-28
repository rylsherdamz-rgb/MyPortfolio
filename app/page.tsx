"use client"

import NavigationBar from "@/components/NavigationBar"
import TechStack from "@/components/TechStack"
import Socials from "@/components/Social"
import ProjectCarousel from "@/components/ProjectCarousel"
import Achievements from "@/components/Achievements"
import LinkedInPosts from "@/components/LinkedInPosts"
import HeroOverlay from "@/components/HeroOverlay"
import RoomHUD, { type HudSection } from "@/components/RoomHUD"

/**
 * The room IS the site. A persistent 3D room (rendered by RoomExperience in the
 * layout) shows each section's content on the monitor as the camera dives in on
 * scroll. This page provides:
 *   - full-height scroll spacers (one per section) that drive the camera dive,
 *   - a designed hero overlay for the opening,
 *   - a fixed HUD (progress rail + details drawer) for navigation and deep
 *     reading — no content veils the 3D room unless the drawer is opened.
 */
export default function Home() {
  const sections: HudSection[] = [
    {
      id: "home",
      label: "Home",
      content: (
        <div className="p-6 md:p-8">
          <p className="mb-3 inline-block bg-[var(--line)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--background)]">
            About
          </p>
          <h3 className="font-display text-3xl uppercase leading-none text-[var(--foreground)]">
            Richie Christian De Guzman
          </h3>
          <p className="mt-4 leading-relaxed text-neutral-600">
            Full-Stack Developer, Data Analyst, and Blockchain Developer based
            in Antipolo, Philippines. I turn bold ideas into working products —
            full-stack apps, data with real insight, smart contracts, and
            decentralized systems. Hackathon champion and Google Cloud Arcade
            Facilitator.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Use the rail on the right, or scroll, to tour the workstation. Each
            section renders live on the monitor.
          </p>
        </div>
      ),
    },
    { id: "tech-stack", label: "Stack", content: <TechStack /> },
    { id: "projects", label: "Work", content: <ProjectCarousel /> },
    { id: "achievements", label: "Honors", content: <Achievements /> },
    { id: "posts", label: "Feed", content: <LinkedInPosts /> },
    { id: "connect", label: "Connect", content: <Socials /> },
  ]

  return (
    <div className="relative z-10 flex w-full flex-col">
      <div className="fixed inset-x-0 top-0 z-40">
        <NavigationBar />
      </div>

      {/* HOME — hero overlay over the establishing room shot. */}
      <section id="home" className="relative h-screen w-full">
        <HeroOverlay />
      </section>

      {/* Scroll spacers: each drives the camera to the matching object. They are
          intentionally empty so the monitor content stays the focus; the full
          HTML lives in the HUD drawer. Labelled for accessibility + anchors. */}
      {sections.slice(1).map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="h-screen w-full"
          aria-label={s.label}
        />
      ))}

      <RoomHUD sections={sections} />
    </div>
  )
}
