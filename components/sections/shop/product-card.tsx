import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
    title: string;
    description?: string;
    imageSrc?: string;
    variant?: "large" | "small" | "mobile";
    className?: string;
    onClick?: () => void;
}

export default function ProductCard({
    title,
    description,
    imageSrc,
    variant = "large",
    className,
    onClick,
}: ProductCardProps) {
    const isSmall = variant === "small";
    const isMobile = variant === "mobile";

    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex flex-col rounded-[10px] transition-all duration-300 ease-in-out hover:scale-[1.01] cursor-pointer flex-shrink-0",
                "bg-[#18241C]",
                "border border-transparent bg-origin-border",
                "[background:linear-gradient(#18241C,#18241C)_padding-box,linear-gradient(135deg,rgba(178,82,234,0.6)_0%,rgba(74,238,152,0.6)_100%)_border-box]",
                "shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
                isMobile && "w-full aspect-[220/280] p-[5%] pt-[4%] pb-[3%]",
                isSmall && "w-[260px] sm:w-[280px] h-[370px] aspect-[280/370] p-[5%] pt-[4%] pb-[3%]",
                !isMobile && !isSmall && "w-full max-w-[470px] aspect-[470/615] p-[5%] pt-[4%] pb-[4%]",
                className
            )}
        >
            {/* Image Container */}
            <div
                className={cn(
                    "relative w-full rounded-[10px] overflow-hidden bg-[#222C25] flex items-center justify-center",
                    (isSmall || isMobile) ? "h-[80.35%]" : "h-[67.17%]"
                )}
            >
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-white/5 flex items-center justify-center text-white/30 text-xs font-semibold">
                        Image Preview
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-1 mt-auto">
                <h3
                    className={cn(
                        "text-white font-bold uppercase tracking-wide",
                        isMobile && "text-sm sm:text-base leading-tight mt-1",
                        isSmall && "text-lg sm:text-xl leading-tight",
                        !isMobile && !isSmall && "text-xl sm:text-2xl lg:text-[28px] leading-tight"
                    )}
                >
                    {title}
                </h3>
                {!isSmall && !isMobile && description ? (
                    <p className="text-white font-bold text-xs sm:text-sm lg:text-base leading-snug mt-1.5 max-w-[300px]">
                        {description}
                    </p>
                ) : null}
            </div>
        </div>
    );
}