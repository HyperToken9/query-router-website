"use client";
import ShaderBackground from "./components/ShaderBackground";
import {
  PuzzlePieceIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import routerIcon from "../../public/assets/images/router-icon.png";

import computeEngineChart from "../../public/assets/images/compute-engine-chart.png";
import RouterFigure from "./router-figure";
import React from "react";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        px-4 pt-4 pb-[25px]
      bg-pink-100/30 rounded-[10px]
        border-2 sm:border-3 border-pink-100/60
      "
    >
      {/* Card */}
      <div className="flex flex-row items-center gap-[10px] mb-[5px] md:items-start md:flex-col">
        {icon}
        <h5 className="text-4 text-gray-950 font-bold">{title}</h5>
      </div>

      <p className="mr-[10px] text-[14px] text-pink-950 leading-normal font-regular">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-screen h-5">
      <header
        className="flex justify-center sm:justify-start items-center py-2
        border-neutral-200 border-b-1 "
      >
        <div className="flex items-center px-5">
          <Image src={routerIcon} alt="Router Icon" width={30} height={30} />
          <div className="ml-[10px] text-xl text-gray-900 font-bold">
            TheQueryRouter
          </div>
        </div>
        {/* <button className="ml-auto" onClick={() => console.log("WOowowo")}>
          Plh Button
        </button> */}
      </header>

      <main className="">
        {/* Hero */}
        <div className="container mx-auto">
          <section
            className="
            flex flex-col items-center justify-center
            min-h-[80vh] px-[15px] sm:px-[25px] mb-5"
          >
            <div
              className="
              flex flex-col justify-center items-center
              text-center rounded-3xl px-5
              bg-white-10 min-h-[70vh] w-full
              relative overflow-hidden isolation-isolate"
            >
              <ShaderBackground
                className="absolute inset-0 -z-10 mix-blend-multiply"
                colorRed={[0.996, 0.819, 0.858]}
                colorBlue={[0.93, 0.88, 0.88]}
                opacity={0.5}
              />

              <h1 className="text-5xl sm:text-6xl font-black tracking-[-2px] mb-5">
                Stop Waiting.
                <br className="sm:hidden" /> Start Routing.
              </h1>
              <p className="text-lg sm:text-xl font-normal mb-10 sm:mb-10 mb5 mb[45px]">
                Pick the best compute for your task. Always!
              </p>
              <button
                className="
                  text-base text4
                  bg-purple-400 font-bold text-white
                  rounded-lg px-5 py-3 px5 py3"
              >
                Streamline Your Analytics Today!
              </button>
            </div>
          </section>

          <section className="text-4 pl-7 mb-8 sm:mb-2">
            <h3 className="text-[22px] font-bold mb-4">
              Are you on the best compute?
            </h3>

            <div className="flex flex-col gap-4 md:gap-0 md:flex-row">
              <p className="flex-2 mr-10 sm:mt-5">
                No more defaulting to heavy-duty compute for every task. Our
                router is smart enough to automatically route each query to the
                right engine, so you're always on the most efficient path.
              </p>

              <figure className="flex-5 flex flex-col items-center gap-2">
                <Image src={computeEngineChart} alt="User Workload Chart" />
                <figcaption className="text-sm sm:text-lg text-gray-800 font-semibold">
                  Typical Developer Query Workload
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="mb-10 px-7">
            <h3 className="text-[22px] font-bold mb-4">
              Don't worry, we got that handled!
            </h3>

            {/* <div className="text-4"> */}
            <p className="mb-5">
              TheQueryRouter analyzes each query and intelligently routes it
              based on predefined rules. For simple tasks, it leverages your
              local machine's resources, while complex tasks are seamlessly
              handled by cloud compute.
            </p>
            <div className="sm:px-15">
              <RouterFigure />
            </div>
          </section>

          <section className="mb-[60px] px-7">
            <h3 className="font-bold text-[22px] my-5">
              Your Workflow, Supercharged.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                icon={<PuzzlePieceIcon className="w-6" />}
                title="Effortless Integration"
                description="A seamless extension to your workflows. Get up and running in minutes!"
              />
              <FeatureCard
                icon={<BanknotesIcon className="w-5" />}
                title="Save on Costs & Time"
                description="Stop overpaying for idle cloud compute and waiting for spin-ups. Drastically cut bills and get instant results."
              />
              <FeatureCard
                icon={<ChartBarIcon className="w-5" />}
                title="Real-time Analytics"
                description="Understand exactly where your compute is used. Get instant visibility to make smarter, data-driven decisions."
              />
            </div>
          </section>

          <section className="px-8">
            <div className="flex flex-col items-center text-center pb-[150px]">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Reclaim Your Workflow.
              </h2>
              <p className="text-base sm:text-lg mb-5 sm:px-10 px-1">
                Optimize your development process with intelligent query
                routing. Get a free architecture review and see how
                TheQueryRouter can benefit your team.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-[15px] p-5">
                <input
                  className="bg-pink-100/30 border-pink-100/60 border 
                    focus:outline-none
                    active:ring-2 hover:ring-2 focus:ring-2 
                    hover:ring-purple-200 
                    focus:ring-purple-300 active:ring-purple-300
                    py-[15px] pl-4 pr-[100px] rounded-xl"
                  placeholder="Your Email"
                />
                <button
                  className="font-bold text-4 
                  bg-purple-400 text-white
                    px-5 py-[10px] rounded-xl"
                >
                  Claim A Free Consult
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
