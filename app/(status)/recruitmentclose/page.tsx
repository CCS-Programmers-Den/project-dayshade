import { GlassContainer } from "@/components/shared/glass-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ClosedRecruitment() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)/60] to-[var(--sidebar)/30] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/assets/star-3.png"
          alt="decorative star"
          width={320}
          height={320}
          className="absolute object-contain opacity-60 -translate-x-32 -translate-y-16 animate-spin-slow"
          unoptimized
        />
        <Image
          src="/assets/star-4.png"
          alt="decorative star"
          width={384}
          height={384}
          className="absolute object-contain opacity-80 translate-x-24 translate-y-12 animate-spin-slow-reverse"
          unoptimized
        />
      </div>

      <GlassContainer
        variant="card"
  className="relative z-10 backdrop-blur-3xl bg-white/2 rounded-3xl p-12 text-center max-w-3xl w-full mx-4 border-white/2 shadow-2xl"
      >
        <h1 className="text-8xl font-bold text-white mb-4 tracking-tight">
          CLOSED
        </h1>
        <h2 className="text-xl text-white/90 mb-2 font-medium">
          Oops! Looks like we’re currently not looking for members!
        </h2>
        <p className="text-white/70 mb-8 text-sm">
          Follow Programmers’ Den official Facebook page to get news on when
          recruitment is live
        </p>
        <Link href="/">
          <Button className="mt-4 px-4 md:px-6 py-6 bg-gradient-to-r from-[#67FFAF] via-100% to-[#0D4D2C] rounded-full hover:bg-pd-green-dark cursor-pointer text-white font-bold text-xl">
            Take Me Home
          </Button>
        </Link>
      </GlassContainer>
    </div>
  );
}
