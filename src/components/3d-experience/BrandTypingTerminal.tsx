"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const CODE_SEQUENCE = [
  'const brand = await Engine.boot("M3D MULTIDEV");',
  'brand.link(["WINDOWS", "ANDROID", "iOS", "WEB"]); // status: ONLINE',
];

export type SectionId =
  | "iniciar"
  | "desenvolvimento"
  | "missao"
  | "projetos"
  | "seguranca"
  | "contato";

export interface BrandTypingTerminalProps {
  activeSection: SectionId | null;
  onSelectSection: (section: SectionId | null) => void;
}

const QUICK_FACES: { id: SectionId; label: string; code: string }[] = [
  { id: "iniciar", label: "INICIAR", code: "01" },
  { id: "desenvolvimento", label: "DESENVOLVIMENTO", code: "02" },
  { id: "missao", label: "MISSÃO", code: "03" },
  { id: "projetos", label: "PROJETOS", code: "04" },
  { id: "seguranca", label: "SEGURANÇA", code: "05" },
  { id: "contato", label: "CONTATO", code: "06" },
];

/**
 * BrandTypingTerminal — Cabeçalho tecnológico responsivo no topo da tela estática:
 * - Formação da marca M3D MULTIDEV em digitação de caracteres em linha de programação.
 * - Menu rápido das 6 faces do cubo visível tanto em desktop quanto em dispositivos móveis.
 */
export function BrandTypingTerminal({
  activeSection,
  onSelectSection,
}: BrandTypingTerminalProps) {
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    let j = 0;
    const line1 = CODE_SEQUENCE[0]!;
    const line2 = CODE_SEQUENCE[1]!;

    const typeInterval = setInterval(() => {
      if (i <= line1.length) {
        setTypedLine1(line1.slice(0, i));
        i++;
      } else if (j <= line2.length) {
        setTypedLine2(line2.slice(0, j));
        j++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 520);

    return () => {
      clearInterval(typeInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <header className="relative z-20 flex w-full flex-col gap-2 px-3 pt-3 pb-1 sm:px-8 sm:pt-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Bloco Esquerdo: Logo Original + Digitação em Linha de Programação */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => onSelectSection(null)}
          title="Voltar ao Cubo Menu Principal"
          className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#131316]/15 bg-[#131316] p-1 shadow-xs transition-transform hover:scale-105 sm:h-10 sm:w-10"
        >
          <Image
            src="/logo-m3d-original.png"
            alt="M3D Multidev"
            width={40}
            height={40}
            priority
            className="h-full w-full object-contain"
          />
        </button>

        <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-[#E4E4E7]/90 bg-white/80 px-2.5 py-1.5 backdrop-blur-md sm:flex-initial sm:px-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#008CDD]" />
            <span className="truncate font-mono text-[9px] font-bold tracking-[0.16em] text-[#131316] uppercase sm:text-[10px]">
              M3D MULTIDEV // WINDOWS · ANDROID · iOS · WEB
            </span>
          </div>
          <div className="mt-0.5 truncate font-mono text-[9px] leading-tight text-[#0A2540] sm:text-[11px]">
            <span className="text-[#008CDD]">&gt; </span>
            <span>{typedLine1}</span>
            {typedLine2.length === 0 && (
              <span
                className={`ml-0.5 inline-block h-2.5 w-1.5 align-middle bg-[#008CDD] ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
          {typedLine2.length > 0 && (
            <div className="truncate font-mono text-[9px] leading-tight text-[#52525B] sm:text-[10px]">
              <span className="text-[#008CDD]">&gt; </span>
              <span>{typedLine2}</span>
              <span
                className={`ml-0.5 inline-block h-2.5 w-1.5 align-middle bg-[#008CDD] ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bloco Direito: HUD das 6 Faces do Dado (Responsivo em Mobile, Tablet e Desktop) */}
      <nav
        aria-label="Faces do Cubo M3D"
        className="flex flex-wrap items-center justify-center gap-1 rounded-xl border border-[#E4E4E7]/90 bg-white/80 p-1 backdrop-blur-md"
      >
        {QUICK_FACES.map((face) => {
          const isActive = activeSection === face.id;
          return (
            <button
              key={face.id}
              type="button"
              onClick={() => onSelectSection(isActive ? null : face.id)}
              className={`rounded-lg px-2 py-1 font-mono text-[9px] font-semibold tracking-wider transition-all sm:px-2.5 sm:text-[10px] ${
                isActive
                  ? "bg-[#008CDD] text-white shadow-2xs"
                  : "text-[#52525B] hover:bg-[#F4F4F6] hover:text-[#131316]"
              }`}
            >
              <span className="mr-0.5 opacity-60">{face.code}.</span>
              {face.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default BrandTypingTerminal;
