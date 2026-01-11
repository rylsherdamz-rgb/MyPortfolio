"use client"

import React, { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
  Stars,
  Html,
  Loader,
  OrbitControls,
  Text,
} from "@react-three/drei"
import * as THREE from "three"
import { MeguminModel } from "@/components/canvasComponents/megumin"
import { BeniMaruModel } from "@/components/canvasComponents/benimaru"

// === 1️⃣ Megumin ===
function Megumin() {
  const group = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame(() => {
    if (!group.current || !scroll) return
    const t = scroll.offset // 0 → 1

    group.current.position.set(
      0, // center x
      THREE.MathUtils.lerp(-2, 0, t) + Math.sin(Date.now() / 600) * 0.05, // y
      THREE.MathUtils.lerp(-5, 0, t) // z
    )

    group.current.rotation.set(
      t * 0.2, // x rotation
      t * Math.PI * 2 + Math.sin(Date.now() / 1000) * 0.05, // y rotation
      0
    )

    group.current.scale.setScalar(THREE.MathUtils.lerp(0.015, 0.02, t))
  })

  return (
    <group ref={group}>
      <Suspense fallback={<Html center>Loading Megumin...</Html>}>
        <MeguminModel />
      </Suspense>
    </group>
  )
}

// === 2️⃣ Benimaru ===
function Benimaru() {
  const group = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame(() => {
    if (!group.current || !scroll) return
    const t = scroll.offset

    group.current.position.set(
      2, // slightly right
      THREE.MathUtils.lerp(-1.5, 0, t) + Math.sin(Date.now() / 800) * 0.05,
      THREE.MathUtils.lerp(-4, 0, t)
    )

    group.current.rotation.set(
      t * 0.1,
      t * Math.PI + Math.sin(Date.now() / 1200) * 0.05,
      0
    )

    group.current.scale.setScalar(0.02) // fixed scale
  })

  return (
    <group ref={group}>
      <Suspense fallback={<Html center>Loading Benimaru...</Html>}>
        <BeniMaruModel />
      </Suspense>
    </group>
  )
}

// === 3️⃣ Scene Content ===
function SceneContent() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffd6ff" />
      <pointLight position={[-5, 2, 3]} intensity={1.2} color="#ff4444" />

      {/* Characters */}
      <Megumin />
      <Benimaru />

      {/* Stars */}

    </>
  )
}

// === 4️⃣ Main Scene ===
export default function KonosubaScene() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} shadows>
        <Environment preset="night" />

        {/* ScrollControls wrap the content */}
        <ScrollControls pages={3} damping={0.3}>
          <Scroll>
            <SceneContent />
          </Scroll>
        </ScrollControls>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.1}
        />
      </Canvas>

      <Loader />
    </>
  )
}
