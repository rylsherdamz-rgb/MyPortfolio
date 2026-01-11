"use client"

import React, { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
  Stars,
  Text,
  Html,
  Loader,
} from "@react-three/drei"
import * as THREE from "three"

// === 1️⃣ Megumin GLTF Model ===
function MeguminModel() {
  const { scene } = require("@react-three/drei").useGLTF("/models/megumin.glb")
  return <primitive object={scene} />
}

// === 2️⃣ Scroll-controlled Megumin animation ===
function Megumin({ scroll }: { scroll: any }) {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!group.current) return
    const offset = scroll.offset

    group.current.position.y = THREE.MathUtils.lerp(3, 0, offset)
    group.current.position.z = THREE.MathUtils.lerp(-2, 0, offset)
    group.current.rotation.y = offset * Math.PI * 2
    group.current.rotation.x = offset * 0.2
  })

  return (
    <group ref={group} scale={0.02}>
      <MeguminModel />
    </group>
  )
}

// === 3️⃣ Scene Content ===
function SceneContent() {
  const scroll = useScroll()

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#ffd6ff"
      />
      <pointLight position={[-5, 2, 3]} intensity={1.2} color="#ff4444" />

      {/* Megumin */}
      <Suspense fallback={null}>
        <Megumin scroll={scroll} />
      </Suspense>

      {/* 3D Text */}
      <Text
        position={[0, 5 - scroll.offset * 10, 0]}
        fontSize={1}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
      >
        KONOSUBA
      </Text>

      <Text
        position={[0, 0 - scroll.offset * 10, -2]}
        fontSize={0.8}
        color="#f87171"
        anchorX="center"
        anchorY="middle"
      >
        Megumin Appears
      </Text>

      <Text
        position={[0, -5 - scroll.offset * 10, -3]}
        fontSize={1}
        color="#f97316"
        anchorX="center"
        anchorY="middle"
      >
        EXPLOSION 💥
      </Text>

      {/* Stars in the background */}
      <Stars radius={50} depth={20} count={1000} factor={4} fade />
    </>
  )
}

// === 4️⃣ Main Scene ===
export default function KonosubaScene() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 1, 10], fov: 50 }}
        dpr={[1, 2]}
        shadows
      >
        <Suspense
          fallback={
            <Html center>
              <div className="text-white text-xl">Loading 3D scene...</div>
            </Html>
          }
        >
          <Environment preset="night" />
          <ScrollControls pages={3} damping={0.3}>
            <Scroll>
              <SceneContent />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Drei loader at bottom */}
      <Loader />
    </>
  )
}

