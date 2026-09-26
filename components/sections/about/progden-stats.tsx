"use client";

import { UsersRound, SquareCode, Medal } from "lucide-react";
import React from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "framer-motion";

export default function ProgdenStats() {
  const stats = {
    activeMembers: 100,
    projectsCount: 20,
    yearsOfExcellence: 12,
  };

  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
            duration: 0.8,
          }}
        >
          <GlassContainer className="m-6  bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm ransition-all duration-300 hover:shadow-2xl hover:border-white/20">
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="flex items-center justify-center flex-col gap-4 p-4">
                <UsersRound className="size-24  " />
                <p className="text-primary text-6xl font-bold m-0">
                  {stats.activeMembers}+
                </p>
                <p className="text-primary text-xl m-0">Active Members</p>
              </CardContent>
            </Card>
          </GlassContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.4,
            duration: 0.8,
          }}
        >
          <GlassContainer className="m-6  bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm ransition-all duration-300 hover:shadow-2xl hover:border-white/20">
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="flex items-center justify-center flex-col gap-4 p-4">
                <SquareCode className="size-24 " />
                <p className="text-primary text-6xl font-bold m-0">
                  {stats.projectsCount}+
                </p>
                <p className="text-primary text-xl m-0">PROJECTS</p>
              </CardContent>
            </Card>
          </GlassContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.6,
            duration: 0.8,
          }}
        >
          <GlassContainer className="m-6  bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm ransition-all duration-300 hover:shadow-2xl hover:border-white/20">
            <Card className="bg-transparent border-0 shadow-none ">
              <CardContent className="flex items-center justify-center flex-col gap-4 p-4">
                <Medal className="size-24  " />
                <p className="text-primary text-6xl font-bold m-0">
                  {stats.yearsOfExcellence}
                </p>
                <p className="text-primary text-xl m-0">Years of Excellence</p>
              </CardContent>
            </Card>
          </GlassContainer>
        </motion.div>
      </div>
    </div>
  );
}
