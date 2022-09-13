import React, { Suspense } from "react";
import "./ThreeDModel.css";
import { Canvas } from "@react-three/fiber";
import SandwichModel from "./SandwichModel";
import Model from "./Sarnie.js";
import { OrbitControls } from "@react-three/drei";

function ThreeDModel() {
  return (
    <div className="three__d__model__outer">
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate={true} />
        <ambientLight intensity={0.5} />
        {/* <directionalLight position={[-2, 5, 2]} intensity={1}/> */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeDModel;
