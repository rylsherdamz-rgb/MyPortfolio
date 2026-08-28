"use client"

import * as THREE from "three"
import React, { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Book002_White_0: THREE.Mesh
    Book001_Orange_0: THREE.Mesh
    Monoblock_Metal_0: THREE.Mesh
    Monoblock_White_0: THREE.Mesh
    Monoblock_Screen_0: THREE.Mesh
    Tourbox_controller_Black1_0: THREE.Mesh
    Soft_Paper_Lamp_Paper_Lamp_0: THREE.Mesh
    window_plane_Light_Outside_0: THREE.Mesh
    Poster_Photo_0: THREE.Mesh
    Curtain_L_Curtains_0: THREE.Mesh
  }
  materials: {
    PaletteMaterial002: THREE.MeshPhysicalMaterial
    PaletteMaterial003: THREE.MeshStandardMaterial
    PaletteMaterial001: THREE.MeshPhysicalMaterial
    Screen: THREE.MeshPhysicalMaterial
    PaletteMaterial004: THREE.MeshPhysicalMaterial
    PaletteMaterial005: THREE.MeshPhysicalMaterial
    Photo: THREE.MeshStandardMaterial
    PaletteMaterial006: THREE.MeshStandardMaterial
  }
}

/**
 * The room model. The monitor's screen mesh is textured with a live
 * CanvasTexture (`screenTexture`) so the section content is PHYSICALLY the
 * display surface — it lights up via emissiveMap and reacts to scene lighting.
 *
 * A ref is forwarded to the actual screen mesh so the camera can read its real
 * world transform (position + normal) and dive straight into it — no eyeballed
 * offsets.
 */
export const RoomStageModel = forwardRef<
  THREE.Mesh,
  ThreeElements["group"] & { screenTexture?: THREE.CanvasTexture | null }
>(function RoomStageModel({ screenTexture, ...props }, screenRef) {
  const { nodes, materials } = useGLTF(
    "/models/oproom.glb"
  ) as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Book002_White_0.geometry}
        material={materials.PaletteMaterial002}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Book001_Orange_0.geometry}
        material={materials.PaletteMaterial003}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Monoblock_Metal_0.geometry}
        material={materials.PaletteMaterial001}
        position={[0.093, 0.997, 0.113]}
        rotation={[-Math.PI / 2, 0, 0.07]}
        scale={1.417}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Monoblock_White_0.geometry}
        material={materials.PaletteMaterial002}
        position={[-0.445, 1.514, -0.025]}
        rotation={[-Math.PI / 2, 0, 0.07]}
        scale={1.218}
      />

      {/* THE DISPLAY. The section content lives here as the mesh's own texture
          (map + emissiveMap), so it is literally the screen surface. */}
      <mesh
        ref={screenRef}
        castShadow
        receiveShadow
        geometry={nodes.Monoblock_Screen_0.geometry}
        position={[-1.011, 1.639, 0.017]}
        rotation={[-Math.PI / 2, 0, 0.07]}
        scale={0.571}
      >
        {screenTexture ? (
          <meshStandardMaterial
            map={screenTexture}
            emissive={"#ffffff"}
            emissiveMap={screenTexture}
            emissiveIntensity={0.85}
            roughness={0.32}
            metalness={0.0}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial
            color="#0b0e14"
            emissive="#12233b"
            emissiveIntensity={0.4}
            roughness={0.35}
          />
        )}
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tourbox_controller_Black1_0.geometry}
        material={materials.PaletteMaterial003}
        position={[0.027, 1.294, 0.005]}
        rotation={[-Math.PI / 2, 0, 0.243]}
        scale={2.12}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Soft_Paper_Lamp_Paper_Lamp_0.geometry}
        material={materials.PaletteMaterial004}
        position={[-0.899, 1.229, 1.077]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.194}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.window_plane_Light_Outside_0.geometry}
        material={materials.PaletteMaterial005}
        position={[0.865, 1.54, -1.616]}
        scale={[0.578, 1.104, 1.87]}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Poster_Photo_0.geometry}
        material={materials.Photo}
        position={[-0.368, 2.203, -1.295]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.32}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_L_Curtains_0.geometry}
        material={materials.PaletteMaterial006}
        position={[0.943, 1.744, -1.209]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1.177, 0.85, 1.177]}
      />
    </group>
  )
})

useGLTF.preload("/models/oproom.glb")
