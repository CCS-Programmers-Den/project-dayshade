"use client";

import { useMemo, useState } from "react";
import { formerMembersData } from "@/lib/constants/former-members";
import { cn } from "@/lib/utils";

const TEAMS = ["All", "Web & App Development", "Game Development", "Competitive Programming", "Multimedia"] as const;

export default function FormerMembersSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("All");

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return formerMembersData.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(q) ||
        (member.role && member.role.toLowerCase().includes(q)) ||
        member.batchYear.toLowerCase().includes(q);
      const matchesTeam = selectedTeam === "All" || member.team === selectedTeam;
      return matchesSearch && matchesTeam;
    });
  }, [searchQuery, selectedTeam]);

  return (
    <section className="px-page py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-display">Former members</h2>
          <p className="mt-6 max-w-sm text-lg leading-snug text-pd-bone/65">
            Honoring the alumni and former members who helped build Programmers&apos; Den.
          </p>
        </div>

        <div className="lg:col-span-8">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role or batch"
            aria-label="Search former members"
            className="h-12 w-full rounded-full border border-white/20 bg-transparent px-5 text-base text-pd-bone placeholder:text-pd-light-grey focus:border-pd-green focus:outline-none"
          />
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by team">
            {TEAMS.map((team) => (
              <button
                key={team}
                type="button"
                aria-pressed={team === selectedTeam}
                onClick={() => setSelectedTeam(team)}
                className={cn(
                  "h-9 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pd-green",
                  team === selectedTeam
                    ? "border-pd-green bg-pd-green text-pd-black"
                    : "border-white/20 text-pd-bone hover:border-pd-bone"
                )}
              >
                {team}
              </button>
            ))}
          </div>

          <p className="mt-8 text-pd-light-grey" aria-live="polite">
            {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"}
          </p>
          <ul
            data-lenis-prevent
            className="mt-3 max-h-[420px] overflow-y-auto border-t border-white/10 [scrollbar-color:rgb(255_255_255/0.25)_transparent] [scrollbar-width:thin]"
          >
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-col gap-1 border-b border-white/10 py-4 pr-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-bold text-pd-bone">{member.name}</p>
                    <p className="text-pd-bone/60">{[member.role, member.team].filter(Boolean).join(" · ")}</p>
                  </div>
                  <p className="text-pd-light-grey">{member.batchYear}</p>
                </li>
              ))
            ) : (
              <li className="py-8 text-pd-bone/60">No members match that search. Try another name or team.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
