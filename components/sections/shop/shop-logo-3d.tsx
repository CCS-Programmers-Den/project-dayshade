"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { PDLogo } from "@/components/logos/pd-logo";
import { cn } from "@/lib/utils";

/** The home hero renders the logo in a 600x338 canvas at zoom 40. */
const REFERENCE_HEIGHT = 338;
const REFERENCE_ZOOM = 40;

/**
 * An orthographic camera's zoom is in scene units, so a smaller canvas would
 * otherwise crop the model. Scaling zoom with the canvas keeps the framing
 * identical to the home hero at every breakpoint.
 */
function FramedCamera() {
    const height = useThree((state) => state.size.height);

    return (
        <OrthographicCamera
            makeDefault
            position={[0, 5, 120]}
            zoom={(height / REFERENCE_HEIGHT) * REFERENCE_ZOOM}
            near={0.1}
            far={1000}
        />
    );
}

export interface ShopLogo3DProps {
    className?: string;
}

/** The same 3D mark the home hero uses, scaled down for a section header. */
export default function ShopLogo3D({ className }: ShopLogo3DProps) {
    return (
        <div
            aria-hidden="true"
            className={cn("h-36 w-full max-w-[240px] md:h-52 md:max-w-[340px]", className)}
        >
            <Canvas
                className="w-full h-full"
                dpr={[1, 2]}
                camera={{ position: [0, 0, 3], fov: 130 }}
            >
                <FramedCamera />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Environment preset="forest" />
                <PDLogo />
            </Canvas>
        </div>
    );
}
