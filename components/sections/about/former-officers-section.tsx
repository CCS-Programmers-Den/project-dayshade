"use client";

import { useState } from "react";
import { formerOfficersByYear, availableOfficerYears } from "@/lib/constants/former-officers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OfficerCard } from "./officer-card";

export default function FormerOfficersSection() {
  const [selectedYear, setSelectedYear] = useState<string>(availableOfficerYears[0] || "2025-2026");
  const officers = formerOfficersByYear[selectedYear] || [];

  return (
    <section className="px-page py-24 md:py-32">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="text-display">Former officers</h2>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger
            aria-label="Academic year"
            className="h-12 w-auto min-w-[180px] rounded-full border-white/25 bg-transparent px-5 text-base font-semibold text-pd-bone focus:ring-2 focus:ring-pd-green"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-white/15 bg-pd-banner-mid text-pd-bone">
            {availableOfficerYears.map((year) => (
              <SelectItem key={year} value={year} className="cursor-pointer focus:bg-white/10 focus:text-pd-bone">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {officers.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
          {officers.map((officer) => (
            <OfficerCard key={officer.id} officer={officer} />
          ))}
        </ul>
      ) : (
        <p className="text-lg text-pd-bone/60">No officers listed for {selectedYear} yet.</p>
      )}
    </section>
  );
}
