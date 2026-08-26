import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"
import TechStack from "@/components/TechStack"
import RoomCanvas from "@/components/RoomCanvas"
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

      {/* Act 1: the open. Pins while the introduction cues in line by line. */}
      <section
        id="home"
        data-sc-act="pin"
        data-sc-span="1.7"
        aria-label="Introduction"
      >
        <div data-sc-stage className="relative overflow-hidden">
          {/* Manga-print atmosphere: screentone field + speed lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="dots-bg absolute -right-10 top-6 h-80 w-80 opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
            <div className="speedlines absolute bottom-[-2rem] left-[-4rem] h-64 w-[46rem] [mask-image:radial-gradient(120%_100%_at_20%_60%,black,transparent_70%)]" />
          </div>

          <div className="relative flex h-full w-full items-center px-6 md:px-12">
            <div className="w-full md:w-[62%] lg:w-[55%]">
              <HeroComponents />
            </div>

            <div
              aria-hidden
              className="absolute right-[-8%] top-1/2 hidden -translate-y-1/2 md:block md:w-[52%] lg:right-[-2%] lg:w-[44%]"
            >
              <div data-sc-parallax="-0.05" className="h-[58vh] lg:h-[70vh]">
                <RoomCanvas />
              </div>
            </div>
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