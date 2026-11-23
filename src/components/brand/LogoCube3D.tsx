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
import { Pause, Play } from "lucide-react";

/**
 * Gera uma imagem/textura com FUNDO 100% TRANSPARENTE contendo apenas a letra
 * ("M", "3" ou "D") em grafite profundo (#131316).
 * Como o fundo é totalmente transparente, não existe nenhum quadrado ou ponta
 * ao redor da letra — ela é aplicada diretamente sobre a superfície do cubo branco.
 *
 * Orientação exata da letra "D" no topo conforme a imagem original:
 * - No cubo visto de frente (câmera olhando para a aresta entre M e 3),
 *   a letra D no topo está deitada na horizontal:
 *   • A linha reta da base do "D" fica na parte de baixo (apontando para a quina frontal entre M e 3),
 *     formando um "V" junto com as bordas do topo;
 *   • O arco redondo do "D" fica voltado para cima/trás.
 *   Para isso, desenhamos o "D" rotacionado 90° no sentido anti-horário (-Math.PI / 2)
 *   para que a haste reta fique embaixo e o arco em cima, e aplicamos a rotação de +45°
 *   (+Math.PI / 4) para compensar o giro de -45° em Y do cubo.
 *   Resultado líquido no canvas da face superior: -Math.PI / 4 (-45°).
 */
function createTransparentGlyphTexture(glyph: "M" | "3" | "D"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Fundo 100% transparente (nenhum retângulo ou borda desenhada)
    ctx.clearRect(0, 0, 512, 512);

    ctx.save();
    ctx.translate(256, 256);

    if (glyph === "D") {
      // Giro exato de 180° em relação a +Math.PI / 2 -> -Math.PI / 2
      ctx.rotate(-Math.PI / 2);
    }

    ctx.fillStyle = "#131316";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 340px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(glyph, 0, 12);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
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
  const { invalidate } = useThree();

  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;
    return {
      M: createTransparentGlyphTexture("M"),
      three: createTransparentGlyphTexture("3"),
      D: createTransparentGlyphTexture("D"),
    };
  }, []);

  useEffect(() => {
    return () => {
      textures?.M.dispose();
      textures?.three.dispose();
      textures?.D.dispose();
    };
  }, [textures]);

  useEffect(() => {
    invalidate();
  }, [scrollProgress, isPaused, isActive, invalidate]);

  useFrame((state, delta) => {
    if (!groupRef.current || !isActive) return;

    // Ângulo isométrico fiel à imagem original (M na esquerda, 3 na direita, D no topo)
    const baseRotX = 0.46 + scrollProgress * 0.15;
    const baseRotY = -Math.PI / 4 + scrollProgress * 0.3;

    const pointerX = isPaused ? 0 : state.pointer.x * 0.2;
    const pointerY = isPaused ? 0 : state.pointer.y * 0.14;
    const idleFloat = isPaused ? 0 : Math.sin(state.clock.elapsedTime * 1.5) * 0.04;

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
      idleFloat,
      Math.min(1, delta * 6)
    );

    if (!isPaused && isActive) {
      state.invalidate();
    }
  });

  return (
    <group ref={groupRef} rotation={[0.46, -Math.PI / 4, 0]} position={[0, 0, 0]}>
      {/* Corpo Principal do Cubo M3D: Branco/Cinza-Claro Acetinado com Bordas Arredondadas */}
      <RoundedBox args={[2.0, 2.0, 2.0]} radius={0.34} smoothness={8}>
        <meshPhysicalMaterial
          color="#F5F5F7"
          roughness={0.26}
          metalness={0.03}
          clearcoat={0.3}
          clearcoatRoughness={0.25}
          reflectivity={0.5}
        />
      </RoundedBox>

      {/* Letra "D" no Topo (+Y) com fundo 100% transparente */}
      {textures && (
        <mesh position={[0, 1.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.36, 1.36]} />
          <meshStandardMaterial
            map={textures.D}
            transparent
            alphaTest={0.05}
            depthWrite={false}
            roughness={0.4}
            polygonOffset
            polygonOffsetFactor={-2}
          />
        </mesh>
      )}

      {/* Letra "M" na Face Esquerda (+Z) com fundo 100% transparente */}
      {textures && (
        <mesh position={[0, 0, 1.003]}>
          <planeGeometry args={[1.36, 1.36]} />
          <meshStandardMaterial
            map={textures.M}
            transparent
            alphaTest={0.05}
            depthWrite={false}
            roughness={0.4}
            polygonOffset
            polygonOffsetFactor={-2}
          />
        </mesh>
      )}

      {/* Letra "3" na Face Direita (+X) com fundo 100% transparente */}
      {textures && (
        <mesh position={[1.003, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.36, 1.36]} />
          <meshStandardMaterial
            map={textures.three}
            transparent
            alphaTest={0.05}
            depthWrite={false}
            roughness={0.4}
            polygonOffset
            polygonOffsetFactor={-2}
          />
        </mesh>
      )}
    </group>
  );
}

export interface LogoCube3DProps {
  className?: string;
}

export function LogoCube3D({ className }: LogoCube3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendererMode, setRendererMode] = useState<"checking" | "webgpu-webgl2" | "fallback">(
    "checking"
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [dpr, setDpr] = useState<number>(1.5);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsPaused(true);
    }
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsPaused(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      setRendererMode(gl ? "webgpu-webgl2" : "fallback");
    } catch {
      setRendererMode("fallback");
    }

    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleScroll = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / 600));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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
      className={`relative flex aspect-square w-full max-w-[400px] flex-col items-center justify-center rounded-3xl border border-[#E4E4E7] bg-linear-to-b from-white via-[#FAFAFA] to-[#F4F4F6] p-4 shadow-xs ${className ?? ""}`}
      aria-label="Cubo 3D interativo M3D Multidev"
    >
      {rendererMode === "webgpu-webgl2" && (
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Animar cubo 3D" : "Pausar cubo 3D"}
          className="absolute top-3.5 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
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

      {rendererMode !== "webgpu-webgl2" ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-6">
          <LogoFullSVG className="h-56 w-56" />
        </div>
      ) : (
        <div className="relative h-full w-full">
          <Canvas
            frameloop="demand"
            dpr={dpr}
            camera={{ position: [0, 0.15, 4.5], fov: 38 }}
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
              <ambientLight intensity={0.9} />
              <directionalLight position={[5, 8, 5]} intensity={1.35} />
              <directionalLight position={[-5, 3, -4]} intensity={0.4} color="#008CDD" />

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

              <ContactShadows
                position={[0, -1.25, 0]}
                opacity={0.22}
                scale={6.0}
                blur={2.4}
                far={3.5}
                color="#0A2540"
              />
            </PerformanceMonitor>
          </Canvas>
        </div>
      )}
    </div>
  );
}

export default LogoCube3D;
