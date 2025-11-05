"use client";

import Image from "next/image";

export default function ComingSoon() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-6 py-12 pb-24 box-border m-0 relative"
      style={{
        backgroundImage: 'url("/sky.jpg")',
      }}
    >
      {/* Sun shining effect overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-[sun-overlay_3s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 200, 0.5) 15%,
            rgba(255, 255, 150, 0.3) 30%,
            rgba(255, 255, 100, 0.15) 45%,
            rgba(255, 255, 50, 0.05) 60%,
            transparent 80%
          )`,
        }}
      />

      <div className="max-w-[700px] w-full flex flex-col items-center text-center relative z-10">
        <h1
          className="italic font-extrabold text-[45px] text-[#eaa446] mt-5"
          style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
        >
          Coming Soon!
        </h1>
        <h1
          className="italic font-extrabold text-[45px] text-[#eaa446] mt-5"
          style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
        >
          January 2026
        </h1>

        <div
          className="mt-12 relative p-10"
          style={{
            background: `radial-gradient(
              circle,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 255, 200, 0.8) 20%,
              rgba(255, 255, 150, 0.6) 40%,
              rgba(255, 255, 100, 0.3) 60%,
              rgba(255, 255, 50, 0.1) 80%,
              transparent 100%
            )`,
          }}
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={50}
            className="max-h-[100px] w-full relative z-10"
            style={{
              width: "100%",
              height: "100%",
              filter: "brightness(1.1) contrast(1.1)",
            }}
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 w-full">
          <div className="relative w-full">
            <div
              className="bg-[#fcfbab] relative flex items-center justify-center mx-auto w-[400px] h-[200px] max-[500px]:w-[250px] max-[500px]:h-[150px]"
              style={{
                clipPath: "polygon(50% 0%, 85% 100%, 15% 100%)",
              }}
            />

            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full italic text-[45px] text-[#4272b4] font-bold leading-[1.2] max-[500px]:text-[30px]"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
            >
              The First
              <br />
              Appetite Fulfillment
            </div>
          </div>

          <div
            className="bg-[#fcfbab] relative flex items-center justify-center mx-auto w-[400px] h-[100px] max-[500px]:w-[250px] max-[500px]:h-[80px]"
            style={{
              clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <div
              className="italic text-[45px] text-[#4272b4] font-bold leading-[1.2] max-[500px]:text-[30px]"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
            >
              Diet & App
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
