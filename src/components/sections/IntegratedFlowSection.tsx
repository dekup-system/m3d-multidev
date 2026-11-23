"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { motion } from "motion/react";
import {
  Monitor,
  Smartphone,
  Globe,
  CheckCircle2,
  Activity,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

const FLOW_STEPS = [
  {
    id: "windows",
    badge: "01 · DESKTOP",
    platform: "Windows (Local)",
    subtitle: "Operação de balcão, escritório e equipamentos",
    features: [
      "Sistemas de gestão (ERP), frente de caixa (PDV) e automação",
      "Conexão direta com impressoras, balanças e leitores",
      "Funciona rápido mesmo se a internet oscilar",
    ],
    icon: Monitor,
  },
  {
    id: "android",
    badge: "02 · MOBILE",
    platform: "Android (Campo)",
    subtitle: "Equipes externas, vendas e operação móvel",
    features: [
      "Aplicativos leves para celulares e coletores de dados",
      "Modo Offline: trabalha sem sinal e sincroniza depois",
      "Leitura de QR Code, código de barras, fotos e assinaturas",
    ],
    icon: Smartphone,
  },
  {
    id: "web",
    badge: "03 · NUVEM",
    platform: "Web (Painel & Gestão)",
    subtitle: "Controle total de qualquer lugar pelo navegador",
    features: [
      "Painéis gerenciais claros com indicadores em tempo real",
      "Portais para clientes, parceiros e múltiplas filiais",
      "Centraliza automaticamente tudo que vem do Windows e Android",
    ],
    icon: Globe,
  },
];

export function IntegratedFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPipeRef = useRef<SVGPathElement>(null);
  const centerPipeRef = useRef<SVGPathElement>(null);
  const rightPipeRef = useRef<SVGPathElement>(null);

  const [activeNode, setActiveNode] = useState<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const pipes = [
      leftPipeRef.current,
      centerPipeRef.current,
      rightPipeRef.current,
    ].filter((el): el is SVGPathElement => el !== null);

    if (pipes.length === 0 || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(pipes, { drawSVG: "0%" });

      gsap.to(pipes, {
        drawSVG: "100%",
        duration: 1.4,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center 50%",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fluxo-integrado"
      ref={sectionRef}
      aria-labelledby="heading-fluxo-integrado"
      className="relative border-t border-[#E4E4E7] bg-[#FBFBFA] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Tudo Conectado</span>
          </div>

          <h2
            id="heading-fluxo-integrado"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Windows ↔ Android ↔ Web em sincronia
          </h2>

          <p className="mt-3 text-base text-[#52525B]">
            O que acontece no computador local ou no aplicativo em campo atualiza o painel
            Web na hora, sem precisar redigitar nada.
          </p>
        </div>

        {/* Linhas de conexão animadas */}
        <div className="relative mx-auto mt-8 hidden max-w-5xl lg:block" aria-hidden="true">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#008CDD]/40 bg-white">
            <div className="h-2.5 w-2.5 rounded-full bg-[#008CDD]" />
          </div>

          <svg
            viewBox="0 0 1000 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-22 w-full overflow-visible"
          >
            <path
              d="M500 0 L500 30 C500 45 485 50 460 50 L200 50 C175 50 165 60 165 75 L165 88"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
            <path d="M500 0 L500 88" stroke="#E4E4E7" strokeWidth="2" />
            <path
              d="M500 0 L500 30 C500 45 515 50 540 50 L800 50 C825 50 835 60 835 75 L835 88"
              stroke="#E4E4E7"
              strokeWidth="2"
            />

            <path
              ref={leftPipeRef}
              d="M500 0 L500 30 C500 45 485 50 460 50 L200 50 C175 50 165 60 165 75 L165 88"
              stroke="#008CDD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              ref={centerPipeRef}
              d="M500 0 L500 88"
              stroke="#008CDD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              ref={rightPipeRef}
              d="M500 0 L500 30 C500 45 515 50 540 50 L800 50 C825 50 835 60 835 75 L835 88"
              stroke="#008CDD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <circle cx="165" cy="88" r="4.5" fill="#008CDD" />
            <circle cx="500" cy="88" r="4.5" fill="#008CDD" />
            <circle cx="835" cy="88" r="4.5" fill="#008CDD" />
          </svg>
        </div>

        {/* 3 Cartões Limpos */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-0 lg:grid-cols-3">
          {FLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isSelected = activeNode === index;

            return (
              <motion.div
                key={step.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                onClick={() => setActiveNode(index)}
                className={`bento-card cursor-pointer p-6 transition-all ${
                  isSelected
                    ? "border-[#008CDD] ring-2 ring-[#008CDD]/15"
                    : "border-[#E4E4E7]"
                }`}
              >
                <span className="font-mono text-xs font-semibold text-[#008CDD]">
                  {step.badge}
                </span>

                <div className="mt-3 flex items-center gap-3.5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isSelected
                        ? "border-[#008CDD] bg-[#008CDD] text-white"
                        : "border-[#E4E4E7] bg-[#F7F7F8] text-[#131316]"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#131316]">
                      {step.platform}
                    </h3>
                    <p className="text-xs text-[#52525B]">{step.subtitle}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-[#E4E4E7] pt-4">
                  {step.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-[#52525B]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#008CDD]"
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IntegratedFlowSection;
