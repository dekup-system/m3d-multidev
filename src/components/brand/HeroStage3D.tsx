"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LogoFullSVG } from "./LogoFullSVG";

const DynamicLogoCube3D = dynamic(() => import("./LogoCube3D"), {
  ssr: false,
  loading: () => (
    <div
      className="relative flex aspect-square w-full max-w-[400px] flex-col items-center justify-center rounded-3xl border border-[#E4E4E7] bg-linear-to-b from-white via-[#FAFAFA] to-[#F4F4F6] p-6 shadow-xs"
      aria-label="Carregando cubo 3D M3D Multidev"
    >
      <LogoFullSVG className="h-56 w-56" />
    </div>
  ),
});

export function HeroStage3D() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <div
        className="pointer-events-none absolute -z-10 h-64 w-64 rounded-full bg-[#008CDD]/10 blur-3xl"
        aria-hidden="true"
      />
      <DynamicLogoCube3D />
    </div>
  );
}

export default HeroStage3D;
