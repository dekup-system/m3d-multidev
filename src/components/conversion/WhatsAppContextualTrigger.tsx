"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  SlidersHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  X,
  Check,
} from "lucide-react";
import {
  buildWhatsAppUrl,
  trackWhatsAppConversion,
  type PlatformChoice,
  type ScopeChoice,
  type TimelineChoice,
} from "@/lib/telemetry";

const PLATFORM_OPTIONS: PlatformChoice[] = [
  "Windows + Android + Web (Integração Completa)",
  "Windows (Desktop / ERP / Automação)",
  "Android (Mobile / Coleta Offline-First)",
  "Web (Nuvem / Painel & APIs)",
];

const SCOPE_OPTIONS: ScopeChoice[] = [
  "Novo Sistema Sob Medida",
  "Modernização de Sistema Legado",
  "Integração entre Plataformas / APIs",
];

const TIMELINE_OPTIONS: TimelineChoice[] = [
  "Imediato (Urgência Operacional)",
  "1 a 3 meses",
  "Planejamento Arquitetural",
];

export interface WhatsAppContextualTriggerProps {
  originSection: string;
  label?: string;
  defaultPlatform?: PlatformChoice;
  defaultScope?: ScopeChoice;
  variant?: "primary" | "outline" | "compact";
  showQualifierToggle?: boolean;
  className?: string;
}

/**
 * WhatsAppContextualTrigger — Conversão B2B via WhatsApp Business com:
 * - Clique direto contextual OU micro-qualificador de 3 cliques (sem solicitar dados pessoais na tela).
 * - Disparo de telemetria GA4/GTM (`generate_lead` / `whatsapp_click`) estritamente sem PII.
 * - Aviso explícito de conformidade LGPD + horário comercial de atendimento.
 */
export function WhatsAppContextualTrigger({
  originSection,
  label = "Falar com Engenheiro no WhatsApp",
  defaultPlatform = "Windows + Android + Web (Integração Completa)",
  defaultScope = "Novo Sistema Sob Medida",
  variant = "primary",
  showQualifierToggle = false,
  className = "",
}: WhatsAppContextualTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformChoice>(defaultPlatform);
  const [selectedScope, setSelectedScope] = useState<ScopeChoice>(defaultScope);
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineChoice>(
    "Imediato (Urgência Operacional)"
  );

  const handleDirectClick = () => {
    trackWhatsAppConversion({
      origin_section: originSection,
      selected_platforms: selectedPlatform,
      project_scope: selectedScope,
      target_timeline: selectedTimeline,
    });
  };

  const whatsappHref = buildWhatsAppUrl({
    origin_section: originSection,
    selected_platforms: selectedPlatform,
    project_scope: selectedScope,
    target_timeline: selectedTimeline,
  });

  const buttonStyles = {
    primary:
      "bg-[#131316] text-white hover:bg-[#0A2540] border border-[#131316] shadow-xs",
    outline:
      "bg-white text-[#131316] hover:border-[#008CDD] hover:text-[#008CDD] border border-[#E4E4E7]",
    compact:
      "bg-[#008CDD] text-white hover:bg-[#0077BE] border border-[#008CDD] text-xs px-3.5 py-2",
  };

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDirectClick}
          className={`inline-flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 font-sans text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-[#008CDD] ${buttonStyles[variant]}`}
        >
          <MessageSquare className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
          <span>{label}</span>
          <ArrowUpRight className="h-4 w-4 opacity-75" aria-hidden="true" />
        </a>

        {showQualifierToggle && (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-3 font-mono text-xs font-medium text-[#52525B] transition-colors hover:border-[#008CDD] hover:text-[#131316]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
            <span>Personalizar Escopo (3 cliques)</span>
          </button>
        )}
      </div>

      {/* Micro-qualificador de 3 cliques sem coleta de dados pessoais (Zero Atrito / LGPD Safe) */}
      {isOpen && (
        <div
          role="region"
          aria-label="Qualificador rápido de escopo técnico para WhatsApp"
          className="mt-4 w-full max-w-xl rounded-2xl border border-[#E4E4E7] bg-white p-5 text-left shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-3">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[#008CDD] uppercase">
                DIAGNÓSTICO CONTEXTUAL · ZERO PII
              </span>
              <h3 className="font-sans text-sm font-bold text-[#131316]">
                Configure sua mensagem técnica em 3 cliques
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar qualificador de escopo"
              className="rounded-lg p-1 text-[#52525B] hover:bg-[#F7F7F8] hover:text-[#131316]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Passo 1: Plataformas */}
            <div>
              <p className="font-mono text-[11px] font-semibold text-[#52525B] uppercase">
                1. Plataformas Envolvidas
              </p>
              <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {PLATFORM_OPTIONS.map((opt) => {
                  const active = selectedPlatform === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedPlatform(opt)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                        active
                          ? "border-[#008CDD] bg-[#008CDD]/8 text-[#0A2540]"
                          : "border-[#E4E4E7] bg-[#FAFAFA] text-[#52525B] hover:border-[#D4D4D8]"
                      }`}
                    >
                      <span className="truncate pr-2">{opt}</span>
                      {active && (
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Passo 2: Escopo */}
            <div>
              <p className="font-mono text-[11px] font-semibold text-[#52525B] uppercase">
                2. Natureza do Escopo
              </p>
              <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                {SCOPE_OPTIONS.map((opt) => {
                  const active = selectedScope === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedScope(opt)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                        active
                          ? "border-[#008CDD] bg-[#008CDD]/8 text-[#0A2540]"
                          : "border-[#E4E4E7] bg-[#FAFAFA] text-[#52525B] hover:border-[#D4D4D8]"
                      }`}
                    >
                      <span>{opt}</span>
                      {active && (
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Passo 3: Prazo Alvo */}
            <div>
              <p className="font-mono text-[11px] font-semibold text-[#52525B] uppercase">
                3. Janela de Início
              </p>
              <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                {TIMELINE_OPTIONS.map((opt) => {
                  const active = selectedTimeline === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedTimeline(opt)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                        active
                          ? "border-[#008CDD] bg-[#008CDD]/8 text-[#0A2540]"
                          : "border-[#E4E4E7] bg-[#FAFAFA] text-[#52525B] hover:border-[#D4D4D8]"
                      }`}
                    >
                      <span>{opt}</span>
                      {active && (
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Rodapé do Qualificador com CTA e aviso LGPD */}
          <div className="mt-5 flex flex-col gap-3 border-t border-[#E4E4E7] pt-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectClick}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#008CDD] px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#0077BE]"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Iniciar Conversa com Escopo Configurado</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#52525B]">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                Sem inclusão em listas sem consentimento (
                <Link
                  href="/privacidade"
                  className="underline hover:text-[#131316]"
                >
                  Política LGPD
                </Link>
                ).
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Clock className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                Seg–Sex · 08h30 às 18h00 (BRT)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatsAppContextualTrigger;
