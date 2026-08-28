"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useCallback, useRef } from "react"
import * as THREE from "three"
import {
  Environment,
  AdaptiveDpr,
  ContactShadows,
  Float,
  Html,
} from "@react-three/drei"
import { RoomStageModel } from "./RoomStage"
import CameraRig from "./CameraRig"
import { useScreenTexture, type RoomSection } from "./useScreenTexture"
import {
  usePrefersReducedMotion,
  useMounted,
  useThreePalette,
  useIsLowPower,
} from "./use3D"

/**
 * The room with the live display. The screen texture is painted for the active
 * section and applied to the real screen mesh; the mesh ref is handed to the
 * CameraRig so it can dive straight into the display.
 */
function RoomWorld({
  reducedMotion,
  section,
  screenRef,
}: {
  reducedMotion: boolean
  section: RoomSection
  screenRef: React.RefObject<THREE.Mesh | null>
}) {
  const screenTexture = useScreenTexture(section)
  return (
    <Float
      speed={reducedMotion ? 0 : 0.5}
      rotationIntensity={reducedMotion ? 0 : 0.04}
      floatIntensity={reducedMotion ? 0 : 0.12}
    >
      <RoomStageModel
        ref={screenRef}
        scale={2.3}
        position={[0, -0.9, 0]}
        screenTexture={screenTexture}
      />
    </Float>
  )
}

/**
 * RoomExperience — the site lives INSIDE the monitor.
 *
 * A single fixed, full-viewport WebGL stage renders the 3D room. The active
 * section's content is painted onto the monitor's actual screen surface (a
 * CanvasTexture used as map + emissiveMap), and a scroll-driven CameraRig dives
 * the camera INTO the screen until the display fills the viewport, pulling back
 * to reveal the room for the opening and closing sections.
 *
 * Layer is fixed + pointer-events-none so page scroll (which drives the dive)
 * is never blocked. Client-gated; low-power/reduced-motion safe.
 */
export default function RoomExperience() {
  const reducedMotion = usePrefersReducedMotion()
  const mounted = useMounted()
  const palette = useThreePalette()
  const lowPower = useIsLowPower()
  const [section, setSection] = useState<RoomSection>("home")
  const screenRef = useRef<THREE.Mesh | null>(null)

  const handleSection = useCallback((s: RoomSection) => setSection(s), [])

  if (!mounted) return null

  const bg =
    palette.theme === "dark"
      ? "radial-gradient(120% 120% at 70% 20%, #16171d 0%, #0b0c0f 60%, #08090b 100%)"
      : "radial-gradient(120% 120% at 70% 20%, #fbfaf6 0%, #f3f1ea 55%, #ece9e0 100%)"

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
        camera={{ position: [6, 4, 6], fov: 45, near: 0.05, far: 100 }}
        dpr={[1, 1.75]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={palette.theme === "dark" ? 0.55 : 0.85} />
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
          intensity={0.6}
          color={palette.accent}
          distance={22}
        />

        <Environment preset="city" />

        <Suspense
          fallback={
            <Html center>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Booting the display…
              </span>
            </Html>
          }
        >
          <RoomWorld
            reducedMotion={reducedMotion}
            section={section}
            screenRef={screenRef}
          />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={palette.theme === "dark" ? 0.4 : 0.55}
            scale={16}
            blur={2.8}
            far={7}
          />
        </Suspense>

        <CameraRig
          screenRef={screenRef}
          reducedMotion={reducedMotion}
          onSection={handleSection}
        />
        <AdaptiveDpr pixelated />
      </Canvas>

      {/* Cinematic vignette to focus the eye on the monitor and add depth. */}
      <div aria-hidden className="room-vignette absolute inset-0" />
    </div>
  )
}
