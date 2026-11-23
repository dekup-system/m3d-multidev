"use client";

import React, { useEffect, useRef } from "react";

/**
 * CircuitBackground — Plano de fundo tecnológico com ruído sutil e trilhas
 * de placa eletrônica (PCB) percorrendo dados com ~70% de transparência (alpha ~0.30).
 */
export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Definição das trilhas PCB (segmentos ortogonais + diagonais 45°)
    interface PulseTrack {
      points: { x: number; y: number }[];
      progress: number;
      speed: number;
      length: number;
    }

    const buildTracks = (): PulseTrack[] => {
      const tracks: PulseTrack[] = [];
      const rows = 9;
      for (let i = 0; i < rows; i++) {
        const yBase = (height / (rows + 1)) * (i + 1);
        const dir = i % 2 === 0 ? 1 : -1;
        const startX = dir === 1 ? -40 : width + 40;
        const midX1 = width * (0.2 + (i % 3) * 0.12);
        const midX2 = width * (0.55 + (i % 3) * 0.1);
        const endX = dir === 1 ? width + 40 : -40;
        const offset = (i % 2 === 0 ? 1 : -1) * 36;

        tracks.push({
          points: [
            { x: startX, y: yBase },
            { x: midX1, y: yBase },
            { x: midX1 + Math.abs(offset) * dir, y: yBase + offset },
            { x: midX2, y: yBase + offset },
            { x: midX2 + Math.abs(offset) * dir, y: yBase },
            { x: endX, y: yBase },
          ],
          progress: (i * 0.19) % 1,
          speed: 0.0018 + (i % 4) * 0.0005,
          length: 0.14,
        });
      }

      // Trilhas verticais estilo barramento de placa-mãe
      const cols = 6;
      for (let j = 0; j < cols; j++) {
        const xBase = (width / (cols + 1)) * (j + 1);
        const offset = (j % 2 === 0 ? 1 : -1) * 32;
        tracks.push({
          points: [
            { x: xBase, y: -30 },
            { x: xBase, y: height * 0.3 },
            { x: xBase + offset, y: height * 0.3 + Math.abs(offset) },
            { x: xBase + offset, y: height * 0.7 },
            { x: xBase, y: height * 0.7 + Math.abs(offset) },
            { x: xBase, y: height + 30 },
          ],
          progress: (j * 0.27) % 1,
          speed: 0.0015 + (j % 3) * 0.0004,
          length: 0.12,
        });
      }

      return tracks;
    };

    let tracks = buildTracks();

    // Interpola um ponto ao longo da polilinha da trilha (t entre 0 e 1)
    const getPointAt = (points: { x: number; y: number }[], t: number) => {
      const clamped = Math.max(0, Math.min(1, t));
      const totalSegments = points.length - 1;
      const scaled = clamped * totalSegments;
      const idx = Math.min(totalSegments - 1, Math.floor(scaled));
      const frac = scaled - idx;
      const p0 = points[idx]!;
      const p1 = points[idx + 1]!;
      return {
        x: p0.x + (p1.x - p0.x) * frac,
        y: p0.y + (p1.y - p0.y) * frac,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Desenha as trilhas estáticas da placa eletrônica (70% transparência -> 0.22 a 0.30 alpha)
      ctx.lineWidth = 1;
      for (const tr of tracks) {
        ctx.beginPath();
        tr.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = "rgba(10, 37, 64, 0.12)";
        ctx.stroke();

        // Pads/Vias de solda nos vértices da trilha
        for (let k = 1; k < tr.points.length - 1; k++) {
          const v = tr.points[k]!;
          ctx.beginPath();
          ctx.arc(v.x, v.y, 2.3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(250, 250, 250, 0.9)";
          ctx.fill();
          ctx.strokeStyle = "rgba(0, 140, 221, 0.28)";
          ctx.stroke();
        }
      }

      // 2. Desenha os pulsos de dados percorrendo as trilhas (70% transparência -> ~0.30 alpha)
      for (const tr of tracks) {
        tr.progress += tr.speed;
        if (tr.progress > 1 + tr.length) {
          tr.progress = 0;
        }

        const headT = Math.min(1, tr.progress);
        const tailT = Math.max(0, tr.progress - tr.length);

        if (headT > tailT) {
          const steps = 12;
          ctx.beginPath();
          for (let s = 0; s <= steps; s++) {
            const t = tailT + ((headT - tailT) * s) / steps;
            const pt = getPointAt(tr.points, t);
            if (s === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = "rgba(0, 140, 221, 0.32)";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Cabeça luminosa do pacote de dados
          const headPt = getPointAt(tr.points, headT);
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 140, 221, 0.48)";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Canvas de Trilhas de Placa Eletrônica */}
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />

      {/* Textura de Ruído Digital (Noise SVG Inline com 70%+ de transparência) */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.045]">
        <filter id="m3d-digital-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#m3d-digital-noise)" />
      </svg>

      {/* Vinheta suave off-white nas bordas para destacar o palco central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(250,250,250,0.75)_100%)]" />
    </div>
  );
}

export default CircuitBackground;
