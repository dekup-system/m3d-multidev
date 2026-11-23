import React from "react";
import { cn } from "@/lib/utils";

export interface LogoFullSVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  showWordmark?: boolean;
  animatedArrow?: boolean;
}

/**
 * LogoFullSVG — Cubo M3D vetorial limpo (sem a seta azul e sem o texto DEVE LOPER),
 * com as letras M, 3 e D na mesma posição exata da imagem enviada.
 */
export function LogoFullSVG({
  className,
  ...props
}: LogoFullSVGProps) {
  return (
    <svg
      viewBox="0 0 320 265"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="M3D Multidev"
      className={cn("select-none", className)}
      {...props}
    >
      <title>M3D Multidev</title>
      <defs>
        <linearGradient id="m3d-cube-body" x1="60" y1="24" x2="260" y2="236" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F4F4F6" />
          <stop offset="100%" stopColor="#E4E4E7" />
        </linearGradient>

        <linearGradient id="m3d-face-top" x1="160" y1="28" x2="160" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F6F6F8" />
        </linearGradient>

        <linearGradient id="m3d-face-left" x1="68" y1="90" x2="155" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F5F7" />
          <stop offset="100%" stopColor="#E6E6EA" />
        </linearGradient>

        <linearGradient id="m3d-face-right" x1="165" y1="90" x2="252" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EFEFF2" />
          <stop offset="100%" stopColor="#DCDCE2" />
        </linearGradient>

        <filter id="m3d-contact-shadow" x="40" y="215" width="240" height="45" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Sombra de contato difusa */}
      <ellipse
        cx="160"
        cy="242"
        rx="74"
        ry="11"
        fill="#131316"
        fillOpacity="0.08"
        filter="url(#m3d-contact-shadow)"
      />

      {/* Silhueta externa do Cubo Isométrico Arredondado */}
      <path
        d="M142 26 C153 20 167 20 178 26 L246 64 C257 70 264 82 264 95 L264 172 C264 185 257 197 246 203 L178 241 C167 247 153 247 142 241 L74 203 C63 197 56 185 56 172 L56 95 C56 82 63 70 74 64 Z"
        fill="url(#m3d-cube-body)"
        stroke="#D4D4D8"
        strokeWidth="1.5"
      />

      {/* Face Superior (Topo Isométrico - "D") */}
      <path
        d="M150 36 C156 32.5 164 32.5 170 36 L228 68 C234 71.5 234 77.5 228 81 L170 113 C164 116.5 156 116.5 150 113 L92 81 C86 77.5 86 71.5 92 68 Z"
        fill="url(#m3d-face-top)"
      />

      {/* Face Esquerda (Recuo Arredondado - "M") */}
      <path
        d="M72 96 C72 89 78 85 84 88.5 L142 121 C147 124 151 130 151 137 L151 206 C151 213 145 217 139 213.5 L81 181 C75 177.5 72 171 72 164 Z"
        fill="url(#m3d-face-left)"
      />

      {/* Face Direita (Recuo Arredondado - "3") */}
      <path
        d="M248 96 C248 89 242 85 236 88.5 L178 121 C173 124 169 130 169 137 L169 206 C169 213 175 217 181 213.5 L239 181 C245 177.5 248 171 248 164 Z"
        fill="url(#m3d-face-right)"
      />

      {/* Glifo "D" Isométrico no Topo — haste reta na diagonal inferior-esquerda e arco para cima-direita, idêntico à imagem */}
      <g transform="translate(160, 74) scale(1, 0.58) rotate(-45)">
        <path
          d="M-24 -26 L2 -26 C20 -26 30 -15 30 0 C30 15 20 26 2 26 L-24 26 Z M-12 -14 L-12 14 L1 14 C11 14 17 9 17 0 C17 -9 11 -14 1 -14 Z"
          fill="#131316"
        />
      </g>

      {/* Glifo "M" Isométrico na Face Esquerda */}
      <g transform="translate(111, 152) skewY(29)">
        <path
          d="M-24 28 L-24 -26 L-13 -26 L0 4 L13 -26 L24 -26 L24 28 L14 28 L14 -7 L3 17 L-3 17 L-14 -7 L-14 28 Z"
          fill="#131316"
        />
      </g>

      {/* Glifo "3" Isométrico na Face Direita */}
      <g transform="translate(209, 152) skewY(-29)">
        <path
          d="M-18 -18 C-15 -24 -8 -27 1 -27 C13 -27 21 -20 21 -11 C21 -4 16 1 9 3 C17 5 23 11 23 19 C23 30 13 37 -1 37 C-11 37 -19 33 -22 25 L-13 20 C-11 25 -6 28 0 28 C7 28 12 24 12 18 C12 12 7 8 -2 8 L-7 8 L-7 -1 L-2 -1 C5 -1 10 -4 10 -10 C10 -15 6 -18 0 -18 C-6 -18 -10 -15 -12 -11 Z"
          fill="#131316"
        />
      </g>
    </svg>
  );
}

export default LogoFullSVG;
