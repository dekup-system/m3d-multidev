import React from "react";
import Link from "next/link";
import { Clock, ShieldCheck, Scale, MapPin } from "lucide-react";
import { LogoFullSVG } from "@/components/brand/LogoFullSVG";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Rodapé institucional M3D Multidev"
      className="border-t border-[#E4E4E7] bg-white pt-16 pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Coluna 1: LogoFullSVG Adaptada & Resumo Institucional (5 colunas) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 shrink-0 rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-2">
                <LogoFullSVG className="h-full w-full" />
              </div>
              <div>
                <span className="font-sans text-lg font-bold tracking-tight text-[#131316]">
                  M3D Multidev
                </span>
                <p className="mt-0.5 font-mono text-xs text-[#008CDD]">
                  WINDOWS · ANDROID · WEB
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
                  Engenharia de software sob medida para operações B2B críticas.
                  Desenvolvimento integrado de aplicações desktop Windows, coletores e
                  apps Android Offline-First e plataformas Web em nuvem.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2 font-mono text-xs text-[#52525B]">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                <span>Atendimento Comercial & Engenharia: Seg–Sex, 08h30 às 18h00 (BRT)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                <span>Operação Nacional no Brasil · Atendimento Remoto & In-Loco sob demanda</span>
              </div>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida (3 colunas) */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs font-bold tracking-wider text-[#131316] uppercase">
              Arquitetura & Seções
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs text-[#52525B]">
              <li>
                <a href="#topo" className="hover:text-[#008CDD]">
                  Início & Palco 3D M3D
                </a>
              </li>
              <li>
                <a href="#fluxo-integrado" className="hover:text-[#008CDD]">
                  Fluxo M3D em Ação (Windows ↔ Android ↔ Web)
                </a>
              </li>
              <li>
                <a href="#multi-sistemas" className="hover:text-[#008CDD]">
                  Bento Grid de Engenharia Multiplataforma
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#008CDD]">
                  Estudos de Caso & Arquiteturas (NDA-Safe)
                </a>
              </li>
              <li>
                <a href="#missao" className="hover:text-[#008CDD]">
                  Missão, ADRs, OpenAPI 3.1 & OpenTelemetry
                </a>
              </li>
              <li>
                <a href="#seguranca-sla" className="hover:text-[#008CDD]">
                  Segurança OWASP, Criptografia & Matriz SLA
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Compliance, LGPD e Contato Direto (4 colunas) */}
          <div className="lg:col-span-4">
            <h2 className="font-mono text-xs font-bold tracking-wider text-[#131316] uppercase">
              Governança, LGPD & Diagnóstico
            </h2>

            <div className="mt-4 space-y-2.5 text-xs text-[#52525B]">
              <p className="flex items-start gap-2">
                <ShieldCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                  aria-hidden="true"
                />
                <span>
                  Conformidade com a LGPD (Lei nº 13.709/2018, Art. 46 — Privacy by Design).
                  Não incluímos seu número em listas de transmissão sem consentimento.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Scale
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                  aria-hidden="true"
                />
                <span>
                  Propriedade intelectual garantida ao contratante conforme Lei nº
                  9.609/1998 (Art. 4º).
                </span>
              </p>
            </div>

            <div className="mt-5">
              <WhatsAppContextualTrigger
                originSection="footer_cta"
                label="Agendar Diagnóstico Técnico"
                variant="primary"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
              <Link
                href="/privacidade"
                className="font-medium text-[#0A2540] underline hover:text-[#008CDD]"
              >
                Política de Privacidade e Proteção de Dados (LGPD)
              </Link>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E4E4E7] pt-6 text-xs text-[#71717A] sm:flex-row">
          <p>© {currentYear} M3D Multidev. Todos os direitos reservados.</p>
          <p className="font-mono text-[11px]">
            Design System Light Mode · WCAG 2.2 AA · Next.js App Router + React 19 + R3F
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
