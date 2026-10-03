import FeaturedCard from "@/components/sections/shop/featured-card";
import Products from "@/components/sections/shop/products";

export default function ShopPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="flex flex-col items-center w-full px-4 md:px-12 pt-20 lg:pt-24 pb-12 gap-8 md:gap-12 bg-[linear-gradient(180deg,rgba(178,82,234,0)_0%,rgba(178,82,234,0.098)_26.44%,rgba(178,82,234,0.378)_51.44%,rgba(74,238,152,0.7)_98.08%)]">
                <FeaturedCard />
            </div>

            {/* Products Section */}
            <div className="relative w-full overflow-hidden min-h-screen px-4 md:px-12 py-16 lg:py-24">
                {/* Background Gradients */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    {/* Primary Glow */}
                    <div
                        className="absolute -top-[10%] -left-[20%] w-[65vw] max-w-[1115px] aspect-square rounded-full blur-[40px]"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(74, 238, 152, 0.2) 0%, rgba(74, 238, 152, 0.016) 100%)",
                        }}
                    />

                    {/* Highlight Glow */}
                    <div
                        className="absolute top-[18%] left-[25%] w-[55vw] max-w-[890px] aspect-square rounded-full blur-[38px]"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.012) 100%)",
                        }}
                    />

                    {/* Secondary Accent Glow */}
                    <div
                        className="absolute top-[32%] -right-[20%] w-[70vw] max-w-[1206px] aspect-square rounded-full blur-[80px]"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(178, 82, 234, 0.2) 0%, rgba(178, 82, 234, 0.04) 100%)",
                        }}
                    />

                    {/* Ambient Glow */}
                    <div
                        className="absolute -bottom-[15%] -left-[20%] w-[75vw] max-w-[1275px] aspect-square rounded-full opacity-25 blur-[38px]"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.55) 12.5%, rgba(255, 255, 255, 0.033) 89.9%)",
                        }}
                    />

                    {/* Blur Overlay */}
                    <div className="absolute inset-0 backdrop-blur-[60px] pointer-events-none" />

                    {/* Texture Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex justify-center">
                    <Products />
                </div>
            </div>
        </>
    );
}