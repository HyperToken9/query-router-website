import {
  PuzzlePieceIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import computeEngineChart from "~/assets/images/compute-engine-chart.png";

import Image from "next/image";

import Hero from "./sections/Hero";
import Header from "./sections/Header";
import LandingForm from "./sections/LandingForm";

import RouterFigure from "./components/RouterFigure";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  return (
    <div className="max-w-screen h-5">
      <Header />

      {/* Space for header */}
      <main className="pt-18">
        {/* Hero */}
        <div className="container mx-auto">
          <Hero />

          <section className="text-4 pl-7 mb-8 sm:mb-10">
            <h3 className="text-[22px] font-bold mb-4">
              Are you on the best compute?
            </h3>

            <div className="flex flex-col gap-4 md:gap-0 md:flex-row">
              <p className="flex-2 mr-8 sm:mt-5 text-base sm:text-xl">
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
            <p className="mb-8 text-base sm:text-xl">
              TheQueryRouter analyzes each query and intelligently routes it
              based on predefined rules. For simple tasks, it leverages your
              local machine's resources, while complex tasks are seamlessly
              handled by cloud compute.
            </p>
            <div className="sm:px-15">
              <RouterFigure />
            </div>
          </section>

          <section className="mb-24 px-7">
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

              <LandingForm />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
