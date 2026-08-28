"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useCallback } from "react"
import {
  Environment,
  AdaptiveDpr,
  ContactShadows,
  Float,
  Html,
} from "@react-three/drei"
import { RoomStageModel } from "./RoomStage"
import CameraRig from "./CameraRig"
import {
  ScreenContent,
  PosterContent,
  WindowContent,
  DeskContent,
  LampContent,
  type RoomSection,
} from "./RoomContent"
import {
  usePrefersReducedMotion,
  useMounted,
  useThreePalette,
  useIsLowPower,
} from "./use3D"

/**
 * The living room world, with real portfolio content printed onto its objects.
 * A gentle Float keeps it breathing. The `section` prop selects what the
 * monitor screen displays.
 */
function RoomWorld({
  reducedMotion,
  section,
}: {
  reducedMotion: boolean
  section: RoomSection
}) {
  return (
    <Float
      speed={reducedMotion ? 0 : 0.6}
      rotationIntensity={reducedMotion ? 0 : 0.05}
      floatIntensity={reducedMotion ? 0 : 0.18}
    >
      <RoomStageModel
        scale={2.3}
        position={[0, -0.9, 0]}
        slots={{
          screen: <ScreenContent section={section} />,
          poster: <PosterContent index={section === "projects" ? 1 : 0} />,
          window: <WindowContent />,
          desk: <DeskContent />,
          lamp: <LampContent />,
        }}
      />
    </Float>
  )
}

/**
 * RoomExperience — the site IS the room.
 *
 * One fixed, full-viewport WebGL stage renders the 3D room with the portfolio's
 * real content printed onto its objects: the monitor screen shows a live
 * desktop for the active section, the wall poster shows the featured project,
 * the window streams the feed, the desk holds tech chips, and the lamp holds
 * the connect links. A scroll-driven CameraRig pushes the camera in on whichever
 * object owns the current section.
 *
 * The layer is fixed and mostly non-interactive so it never blocks page scroll;
 * only opted-in links (e.g. the lamp's socials) capture clicks.
 */
export default function RoomExperience() {
  const reducedMotion = usePrefersReducedMotion()
  const mounted = useMounted()
  const palette = useThreePalette()
  const lowPower = useIsLowPower()
  const [section, setSection] = useState<RoomSection>("home")

  const handleSection = useCallback((s: RoomSection) => setSection(s), [])

  if (!mounted) return null

  const bg =
    palette.theme === "dark"
      ? "radial-gradient(120% 120% at 70% 20%, #16171d 0%, #0b0c0f 60%, #08090b 100%)"
      : "radial-gradient(120% 120% at 70% 20%, #fbfaf6 0%, #f3f1ea 55%, #ece9e0 100%)"

  // Low-power / small touch devices: skip heavy always-on WebGL, keep a themed
  // backdrop so the HTML content sections still read as the site.
  if (lowPower) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: bg }}
      />
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: bg }}
    >
      <Canvas
        camera={{ position: [12, 6, 12], fov: 42 }}
        dpr={[1, 1.75]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={palette.theme === "dark" ? 0.5 : 0.8} />
        <directionalLight
          position={[6, 9, 6]}
          intensity={1.05}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-6, 3, -6]} intensity={0.35} />
        <pointLight
          position={[-4, 3, 4]}
          intensity={0.7}
          color={palette.accent}
          distance={22}
        />

        <Environment preset="city" />

        <Suspense
          fallback={
            <Html center>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Entering the room…
              </span>
            </Html>
          }
        >
          <RoomWorld reducedMotion={reducedMotion} section={section} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={palette.theme === "dark" ? 0.4 : 0.55}
            scale={16}
            blur={2.8}
            far={7}
          />
        </Suspense>

        <CameraRig reducedMotion={reducedMotion} onSection={handleSection} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
