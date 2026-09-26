import React from "react";
import { ImageCarousel } from "@/components/shared/image-carousel";
import Image from "next/image";
import HeroSection from "@/components/sections/about/hero-section";
import ProgdenStory from "@/components/sections/about/progden-story";
import TeamSection from "@/components/sections/about/team-section";
import ProgdenStats from "@/components/sections/about/progden-stats";
import SignUp from "@/components/sections/about/sign-up";

export default function About() {
  return (
    <div className="relative ">
      <HeroSection />

      {/* Panel 2 */}
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <ImageCarousel />
        <Image
          src="/assets/about-pics/about-pd-logo-3.png"
          alt="pd logo"
          className="sm:size-128"
          width={512}
          height={512}
        />
        <h1 className=" sm:text-9xl text-4xl font-bold z-10">
          TOGETHER, FOREVER
        </h1>
      </div>

      <ProgdenStory />

      <TeamSection />

      {/* // ! Temp remove muna, balik nalang if kumpleto na imgs ng old officers */}
      {/* PD OFFICERS
      <div className=" py-12">
        <h1 className="text-primary text-3xl text-center font-bold">
          PD Officers {new Date().getFullYear()} -{" "}
          {new Date().getFullYear() + 1}
        </h1>
        <div className="flex flex-col items-center justify-center  my-6 ">
          <TeamMemberCircles />
        </div>
      </div> */}

      {/* SEPARATOR */}
      <div className="flex items-center justify-center w-full ">
        <div className="bg-gradient-to-r to-[#73FFC5] from-[#2B5B3B] h-12 w-full"></div>

        <div className="flex flex-col items-center mx-8">
          <h2 className="text-4xl font-bold text-[#43DAA1] whitespace-nowrap">
            Our Impact
          </h2>
          <p className="text-lg text-gray-400 whitespace-nowrap">
            Growing stronger every year
          </p>
        </div>

        <div className="bg-gradient-to-r to-[#2B5B3B] from-[#73FFC5] h-12 w-full"></div>
      </div>

      <ProgdenStats />

      <SignUp />
    </div>
  );
}
