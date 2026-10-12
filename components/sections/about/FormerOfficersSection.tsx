"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formerOfficersByYear, availableOfficerYears, FormerOfficer } from "@/data/formerOfficers";
import TeamMemberCard from "@/components/sections/about/TeamMemberCard";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";

export default function FormerOfficersSection() {
  const [selectedYear, setSelectedYear] = useState<string>(
    availableOfficerYears[0] || "2025-2026"
  );

  const officers = formerOfficersByYear[selectedYear] || [];

  return (
    <section className="py-16 px-4 md:px-8 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43DAA1] tracking-tight">
            Former PD Officers
          </h2>
        </div>

        {/* Year Dropdown Pill */}
        <div className="flex justify-center mb-10">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-auto min-w-[160px] bg-[#222222] hover:bg-[#2b2b2b] text-white border-zinc-700/80 rounded-full px-6 py-2.5 h-auto text-base font-semibold shadow-lg transition-all focus:ring-2 focus:ring-[#43DAA1] cursor-pointer [&_svg]:size-5 [&_svg]:opacity-100 [&_svg_*]:stroke-[#69F0AE] [&_svg_*]:fill-[#69F0AE]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#1c1c1e] border-zinc-700 text-white rounded-xl shadow-2xl z-50">
              {availableOfficerYears.map((year) => (
                <SelectItem
                  key={year}
                  value={year}
                  className="hover:bg-zinc-800 focus:bg-zinc-800 text-zinc-100 cursor-pointer font-medium text-sm py-2"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Officers Display */}
        <TooltipProvider delayDuration={150}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Horizontal Scroll on small screens, flex-wrap on larger */}
              <div className="flex flex-row overflow-x-auto lg:flex-wrap items-start justify-start lg:justify-center gap-4 sm:gap-6 py-4 px-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                {officers.map((officer, index) => (
                  <motion.div
                    key={officer.id}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.03,
                    }}
                    className="flex-shrink-0"
                  >
                    <OfficerCircle officer={officer} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </TooltipProvider>
      </div>
    </section>
  );
}

function OfficerCircle({ officer }: { officer: FormerOfficer }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative flex flex-col items-center justify-start p-2 cursor-pointer group transition-transform duration-200 hover:-translate-y-1">
          {/* Avatar circle */}
          <div className="size-20 sm:size-24 rounded-full border-2 border-zinc-700/80 group-hover:border-[#43DAA1] group-hover:shadow-[0_0_15px_rgba(67,218,161,0.35)] transition-all duration-300 overflow-hidden relative bg-zinc-900 flex items-center justify-center">
            {officer.image && !imageError ? (
              <Image
                src={officer.image}
                alt={officer.name}
                fill
                sizes="96px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-500 group-hover:text-[#43DAA1] transition-colors">
                <User className="size-9" />
              </div>
            )}
          </div>

          {/* Officer Title */}
          <p className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors mt-2.5 text-center w-24 sm:w-28 min-h-[2.5rem] flex items-center justify-center whitespace-normal leading-snug">
            {officer.title}
          </p>
        </div>
      </TooltipTrigger>

      <TooltipContent
        side="top"
        sideOffset={10}
        className="bg-transparent border-0 p-0 shadow-2xl z-50"
      >
        <TeamMemberCard member={officer} />
      </TooltipContent>
    </Tooltip>
  );
}
