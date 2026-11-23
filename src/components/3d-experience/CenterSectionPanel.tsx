"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Monitor,
  Smartphone,
  Globe,
  ShieldCheck,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Compass,
  CheckCircle2,
} from "lucide-react";
import type { SectionId } from "./BrandTypingTerminal";
import { buildWhatsAppUrl, trackWhatsAppConversion } from "@/lib/telemetry";

export interface CenterSectionPanelProps {
  activeSection: SectionId | null;
  onCloseToCube: () => void;
  onNavigateFace: (section: SectionId) => void;
}

const PORTFOLIO_ITEMS = [
  {
    name: "DEKUP",
    tag: "PRÉ-EDIÇÃO IA OFFLINE",
    url: "https://www.dekup.com.br/",
    display: "dekup.com.br",
    desc: "Infraestrutura inteligente de pré-edição para eventos e videocasts. Sincroniza múltiplos canais e monta timelines multicâmeras com Assistente IA 100% local e offline.",
  },
  {
    name: "NexIA Core",
    tag: "REDE & AUDITORIA LOCAL",
    url: "https://www.nexiacore.com.br/",
    display: "nexiacore.com.br",
    desc: "Plataforma Windows 10/11 para descoberta, topologia, auditoria de segurança e diagnóstico de rede em painel único com IA privada local (Ollama) sem enviar dados à nuvem.",
  },
  {
    name: "Kitefy",
    tag: "MARKETING ORGÂNICO & GEO",
    url: "https://kitefy.vercel.app",
    display: "kitefy.vercel.app",
    desc: "Estúdio web ágil que extrai o perfil da marca via URL e entrega roteiros A/B, carrosséis e artigos otimizados para buscadores e IAs (GEO) sem exigir OAuth social.",
  },
];

/**
 * CenterSectionPanel — Painel central enxuto com texto pequeno e fonte tecnológica (Geist Mono)
 * que surge no centro da tela estática quando o dado desce girando para o footer.
 */
export function CenterSectionPanel({
  activeSection,
  onCloseToCube,
  onNavigateFace,
}: CenterSectionPanelProps) {
  const handleWhatsAppClick = (origin: string) => {
    trackWhatsAppConversion({
      origin_section: origin,
      selected_platforms: "Windows + Android + Web (Integração Completa)",
      project_scope: "Novo Sistema Sob Medida",
    });
  };

  const whatsappUrl = buildWhatsAppUrl({
    origin_section: `cube_face_${activeSection ?? "main"}`,
    selected_platforms: "Windows + Android + Web (Integração Completa)",
    project_scope: "Novo Sistema Sob Medida",
  });

  return (
    <AnimatePresence mode="wait">
      {activeSection && (
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          aria-live="polite"
          className="pointer-events-auto relative z-20 mx-auto w-full max-w-2xl px-4"
        >
          <div className="rounded-2xl border border-[#E4E4E7] bg-white/88 p-5 shadow-[0_12px_40px_-8px_rgba(10,37,64,0.12)] backdrop-blur-xl sm:p-6">
            {/* Barra de Topo do Terminal Central */}
            <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-3">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-[#008CDD] uppercase">
                <span className="inline-block h-2 w-2 rounded-full bg-[#008CDD]" />
                <span>M3D.NODE // {activeSection.toUpperCase()}</span>
              </div>

              <button
                type="button"
                onClick={onCloseToCube}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E4E7] bg-[#F7F7F8] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
              >
                <RotateCcw className="h-3 w-3 text-[#008CDD]" />
                <span>RETORNAR AO CUBO [ESC]</span>
              </button>
            </div>

            {/* 01. FACE: INICIAR */}
            {activeSection === "iniciar" && (
              <div className="mt-4 space-y-3.5 font-mono text-xs">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-[#008CDD]/10 px-2.5 py-1 text-[10px] font-semibold text-[#008CDD]">
                  <Sparkles className="h-3 w-3" />
                  <span>WINDOWS · ANDROID · WEB — ECOSSISTEMA INTEGRADO</span>
                </div>

                <h1 className="font-sans text-xl font-bold tracking-tight text-[#131316] sm:text-2xl">
                  Engenharia de softwares sob medida conectados em tempo real.
                </h1>

                <p className="font-mono text-[11px] leading-relaxed text-[#52525B]">
                  A <strong className="text-[#131316]">M3D MULTIDEV</strong> projeta e
                  desenvolve sistemas que unem operação local no{" "}
                  <strong className="text-[#0A2540]">Windows</strong>, mobilidade em
                  campo no <strong className="text-[#008CDD]">Android</strong> e gestão em
                  nuvem na <strong className="text-[#0A2540]">Web</strong> sem planilhas
                  paralelas ou retrabalho.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-2.5">
                    <div className="text-[10px] font-bold text-[#008CDD]">01 // LOCAL</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-[#131316]">
                      Desktop Windows
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-2.5">
                    <div className="text-[10px] font-bold text-[#008CDD]">02 // CAMPO</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-[#131316]">
                      Mobile Android
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-2.5">
                    <div className="text-[10px] font-bold text-[#008CDD]">03 // NUVEM</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-[#131316]">
                      Painel & APIs Web
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E4E4E7] pt-3">
                  <button
                    type="button"
                    onClick={() => onNavigateFace("projetos")}
                    className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 font-mono text-[11px] font-semibold text-[#131316] hover:border-[#008CDD] hover:text-[#008CDD]"
                  >
                    VER PROJETOS REAIS →
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateFace("contato")}
                    className="rounded-lg bg-[#131316] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white hover:bg-[#008CDD]"
                  >
                    INICIAR DIAGNÓSTICO
                  </button>
                </div>
              </div>
            )}

            {/* 02. FACE: DESENVOLVIMENTO */}
            {activeSection === "desenvolvimento" && (
              <div className="mt-4 space-y-3 font-mono text-xs">
                <p className="text-[11px] text-[#52525B]">
                  Arquitetura multiplataforma unificada do hardware local à nuvem:
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#131316]">
                      <Monitor className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>WINDOWS</span>
                    </div>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-[#52525B]">
                      ERPs, PDVs, automação local, leitura de portas USB/Serial, balanças,
                      impressoras e IA offline.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#131316]">
                      <Smartphone className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>ANDROID</span>
                    </div>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-[#52525B]">
                      Apps corporativos e coletores de dados Offline-First com sincronia
                      automática, câmera e QR/Barcode.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#131316]">
                      <Globe className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>WEB & NUVEM</span>
                    </div>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-[#52525B]">
                      Dashboards gerenciais em tempo real, plataformas SaaS, portais B2B e
                      integração via APIs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#E4E4E7] pt-3 text-[10px] text-[#52525B]">
                  <span>SYNC: WINDOWS ↔ ANDROID ↔ WEB</span>
                  <button
                    type="button"
                    onClick={() => onNavigateFace("contato")}
                    className="font-semibold text-[#008CDD] hover:underline"
                  >
                    SOLICITAR ARQUITETURA →
                  </button>
                </div>
              </div>
            )}

            {/* 03. FACE: MISSÃO */}
            {activeSection === "missao" && (
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#131316]">
                  <Compass className="h-4 w-4 text-[#008CDD]" />
                  <span>COMPROMISSO TÉCNICO M3D MULTIDEV</span>
                </div>

                <p className="text-[11px] leading-relaxed text-[#52525B]">
                  Eliminar o abismo entre a operação física e a gestão digital, entregando
                  software rápido, documentado e sem aprisionamento tecnológico.
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="text-[10px] font-bold text-[#008CDD]">
                      01 // PREVISIBILIDADE
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Entregas em etapas visíveis e testáveis com cronograma claro.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="text-[10px] font-bold text-[#008CDD]">
                      02 // ESTABILIDADE
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Código limpo, arquitetura tipada e validação rigorosa antes de cada
                      release.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="text-[10px] font-bold text-[#008CDD]">
                      03 // AUTONOMIA
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Zero vendor lock-in: evolução contínua e titularidade garantida.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 04. FACE: PROJETOS */}
            {activeSection === "projetos" && (
              <div className="mt-4 space-y-3 font-mono text-xs">
                <p className="text-[11px] font-semibold text-[#131316]">
                  Alguns dos sistemas desenvolvidos:
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {PORTFOLIO_ITEMS.map((proj) => (
                    <a
                      key={proj.name}
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3 transition-all hover:border-[#008CDD] hover:bg-white"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[9px] font-bold text-[#008CDD]">
                          <span>{proj.tag}</span>
                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="mt-1 font-sans text-sm font-bold text-[#131316]">
                          {proj.name}
                        </div>
                        <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                          {proj.desc}
                        </p>
                      </div>
                      <div className="mt-2.5 border-t border-[#E4E4E7] pt-1.5 text-[10px] font-semibold text-[#0A2540] group-hover:text-[#008CDD]">
                        {proj.display}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 05. FACE: SEGURANÇA */}
            {activeSection === "seguranca" && (
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#131316]">
                  <ShieldCheck className="h-4 w-4 text-[#008CDD]" />
                  <span>SEGURANÇA, PROPRIEDADE DO CÓDIGO & SLA</span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#131316]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>CRIPTOGRAFIA & OWASP</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Tráfego TLS 1.3, bancos protegidos com AES-256 e verificação de
                      segurança em Windows, Android e Web.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#131316]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>PROPRIEDADE (LEI 9.609/98)</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Cessão contratual formal do código desenvolvido sob encomenda para a
                      sua empresa (Art. 4º).
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#131316]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>CONFORMIDADE LGPD</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Privacy by Design (Art. 46), minimização de dados e controle de
                      acessos auditável.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#131316]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#008CDD]" />
                      <span>SLA 99,9% & SUPORTE</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#52525B]">
                      Alta disponibilidade monitorada e atendimento técnico ágil em
                      horário comercial.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#E4E4E7] pt-2.5 text-[10px] text-[#52525B]">
                  <Link href="/privacidade" className="underline hover:text-[#008CDD]">
                    Ler Política de Privacidade (LGPD)
                  </Link>
                  <span>STATUS: COMPLIANT</span>
                </div>
              </div>
            )}

            {/* 06. FACE: CONTATO */}
            {activeSection === "contato" && (
              <div className="mt-4 space-y-3.5 font-mono text-xs">
                <div>
                  <div className="text-[11px] font-bold text-[#131316]">
                    CANAL DIRETO DE ENGENHARIA // WHATSAPP BUSINESS
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#52525B]">
                    Converse diretamente com um engenheiro da M3D Multidev para avaliar seu
                    sistema Windows, aplicativo Android ou plataforma Web.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3 text-[10px] text-[#52525B]">
                  <div>• HORÁRIO: Segunda a Sexta, 08h30 às 18h00 (BRT)</div>
                  <div className="mt-1">
                    • PRIVACIDADE: Sem inclusão em listas sem consentimento (LGPD).
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppClick("cube_contact_face")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#008CDD] px-4 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#0077BE]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>INICIAR CONVERSA NO WHATSAPP</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default CenterSectionPanel;
