import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoNavbarProps {
  className?: string;
  href?: string;
}

/**
 * LogoNavbar — Usa a logomarca original em anexo no menu superior + wordmark clean.
 */
export function LogoNavbar({ className, href = "#topo" }: LogoNavbarProps) {
  return (
    <Link
      href={href}
      aria-label="M3D Multidev — Ir para o início"
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg py-1 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#008CDD]",
        className
      )}
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#131316]/15 bg-[#131316] p-1 shadow-xs transition-transform group-hover:scale-105">
        <Image
          src="/logo-m3d-original.png"
          alt="Logo M3D Multidev"
          width={44}
          height={44}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-base font-bold tracking-tight text-[#131316]">
            M3D
          </span>
          <span className="font-sans text-base font-medium tracking-tight text-[#0A2540]">
            Multidev
          </span>
          <span
            className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-[#008CDD]"
            aria-hidden="true"
          />
        </div>
        <span className="font-mono text-[10px] font-medium tracking-wider text-[#52525B] uppercase">
          Windows · Android · Web
        </span>
      </div>
    </Link>
  );
}

export default LogoNavbar;
