"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LogoFullSVG } from "./LogoFullSVG";

/**
 * HeroStage3D — Wrapper Client Component que preserva LCP < 2.5s e CLS = 0:
 * - Renderiza o placeholder vetorial `LogoFullSVG` imediatamente no SSR.
 * - Carrega o motor WebGL/WebGPU (`LogoCube3D`) exclusivamente via `next/dynamic(..., { ssr: false })`.
 */
const DynamicLogoCube3D = dynamic(() => import("./LogoCube3D"), {
  ssr: false,
  loading: () => (
    <div
      className="relative flex aspect-square w-full max-w-[440px] flex-col items-center justify-center rounded-3xl border border-[#E4E4E7] bg-linear-to-b from-white via-[#FAFAFA] to-[#F4F4F6] p-6 shadow-xs"
      aria-label="Carregando palco 3D M3D Multidev"
    >
      <LogoFullSVG className="h-64 w-64" animatedArrow />
    </div>
  ),
});

export function HeroStage3D() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Halo sutil azul elétrico sob o palco */}
      <div
        className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full bg-[#008CDD]/10 blur-3xl"
        aria-hidden="true"
      />
      <DynamicLogoCube3D />
    </div>
  );
}

export default HeroStage3D;
