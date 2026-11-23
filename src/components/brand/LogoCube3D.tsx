"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Lightformer,
  ContactShadows,
  PerformanceMonitor,
} from "@react-three/drei";
import { LogoFullSVG } from "./LogoFullSVG";
import { Pause, Play, Sparkles } from "lucide-react";

/**
 * Gera uma textura Canvas 2D de alta nitidez para cada face do cubo M3D
 * ("M", "3", "D") com fundo branco-acetinado (#F6F6F8) e glifo grafite (#131316).
 */
function createGlyphTexture(glyph: "M" | "3" | "D"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Fundo claro acetinado do recesso da face
    ctx.fillStyle = "#F4F4F6";
    ctx.fillRect(0, 0, 512, 512);

    // Borda interna sutil de alto-relevo
    ctx.strokeStyle = "#E4E4E7";
    ctx.lineWidth = 12;
    ctx.strokeRect(24, 24, 464, 464);

    // Glifo tipográfico central em grafite profundo (#131316)
    ctx.fillStyle = "#131316";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 310px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(glyph, 256, 268);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

interface ProceduralM3DCubeProps {
  isPaused: boolean;
  isActive: boolean;
  scrollProgress: number;
}

function ProceduralM3DCube({
  isPaused,
  isActive,
  scrollProgress,
}: ProceduralM3DCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  // Texturas procedurais cacheadas para M (esquerda/-X ou +Z), 3 (direita/+X) e D (topo/+Y)
  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;
    return {
      M: createGlyphTexture("M"),
      three: createGlyphTexture("3"),
      D: createGlyphTexture("D"),
    };
  }, []);

  useEffect(() => {
    return () => {
      textures?.M.dispose();
      textures?.three.dispose();
      textures?.D.dispose();
    };
  }, [textures]);

  // Solicita re-render sob demanda quando scrollProgress ou pausa mudam
  useEffect(() => {
    invalidate();
  }, [scrollProgress, isPaused, isActive, invalidate]);

  useFrame((state, delta) => {
    if (!groupRef.current || !isActive) return;

    // Ângulo isométrico base fiel ao logotipo M3D (M à esquerda, 3 à direita, D no topo)
    const baseRotX = 0.42 + scrollProgress * 0.18;
    const baseRotY = -Math.PI / 4 + scrollProgress * 0.35;

    const pointerX = isPaused ? 0 : state.pointer.x * 0.22;
    const pointerY = isPaused ? 0 : state.pointer.y * 0.16;
    const idleFloat = isPaused ? 0 : Math.sin(state.clock.elapsedTime * 1.6) * 0.04;

    const targetX = baseRotX - pointerY;
    const targetY = baseRotY + pointerX;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      Math.min(1, delta * 6)
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      Math.min(1, delta * 6)
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      0.15 + idleFloat,
      Math.min(1, delta * 6)
    );

    if (arrowRef.current) {
      const arrowPulse = isPaused ? 0 : Math.sin(state.clock.elapsedTime * 3) * 0.05;
      arrowRef.current.position.y = -1.55 + arrowPulse;
    }

    // Com frameloop="demand", agenda próximo frame apenas enquanto ativo e não pausado
    if (!isPaused && isActive) {
      state.invalidate();
    }
  });

  return (
    <group>
      <group ref={groupRef} rotation={[0.42, -Math.PI / 4, 0]} position={[0, 0.15, 0]}>
        {/* Corpo Principal do Cubo M3D: Branco/Cinza-Claro Acetinado */}
        <RoundedBox args={[1.85, 1.85, 1.85]} radius={0.28} smoothness={6}>
          <meshPhysicalMaterial
            color="#F8F8FA"
            roughness={0.28}
            metalness={0.04}
            clearcoat={0.35}
            clearcoatRoughness={0.25}
            reflectivity={0.5}
          />
        </RoundedBox>

        {/* Placa Face Topo (+Y) — Glifo "D" */}
        {textures && (
          <mesh position={[0, 0.935, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
            <planeGeometry args={[1.28, 1.28]} />
            <meshPhysicalMaterial
              map={textures.D}
              roughness={0.35}
              metalness={0.02}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>
        )}

        {/* Placa Face Esquerda (+Z na câmera isométrica -45deg) — Glifo "M" */}
        {textures && (
          <mesh position={[0, 0, 0.935]}>
            <planeGeometry args={[1.28, 1.28]} />
            <meshPhysicalMaterial
              map={textures.M}
              roughness={0.35}
              metalness={0.02}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>
        )}

        {/* Placa Face Direita (+X na câmera isométrica -45deg) — Glifo "3" */}
        {textures && (
          <mesh position={[0.935, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.28, 1.28]} />
            <meshPhysicalMaterial
              map={textures.three}
              roughness={0.35}
              metalness={0.02}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>
        )}
      </group>

      {/* Seta Azul Elétrica Cinética (#008CDD) abaixo do vértice inferior */}
      <group ref={arrowRef} position={[0, -1.55, 0]}>
        {/* Haste vertical da seta */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.34, 16]} />
          <meshStandardMaterial
            color="#008CDD"
            emissive="#008CDD"
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>
        {/* Ponta cônica/chevron apontando para baixo */}
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.16, 0.24, 4]} />
          <meshStandardMaterial
            color="#008CDD"
            emissive="#008CDD"
            emissiveIntensity={0.45}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

export interface LogoCube3DProps {
  className?: string;
}

/**
 * LogoCube3D — Palco 3D Procedural (Fase 2) com proteção rigorosa de Core Web Vitals:
 * - Detecção progressiva de WebGPU / WebGL 2 com fallback estático imediato para LogoFullSVG.
 * - `frameloop="demand"` com pausa automática via IntersectionObserver (off-screen) e `visibilitychange`.
 * - Degradação automática de DPR via `<PerformanceMonitor>` se o FPS cair.
 * - Respeito integral a `prefers-reduced-motion` e botão acessível de pausa/retomada.
 */
export function LogoCube3D({ className }: LogoCube3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendererMode, setRendererMode] = useState<"checking" | "webgpu-webgl2" | "fallback">(
    "checking"
  );
  const [rendererBadge, setRendererBadge] = useState<string>("WebGL 2");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [dpr, setDpr] = useState<number>(1.5);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    // 1. Verifica prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsPaused(true);
    }
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsPaused(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // 2. Detecção progressiva de WebGPU (TSL ready) e WebGL 2
    try {
      const hasWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;
      const testCanvas = document.createElement("canvas");
      const gl2 = testCanvas.getContext("webgl2");
      const gl1 = gl2 || testCanvas.getContext("webgl");

      if (!gl1) {
        setRendererMode("fallback");
      } else {
        setRendererBadge(hasWebGPU ? "WebGPU / WebGL 2" : "WebGL 2");
        setRendererMode("webgpu-webgl2");
      }
    } catch {
      setRendererMode("fallback");
    }

    // 3. Pausa automática ao trocar de aba (visibilitychange)
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // 4. Resposta discreta ao início do scroll na dobra Hero
    const handleScroll = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / 600));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 5. IntersectionObserver para pausar render loop fora da viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const isRenderActive = isInViewport && isTabVisible;

  return (
    <div
      ref={containerRef}
      className={`relative flex aspect-square w-full max-w-[440px] flex-col items-center justify-center rounded-3xl border border-[#E4E4E7] bg-linear-to-b from-white via-[#FAFAFA] to-[#F4F4F6] p-4 shadow-xs ${className ?? ""}`}
      aria-label="Palco 3D interativo do Cubo M3D Multidev"
    >
      {/* Badge técnico superior (Status do Motor Gráfico) */}
      <div className="pointer-events-none absolute top-3.5 left-4 z-10 flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-[#52525B] backdrop-blur-xs">
        <Sparkles className="h-3 w-3 text-[#008CDD]" aria-hidden="true" />
        <span>
          {rendererMode === "fallback" ? "SVG Vetorial SSR" : `R3F · ${rendererBadge}`}
        </span>
      </div>

      {/* Controle Acessível de Pausa / Animação (WCAG 2.2.2 - Pause, Stop, Hide) */}
      {rendererMode === "webgpu-webgl2" && (
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-pressed={isPaused}
          aria-label={
            isPaused
              ? "Retomar rotação interativa do cubo 3D"
              : "Pausar rotação interativa do cubo 3D"
          }
          className="absolute top-3.5 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD] focus-visible:outline-2 focus-visible:outline-[#008CDD]"
        >
          {isPaused ? (
            <>
              <Play className="h-3 w-3 text-[#008CDD]" aria-hidden="true" />
              <span>Animar</span>
            </>
          ) : (
            <>
              <Pause className="h-3 w-3 text-[#52525B]" aria-hidden="true" />
              <span>Pausar</span>
            </>
          )}
        </button>
      )}

      {/* Fallback Estático Vetorial Limpo (SSR / Sem WebGL) */}
      {rendererMode !== "webgpu-webgl2" ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-6">
          <LogoFullSVG className="h-64 w-64" animatedArrow={!isPaused} />
        </div>
      ) : (
        <div className="relative h-full w-full">
          <Canvas
            frameloop="demand"
            dpr={dpr}
            camera={{ position: [0, 0.3, 4.9], fov: 38 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace,
            }}
          >
            <PerformanceMonitor
              onIncline={() => setDpr(Math.min(2, window.devicePixelRatio || 1.5))}
              onDecline={() => setDpr(1)}
            >
              <ambientLight intensity={0.85} />
              <directionalLight position={[5, 8, 5]} intensity={1.35} />
              <directionalLight position={[-5, 3, -4]} intensity={0.45} color="#008CDD" />

              {/* Iluminação difusa de estúdio para separação óptica sobre #FAFAFA */}
              <Environment resolution={128}>
                <Lightformer
                  intensity={2.2}
                  rotation-x={Math.PI / 2}
                  position={[0, 4, -2]}
                  scale={[8, 8, 1]}
                />
                <Lightformer
                  intensity={1.4}
                  rotation-y={Math.PI / 2}
                  position={[-5, 1, -1]}
                  scale={[10, 2, 1]}
                />
                <Lightformer
                  intensity={1.1}
                  rotation-y={-Math.PI / 2}
                  position={[5, 1, 1]}
                  scale={[10, 2, 1]}
                  color="#E0F2FE"
                />
              </Environment>

              <ProceduralM3DCube
                isPaused={isPaused}
                isActive={isRenderActive}
                scrollProgress={scrollProgress}
              />

              {/* Sombras neutras de contato sobre #FAFAFA */}
              <ContactShadows
                position={[0, -1.25, 0]}
                opacity={0.24}
                scale={6.5}
                blur={2.4}
                far={3.5}
                color="#0A2540"
              />
            </PerformanceMonitor>
          </Canvas>

          {/* Letreiro Arqueado DEVELOPER em Ardósia (#0A2540) na base do palco 3D */}
          <div className="pointer-events-none absolute right-0 bottom-2 left-0 flex flex-col items-center">
            <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.28em] text-[#0A2540]">
              <span>DEVE</span>
              <span
                className="inline-block h-2 w-2 rounded-full bg-[#008CDD]"
                aria-hidden="true"
              />
              <span>LOPER</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoCube3D;
