"use client";

import { cn } from "@/lib/utils";

export type ProductCategory = "all" | "shirts" | "hoodies" | "lanyards";

const CATEGORIES: { label: string; value: ProductCategory }[] = [
    { label: "/all", value: "all" },
    { label: "/shirts", value: "shirts" },
    { label: "/hoodies", value: "hoodies" },
    { label: "/lanyards", value: "lanyards" },
];

export interface CategoryFilterProps {
    activeCategory: ProductCategory;
    onCategoryChange: (category: ProductCategory) => void;
    /** Number of items per category, used for the tab badges and status line. */
    counts: Record<ProductCategory, number>;
    className?: string;
}

export default function CategoryFilter({
    activeCategory,
    onCategoryChange,
    counts,
    className,
}: CategoryFilterProps) {
    const activeCount = counts[activeCategory];
    const statusLabel =
        activeCategory === "all"
            ? `showing: all · ${activeCount} ${activeCount === 1 ? "item" : "items"}`
            : `showing: ${activeCategory} · ${activeCount} ${activeCount === 1 ? "item" : "items"}`;

    return (
        <div
            className={cn(
                "flex flex-col items-stretch w-full md:w-auto md:items-start",
                "font-[family-name:var(--font-jetbrains)]",
                className
            )}
        >
            {/* Tab Bar */}
            <div
                role="tablist"
                aria-label="Filter products by category"
                className={cn(
                    "flex flex-row items-stretch",
                    "bg-[#0A0F0C] border border-white/10",
                    "rounded-t-[14px] overflow-x-auto no-scrollbar",
                    "md:overflow-hidden md:w-fit"
                )}
            >
                {CATEGORIES.map(({ label, value }) => {
                    const isActive = activeCategory === value;
                    const count = counts[value];

                    return (
                        <button
                            key={value}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onCategoryChange(value)}
                            className={cn(
                                "group relative flex flex-1 md:flex-none items-center justify-center gap-1 sm:gap-1.5 overflow-hidden cursor-pointer whitespace-nowrap",
                                "px-2.5 h-[48px] text-xs sm:px-5 sm:h-[52px] sm:text-base md:px-[30px] md:h-[60px] md:text-lg font-medium",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green/50 focus-visible:ring-inset",
                                "transition-colors duration-300 ease-in-out",
                                isActive ? "text-[#04170C]" : "text-[#A78BFA] hover:text-[#04170C]"
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute inset-0 bg-gradient-to-b from-[#3FD89A] to-[#27B97C] transition-opacity duration-300 ease-in-out pointer-events-none",
                                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                )}
                            />
                            <span className="relative z-10">{label}</span>
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "relative z-10 text-[10px] sm:text-[11px] tabular-nums transition-colors duration-300 ease-in-out",
                                    isActive
                                        ? "text-[#04170C]/60"
                                        : "text-[#A78BFA]/50 group-hover:text-[#04170C]/60"
                                )}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Status Bar */}
            <div className="flex items-start px-[18px] py-[12px] md:px-[22px] bg-[#0A0F0C] rounded-b-[14px] md:self-stretch">
                <p
                    aria-live="polite"
                    className="text-[#9FB5A8] text-[13px] md:text-[15px] leading-[20px] font-medium"
                >
                    {statusLabel}
                </p>
            </div>
        </div>
    );
}
