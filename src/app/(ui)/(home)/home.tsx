import AuthStatus from "@/components/auth/auth-status";
import SubscriptionCard from "@/components/common/subscription-card";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "../../../components/common/video-player";

const footerLinks = [
  { label: "Energy Balance", href: "#" },
  { label: "BMI ", href: "#" },
  { label: "Exercise", href: "#" },
  { label: "Best Diets E-Book", href: "#" },
];

const links = [
  { label: "Home", href: "#" },
  { label: "Appetite Fulfillment", href: "#appetite" },
  { label: "Easiest Diet To Follow", href: "#easiest-diet-to-follow" },
  { label: "Nutrition & Health", href: "#nutrition-and-health" },
  { label: "Plans & Pricing", href: "#plans-pricing" },
  { label: "Our Mission", href: "#our-mission" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: 'url("/sky2.jpg")',
      }}
      className="bg-cover bg-center w-full"
    >
      <header className="bg-white/50  p-4">
        <div className="section flex items-center">
          <div>
            <Image
              src="/satisfill-diet.png"
              alt="Satisfill Logo"
              width={150}
              height={50}
              className="max-h-[100px] w-auto"
            />
          </div>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(0,100px))] w-full items-end">
            {links.map((l) => (
              <Link
                href={l.href}
                key={l.href}
                className="font-semibold hover:underline text-center wrap-break-word"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="ml-4">
            <AuthStatus />
          </div>
        </div>
      </header>

      <div className="flex justify-center items-center px-6 pb-24 m-0 relative">
        <div className="max-w-[700px] w-full flex flex-col items-center text-center relative z-10">
          <div className="mt-12 relative p-10">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={50}
              className="max-h-[200px] w-full relative z-10"
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
                className="bg-[#fcfbab] relative flex items-center justify-center mx-auto w-[400px] md:w-[600px] h-[200px] max-[770px]:w-[250px] max-[770px]:h-[150px]"
                style={{
                  clipPath: "polygon(50% 0%, 85% 100%, 15% 100%)",
                }}
              />

              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full italic text-[75px] text-[#4272b4] font-bold leading-[1.2] max-[770px]:text-[30px]"
                style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
              >
                The First
                <br />
                Appetite Fulfillment
              </div>
            </div>

            <div
              className="bg-[#fcfbab] relative flex items-center justify-center mx-auto w-[400px] md:w-[600px] h-[100px] max-[770px]:w-[250px] md:h-20"
              style={{
                clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <div
                className="italic text-[75px] text-[#4272b4] font-bold leading-[1.2] max-[770px]:text-[30px]"
                style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" }}
              >
                Diet & App
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white/50 p-4">
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
        <div className="max-w-md mx-auto flex flex-col justify-center items-center px-6 py-24 text-center">
          <p className="text-4xl font-semibold text-center">
            Grand Opening Offer!
          </p>

          <div className="mt-10 w-full">
            <SubscriptionCard
              title="4 Month Plan"
              description={
                <>
                  Only $50.00
                  <br />
                  50% OFF
                </>
              }
              onJoinNow={() => {}}
            />
          </div>

          <p className="text-4xl mt-20 font-semibold text-center">
            Not Ready to Join?
          </p>

          <div className="mt-10 w-full">
            <SubscriptionCard
              title="Subscribe and get"
              description={
                <>
                  Free e-Book –<br />
                  Best Diets
                  <br />
                  of 2025
                </>
              }
              onJoinNow={() => {}}
              joinText="Subscribe Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
