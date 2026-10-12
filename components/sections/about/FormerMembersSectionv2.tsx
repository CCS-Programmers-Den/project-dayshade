// 2nd Version of Former members, Change the line 10 on app/navlist/about/page.tsx into v2 to see the version 2 
// Delete this if not needed
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formerMembersData, FormerMember } from "@/data/formerMembers";
import { GlassContainer } from "@/components/shared/glass-container";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, Calendar, Award } from "lucide-react";

const TEAMS = [
  "All",
  "Web & App Development",
  "Game Development",
  "Competitive Programming",
  "Multimedia",
] as const;

export default function FormerMembersSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("All");

  const filteredMembers = useMemo(() => {
    return formerMembersData.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.role &&
          member.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        member.batchYear.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTeam =
        selectedTeam === "All" || member.team === selectedTeam;

      return matchesSearch && matchesTeam;
    });
  }, [searchQuery, selectedTeam]);

  return (
    <section className="py-12 px-4 md:px-8 relative w-full">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#43DAA1] tracking-tight mb-2">
            Former Members
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
            Honoring our alumni and former active members who contributed to
            the success of Programmers' Den.
          </p>
        </div>

        {/* Search & Team Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search member, role, or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-full focus-visible:ring-[#43DAA1] focus-visible:border-[#43DAA1]"
            />
          </div>

          {/* Quick Team Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {TEAMS.map((team) => {
              const isSelected = selectedTeam === team;
              return (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#43DAA1] text-black shadow-md shadow-[#43DAA1]/20"
                      : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {team === "All" ? "All Teams" : team.replace(" Development", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Container with Horizontal Dividing Lines */}
        <GlassContainer className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-0 overflow-hidden shadow-2xl">
          {/* Header Stats Strip */}
          <div className="px-6 py-3 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="size-3.5 text-[#43DAA1]" />
              Showing {filteredMembers.length} Former Members
            </span>
          </div>

          {/* Scrollable List Container (media_1790778197433.png: list with horizontal dividing lines) */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-zinc-800/80 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, index) => (
                <MemberRow key={member.id} member={member} index={index} />
              ))
            ) : (
              <div className="py-12 text-center text-zinc-500 text-sm">
                No former members found matching your search.
              </div>
            )}
          </div>
        </GlassContainer>
      </div>
    </section>
  );
}

function MemberRow({ member, index }: { member: FormerMember; index: number }) {
  // Get initials for fallback avatar
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  // Team badge color styling
  const getBadgeStyle = (team: FormerMember["team"]) => {
    switch (team) {
      case "Web & App Development":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Game Development":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Competitive Programming":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Multimedia":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 transition-colors"
    >
      {/* Left: Avatar + Name + Role */}
      <div className="flex items-center gap-3.5">
        <div className="size-10 rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-xs font-bold text-[#43DAA1] shadow-inner flex-shrink-0">
          {initials}
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-zinc-100 leading-tight">
            {member.name}
          </h4>
          {member.role && (
            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
              <Award className="size-3 text-zinc-500" />
              {member.role}
            </p>
          )}
        </div>
      </div>

      {/* Right: Team badge + Batch Year */}
      <div className="flex items-center gap-2.5 sm:justify-end">
        <Badge
          variant="outline"
          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
            member.team
          )}`}
        >
          {member.team}
        </Badge>
        <span className="text-xs text-zinc-400 flex items-center gap-1 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800/80">
          <Calendar className="size-3 text-zinc-500" />
          {member.batchYear}
        </span>
      </div>
    </motion.div>
  );
}
