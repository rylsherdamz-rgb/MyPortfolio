"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { RoomSection } from "./RoomContent"

/**
 * Per-section camera focus. Each section frames a specific room OBJECT (whose
 * content is printed on it), so the camera pushes in on the thing you're
 * reading — the screen for home/tech/projects, the poster, the window, the
 * lamp. `target` is the object's world position; `offset` is where the camera
 * sits relative to that target (a close, slightly-orbited vantage).
 *
 * World positions account for the room group (scale 2.3, position y -0.9).
 */
type Focus = {
  section: RoomSection
  target: [number, number, number]
  offset: [number, number, number]
}

export const FOCI: Focus[] = [
  // Home — the monitor screen (whoami / stats).
  { section: "home", target: [-2.67, 3.06, 0.37], offset: [3.6, 1.4, 4.8] },
  // Tech Stack — closer on the screen (stack listing) + desk chips.
  { section: "tech-stack", target: [-2.4, 2.8, 0.6], offset: [2.8, 1.2, 4.2] },
  // Projects — the screen git log, angled to catch the poster too.
  { section: "projects", target: [-1.9, 3.4, -0.9], offset: [4.2, 1.0, 4.4] },
  // Achievements — the wall poster (featured work).
  { section: "achievements", target: [-0.85, 4.17, -2.9], offset: [3.4, 0.6, 4.6] },
  // Feed — the window (posts stream).
  { section: "posts", target: [2.07, 2.83, -3.45], offset: [-3.8, 1.2, 4.4] },
  // Connect — the paper lamp (social links glow).
  { section: "connect", target: [-2.07, 3.01, 2.48], offset: [3.2, 1.0, 4.2] },
]

function scrollToSegment(progress: number, count: number) {
  const scaled = progress * (count - 1)
  const i = Math.min(Math.floor(scaled), count - 2)
  const t = THREE.MathUtils.clamp(scaled - i, 0, 1)
  return { i, t }
}

function ease(t: number) {
  return t * t * (3 - 2 * t)
}

/**
 * Drives the camera to focus the active section's room object based on page
 * scroll, and reports the active section (for lighting the right screen
 * content) via onSection. Critically-damped follow with idle drift + pointer
 * parallax so the room feels alive; frozen for reduced motion.
 */
export default function CameraRig({
  reducedMotion,
  onSection,
}: {
  reducedMotion: boolean
  onSection?: (s: RoomSection) => void
}) {
  const { camera } = useThree()

  const desiredPos = useRef(new THREE.Vector3(...FOCI[0].offset))
  const desiredTarget = useRef(new THREE.Vector3(...FOCI[0].target))
  const currentTarget = useRef(new THREE.Vector3(...FOCI[0].target))
  const tA = useRef(new THREE.Vector3())
  const tB = useRef(new THREE.Vector3())
  const oA = useRef(new THREE.Vector3())
  const oB = useRef(new THREE.Vector3())
  const lastSection = useRef<RoomSection>("home")

  useFrame((state, delta) => {
    const scrollY = window.scrollY || 0
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight || 1
    const progress = THREE.MathUtils.clamp(scrollY / maxScroll, 0, 1)

    const { i, t } = scrollToSegment(progress, FOCI.length)
    const et = ease(t)

    const a = FOCI[i]
    const b = FOCI[i + 1]

    // Report the nearer section so the screen shows matching content.
    const activeSection = et < 0.5 ? a.section : b.section
    if (activeSection !== lastSection.current) {
      lastSection.current = activeSection
      onSection?.(activeSection)
    }

    // Interpolate the look-at target (the object) and the camera vantage.
    tA.current.set(...a.target)
    tB.current.set(...b.target)
    desiredTarget.current.copy(tA.current).lerp(tB.current, et)

    // Camera position = target + interpolated offset.
    oA.current.set(a.target[0] + a.offset[0], a.target[1] + a.offset[1], a.target[2] + a.offset[2])
    oB.current.set(b.target[0] + b.offset[0], b.target[1] + b.offset[1], b.target[2] + b.offset[2])
    desiredPos.current.copy(oA.current).lerp(oB.current, et)

    if (!reducedMotion) {
      const time = state.clock.getElapsedTime()
      desiredPos.current.x += Math.sin(time * 0.3) * 0.18
      desiredPos.current.y += Math.sin(time * 0.4) * 0.12
      desiredPos.current.x += state.pointer.x * 0.5
      desiredPos.current.y += state.pointer.y * 0.35
    }

    const lerpAmount = 1 - Math.pow(reducedMotion ? 0.0001 : 0.0022, delta)
    camera.position.lerp(desiredPos.current, lerpAmount)
    currentTarget.current.lerp(desiredTarget.current, lerpAmount)
    camera.lookAt(currentTarget.current)
  })

  return null
}
