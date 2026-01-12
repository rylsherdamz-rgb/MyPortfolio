"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls, Environment, AdaptiveDpr } from "@react-three/drei"
import { RoomModel } from "./Room"

export default function RoomCanvas() {
  return (
    <Canvas
      camera={{ position: [14, 9, 20], fov: 43 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[6, 8, 6]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        position={[-6, 3, -6]}
        intensity={0.35}
      />

      <Environment preset="city" />

      <Suspense fallback={null}>
        <RoomModel
          scale={2.3}
          position={[0, -0.9, 0]}
        />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        rotateSpeed={0.2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
      />

      <AdaptiveDpr pixelated />
    </Canvas>
  )
}

