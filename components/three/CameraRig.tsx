"use client"

import { useRef, type RefObject } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { RoomSection } from "./useScreenTexture"

/** Ordered sections the scroll maps across. */
export const SECTIONS: RoomSection[] = [
  "home",
  "tech-stack",
  "projects",
  "achievements",
  "posts",
  "connect",
]

/**
 * The dive plan per section, expressed relative to the SCREEN's real world
 * transform (read from the mesh at runtime, so nothing is eyeballed):
 *
 *  - `dist`    how far in front of the screen the camera sits, along the
 *              screen's normal. Small = deep inside the monitor (screen fills
 *              the viewport); large = pulled back to see the room.
 *  - `lateral` sideways slide across the screen face (screen-space X), so we
 *              can drift over the content instead of a dead-straight push.
 *  - `lift`    vertical slide across the screen face (screen-space Y).
 *  - `roomBias` 0 = look straight at the screen; 1 = blend the look-at toward
 *              the room center so context sections reveal the room.
 */
type Dive = {
  section: RoomSection
  dist: number
  lateral: number
  lift: number
  roomBias: number
}

export const DIVES: Dive[] = [
  // Home — pulled back to establish the room + desk, screen visible ahead.
  { section: "home", dist: 6.5, lateral: 0.0, lift: 0.3, roomBias: 0.5 },
  // Tech — approach the display.
  { section: "tech-stack", dist: 4.2, lateral: 0.0, lift: 0.1, roomBias: 0.15 },
  // Projects — screen fills the viewport (dist ~= halfH/tan(fov/2) ≈ 3.1).
  { section: "projects", dist: 3.1, lateral: 0.0, lift: 0.0, roomBias: 0.0 },
  // Achievements — still filling the screen, tiny drift.
  { section: "achievements", dist: 3.2, lateral: 0.1, lift: 0.0, roomBias: 0.0 },
  // Feed — reading the feed on the display.
  { section: "posts", dist: 3.3, lateral: -0.05, lift: 0.0, roomBias: 0.05 },
  // Connect — pull back out to the whole room to close.
  { section: "connect", dist: 7.5, lateral: 0.0, lift: 0.6, roomBias: 0.6 },
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

const ROOM_CENTER = new THREE.Vector3(0, 2.6, 0)

/**
 * Drives the camera to DIVE INTO the monitor screen based on scroll. It reads
 * the screen mesh's live world matrix each frame to get the screen's center,
 * its outward normal, and its up/right axes, then positions the camera in
 * front of the screen at a scroll-controlled distance so the display fills the
 * viewport for the "inside" sections and pulls back to the room for context.
 *
 * Reports the active section via onSection so the screen texture updates.
 */
export default function CameraRig({
  screenRef,
  reducedMotion,
  onSection,
}: {
  screenRef: RefObject<THREE.Mesh | null>
  reducedMotion: boolean
  onSection?: (s: RoomSection) => void
}) {
  const { camera } = useThree()

  const screenPos = useRef(new THREE.Vector3())
  const screenQuat = useRef(new THREE.Quaternion())
  const screenScale = useRef(new THREE.Vector3())
  const normal = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const up = useRef(new THREE.Vector3())

  const desiredPos = useRef(new THREE.Vector3(6, 4, 6))
  const desiredLook = useRef(new THREE.Vector3(0, 2.6, 0))
  const currentLook = useRef(new THREE.Vector3(0, 2.6, 0))
  const lastSection = useRef<RoomSection>("home")

  useFrame((state, delta) => {
    const mesh = screenRef.current
    if (!mesh) return

    // Live world transform of the actual screen mesh.
    mesh.updateWorldMatrix(true, false)
    mesh.matrixWorld.decompose(
      screenPos.current,
      screenQuat.current,
      screenScale.current
    )

    // MEASURED (via Playwright __screenDebug): the screen geometry is flat in
    // local X (bbox x=0), so the display face lies in the local Y–Z plane. Its
    // outward normal is local +X (axisDotToRoom.px≈0.99 toward the room), up is
    // local Y, and right is local Z.
    normal.current.set(1, 0, 0).applyQuaternion(screenQuat.current).normalize()
    up.current.set(0, 1, 0).applyQuaternion(screenQuat.current).normalize()
    right.current.set(0, 0, 1).applyQuaternion(screenQuat.current).normalize()

    // Ensure the normal points toward the room (roughly +X/+Z, away from wall).
    // The desk faces into the room; if the normal points the wrong way, flip it
    // so "in front of the screen" is on the room side.
    if (normal.current.dot(ROOM_CENTER.clone().sub(screenPos.current)) < 0) {
      normal.current.multiplyScalar(-1)
    }

    // Scroll → which dive we're between.
    const scrollY = window.scrollY || 0
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight || 1
    const progress = THREE.MathUtils.clamp(scrollY / maxScroll, 0, 1)
    const { i, t } = scrollToSegment(progress, DIVES.length)
    const et = ease(t)
    const a = DIVES[i]
    const b = DIVES[i + 1]

    const dist = THREE.MathUtils.lerp(a.dist, b.dist, et)
    const lateral = THREE.MathUtils.lerp(a.lateral, b.lateral, et)
    const lift = THREE.MathUtils.lerp(a.lift, b.lift, et)
    const roomBias = THREE.MathUtils.lerp(a.roomBias, b.roomBias, et)

    // Report active section for the screen texture.
    const activeSection = et < 0.5 ? a.section : b.section
    if (activeSection !== lastSection.current) {
      lastSection.current = activeSection
      onSection?.(activeSection)
    }

    // Camera position: start at the screen center, move OUT along the normal by
    // `dist`, then slide across the face by lateral/lift.
    desiredPos.current
      .copy(screenPos.current)
      .addScaledVector(normal.current, dist)
      .addScaledVector(right.current, lateral)
      .addScaledVector(up.current, lift)

    // Look target: blend between the screen center (dive) and room center
    // (context) by roomBias.
    desiredLook.current
      .copy(screenPos.current)
      .lerp(ROOM_CENTER, roomBias)

    if (!reducedMotion) {
      const time = state.clock.getElapsedTime()
      // Tiny idle breathing + pointer parallax on the face plane.
      desiredPos.current
        .addScaledVector(right.current, Math.sin(time * 0.4) * 0.05 + state.pointer.x * 0.18)
        .addScaledVector(up.current, Math.sin(time * 0.5) * 0.04 + state.pointer.y * 0.12)
    }

    const k = 1 - Math.pow(reducedMotion ? 0.0001 : 0.0025, delta)
    camera.position.lerp(desiredPos.current, k)
    currentLook.current.lerp(desiredLook.current, k)
    camera.lookAt(currentLook.current)
  })

  return null
}
