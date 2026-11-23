"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { RotateCw, ChevronUp, Box } from "lucide-react";
import { CircuitBackground } from "./CircuitBackground";
import { BrandTypingTerminal, type SectionId } from "./BrandTypingTerminal";
import { CenterSectionPanel } from "./CenterSectionPanel";

const DynamicReflectiveCubeScene = dynamic(
  () => import("./ReflectiveCubeScene"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-10 flex items-center justify-center font-mono text-xs text-[#52525B]">
        <span className="animate-pulse">
          [ INICIALIZANDO PALCO 3D M3D MULTIDEV... ]
        </span>
      </div>
    ),
  }
);

const ROTATION_PRESETS: { label: string; x: number; y: number }[] = [
  { label: "FRENTE", x: 0, y: 0 },
  { label: "DIREITA", x: 0, y: -Math.PI / 2 },
  { label: "TOPO", x: Math.PI / 2, y: 0 },
  { label: "ESQUERDA", x: 0, y: Math.PI / 2 },
  { label: "TRÁS", x: 0, y: Math.PI },
  { label: "BASE", x: -Math.PI / 2, y: 0 },
];

export function Static3DExperience() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [presetIdx, setPresetIdx] = useState<number>(0);

  // Tecla ESC retorna o dado pequeno do footer para o menu central grande
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeSection !== null) {
        setActiveSection(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const currentRotation = ROTATION_PRESETS[presetIdx] ?? {
    label: "FRENTE",
    x: 0,
    y: 0,
  };

  const handleCycleCubeFace = () => {
    setPresetIdx((prev) => (prev + 1) % ROTATION_PRESETS.length);
  };

  return (
    <div className="relative flex h-dvh w-screen flex-col justify-between overflow-hidden bg-[#F7F7F6] text-[#131316] select-none">
      {/* 1. Plano de Fundo: Ruído + Trilhas de Placa Eletrônica (70% transparência) */}
      <CircuitBackground />

      {/* 2. Cena 3D: Piso Reflexivo + Grande Cubo Branco de 6 Faces */}
      <DynamicReflectiveCubeScene
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        rotationOffset={{ x: currentRotation.x, y: currentRotation.y }}
      />

      {/* 3. Topo: Marca M3D MULTIDEV se formando em digitação de código + HUD */}
      <BrandTypingTerminal
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* 4. Centro da Página: Painel Tecnológico Resumido quando o cubo desce ao footer */}
      <main className="pointer-events-none relative z-20 flex flex-1 items-center justify-center">
        <CenterSectionPanel
          activeSection={activeSection}
          onCloseToCube={() => setActiveSection(null)}
          onNavigateFace={(sec) => setActiveSection(sec)}
        />
      </main>

      {/* 5. Footer da Página Estática: Controles do Cubo ou Gatilho sobre o Cubo Pequeno */}
      <footer className="relative z-20 flex w-full flex-col items-center justify-center pb-4 sm:pb-5">
        {activeSection === null ? (
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#E4E4E7]/90 bg-white/80 px-4 py-2 shadow-2xs backdrop-blur-md">
            <span className="font-mono text-[10px] font-medium text-[#52525B]">
              MOVA O MOUSE PARA GIRAR O CUBO · CLIQUE EM UMA FACE PARA ABRIR
            </span>
            <button
              type="button"
              onClick={handleCycleCubeFace}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E4E7] bg-[#F7F7F8] px-2.5 py-1 font-mono text-[10px] font-bold text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
            >
              <RotateCw className="h-3 w-3 text-[#008CDD]" />
              <span>GIRAR DADO ({currentRotation.label})</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="group inline-flex items-center gap-2 rounded-full border border-[#008CDD]/40 bg-white/85 px-4 py-1.5 font-mono text-[10px] font-bold text-[#0A2540] shadow-xs backdrop-blur-md transition-all hover:border-[#008CDD] hover:bg-[#008CDD] hover:text-white"
          >
            <Box className="h-3.5 w-3.5 text-[#008CDD] group-hover:text-white" />
            <span>CLIQUE NO CUBO PARA VOLTAR AO MENU PRINCIPAL</span>
            <ChevronUp className="h-3.5 w-3.5 text-[#008CDD] group-hover:text-white" />
          </button>
        )}
      </footer>
    </div>
  );
}

export default Static3DExperience;
