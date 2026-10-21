"use client";

import { technologies } from "@/lib/constants/technologies";
import React from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden items-center justify-around relative py-24">
      <div className="absolute inset-0 z-[-1]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
            duration: 2,
          }}
          className="absolute top-40 left-10"
        >
          <Image
            src="/assets/circle-green.png"
            alt="Green circle"
            width={104}
            height={104}
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.8,
            duration: 2,
          }}
          className="absolute top-1/2 right-10"
        >
          <Image
            src="/assets/circle-purple.png"
            alt="Purple circle"
            width={96}
            height={96}
          />
        </motion.div>

        {/* PURPLE STAR */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: [0, 180, 360],
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.1,
            duration: 2,
            rotate: {
              duration: 3,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
              times: [0, 0.2],
            },
          }}
          className="absolute sm:right-120  sm:bottom-120 bottom-120"
        >
          <Image
            src="/assets/Star-1-full.png"
            alt="Abstract shape 1"
            width={0}
            height={0}
            style={{ width: "512px", height: "auto" }}// warning if inalis T_T
          />
        </motion.div>

        {/* GREEN DIAMOND */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.4,
            duration: 2,
          }}
          className="absolute left-20  bottom-0"
        >
          <Image
            src="/assets/shape-1.png"
            alt="Abstract shape 1"
            height={0}
            width={0}
            style={{ width: '1024px', height: "auto" }}// warning if inalis T_T
          />
        </motion.div>

        {/* LOWER RIGHT GREEN CIRCLE */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.6,
            duration: 2,
          }}
          className="hidden sm:block absolute bottom-[-6rem] right-60"
        >
          <Image
            src="/assets/circle-green.png"
            alt="Green circle"
            width={512}
            height={512}
          />
        </motion.div>

        {/* LOWER LEFT PURPLE CIRLCE */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.9,
            duration: 2,
          }}
          className="size-56 rotate-150 absolute bottom-[-5rem] left-[-5rem] "
        >
          <Image
            src="/assets/circle-purple.png"
            alt="Purple circle"
            width={224}
            height={224}
          />
        </motion.div>
      </div>
      {/* CTA */}
      <div className="flex items-center justify-center gap-8 my-12 flex-col sm:flex-row">
        <motion.div
          className="w-3/4 sm:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            src="/assets/about-pics/about-hero-img.png"
            alt="about-hero"
            width={0}
            height={0}
            style={{ width: "600px", height: "auto" }}// warning if inalis T_T
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
            duration: 2,
          }}
        >
          <h1 className="sm:text-8xl text-4xl font-extrabold text-center mb-10">
            ONLY THE{" "}
            <span className="text-primary">
              BEST
              <br />
            </span>
            AMONG THE REST
          </h1>
          <GlassContainer className="sm:max-w-4xl mx-6 p-10">
            <div className="space-y-6">
              <h3 className="sm:text-3xl text-2xl font-bold text-center">
                Elite Programmers from BSIT, BSIS and BSCS
              </h3>
              <p className="sm:text-xl text-lg text-center">
                We are the Programmers' Den, an organization of Tarlac State
                University - College of Computer Studies that was founded in
                2013.
              </p>
              <p className="sm:text-xl text-lg text-center">
                The organization focuses on design and programming-related
                activities, competitions, and development projects. Our goal is
                to enhance its member capabilities to learn, adapt, and perform
                in desired skillsets.
              </p>
            </div>
          </GlassContainer>
        </motion.div>
      </div>

      <div className="text-center">
        {/* TECHNOLOGIES */}
        <GlassContainer className="mx-6 mb-6">
          <Card className="bg-transparent border-0 shadow-none">
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-9 gap-4 place-items-center">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.7, once: true }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      duration: 2,
                    }}
                  >
                    <Image
                      className="size-8 sm:size-16 object-contain"
                      src={tech.icon}
                      alt={tech.alt}
                      width={64}
                      height={64}
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </GlassContainer>
        <h3 className="text-sm">
          UTILIZING THE LATEST TECHNOLOGIES BEYOND THE CLASSROOM
        </h3>
      </div>
    </div>
  );
}
