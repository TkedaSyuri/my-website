"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import GeoTexture from "../GeoComponents/GeoGround";
import BornFire from "../GeoComponents/BornFire/BornFire";

const SceneCanvas = () => {
  return (
    <div className="w-full h-screen bg-black">
    <Canvas >
      <ambientLight intensity={0.5} />
        <BornFire/>
        <GeoTexture />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default SceneCanvas