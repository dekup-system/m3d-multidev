"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  RoundedBox,
  MeshReflectorMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";
import type { SectionId } from "./BrandTypingTerminal";

export interface CubeFaceConfig {
  id: SectionId;
  code: string;
  title: string;
  subtitle: string;
  glyph: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

export const CUBE_FACES: CubeFaceConfig[] = [
  {
    id: "iniciar",
    code: "FACE 01 // FRONT",
    title: "INICIAR",
    subtitle: "M3D · VISÃO GERAL",
    glyph: "M",
    position: [0, 0, 1.16],
    rotation: [0, 0, 0],
  },
  {
    id: "desenvolvimento",
    code: "FACE 02 // RIGHT",
    title: "DESENVOLVIMENTO",
    subtitle: "WIN · ANDROID · WEB",
    glyph: "3",
    position: [1.16, 0, 0],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: "missao",
    code: "FACE 03 // TOP",
    title: "MISSÃO",
    subtitle: "ENGENHARIA & PILARES",
    glyph: "D",
    position: [0, 1.16, 0],
    rotation: [-Math.PI / 2, 0, 0],
  },
  {
    id: "projetos",
    code: "FACE 04 // LEFT",
    title: "PROJETOS",
    subtitle: "DEKUP · NEXIA · KITEFY",
    glyph: "</>",
    position: [-1.16, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    id: "seguranca",
    code: "FACE 05 // BACK",
    title: "SEGURANÇA",
    subtitle: "LGPD · CÓDIGO · SLA",
    glyph: "SEC",
    position: [0, 0, -1.16],
    rotation: [0, Math.PI, 0],
  },
  {
    id: "contato",
    code: "FACE 06 // BOTTOM",
    title: "CONTATO",
    subtitle: "WHATSAPP · DIAGNÓSTICO",
    glyph: "MSG",
    position: [0, -1.16, 0],
    rotation: [Math.PI / 2, 0, 0],
  },
];

/**
 * Gera uma textura Canvas 2D de alta resolução (512x512) com fundo 100% transparente
 * para cada uma das 6 faces do dado menu principal.
 */
function createFaceMenuTexture(
  face: CubeFaceConfig,
  isHovered: boolean
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);

    // Moldura técnica fina dentro da face (sem sair das bordas arredondadas)
    const pad = 42;
    const size = 512 - pad * 2;
    const r = 56;

    ctx.beginPath();
    ctx.moveTo(pad + r, pad);
    ctx.lineTo(pad + size - r, pad);
    ctx.quadraticCurveTo(pad + size, pad, pad + size, pad + r);
    ctx.lineTo(pad + size, pad + size - r);
    ctx.quadraticCurveTo(pad + size, pad + size, pad + size - r, pad + size);
    ctx.lineTo(pad + r, pad + size);
    ctx.quadraticCurveTo(pad, pad + size, pad, pad + size - r);
    ctx.lineTo(pad, pad + r);
    ctx.quadraticCurveTo(pad, pad, pad + r, pad);
    ctx.closePath();

    ctx.fillStyle = isHovered
      ? "rgba(0, 140, 221, 0.09)"
      : "rgba(19, 19, 22, 0.025)";
    ctx.fill();

    ctx.lineWidth = isHovered ? 5 : 2.5;
    ctx.strokeStyle = isHovered ? "#008CDD" : "rgba(19, 19, 22, 0.16)";
    ctx.stroke();

    // Código da face no topo
    ctx.fillStyle = isHovered ? "#008CDD" : "#52525B";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 20px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(face.code, 256, 98);

    // Glifo Central M / 3 / D ou símbolo tecnológico
    ctx.fillStyle = "#131316";
    ctx.font =
      face.glyph.length === 1
        ? "900 185px system-ui, -apple-system, 'Segoe UI', sans-serif"
        : "900 110px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(face.glyph, 256, 232);

    // Botão / Link do Menu Principal na Face
    const btnW = 350;
    const btnH = 66;
    const btnX = (512 - btnW) / 2;
    const btnY = 335;
    const btnR = 18;

    ctx.beginPath();
    ctx.moveTo(btnX + btnR, btnY);
    ctx.lineTo(btnX + btnW - btnR, btnY);
    ctx.quadraticCurveTo(btnX + btnW, btnY, btnX + btnW, btnY + btnR);
    ctx.lineTo(btnX + btnW, btnY + btnH - btnR);
    ctx.quadraticCurveTo(
      btnX + btnW,
      btnY + btnH,
      btnX + btnW - btnR,
      btnY + btnH
    );
    ctx.lineTo(btnX + btnR, btnY + btnH);
    ctx.quadraticCurveTo(btnX, btnY + btnH, btnX, btnY + btnH - btnR);
    ctx.lineTo(btnX, btnY + btnR);
    ctx.quadraticCurveTo(btnX, btnY, btnX + btnR, btnY);
    ctx.closePath();

    ctx.fillStyle = isHovered ? "#008CDD" : "#131316";
    ctx.fill();

    // Título do Link dentro do botão
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 28px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(`[ ${face.title} ]`, 256, btnY + btnH / 2 + 2);

    // Subtítulo técnico abaixo do botão
    ctx.fillStyle = isHovered ? "#0A2540" : "#52525B";
    ctx.font = "600 18px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(face.subtitle, 256, 432);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

interface InteractiveCubeMeshProps {
  activeSection: SectionId | null;
  onSelectSection: (section: SectionId | null) => void;
  rotationOffset: { x: number; y: number };
}

function InteractiveCubeMesh({
  activeSection,
  onSelectSection,
  rotationOffset,
}: InteractiveCubeMeshProps) {
  const cubeGroupRef = useRef<THREE.Group>(null);
  const spinAccumulatorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevActiveRef = useRef<SectionId | null>(null);
  const [hoveredFace, setHoveredFace] = useState<SectionId | null>(null);

  // Gera texturas normais e hover para cada uma das 6 faces
  const faceTextures = useMemo(() => {
    if (typeof document === "undefined") return null;
    const map: Record<
      SectionId,
      { normal: THREE.CanvasTexture; hover: THREE.CanvasTexture }
    > = {} as Record<
      SectionId,
      { normal: THREE.CanvasTexture; hover: THREE.CanvasTexture }
    >;

    for (const face of CUBE_FACES) {
      map[face.id] = {
        normal: createFaceMenuTexture(face, false),
        hover: createFaceMenuTexture(face, true),
      };
    }
    return map;
  }, []);

  useEffect(() => {
    return () => {
      if (!faceTextures) return;
      Object.values(faceTextures).forEach((t) => {
        t.normal.dispose();
        t.hover.dispose();
      });
    };
  }, [faceTextures]);

  // Quando o usuário clica em uma face (ou clica no dado no rodapé para voltar),
  // adiciona um giro completo (2*PI) para que o dado desça/suba girando de forma cinemática
  useEffect(() => {
    if (activeSection !== prevActiveRef.current) {
      const direction = activeSection !== null ? 1 : -1;
      spinAccumulatorRef.current.y += direction * Math.PI * 2;
      spinAccumulatorRef.current.x += direction * Math.PI;
      prevActiveRef.current = activeSection;
    }
  }, [activeSection]);

  // Atualiza cursor ao passar sobre as faces do dado
  useEffect(() => {
    document.body.style.cursor = hoveredFace ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredFace]);

  useFrame((state, delta) => {
    if (!cubeGroupRef.current) return;

    const isDockedInFooter = activeSection !== null;

    // Posição Y e Escala:
    // - No modo Menu Principal: grande no centro da tela (Y = 0.25, Scale = 1.0)
    // - Ao clicar em um link: desce girando e fica pequeno no footer (Y = -2.05, Scale = 0.30)
    const targetY = isDockedInFooter
      ? -2.05 + Math.sin(state.clock.elapsedTime * 2.2) * 0.03
      : 0.25 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;

    const targetScale = isDockedInFooter ? 0.3 : 1.0;

    // Resposta ao mouse + offset de rotação para inspecionar todas as 6 faces
    const pointerX = state.pointer.x * (isDockedInFooter ? 0.4 : 0.95);
    const pointerY = state.pointer.y * (isDockedInFooter ? 0.3 : 0.75);

    const baseRotX = 0.35 + rotationOffset.x - pointerY + spinAccumulatorRef.current.x;
    const baseRotY =
      -0.6 +
      rotationOffset.y +
      pointerX +
      spinAccumulatorRef.current.y +
      (isDockedInFooter ? state.clock.elapsedTime * 0.45 : 0);

    const speed = Math.min(1, delta * 4.8);

    cubeGroupRef.current.position.y = THREE.MathUtils.lerp(
      cubeGroupRef.current.position.y,
      targetY,
      speed
    );

    const currentScale = cubeGroupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, speed);
    cubeGroupRef.current.scale.set(nextScale, nextScale, nextScale);

    cubeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      cubeGroupRef.current.rotation.x,
      baseRotX,
      speed
    );
    cubeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cubeGroupRef.current.rotation.y,
      baseRotY,
      speed
    );
  });

  const handleFaceClick = (e: ThreeEvent<MouseEvent>, faceId: SectionId) => {
    e.stopPropagation();
    // Se o dado já está pequeno no footer, clicar nele retrocede a animação e volta ao menu central!
    if (activeSection !== null) {
      onSelectSection(null);
    } else {
      onSelectSection(faceId);
    }
  };

  return (
    <group
      ref={cubeGroupRef}
      position={[0, 0.25, 0]}
      onClick={(e) => {
        // Caso o usuário clique no corpo do cubo quando ele está pequeno no footer, retorna ao centro
        if (activeSection !== null) {
          e.stopPropagation();
          onSelectSection(null);
        }
      }}
    >
      {/* Grande Cubo Branco Acetinado */}
      <RoundedBox args={[2.3, 2.3, 2.3]} radius={0.32} smoothness={8} castShadow>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.18}
          metalness={0.04}
          clearcoat={0.45}
          clearcoatRoughness={0.18}
          reflectivity={0.65}
        />
      </RoundedBox>

      {/* As 6 Faces do Dado com os Links do Site */}
      {faceTextures &&
        CUBE_FACES.map((face) => {
          const isHovered = hoveredFace === face.id;
          const tex = isHovered
            ? faceTextures[face.id].hover
            : faceTextures[face.id].normal;

          return (
            <mesh
              key={face.id}
              position={face.position}
              rotation={face.rotation}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredFace(face.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredFace((prev) => (prev === face.id ? null : prev));
              }}
              onClick={(e) => handleFaceClick(e, face.id)}
            >
              <planeGeometry args={[1.68, 1.68]} />
              <meshStandardMaterial
                map={tex}
                transparent
                alphaTest={0.03}
                roughness={0.3}
                polygonOffset
                polygonOffsetFactor={-2}
              />
            </mesh>
          );
        })}
    </group>
  );
}

export interface ReflectiveCubeSceneProps {
  activeSection: SectionId | null;
  onSelectSection: (section: SectionId | null) => void;
  rotationOffset: { x: number; y: number };
}

/**
 * ReflectiveCubeScene — Ambiente 3D claro off-white com piso reflexivo espelhado
 * e o grande cubo branco central de 6 faces.
 */
export function ReflectiveCubeScene({
  activeSection,
  onSelectSection,
  rotationOffset,
}: ReflectiveCubeSceneProps) {
  return (
    <div className="fixed inset-0 z-10 h-full w-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 6.2], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {/* Neblina suave off-white para fundir o piso reflexivo no horizonte */}
        <fog attach="fog" args={["#F6F6F7", 7, 18]} />

        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 6]} intensity={1.45} />
        <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#008CDD" />

        <Environment resolution={128}>
          <Lightformer
            intensity={2.2}
            rotation-x={Math.PI / 2}
            position={[0, 5, -2]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={1.5}
            rotation-y={Math.PI / 2}
            position={[-6, 2, -1]}
            scale={[10, 3, 1]}
          />
          <Lightformer
            intensity={1.2}
            rotation-y={-Math.PI / 2}
            position={[6, 2, 1]}
            scale={[10, 3, 1]}
            color="#E0F2FE"
          />
        </Environment>

        {/* Grande Cubo Branco Interativo (Menu Principal -> Pequeno no Footer) */}
        <InteractiveCubeMesh
          activeSection={activeSection}
          onSelectSection={onSelectSection}
          rotationOffset={rotationOffset}
        />

        {/* Piso Reflexivo Claro Off-White */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.55, 0]}>
          <planeGeometry args={[45, 45]} />
          <MeshReflectorMaterial
            blur={[350, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={0.65}
            roughness={0.35}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#F2F3F5"
            metalness={0.12}
            mirror={0.45}
          />
        </mesh>
      </Canvas>
    </div>
  );
}

export default ReflectiveCubeScene;
