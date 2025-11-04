"use client";

import Image from "next/image";
import { useState } from "react";

interface VideoPlayerProps {
  image: string;
  videoURL: string;
  alt?: string;
}

export default function VideoPlayer({
  image,
  videoURL,
  alt = "Video thumbnail",
}: VideoPlayerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Thumbnail with Play Button */}
      <div
        className="relative cursor-pointer group overflow-hidden"
        onClick={openModal}
      >
        <Image
          src={image}
          alt={alt}
          width={450}
          height={450}
          className="w-full h-full aspect-4/3 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-40">
          <div className="bg-[#df83e5] rounded-full">
            <svg
              className="size-20 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video */}
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                src={videoURL}
                controls
                autoPlay
                className="w-full h-auto"
                onLoadStart={() => console.log("Video loading started")}
                onError={(e) => console.error("Video error:", e)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal} />
        </div>
      )}
    </>
  );
}
