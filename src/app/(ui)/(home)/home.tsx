import NewsLetterCard from "@/components/subscription/newsletter-card";
import SubscriptionManagement from "@/components/subscription/subscription-management";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../../../components/common/video-player";
import Header from "./header";

const footerLinks = [
  { label: "Energy Balance", href: "#energy-balance" },
  { label: "BMI ", href: "#bmi" },
  { label: "Exercise", href: "#exercise" },
  { label: "Best Diets E-Book", href: "#books" },
];

export default function Home() {
  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("/sky.jpg")',
        }}
        className="bg-cover w-full"
      >
        <Header />

        <div className="relative mt-20">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={50}
            className="max-h-[170px] w-full relative z-10"
            style={{
              width: "100%",
              height: "100%",
              filter: "brightness(1.1) contrast(1.1)",
            }}
          />
        </div>

        <div className="mt-10 mb-20 relative max-w-xl w-full md:h-[400px] text-center mx-auto">
          <Image
            src="/triangles.png"
            alt="Decorative Triangles"
            width={600}
            height={400}
            className="md:absolute h-full w-full  top-0 bottom-0 right-0 left-0 mx-auto"
          />

          <div
            className="absolute left-1/2 top-20 -translate-x-1/2 w-full italic text-2xl sm:text-4xl md:text-[65px] text-[#4272b4] font-bold leading-[1.2]"
            style={{ textShadow: "2px 2px 4px white" }}
          >
            The First
            <br />
            Appetite Fulfillment
          </div>

          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full italic text-2xl sm:text-4xl md:text-[65px] text-[#4272b4] font-bold leading-[1.2]"
            style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
          >
            Diet & App
          </div>
        </div>

        <footer className="bg-white/50 p-4 mt-50">
          <div className="section grid gap-4 grid-cols-[repeat(auto-fit,minmax(0,80px))] w-full items-end">
            {footerLinks.map((l) => (
              <Link
                href={l.href}
                key={l.href}
                className="font-semibold hover:underline text-center wrap-break-word"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </footer>

        <div
          style={{
            backgroundImage: 'url("/sky.jpg")',
          }}
          className="bg-cover bg-center w-full"
        >
          <div>
            <div className="section flex flex-col justify-center items-center px-6 py-24 text-center">
              <div
                className="italic text-[65px] text-[#4272b4] font-bold leading-[1.2] max-[770px]:text-[30px]"
                style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
              >
                Watch
                <br />
                Intro Video
              </div>

              <div className="mt-20 w-[600px] max-w-full">
                <VideoPlayer
                  image="/sky.jpg"
                  videoURL="/intro-video.mp4"
                  alt="Satisfill Intro Video"
                />
              </div>
            </div>

            <div className="section flex flex-col justify-center items-center px-6 py-24 text-center">
              <div
                className="italic text-[65px] text-[#4272b4] font-bold leading-[1.2] max-[770px]:text-[30px]"
                style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
              >
                Watch
                <br />
                Appetite Fulfillment
                <br />
                Video
              </div>

              <div className="mt-20 w-[600px] max-w-full">
                <VideoPlayer
                  image="/sky.jpg"
                  videoURL="/intro-video.mp4"
                  alt="Satisfill Intro Video"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mx-auto flex flex-col justify-center items-center px-6 py-24 text-center">
              <p className="text-4xl md:text-5xl font-semibold text-center">
                Grand Opening Offer!
              </p>

              <div className="mt-10 w-full max-w-sm">
                <SubscriptionManagement onlyShow4MonthPlan={true} />
              </div>

              <p className="text-4xl md:text-5xl  mt-20 font-semibold text-center">
                Not Ready to Join?
              </p>

              <div className="mt-10 w-full max-w-sm">
                <NewsLetterCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
