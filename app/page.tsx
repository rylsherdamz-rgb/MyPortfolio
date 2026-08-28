import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"
import TechStack from "@/components/TechStack"
import HeroComponents from "@/components/HeroComponents"
import Socials from "@/components/Social"
import ProjectCarousel from "@/components/ProjectCarousel"
import Achievements from "@/components/Achievements"
import LinkedInPosts from "@/components/LinkedInPosts"
import CommitRail from "@/components/CommitRail"

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-white">
      <div className="sticky top-0 z-50">
        <NavigationBar />
      </div>

      {/* Hero — a standard full-height intro. No ScrollCraft pin so the copy
          is visible immediately on landing (the pinned/cue setup previously
          left the hero blank at the top of the page). */}
      <section
        id="home"
        aria-label="Introduction"
        className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden"
      >
        {/* Manga-print atmosphere: screentone field + speed lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="dots-bg absolute -right-10 top-6 h-80 w-80 opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
          <div className="speedlines absolute bottom-[-2rem] left-[-4rem] h-64 w-[46rem] [mask-image:radial-gradient(120%_100%_at_20%_60%,black,transparent_70%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:px-12">
          <div className="w-full max-w-3xl lg:max-w-4xl">
            <HeroComponents />
          </div>
        </div>
      </section>

      <div id="tech-stack" className="scroll-mt-16">
        <TechStack />
      </div>

      <ProjectCarousel />

      <div id="achievements" className="scroll-mt-16">
        <Achievements />
      </div>

      <div id="posts" className="scroll-mt-16">
        <LinkedInPosts />
      </div>

      <div id="connect" className="scroll-mt-16">
        <Socials />
      </div>

      <Footer />

      <CommitRail />
    </div>
  )
}