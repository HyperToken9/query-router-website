"use client";
import ShaderBackground from "../components/ShaderBackground";
import MainButton from "../components/MainButton";

export default function Hero() {
  return (
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

        <MainButton
          onClick={() => {
            window.location.href = "#your-email";
          }}
          content="Streamline Your Analytics Today!"
        />
      </div>
    </section>
  );
}
