"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
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
    subtitle: "WIN · ANDROID · iOS · WEB",
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
    subtitle: "WHATSAPP & SUPORTE",
    glyph: "MSG",
    position: [0, -1.16, 0],
    rotation: [Math.PI / 2, 0, 0],
  },
];

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

    ctx.fillStyle = isHovered ? "#008CDD" : "#52525B";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 20px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(face.code, 256, 98);

    ctx.fillStyle = "#131316";
    ctx.font =
      face.glyph.length === 1
        ? "900 185px system-ui, -apple-system, 'Segoe UI', sans-serif"
        : "900 110px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(face.glyph, 256, 232);

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

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 28px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillText(`[ ${face.title} ]`, 256, btnY + btnH / 2 + 2);

    ctx.fillStyle = isHovered ? "#0A2540" : "#52525B";
    ctx.font = "600 17px ui-monospace, SFMono-Regular, Consolas, monospace";
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
  const { size } = useThree();

  // Acumulador contínuo de rotação 360° (mouse movementX/Y, scroll wheel, bordas da tela e touch)
  const continuousRotRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.6 });
  // Posição normalizada do cursor (-1 a +1) para manter o giro contínuo quando o mouse encosta nas bordas da tela
  const edgeVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevActiveRef = useRef<SectionId | null>(null);
  const prevOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchLastRef = useRef<{ x: number; y: number } | null>(null);

  const [hoveredFace, setHoveredFace] = useState<SectionId | null>(null);

  // Responsividade: ajusta escala do cubo e posição do footer em telas mobile/tablet
  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const mainCubeScale = isMobile ? 0.68 : isTablet ? 0.85 : 1.0;
  const footerCubeScale = isMobile ? 0.24 : 0.3;
  const footerYPos = isMobile ? -2.15 : -2.05;

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

  // Escuta sensores globais: movimento do mouse (movementX/Y), posição nas bordas da tela,
  // rodinha de scroll do mouse (wheel) e gestos touch no celular/tablet
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Captação direta do sensor do mouse (movementX / movementY) para rotação contínua 360°
      const sensitivity = e.buttons === 1 ? 0.0085 : 0.0042;
      continuousRotRef.current.y += e.movementX * sensitivity;
      continuousRotRef.current.x += e.movementY * sensitivity;

      // 2. Detecta se o cursor chegou próximo aos limites/bordas da tela (-1 a +1)
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      edgeVectorRef.current = { x: normX, y: normY };
    };

    const handleWheel = (e: WheelEvent) => {
      // 3. Rodinha de scroll do mouse gira o cubo continuamente em 360°
      // Se o usuário segurar Shift ou rolar horizontalmente (trackpad), gira em Y;
      // na rolagem normal da rodinha (deltaY), gira simultaneamente em Y e X para revelar todas as 6 faces!
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        continuousRotRef.current.y += e.deltaX * 0.0045;
      } else {
        continuousRotRef.current.x += e.deltaY * 0.0038;
        continuousRotRef.current.y += e.deltaY * 0.0028;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        touchLastRef.current = { x: t.clientX, y: t.clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t && touchLastRef.current) {
        const dx = t.clientX - touchLastRef.current.x;
        const dy = t.clientY - touchLastRef.current.y;
        continuousRotRef.current.y += dx * 0.0075;
        continuousRotRef.current.x += dy * 0.0075;
        touchLastRef.current = { x: t.clientX, y: t.clientY };
      }
    };

    const handleTouchEnd = () => {
      touchLastRef.current = null;
      edgeVectorRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Quando o botão "GIRAR DADO" do rodapé é clicado, soma o delta ao acumulador contínuo
  useEffect(() => {
    const dx = rotationOffset.x - prevOffsetRef.current.x;
    const dy = rotationOffset.y - prevOffsetRef.current.y;
    if (dx !== 0 || dy !== 0) {
      continuousRotRef.current.x += dx;
      continuousRotRef.current.y += dy;
      prevOffsetRef.current = rotationOffset;
    }
  }, [rotationOffset]);

  // Giro cinemático ao descer para o footer ou retornar ao centro
  useEffect(() => {
    if (activeSection !== prevActiveRef.current) {
      const direction = activeSection !== null ? 1 : -1;
      continuousRotRef.current.y += direction * Math.PI * 2;
      continuousRotRef.current.x += direction * Math.PI;
      prevActiveRef.current = activeSection;
    }
  }, [activeSection]);

  useEffect(() => {
    document.body.style.cursor = hoveredFace ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredFace]);

  useFrame((state, delta) => {
    if (!cubeGroupRef.current) return;

    const isDockedInFooter = activeSection !== null;

    // Se o cursor do mouse estiver estacionado próximo ao fim/limites da tela (|x| > 0.72 ou |y| > 0.72),
    // o cubo CONTINUA girando suavemente naquela direção sem travar no fim da tela!
    const edgeThreshold = 0.72;
    const edgeSpeed = isDockedInFooter ? 0.6 : 1.45;

    if (Math.abs(edgeVectorRef.current.x) > edgeThreshold) {
      const signX = Math.sign(edgeVectorRef.current.x);
      const intensityX =
        (Math.abs(edgeVectorRef.current.x) - edgeThreshold) / (1 - edgeThreshold);
      continuousRotRef.current.y += signX * intensityX * edgeSpeed * delta;
    }

    if (Math.abs(edgeVectorRef.current.y) > edgeThreshold) {
      const signY = Math.sign(edgeVectorRef.current.y);
      const intensityY =
        (Math.abs(edgeVectorRef.current.y) - edgeThreshold) / (1 - edgeThreshold);
      continuousRotRef.current.x += signY * intensityY * edgeSpeed * delta;
    }

    // Quando o dado está pequeno no footer, mantém uma rotação orbital leve contínua
    if (isDockedInFooter) {
      continuousRotRef.current.y += delta * 0.45;
    }

    const targetY = isDockedInFooter
      ? footerYPos + Math.sin(state.clock.elapsedTime * 2.2) * 0.03
      : (isMobile ? 0.15 : 0.25) + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;

    const targetScale = isDockedInFooter ? footerCubeScale : mainCubeScale;

    const speed = Math.min(1, delta * 6.0);

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
      continuousRotRef.current.x,
      speed
    );
    cubeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cubeGroupRef.current.rotation.y,
      continuousRotRef.current.y,
      speed
    );
  });

  const handleFaceClick = (e: ThreeEvent<MouseEvent>, faceId: SectionId) => {
    e.stopPropagation();
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
