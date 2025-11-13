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
      <div className="max-w-[700px] w-full flex flex-col items-center text-center relative z-10">
        <h1
          className="italic font-extrabold text-[45px] text-[#eaa346]"
          style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
        >
          Coming Soon!
        </h1>
        <h1
          className="italic font-extrabold text-[45px] text-[#eaa346]"
          style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
        >
          January 2026
        </h1>

        <div className="relative mt-10">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={50}
            className="max-h-[120px] w-full relative z-10"
            style={{
              width: "100%",
              height: "100%",
              filter: "brightness(1.1) contrast(1.1)",
            }}
          />
        </div>

        <div className="mt-5 relative max-w-xl w-full md:h-[400px]">
          <Image
            src="/triangles.png"
            alt="Decorative Triangles"
            width={600}
            height={400}
            className="md:absolute top-0 bottom-0 right-0 left-0 mx-auto"
          />

          <div
            className="absolute left-1/2 top-20 -translate-x-1/2 w-full italic text-2xl sm:text-4xl md:text-[55px] text-[#4272b4] font-bold leading-[1.2]"
            style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
          >
            The First
            <br />
            Appetite Fulfillment
          </div>

          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full italic text-2xl sm:text-4xl md:text-[55px] text-[#4272b4] font-bold leading-[1.2]"
            style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
          >
            Diet & App
          </div>
        </div>
      </div>
    </div>
  );
}
