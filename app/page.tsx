import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"
import TechStack from "@/components/TechStack"
import HeroComponents from "@/components/HeroComponents"
import Socials from "@/components/Social"
import ProjectCarousel from "@/components/ProjectCarousel"
import Achievements from "@/components/Achievements"
import LinkedInPosts from "@/components/LinkedInPosts"
import CommitRail from "@/components/CommitRail"
import SectionDock from "@/components/SectionDock"

export default function Home() {
  return (
    <div className="relative z-10 flex w-full flex-col">
      <div className="sticky top-0 z-50">
        <NavigationBar />
      </div>

      {/* HOME — the monitor screen shows whoami/stats. Intro docked right so the
          screen (front-left in the room) stays clear. */}
      <section
        id="home"
        className="relative flex min-h-screen w-full items-center"
        aria-label="Introduction"
      >
        <div className="pointer-events-none flex w-full justify-end px-4 md:px-8">
          <div className="pointer-events-auto w-full max-w-md lg:max-w-lg">
            <div className="rounded-none border-2 border-[var(--line)] room-glass p-6 shadow-[6px_6px_0_0_var(--shadow-hard)] md:p-7">
              <HeroComponents />
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              <span className="inline-block h-3 w-3 animate-bounce border-b-2 border-r-2 border-accent [transform:rotate(45deg)]" />
              Scroll — content lives on the room
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK — screen lists the stack, desk holds chips. Dock right. */}
      <SectionDock id="tech-stack" eyebrow="Tech Stack" side="right">
        <TechStack />
      </SectionDock>

      {/* PROJECTS — screen shows the git log; poster shows featured. Dock right. */}
      <SectionDock id="projects" eyebrow="Projects" side="right">
        <ProjectCarousel />
      </SectionDock>

      {/* ACHIEVEMENTS — the wall poster + screen log. Dock right. */}
      <SectionDock id="achievements" eyebrow="Honors" side="right">
        <Achievements />
      </SectionDock>

      {/* FEED — the window streams posts (right side of room) → dock left. */}
      <SectionDock id="posts" eyebrow="Feed" side="left">
        <LinkedInPosts />
      </SectionDock>

      {/* CONNECT — the lamp glows with social links. Dock right. */}
      <SectionDock id="connect" eyebrow="Connect" side="right">
        <Socials />
      </SectionDock>

      <Footer />

      <CommitRail />
    </div>
  )
}
