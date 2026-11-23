import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoNavbarProps {
  className?: string;
  href?: string;
}

/**
 * LogoNavbar — Variante compacta para o Header fixo:
 * - Ícone isométrico do cubo M3D com contorno hairline, faces M / 3 / D e seta azul elétrica (#008CDD) no vértice inferior.
 * - Wordmark horizontal legível "M3D Multidev" em Geist Sans + tag técnica discreta.
 */
export function LogoNavbar({ className, href = "#topo" }: LogoNavbarProps) {
  return (
    <Link
      href={href}
      aria-label="M3D Multidev — Ir para o início"
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg py-1 pr-2 transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-[#008CDD]",
        className
      )}
    >
      {/* Ícone compacto do cubo M3D */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white shadow-2xs transition-colors group-hover:border-[#008CDD]/40">
        <svg
          viewBox="0 0 64 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          aria-hidden="true"
        >
          {/* Silhueta do Cubo */}
          <path
            d="M28.5 5.5 C30.7 4.2 33.3 4.2 35.5 5.5 L51.5 14.5 C53.7 15.8 55 18.1 55 20.7 L55 38.3 C55 40.9 53.7 43.2 51.5 44.5 L35.5 53.5 C33.3 54.8 30.7 54.8 28.5 53.5 L12.5 44.5 C10.3 43.2 9 40.9 9 38.3 L9 20.7 C9 18.1 10.3 15.8 12.5 14.5 Z"
            fill="#F7F7F8"
            stroke="#D4D4D8"
            strokeWidth="1.5"
          />
          {/* Face Topo */}
          <path
            d="M32 7.5 L48.5 16.8 L32 26.2 L15.5 16.8 Z"
            fill="#FFFFFF"
            stroke="#E4E4E7"
            strokeWidth="0.8"
          />
          {/* Face Esquerda */}
          <path
            d="M12.5 21 L29.5 30.5 L29.5 49.5 L12.5 40 Z"
            fill="#F2F2F5"
          />
          {/* Face Direita */}
          <path
            d="M51.5 21 L34.5 30.5 L34.5 49.5 L51.5 40 Z"
            fill="#E6E6EB"
          />
          {/* Glifo D no Topo */}
          <path
            d="M28 15.5 L32.5 13 C35 14.2 36 16.2 33.5 17.8 L29.5 20 Z"
            fill="#131316"
          />
          {/* Glifo M na Esquerda */}
          <g transform="translate(21, 35) skewY(28)">
            <path
              d="M-5.5 6 L-5.5 -6 L-3 -6 L0 1 L3 -6 L5.5 -6 L5.5 6 L3.2 6 L3.2 -1.5 L0.7 4 L-0.7 4 L-3.2 -1.5 L-3.2 6 Z"
              fill="#131316"
            />
          </g>
          {/* Glifo 3 na Direita */}
          <g transform="translate(43, 35) skewY(-28)">
            <path
              d="M-4 -4 C-3 -5.5 -1.5 -6 0.5 -6 C3 -6 4.8 -4.5 4.8 -2.5 C4.8 -1 3.7 0.2 2 0.7 C3.8 1.1 5.2 2.5 5.2 4.3 C5.2 6.8 3 8.3 -0.2 8.3 C-2.5 8.3 -4.2 7.4 -5 5.6 L-2.8 4.5 C-2.3 5.5 -1.3 6.1 0 6.1 C1.6 6.1 2.7 5.2 2.7 3.9 C2.7 2.6 1.6 1.8 -0.5 1.8 L-1.6 1.8 L-1.6 -0.2 L-0.5 -0.2 C1.2 -0.2 2.3 -1 2.3 -2.2 C2.3 -3.3 1.4 -4 0 -4 C-1.3 -4 -2.2 -3.3 -2.7 -2.4 Z"
              fill="#131316"
            />
          </g>
          {/* Seta Azul Elétrica no Vértice Inferior */}
          <path
            d="M32 51.5 L32 63 M26.5 58.5 L32 63.5 L37.5 58.5"
            stroke="#008CDD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Wordmark Horizontal em Geist Sans */}
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
