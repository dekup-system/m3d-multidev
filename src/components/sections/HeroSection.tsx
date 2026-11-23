import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ShieldCheck,
  Code2,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { HeroStage3D } from "@/components/brand/HeroStage3D";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

/**
 * HeroSection — Primeira Dobra de Alta Conversão B2B (Fase 1 + Fase 2 + Fase 3):
 * - Renderiza headlines, CTAs e linha de confiança imediatamente via SSR (LCP < 2.5s).
 * - Palco 3D com `HeroStage3D` (`LogoCube3D` via `next/dynamic({ ssr: false })` e fallback `LogoFullSVG`)
 *   com aspect-ratio reservado (CLS = 0).
 */
export function HeroSection() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-headline"
      className="bg-engineering-grid relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna Esquerda: Copywriting B2B & Conversão (7 colunas) */}
          <div className="lg:col-span-7">
            {/* Badge em Geist Mono */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/30 bg-white px-3.5 py-1.5 shadow-2xs">
              <span
                className="h-2 w-2 rounded-full bg-[#008CDD]"
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#0A2540] uppercase">
                WINDOWS · ANDROID · WEB — SISTEMAS INTEGRADOS SOB MEDIDA
              </span>
            </div>

            {/* Headline Principal */}
            <h1
              id="hero-headline"
              className="mt-6 font-sans text-4xl font-bold tracking-tight text-[#131316] sm:text-5xl lg:text-[54px] lg:leading-[1.1]"
            >
              Engenharia de software que conecta{" "}
              <span className="text-[#0A2540]">operação desktop</span>,{" "}
              <span className="text-[#008CDD]">campo móvel</span> e{" "}
              <span className="text-[#0A2540]">gestão em nuvem</span> em um único fluxo contínuo.
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#52525B] sm:text-lg">
              Projetamos e desenvolvemos multi-sistemas sob medida para empresas que
              precisam eliminar retrabalho, planilhas paralelas e gargalos de comunicação
              entre terminais Windows locais, coletores/apps Android Offline-First e
              plataformas Web corporativas.
            </p>

            {/* CTAs: Primário (WhatsApp com Micro-Qualificador) + Secundário (Arquitetura & Cases) */}
            <div className="mt-8 flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <WhatsAppContextualTrigger
                  originSection="hero_primary"
                  label="Falar com Engenheiro no WhatsApp"
                  variant="primary"
                  showQualifierToggle
                />

                <a
                  href="#fluxo-integrado"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-5 py-3 font-sans text-sm font-semibold text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
                >
                  <span>Explorar Arquitetura & Cases</span>
                  <ArrowDown className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                </a>
              </div>

              {/* Linha de Confiança Técnica & Jurídica */}
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E4E4E7] pt-4 font-mono text-xs text-[#52525B]">
                <span className="inline-flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  Propriedade do Código (Lei 9.609/98 Art. 4º)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  LGPD Art. 46 & OWASP Multiplataforma
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  SLA 99,9% Definido em Contrato
                </span>
              </div>
            </div>

            {/* Aviso LGPD discreto e Horário Comercial */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#71717A]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                Atendimento técnico direto com engenheiro sênior (Seg–Sex, 08h30 às 18h00 BRT).
              </span>
              <Link
                href="/privacidade"
                className="underline hover:text-[#131316]"
              >
                Política de Privacidade e LGPD
              </Link>
            </div>
          </div>

          {/* Coluna Direita: Palco 3D Procedural com Seta Azul Elétrica (5 colunas) */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <HeroStage3D />

            {/* Guia de leitura para a seção abaixo */}
            <a
              href="#fluxo-integrado"
              aria-label="Rolar para a seção Fluxo M3D em Ação"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-4 py-1.5 font-mono text-xs font-medium text-[#0A2540] shadow-2xs transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
            >
              <span>Acompanhar fluxo da seta elétrica</span>
              <ArrowDown className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
