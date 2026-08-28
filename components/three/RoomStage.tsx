"use client"

import * as THREE from "three"
import React, { useRef, type ReactNode } from "react"
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
 * Content slots the room exposes. Each maps to a physical object in the scene;
 * the parent renders content INTO these anchors so it lives on the object
 * (a screen UI on the monitor, a poster image on the wall, a feed in the
 * window, etc.). Every anchor is a group already transformed to sit flush on
 * its surface, so children just use small local offsets.
 */
export type RoomSlots = {
  /** On the monitor's screen plane, facing the viewer. */
  screen?: ReactNode
  /** On the wall poster. */
  poster?: ReactNode
  /** In the window opening. */
  window?: ReactNode
  /** Floating just above the desk / books. */
  desk?: ReactNode
  /** By the paper lamp. */
  lamp?: ReactNode
}

/**
 * The room model with content anchor groups layered onto its key objects.
 *
 * Anchor transforms are derived from each mesh's own placement (position +
 * baked rotation) and then nudged so an attached plane/Html sits just in front
 * of the physical surface. These were tuned against the GLB; adjust the small
 * offsets here if a panel floats off its object.
 */
export function RoomStageModel({
  slots,
  screenOn = true,
  ...props
}: ThreeElements["group"] & { slots?: RoomSlots; screenOn?: boolean }) {
  const { nodes, materials } = useGLTF(
    "/models/oproom.glb"
  ) as unknown as GLTFResult

  const screenMat = useRef<THREE.MeshStandardMaterial>(null)

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

      {/* Monitor screen mesh. We swap in an emissive material so the screen
          reads as "on", and anchor the live UI just in front of it. */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Monoblock_Screen_0.geometry}
        position={[-1.011, 1.639, 0.017]}
        rotation={[-Math.PI / 2, 0, 0.07]}
        scale={0.571}
      >
        <meshStandardMaterial
          ref={screenMat}
          color={screenOn ? "#0b0e14" : "#05070a"}
          emissive={screenOn ? "#12233b" : "#000000"}
          emissiveIntensity={screenOn ? 0.6 : 0}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* SCREEN CONTENT ANCHOR.
          The screen mesh faces roughly toward the room front-left. This group
          is placed at the screen and rotated to lie flat against its face so an
          Html/plane child appears printed on the display. */}
      <group
        name="anchor-screen"
        position={[-1.16, 1.72, 0.16]}
        rotation={[0, 0.62, 0.07]}
      >
        {slots?.screen}
      </group>

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

      {/* LAMP ANCHOR — content sits beside the paper lamp, camera-facing. */}
      <group name="anchor-lamp" position={[-0.9, 1.7, 1.08]}>
        {slots?.lamp}
      </group>

      {/* Window + baked "outside light". */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.window_plane_Light_Outside_0.geometry}
        material={materials.PaletteMaterial005}
        position={[0.865, 1.54, -1.616]}
        scale={[0.578, 1.104, 1.87]}
      />

      {/* WINDOW ANCHOR — content in the window opening, facing into the room. */}
      <group
        name="anchor-window"
        position={[0.9, 1.62, -1.5]}
        rotation={[0, Math.PI, 0]}
      >
        {slots?.window}
      </group>

      {/* Poster frame. */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Poster_Photo_0.geometry}
        material={materials.Photo}
        position={[-0.368, 2.203, -1.295]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.32}
      />

      {/* POSTER ANCHOR — content printed on the wall poster, facing the room. */}
      <group name="anchor-poster" position={[-0.368, 2.203, -1.27]}>
        {slots?.poster}
      </group>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_L_Curtains_0.geometry}
        material={materials.PaletteMaterial006}
        position={[0.943, 1.744, -1.209]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1.177, 0.85, 1.177]}
      />

      {/* DESK ANCHOR — content floats just above the desk / books. */}
      <group name="anchor-desk" position={[0.35, 1.25, 0.5]}>
        {slots?.desk}
      </group>
    </group>
  )
}

useGLTF.preload("/models/oproom.glb")
