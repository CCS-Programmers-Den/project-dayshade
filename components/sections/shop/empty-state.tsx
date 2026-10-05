import { PackageOpen } from "lucide-react";

export interface ShopEmptyStateProps {
    category: string;
    onReset: () => void;
}

export default function ShopEmptyState({ category, onReset }: ShopEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center font-[family-name:var(--font-jetbrains)]">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0A0F0C] border border-white/10">
                <PackageOpen className="w-6 h-6 text-pd-green" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1.5">
                <p className="text-white text-base md:text-lg font-medium">
                    No {category} yet
                </p>
                <p className="text-[#9FB5A8] text-sm max-w-[320px]">
                    This category is empty for now — check back soon or browse everything in the shop.
                </p>
            </div>
            <button
                type="button"
                onClick={onReset}
                className="mt-1 rounded-full border border-pd-green/40 bg-pd-green/10 px-5 py-2 text-sm font-medium text-pd-green cursor-pointer transition-colors duration-200 hover:bg-pd-green/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F0C]"
            >
                View all products
            </button>
        </div>
    );
}
