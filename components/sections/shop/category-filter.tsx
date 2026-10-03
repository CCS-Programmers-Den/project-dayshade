"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type ProductCategory = "all" | "shirts" | "hoodies" | "lanyards";

const CATEGORIES: { label: string; value: ProductCategory }[] = [
    { label: "/all", value: "all" },
    { label: "/shirts", value: "shirts" },
    { label: "/hoodies", value: "hoodies" },
    { label: "/lanyards", value: "lanyards" },
];

export interface CategoryFilterProps {
    featuredCount: number;
    filteredCount: number;
    activeCategory: ProductCategory;
    onCategoryChange: (category: ProductCategory) => void;
    className?: string;
}

export default function CategoryFilter({
    featuredCount,
    filteredCount,
    activeCategory,
    onCategoryChange,
    className,
}: CategoryFilterProps) {
    const statusLabel =
        activeCategory === "all"
            ? `showing: all · ${featuredCount} featured`
            : `showing: ${activeCategory} · ${filteredCount} items`;

    return (
        <div className={cn("flex flex-col items-start font-[family-name:var(--font-jetbrains)]", className)}>
            {/* Tab Bar */}
            <div
                className={cn(
                    "flex flex-row items-start",
                    "bg-[#0A0F0C] border border-white/10",
                    "rounded-t-[14px] overflow-hidden"
                )}
            >
                {CATEGORIES.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => onCategoryChange(value)}
                        className={cn(
                            "group relative flex items-center justify-center px-[30px] h-[60px] text-lg font-medium cursor-pointer overflow-hidden",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green/50 focus-visible:ring-inset",
                            "transition-colors duration-300 ease-in-out",
                            activeCategory === value
                                ? "text-[#04170C]"
                                : "text-[#A78BFA] hover:text-[#04170C]"
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={cn(
                                "absolute inset-0 bg-gradient-to-b from-[#3FD89A] to-[#27B97C] transition-opacity duration-300 ease-in-out pointer-events-none",
                                activeCategory === value ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                        />
                        <span className="relative z-10">{label}</span>
                    </button>
                ))}
            </div>

            {/* Status Bar */}
            <div className="flex items-start px-[22px] py-[12px] bg-[#0A0F0C] rounded-b-[14px] self-stretch">
                <p className="text-[#9FB5A8] text-[15px] leading-[20px] font-medium">
                    {statusLabel}
                </p>
            </div>
        </div>
    );
}
