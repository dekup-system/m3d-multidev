import React from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { HeroStage3D } from "@/components/brand/HeroStage3D";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

export function HeroSection() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-headline"
      className="bg-engineering-grid relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Coluna Esquerda: Mensagem clara e direta */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/30 bg-white px-3.5 py-1.5 shadow-2xs">
              <span
                className="h-2 w-2 rounded-full bg-[#008CDD]"
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#0A2540] uppercase">
                WINDOWS · ANDROID · WEB — SISTEMAS SOB MEDIDA
              </span>
            </div>

            <h1
              id="hero-headline"
              className="mt-6 font-sans text-4xl font-bold tracking-tight text-[#131316] sm:text-5xl lg:text-[52px] lg:leading-[1.12]"
            >
              Sistemas integrados que conectam{" "}
              <span className="text-[#0A2540]">computador</span>,{" "}
              <span className="text-[#008CDD]">celular</span> e{" "}
              <span className="text-[#0A2540]">nuvem</span> em um único fluxo.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#52525B] sm:text-lg">
              Desenvolvemos softwares personalizados para eliminar planilhas paralelas e
              retrabalho, integrando sua operação no Windows, equipe em campo no Android e
              gestão na Web.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppContextualTrigger
                originSection="hero_primary"
                label="Falar no WhatsApp"
                variant="primary"
                showQualifierToggle
              />

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-5 py-3 font-sans text-sm font-semibold text-[#131316] transition-colors hover:border-[#008CDD] hover:text-[#008CDD]"
              >
                <span>Ver Portfólio</span>
                <ArrowDown className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#E4E4E7] pt-5 text-xs font-medium text-[#52525B]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                100% Sob Medida
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                Código Próprio da Sua Empresa
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                Suporte e Evolução Contínua
              </span>
            </div>
          </div>

          {/* Coluna Direita: Cubo 3D */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <HeroStage3D />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
