"use client"

import { Canvas } from "@react-three/fiber"
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
  Stars,
} from "@react-three/drei"
import Megumin from "./megumin"

function SceneContent() {
  const scroll = useScroll()

  return (
    <>
      {/* Konosuba fantasy vibe */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffb3ff" />
      <pointLight position={[-5, 2, 3]} intensity={2} color="#ff4444" />

      <Megumin scroll={scroll} />

      <Stars radius={50} depth={20} count={3000} factor={4} fade />
    </>
  )
}

export default function KonosubaScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.5]}
    >
      <ScrollControls pages={3} damping={0.25}>
        <Scroll>
          <SceneContent />
        </Scroll>

        {/* HTML overlay */}
        <Scroll html>
          <section className="h-screen flex items-center justify-center">
            <h1 className="text-6xl font-bold text-purple-300">
              KONOSUBA
            </h1>
          </section>

          <section className="h-screen flex items-center justify-center">
            <h2 className="text-5xl font-semibold text-red-400">
              Megumin Appears
            </h2>
          </section>

          <section className="h-screen flex items-center justify-center">
            <h2 className="text-5xl font-bold text-orange-400">
              EXPLOSION 💥
            </h2>
          </section>
        </Scroll>
      </ScrollControls>

      <Environment preset="night" />
    </Canvas>
  )
}

