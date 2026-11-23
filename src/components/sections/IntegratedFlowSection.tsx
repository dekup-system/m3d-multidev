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
  RefreshCw,
  CheckCircle2,
  Cpu,
  WifiOff,
  Activity,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

interface FlowStep {
  id: "windows" | "android" | "web";
  badge: string;
  platform: string;
  subtitle: string;
  eventTitle: string;
  payload: string;
  latency: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: "windows",
    badge: "NÓ 01 · DESKTOP / LOCAL",
    platform: "Windows (ERP / PDV / Automação)",
    subtitle: "Execução local resiliente e comunicação com hardware",
    eventTitle: "Ordem de Produção & Pesagem Industrial Capturada",
    payload: '{ "node": "WIN_PDV_04", "serial_port": "COM3", "batch_kg": 1420.5, "sync": "QUEUED_TLS13" }',
    latency: "Local < 2 ms",
    features: [
      "ERPs, Frente de Caixa (PDV) e Automação Industrial",
      "Integração nativa com periféricos USB, Seriais (RS-232) e Balanças",
      "Banco local embarcado com fila transacional anti-falha de rede",
    ],
    icon: Monitor,
  },
  {
    id: "android",
    badge: "NÓ 02 · MOBILE / CAMPO",
    platform: "Android (Coleta & Força de Vendas)",
    subtitle: "Operação offline-first com sincronia delta criptografada",
    eventTitle: "Inspeção em Campo & Assinatura de Recebimento",
    payload: '{ "device": "ANDROID_ZEBRA_TC26", "mode": "OFFLINE_FIRST", "delta_ack": true, "conflict": "CRDT_RESOLVED" }',
    latency: "Delta Sync < 85 ms",
    features: [
      "Coleta de dados em campo, leitura de código de barras/RFID e câmera",
      "Arquitetura Offline-First real (SQLite/Room + fila de sincronia idempotente)",
      "UX otimizada para operação sob sol, luvas ou coletores industriais",
    ],
    icon: Smartphone,
  },
  {
    id: "web",
    badge: "NÓ 03 · NUVEM / COMANDO",
    platform: "Web (Painel Gerencial & APIs)",
    subtitle: "Orquestração centralizada, webhooks e telemetria em tempo real",
    eventTitle: "Consolidação Financeira, Estoque & Webhook Disparado",
    payload: '{ "gateway": "WEB_CLOUD_API", "openapi": "3.1", "trace_id": "otel_9f8a7c", "status": "COMMITTED_200" }',
    latency: "API P95 < 45 ms",
    features: [
      "Dashboards executivos em tempo real e controle multi-filial",
      "APIs REST/GraphQL documentadas (OpenAPI 3.1) e Webhooks assinados",
      "Observabilidade ponta a ponta via OpenTelemetry (logs, traces e métricas)",
    ],
    icon: Globe,
  },
];

/**
 * IntegratedFlowSection — Seção "Fluxo M3D em Ação" (Fase 2):
 * - Anima dutos vetoriais em azul elétrico (#008CDD) partindo da seta inferior do cubo
 *   e conectando os 3 módulos Bento sincronizados (Windows <-> Android <-> Web) via GSAP ScrollTrigger + DrawSVG.
 * - Inclui simulação interativa de evento operacional percorrendo em sincronia os 3 nós.
 */
export function IntegratedFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPipeRef = useRef<SVGPathElement>(null);
  const centerPipeRef = useRef<SVGPathElement>(null);
  const rightPipeRef = useRef<SVGPathElement>(null);
  const crossPipe1Ref = useRef<SVGPathElement>(null);
  const crossPipe2Ref = useRef<SVGPathElement>(null);

  const [activeNode, setActiveNode] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Ciclo automático da simulação de evento operacional (respeita prefers-reduced-motion)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsSimulating(false);
      return;
    }

    if (!isSimulating) return;

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 3400);

    return () => clearInterval(timer);
  }, [isSimulating]);

  // Coreografia GSAP ScrollTrigger + DrawSVG nos dutos vetoriais em azul elétrico
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const pipes = [
      leftPipeRef.current,
      centerPipeRef.current,
      rightPipeRef.current,
      crossPipe1Ref.current,
      crossPipe2Ref.current,
    ].filter((el): el is SVGPathElement => el !== null);

    if (pipes.length === 0 || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Inicializa traçado vetorial usando DrawSVGPlugin (com fallback strokeDashoffset garantido)
      gsap.set(pipes, { drawSVG: "0%" });

      gsap.to(pipes, {
        drawSVG: "100%",
        duration: 1.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center 45%",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStep = FLOW_STEPS[activeNode] ?? FLOW_STEPS[0]!;

  return (
    <section
      id="fluxo-integrado"
      ref={sectionRef}
      aria-labelledby="heading-fluxo-integrado"
      className="relative border-t border-[#E4E4E7] bg-[#FBFBFA] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Coreografia de Dados em Tempo Real</span>
          </div>

          <h2
            id="heading-fluxo-integrado"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Fluxo M3D em Ação:{" "}
            <span className="text-[#0A2540]">Windows ↔ Android ↔ Web</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#52525B] sm:text-lg">
            Veja como um evento operacional nasce no desktop local ou periférico industrial,
            sincroniza com coletores Android em campo mesmo sem internet e consolida indicadores
            no painel Web sem planilhas intermediárias.
          </p>
        </div>

        {/* Dutos Vetoriais Azul Elétrico (GSAP ScrollTrigger + DrawSVG) partindo do vértice */}
        <div className="relative mx-auto mt-10 hidden max-w-5xl lg:block" aria-hidden="true">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#008CDD]/40 bg-white shadow-xs">
            <div className="h-3 w-3 rounded-full bg-[#008CDD]" />
          </div>

          <svg
            viewBox="0 0 1000 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-full overflow-visible"
          >
            {/* Trilhos de fundo (cinza hairline) */}
            <path
              d="M500 0 L500 35 C500 50 485 55 460 55 L200 55 C175 55 165 65 165 85 L165 108"
              stroke="#E4E4E7"
              strokeWidth="2"
            />
            <path d="M500 0 L500 108" stroke="#E4E4E7" strokeWidth="2" />
            <path
              d="M500 0 L500 35 C500 50 515 55 540 55 L800 55 C825 55 835 65 835 85 L835 108"
              stroke="#E4E4E7"
              strokeWidth="2"
            />

            {/* Dutos ativos animados em Azul Elétrico (#008CDD) via GSAP DrawSVG */}
            <path
              ref={leftPipeRef}
              d="M500 0 L500 35 C500 50 485 55 460 55 L200 55 C175 55 165 65 165 85 L165 108"
              stroke="#008CDD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              ref={centerPipeRef}
              d="M500 0 L500 108"
              stroke="#008CDD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              ref={rightPipeRef}
              d="M500 0 L500 35 C500 50 515 55 540 55 L800 55 C825 55 835 65 835 85 L835 108"
              stroke="#008CDD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Barramento horizontal bidirecional entre os 3 nós */}
            <path
              ref={crossPipe1Ref}
              d="M165 95 L500 95"
              stroke="#008CDD"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              ref={crossPipe2Ref}
              d="M500 95 L835 95"
              stroke="#008CDD"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Terminais de conexão */}
            <circle cx="165" cy="108" r="5" fill="#008CDD" />
            <circle cx="500" cy="108" r="5" fill="#008CDD" />
            <circle cx="835" cy="108" r="5" fill="#008CDD" />
          </svg>
        </div>

        {/* Três Módulos Bento Sincronizados */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-0 lg:grid-cols-3">
          {FLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isSelected = activeNode === index;

            return (
              <motion.div
                key={step.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                onClick={() => {
                  setActiveNode(index);
                  setIsSimulating(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveNode(index);
                    setIsSimulating(false);
                  }
                }}
                aria-pressed={isSelected}
                aria-label={`Inspecionar nó ${step.platform}`}
                className={`bento-card relative flex cursor-pointer flex-col justify-between p-6 text-left transition-all ${
                  isSelected
                    ? "border-[#008CDD] ring-2 ring-[#008CDD]/15"
                    : "border-[#E4E4E7] hover:border-[#D4D4D8]"
                }`}
              >
                <div>
                  {/* Topo do Card */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#008CDD] uppercase">
                      {step.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#E4E4E7] bg-[#F7F7F8] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#131316]">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isSelected ? "bg-[#008CDD]" : "bg-[#71717A]"
                        }`}
                      />
                      {step.latency}
                    </span>
                  </div>

                  {/* Ícone + Título da Plataforma */}
                  <div className="mt-4 flex items-start gap-3.5">
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
                      <p className="mt-0.5 text-xs text-[#52525B]">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Lista de Capacidades */}
                  <ul className="mt-5 space-y-2.5 border-t border-[#E4E4E7] pt-4">
                    {step.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs leading-relaxed text-[#52525B]"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payload do Evento Operacional nesse Nó */}
                <div className="mt-5 rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] p-3">
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#131316]">
                    <span className="truncate">{step.eventTitle}</span>
                    <span className="ml-2 shrink-0 font-mono text-[10px] text-[#008CDD]">
                      {isSelected ? "ATIVO" : "SYNC"}
                    </span>
                  </div>
                  <pre className="mt-1.5 overflow-x-auto font-mono text-[10px] leading-relaxed text-[#52525B]">
                    <code>{step.payload}</code>
                  </pre>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Barra Interativa de Simulação e Telemetria do Evento */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-4 sm:flex-row sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#008CDD]/10 px-3 py-1 font-mono text-xs font-semibold text-[#008CDD]">
              <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
              Barramento Event-Driven
            </span>
            <span className="text-xs text-[#52525B]">
              Estágio em foco:{" "}
              <strong className="font-semibold text-[#131316]">
                {currentStep.platform}
              </strong>{" "}
              <ArrowRight className="mx-1 inline h-3 w-3 text-[#008CDD]" aria-hidden="true" />
              <span className="font-mono text-[#0A2540]">{currentStep.eventTitle}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg border border-[#E4E4E7] bg-[#F7F7F8] px-2.5 py-1 font-mono text-[11px] text-[#52525B] md:inline-flex">
              <WifiOff className="h-3 w-3 text-[#008CDD]" aria-hidden="true" />
              <span>Resiliência Offline-First Ativa</span>
            </div>

            <button
              type="button"
              onClick={() => setIsSimulating((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 font-mono text-xs font-medium text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 text-[#008CDD] ${isSimulating ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              <span>{isSimulating ? "Pausar Ciclo" : "Simular Fluxo"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegratedFlowSection;
