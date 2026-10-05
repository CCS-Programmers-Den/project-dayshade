import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
    title: string;
    description?: string;
    imageSrc?: string;
    price?: string | number;
    category?: string;
    variant?: "large" | "small" | "mobile";
    className?: string;
    onClick?: () => void;
}

function formatPrice(price: string | number) {
    return typeof price === "number" ? `₱${price.toLocaleString("en-PH")}` : price;
}

export default function ProductCard({
    title,
    description,
    imageSrc,
    price,
    category,
    variant = "large",
    className,
    onClick,
}: ProductCardProps) {
    const isSmall = variant === "small";
    const isMobile = variant === "mobile";
    const isInteractive = Boolean(onClick);

    return (
        <div
            onClick={onClick}
            onKeyDown={
                isInteractive
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onClick?.();
                        }
                    }
                    : undefined
            }
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            className={cn(
                "group relative flex h-full flex-col rounded-[10px] p-3",
                "transition-[transform,box-shadow,background] duration-300 ease-out",
                "motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.015]",
                "bg-[#18241C]",
                "border border-transparent bg-origin-border",
                "[background:linear-gradient(#18241C,#18241C)_padding-box,linear-gradient(135deg,rgba(178,82,234,0.6)_0%,rgba(74,238,152,0.6)_100%)_border-box]",
                "hover:[background:linear-gradient(#18241C,#18241C)_padding-box,linear-gradient(135deg,rgba(178,82,234,1)_0%,rgba(74,238,152,1)_100%)_border-box]",
                "shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
                "hover:shadow-[0_18px_50px_rgba(0,0,0,0.6),0_0_28px_-6px_rgba(74,238,152,0.45)]",
                isInteractive &&
                "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F0C]",
                isSmall ? "w-[200px] sm:w-[220px] flex-shrink-0" : "w-full",
                !isSmall && !isMobile && "max-w-[300px]",
                className
            )}
        >
            {/* Image */}
            <div className="relative w-full aspect-square rounded-[8px] overflow-hidden bg-[#222C25]">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes={
                            isMobile
                                ? "(max-width: 640px) 45vw, 220px"
                                : isSmall
                                    ? "220px"
                                    : "(max-width: 1024px) 45vw, 300px"
                        }
                        className="object-cover transition-transform duration-500 ease-in-out motion-safe:group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-white/5 flex items-center justify-center text-white/30 text-xs font-semibold">
                        Image Preview
                    </div>
                )}

                {/* Category Chip */}
                {category ? (
                    <span className="absolute top-2 left-2 z-10 rounded-full bg-[#0A0F0C]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-pd-green backdrop-blur-sm">
                        {category}
                    </span>
                ) : null}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-start gap-1 px-1 pt-3 pb-1 text-center">
                <h3
                    className={cn(
                        "text-white font-bold uppercase tracking-wide leading-tight line-clamp-2",
                        isMobile || isSmall ? "text-sm sm:text-base" : "text-base lg:text-lg"
                    )}
                >
                    {title}
                </h3>
                {!isSmall && !isMobile && description ? (
                    <p className="text-white/70 text-xs leading-snug line-clamp-2">
                        {description}
                    </p>
                ) : null}
                {price != null ? (
                    <p
                        className={cn(
                            "mt-auto pt-1 font-[family-name:var(--font-jetbrains)] font-medium text-pd-green-accent",
                            isMobile || isSmall ? "text-xs" : "text-sm"
                        )}
                    >
                        {formatPrice(price)}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
