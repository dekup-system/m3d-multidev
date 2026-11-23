import React from "react";
import { cn } from "@/lib/utils";

export interface LogoFullSVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  showWordmark?: boolean;
  animatedArrow?: boolean;
}

/**
 * LogoFullSVG — Recriação vetorial limpa (< 15 KB) da identidade M3D Multidev adaptada para Light Mode:
 * - Cubo 3D isométrico de vértices arredondados branco/cinza-claro com contorno hairline (#E4E4E7 / #D4D4D8)
 *   para separação óptica perfeita sobre o canvas #FAFAFA.
 * - Faces isométricas: "D" (topo), "M" (esquerda) e "3" (direita) em grafite profundo (#131316).
 * - Letreiro inferior arqueado "DEVE" e "LOPER" convertido do branco original para grafite/ardósia (#0A2540)
 *   com contraste >= 12:1 (WCAG 2.2 AA/AAA), mantendo cada "E" formado por 3 barras horizontais paralelas.
 * - Seta azul elétrica vibrante (#008CDD) apontando para baixo no vértice inferior, dividindo "DEVE" e "LOPER".
 */
export function LogoFullSVG({
  className,
  showWordmark = true,
  animatedArrow = false,
  ...props
}: LogoFullSVGProps) {
  return (
    <svg
      viewBox={showWordmark ? "0 0 320 340" : "0 0 320 280"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="M3D Multidev"
      className={cn("select-none", className)}
      {...props}
    >
      <title>M3D Multidev — Engenharia de Multi-Sistemas Windows, Android e Web</title>
      <defs>
        {/* Gradientes sutis de estúdio para separação óptica do cubo claro sobre #FAFAFA */}
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

        <filter id="m3d-contact-shadow" x="40" y="215" width="240" height="50" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Sombra de contato difusa de estúdio */}
      <ellipse
        cx="160"
        cy="238"
        rx="74"
        ry="12"
        fill="#131316"
        fillOpacity="0.08"
        filter="url(#m3d-contact-shadow)"
      />

      {/* Silhueta externa do Cubo Isométrico Arredondado com contorno hairline */}
      <path
        d="M142 26 C153 20 167 20 178 26 L246 64 C257 70 264 82 264 95 L264 172 C264 185 257 197 246 203 L178 241 C167 247 153 247 142 241 L74 203 C63 197 56 185 56 172 L56 95 C56 82 63 70 74 64 Z"
        fill="url(#m3d-cube-body)"
        stroke="#D4D4D8"
        strokeWidth="1.5"
      />

      {/* Chanfro / Brilho interno superior para volume 3D */}
      <path
        d="M144 29 C154 23.5 166 23.5 176 29 L243 66.5 C253 72 260 83 260 95"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Face Superior (Topo Isométrico - "D") */}
      <path
        d="M150 36 C156 32.5 164 32.5 170 36 L228 68 C234 71.5 234 77.5 228 81 L170 113 C164 116.5 156 116.5 150 113 L92 81 C86 77.5 86 71.5 92 68 Z"
        fill="url(#m3d-face-top)"
        stroke="#E4E4E7"
        strokeWidth="1"
      />

      {/* Face Esquerda (Recuo Arredondado - "M") */}
      <path
        d="M72 96 C72 89 78 85 84 88.5 L142 121 C147 124 151 130 151 137 L151 206 C151 213 145 217 139 213.5 L81 181 C75 177.5 72 171 72 164 Z"
        fill="url(#m3d-face-left)"
        stroke="#DFDFE4"
        strokeWidth="1"
      />

      {/* Face Direita (Recuo Arredondado - "3") */}
      <path
        d="M248 96 C248 89 242 85 236 88.5 L178 121 C173 124 169 130 169 137 L169 206 C169 213 175 217 181 213.5 L239 181 C245 177.5 248 171 248 164 Z"
        fill="url(#m3d-face-right)"
        stroke="#D4D4D8"
        strokeWidth="1"
      />

      {/* Glifo "D" Isométrico no Topo (Grafite #131316) */}
      <g transform="translate(160, 74) scale(1, 0.58) rotate(-45)">
        <path
          d="M-22 -24 L2 -24 C18 -24 28 -14 28 0 C28 14 18 24 2 24 L-22 24 Z M-11 -13 L-11 13 L1 13 C10 13 16 8 16 0 C16 -8 10 -13 1 -13 Z"
          fill="#131316"
        />
      </g>

      {/* Glifo "M" Isométrico na Face Esquerda (Grafite #131316) */}
      <g transform="translate(111, 152) skewY(29)">
        <path
          d="M-24 28 L-24 -26 L-13 -26 L0 4 L13 -26 L24 -26 L24 28 L14 28 L14 -7 L3 17 L-3 17 L-14 -7 L-14 28 Z"
          fill="#131316"
        />
      </g>

      {/* Glifo "3" Isométrico na Face Direita (Grafite #131316) */}
      <g transform="translate(209, 152) skewY(-29)">
        <path
          d="M-18 -18 C-15 -24 -8 -27 1 -27 C13 -27 21 -20 21 -11 C21 -4 16 1 9 3 C17 5 23 11 23 19 C23 30 13 37 -1 37 C-11 37 -19 33 -22 25 L-13 20 C-11 25 -6 28 0 28 C7 28 12 24 12 18 C12 12 7 8 -2 8 L-7 8 L-7 -1 L-2 -1 C5 -1 10 -4 10 -10 C10 -15 6 -18 0 -18 C-6 -18 -10 -15 -12 -11 Z"
          fill="#131316"
        />
      </g>

      {/* Linha de eixo vertical no vértice inferior conectando à seta elétrica */}
      <line
        x1="160"
        y1="224"
        x2="160"
        y2="246"
        stroke="#131316"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Seta Azul Elétrica Vibrante (#008CDD) no vértice inferior */}
      <g className={cn(animatedArrow && " origin-center transition-transform duration-300")}>
        <path
          d="M160 250 L160 288"
          stroke="#008CDD"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <path
          d="M142 275 L160 291 L178 275"
          stroke="#008CDD"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Letreiro Arqueado Isométrico "DEVE" (Esquerda) e "LOPER" (Direita) em Ardósia/Grafite (#0A2540) */}
      {showWordmark && (
        <g fill="#0A2540">
          {/* === LADO ESQUERDO: D - E - V - E === */}
          <g transform="translate(60, 244) skewY(27)">
            {/* Letra D */}
            <path d="M0 -12 L9 -12 C16 -12 20 -7 20 0 C20 7 16 12 9 12 L0 12 Z M4.5 -8 L4.5 8 L8.5 8 C13 8 15.5 5 15.5 0 C15.5 -5 13 -8 8.5 -8 Z" />

            {/* Letra E (3 barras horizontais paralelas exatas) */}
            <g transform="translate(27, 0)">
              <rect x="0" y="-11.5" width="16" height="3.8" rx="1" />
              <rect x="0" y="-1.9" width="14" height="3.8" rx="1" />
              <rect x="0" y="7.7" width="16" height="3.8" rx="1" />
            </g>

            {/* Letra V */}
            <g transform="translate(50, 0)">
              <path d="M0 -12 L5 -12 L10 5 L15 -12 L20 -12 L12.5 12 L7.5 12 Z" />
            </g>

            {/* Letra E (3 barras horizontais paralelas exatas) */}
            <g transform="translate(76, 0)">
              <rect x="0" y="-11.5" width="16" height="3.8" rx="1" />
              <rect x="0" y="-1.9" width="14" height="3.8" rx="1" />
              <rect x="0" y="7.7" width="16" height="3.8" rx="1" />
            </g>
          </g>

          {/* === LADO DIREITO: L - O - P - E - R === */}
          <g transform="translate(184, 286) skewY(-27)">
            {/* Letra L */}
            <path d="M0 -12 L4.5 -12 L4.5 8 L15 8 L15 12 L0 12 Z" />

            {/* Letra O */}
            <g transform="translate(20, 0)">
              <path d="M10 -12.5 C16.5 -12.5 20.5 -7.5 20.5 0 C20.5 7.5 16.5 12.5 10 12.5 C3.5 12.5 -0.5 7.5 -0.5 0 C-0.5 -7.5 3.5 -12.5 10 -12.5 Z M10 -8.2 C6 -8.2 4 -4.8 4 0 C4 4.8 6 8.2 10 8.2 C14 8.2 16 4.8 16 0 C16 -4.8 14 -8.2 10 -8.2 Z" />
            </g>

            {/* Letra P */}
            <g transform="translate(46, 0)">
              <path d="M0 -12 L10 -12 C15.5 -12 18.5 -8.5 18.5 -4 C18.5 0.5 15.5 4 10 4 L4.5 4 L4.5 12 L0 12 Z M4.5 -8 L4.5 0 L9.5 0 C12.5 0 14 -1.5 14 -4 C14 -6.5 12.5 -8 9.5 -8 Z" />
            </g>

            {/* Letra E (3 barras horizontais paralelas exatas) */}
            <g transform="translate(70, 0)">
              <rect x="0" y="-11.5" width="15.5" height="3.8" rx="1" />
              <rect x="0" y="-1.9" width="13.5" height="3.8" rx="1" />
              <rect x="0" y="7.7" width="15.5" height="3.8" rx="1" />
            </g>

            {/* Letra R */}
            <g transform="translate(92, 0)">
              <path d="M0 -12 L10 -12 C15.5 -12 18.5 -8.8 18.5 -4.2 C18.5 -0.5 16.3 2.2 12.8 3.2 L19 12 L13.8 12 L8.2 3.8 L4.5 3.8 L4.5 12 L0 12 Z M4.5 -8 L4.5 0 L9.5 0 C12.5 0 14 -1.5 14 -4.1 C14 -6.6 12.5 -8 9.5 -8 Z" />
            </g>
          </g>
        </g>
      )}
    </svg>
  );
}

export default LogoFullSVG;
