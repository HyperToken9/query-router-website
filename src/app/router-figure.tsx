import Image, { type StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";

// Make sure these paths are correct for your project structure
import databricksIcon from "../../public/assets/images/databricks-icon.png";
import routerIcon from "../../public/assets/images/router-icon.png";
import duckdbIcon from "../../public/assets/images/duckdb-icon.png";
import sparkIcon from "../../public/assets/images/spark-icon.png";

// --- Custom Animation Styles ---
// We define the keyframes and glow colors here
const animationStyles = `
  @keyframes stroke-pulse {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -560; /* 10 (dash) + 550 (gap) */
    }
  }

  .pulse-line {
    stroke-dasharray: 10 550;
    /* We use '1s ease-in' for a single shot */
    animation: stroke-pulse 0.5s ease-in;
    stroke-linecap: round;
    stroke-opacity: 1;
    mix-blend-mode: screen;
  }
`;

function Node({
  position,
  icon,
  padding = "p-3",
  isGlow = false,
  activeColor = "shadow-amber-300/50 border-amber-400", // 'glow-red', 'glow-blue', etc.
  idleColor = "border-amber-100",
}: {
  position: string;
  icon: StaticImageData;
  padding?: string;
  isGlow?: boolean;
  activeColor?: string;
  idleColor?: string;
}) {
  return (
    // This is the main grid container for the node
    <div className={`${position} h-full w-full relative`}>
      {/* This is the foreground icon layer */}
      <div
        className={`relative h-full w-full bg-white rounded-xl sm:rounded-3xl`}
      >
        <Image
          src={icon}
          alt="icon"
          fill
          className={`object-fill ${padding}`}
        />
      </div>

      {/* This is the animated background layer */}
      {/* We apply the activeColor and isGlow classes here */}
      <div
        className={`
          absolute inset-0 h-full w-full rounded-xl sm:rounded-3xl
          ${
            isGlow
              ? `opacity-100 ${activeColor} shadow-lg 
              animate-pulse 
              `
              : `${idleColor}`
          }
          transition-all ease-in-out bg-transparent
          border-2 sm:border-4 duration-250
        `}
      />
    </div>
  );
}

// Steps of animation
type AnimationStep =
  | "SRC_GLOW"
  | "SRC_TO_ROUTER_PULSE"
  | "ROUTER_GLOW"
  | "ROUTER_TO_DEST_A_PULSE"
  | "ROUTER_TO_DEST_B_PULSE"
  | "DEST_A_GLOW"
  | "DEST_B_GLOW"
  | "IDLE";

export default function RouterFigure() {
  // --- SVG Path Definitions ---
  const pathAtoB = "M 140  10 C 280  10, 280 150, 430 150";
  const pathBtoC = "M 570 145 C 720 145, 720  10, 860  10";
  const pathBtoD = "M 570 155 C 720 155, 720 300, 860 300";

  // --- Animation State ---
  const [animationStep, setAnimationStep] = useState<AnimationStep>("SRC_GLOW");

  // States for Nodes
  const [srcGlow, setSrcGlow] = useState(true); // Start with A glowing
  const [routerGlow, setRouterGlow] = useState(false);
  const [nodeAGlow, setNodeAGlow] = useState(false);
  const [nodeBGlow, setNodeBGlow] = useState(false);

  // States for Paths
  const [pulseToRouter, setPulseToRouter] = useState(false);
  const [pulseToDestA, setPulseToDestA] = useState(false);
  const [pulseToDestB, setPulseToDestB] = useState(false);

  // --- Animation Logic ---
  useEffect(() => {
    switch (animationStep) {
      case "SRC_GLOW":
        setSrcGlow(true);
        setTimeout(() => {
          setAnimationStep("SRC_TO_ROUTER_PULSE");
        }, 1000);
        break;
      case "SRC_TO_ROUTER_PULSE":
        setPulseToRouter(true);
        setSrcGlow(false);
        setTimeout(() => {
          setPulseToRouter(false);
        }, 400);
        setTimeout(() => {
          setRouterGlow(true);
          setAnimationStep("ROUTER_GLOW");
        }, 300);
        break;

      case "ROUTER_GLOW":
        setTimeout(() => {
          setRouterGlow(false);
        }, 500);
        setTimeout(() => {
          // Give me a probaliltiy of 10%
          const goToA = Math.random() < 0.1;
          if (goToA) {
            setPulseToDestA(true);
            setAnimationStep("ROUTER_TO_DEST_A_PULSE");
          } else {
            setPulseToDestB(true);
            setAnimationStep("ROUTER_TO_DEST_B_PULSE");
          }
        }, 600);
        break;

      case "ROUTER_TO_DEST_A_PULSE":
        setTimeout(() => {
          setNodeAGlow(true);
          setRouterGlow(false);
        }, 300);
        setTimeout(() => {
          setPulseToDestA(false);
          setAnimationStep("DEST_A_GLOW");
        }, 400);
        break;
      case "DEST_A_GLOW":
        setTimeout(() => {
          setNodeAGlow(false);
          setAnimationStep("IDLE");
        }, 300);
        break;
      case "ROUTER_TO_DEST_B_PULSE":
        setTimeout(() => {
          setNodeBGlow(true);
          setRouterGlow(false);
        }, 300);
        setTimeout(() => {
          setPulseToDestB(false);
          setAnimationStep("DEST_B_GLOW");
        }, 400);
        break;
      case "DEST_B_GLOW":
        setTimeout(() => {
          setNodeBGlow(false);
          setAnimationStep("IDLE");
        }, 300);
        break;
      case "IDLE":
        setTimeout(() => {
          setAnimationStep("SRC_GLOW");
        }, 250);
    }
  }, [animationStep]);

  return (
    <div className="rounded-2xl sm:rounded-4xl bg-pink-100/30 border-pink-100/80 border-2 sm:border-4 p-4 sm:p-12">
      <figure
        className="relative diagram-container grid grid-cols-7 grid-rows-3
        w-full aspect-7/3 "
      >
        {/* --- STYLES --- */}
        <style>{animationStyles}</style>

        {/* --- NODES --- */}
        <Node
          position="row-start-1 col-start-1"
          padding="p-[20%]"
          icon={databricksIcon}
          isGlow={srcGlow}
          activeColor="shadow-red-300/50 border-red-500"
          idleColor="shadow-red-300/20 border-red-100"
        />
        <Node
          position="row-start-2 col-start-4"
          padding="p-[25%]"
          icon={routerIcon}
          isGlow={routerGlow}
          activeColor="shadow-pink-300/50 border-pink-500"
          idleColor="shadow-pink-300/20 border-pink-100"
        />
        <Node
          position="row-start-3 col-start-7"
          padding="p-[20%]"
          icon={sparkIcon}
          isGlow={nodeAGlow}
          activeColor="shadow-orange-300/80 border-orange-500"
          idleColor="shadow-orange-300/20 border-orange-100"
        />
        <Node
          position="row-start-1 col-start-7"
          padding="p-[25%]"
          icon={duckdbIcon}
          isGlow={nodeBGlow}
          activeColor="shadow-yellow-200/80 border-yellow-300"
          idleColor="shadow-yellow-200/10 border-yellow-100"
        />

        {/* --- SVG --- */}
        <svg
          className="absolute top-0 left-0 pointer-events-none w-full h-full"
          viewBox="0 0 1000 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blurred"
              />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* --- Path A to B --- */}
          <path d={pathAtoB} fill="none" stroke="#D9D9D9" strokeWidth="3" />
          {pulseToRouter && (
            <path
              className="pulse-line"
              d={pathAtoB}
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              filter="url(#glow)"
            />
          )}

          {/* --- Path B to C --- */}
          <path d={pathBtoC} fill="none" stroke="#D9D9D9" strokeWidth="3" />
          {pulseToDestB && (
            <path
              className="pulse-line"
              d={pathBtoC}
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              filter="url(#glow)"
            />
          )}

          {/* --- Path from B to D --- */}
          <path d={pathBtoD} fill="none" stroke="#D9D9D9" strokeWidth="3" />
          {pulseToDestA && (
            <path
              className="pulse-line"
              d={pathBtoD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              filter="url(#glow)"
            />
          )}
        </svg>
      </figure>
    </div>
  );
}
