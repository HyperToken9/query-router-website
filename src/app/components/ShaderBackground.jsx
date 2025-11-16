"use client";
// components/ShaderBackground.jsx
import React, { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Define the shaders (No changes here)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv; 
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_colorRed;
  uniform vec3 u_colorBlue;
  uniform vec3 u_colorWhite;
  uniform float u_opacity;

  #define SIZE .017
  #define AREA .6
  #define MAX 28.

  void main() {
    vec2 uv = vUv - 0.5;
    float maxDim = max(u_resolution.x, u_resolution.y);
    vec2 pos = vec2(uv.x * u_resolution.x, uv.y * u_resolution.y) / maxDim;

    float fft = (sin(u_time * 2.0) + 1.0) * 0.5 * 0.03; 
    float speed = sin(u_time * .05 * (1. + fft * .075)) * 12.5663706;
    float dist = length(pos);
    
    float way = 0.;
    if (dist <= AREA + fft + SIZE) {
      for (float i = 0.; i < MAX; i++) {
        float angle = speed * (i + 1.);
        float radius = AREA + fft - .025 * i;
        if (dist > radius && dist < radius + SIZE && sin(angle) * pos.x + cos(angle) * pos.y > 0.) {
          way = smoothstep(radius, radius + SIZE / 4.5, dist) * smoothstep(radius + SIZE, radius + SIZE / 1.2, dist);
          break;
        }
      }
    }
    
    vec3 color = mix(u_colorBlue, mix(u_colorWhite, u_colorRed, min(fft * fft * 1350., 1.)), way);
    gl_FragColor = vec4(color, u_opacity);
  }
`;

// 2. Create a re-usable material component (No changes here)
const CustomShaderMaterial = shaderMaterial(
  {
    u_time: 0,
    u_opacity: 0.35,
    u_resolution: new THREE.Vector2(),
    u_colorRed: new THREE.Color(0.25, 0.2, 0.15),
    u_colorBlue: new THREE.Color(0.11, 0.15, 0.2),
    u_colorWhite: new THREE.Color(1.0, 0.98, 0.9),
  },
  vertexShader,
  fragmentShader
);

extend({ CustomShaderMaterial });

// 3. The actual shader component logic (*** THIS IS THE FIX ***)
const ShaderPlane = ({ colorRed, colorBlue, colorWhite, opacity }) => {
  const materialRef = useRef();

  const { size, viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.elapsedTime;

      materialRef.current.u_resolution.x = size.width * viewport.dpr;
      materialRef.current.u_resolution.y = size.height * viewport.dpr;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />

      <customShaderMaterial
        ref={materialRef}
        u_opacity={opacity}
        u_colorRed={new THREE.Color(...colorRed)}
        u_colorBlue={new THREE.Color(...colorBlue)}
        u_colorWhite={new THREE.Color(...colorWhite)}
        transparent={true}
      />
    </mesh>
  );
};

// 4. The wrapper component (No changes here)
const ShaderBackground = ({
  className,
  colorRed = [0.6, 0.09, 0.08],
  colorBlue = [0.33, 0.33, 0.33],
  colorWhite = [1.0, 0.98, 0.9],
  opacity = 0.35,
}) => {
  return (
    <Canvas
      className={className}
      // *** ADD THIS LINE ***
      // This inline style overrides the default "position: relative"
      // from the Canvas component, allowing your "absolute" class to work.
      style={{ position: "absolute" }}
    >
      <ShaderPlane
        colorRed={colorRed}
        colorBlue={colorBlue}
        colorWhite={colorWhite}
        opacity={opacity}
      />
    </Canvas>
  );
};

export default ShaderBackground;
