import React from "react";
import {
  Compass,
  FileCode2,
  TestTube2,
  Activity,
  Unlock,
  CalendarCheck,
} from "lucide-react";

const PILLARS = [
  {
    badge: "PILAR 01 · PREVISIBILIDADE",
    title: "Entregas Incrementais e Cronograma Auditável",
    description:
      "Ciclos quinzenais com builds homologáveis em ambiente de staging. Você acompanha a evolução real do software executando, não apenas slides de status.",
    techTag: "Milestones Verificáveis · CI/CD",
    icon: CalendarCheck,
  },
  {
    badge: "PILAR 02 · ARQUITETURA VIVA",
    title: "ADRs e Contratos OpenAPI 3.1 Documentados",
    description:
      "Toda decisão estrutural é registrada em Architecture Decision Records (ADRs) e todas as interfaces entre Windows, Android e Web possuem especificação OpenAPI 3.1 rigorosa.",
    techTag: "C4 Model · OpenAPI 3.1 · AsyncAPI",
    icon: FileCode2,
  },
  {
    badge: "PILAR 03 · QUALIDADE AUTOMATIZADA",
    title: "Testes Automatizados Antes de Cada Release",
    description:
      "Suites de testes unitários, de integração de contratos de API e testes end-to-end executam automaticamente no pipeline antes de qualquer promoção para produção.",
    techTag: "Vitest · Playwright · Contract Tests",
    icon: TestTube2,
  },
  {
    badge: "PILAR 04 · OBSERVABILIDADE",
    title: "Telemetria Ponta a Ponta com OpenTelemetry",
    description:
      "Rastreamento distribuído (distributed tracing), métricas de latência e logs estruturados correlacionam falhas do coletor Android ou terminal Windows até o banco em nuvem.",
    techTag: "OpenTelemetry · Traces · Alertas Proativos",
    icon: Activity,
  },
  {
    badge: "PILAR 05 · ZERO VENDOR LOCK-IN",
    title: "Suporte Evolutivo Sem Aprisionamento Técnico",
    description:
      "Código limpo, repositórios versionados, containers padronizados e documentação completa de build garantem que sua empresa tenha autonomia total sobre o ativo de software.",
    techTag: "Lei 9.609/98 · Docker · IaC",
    icon: Unlock,
  },
];

export function MissionSection() {
  return (
    <section
      id="missao"
      aria-labelledby="heading-missao"
      className="border-t border-[#E4E4E7] bg-[#FAFAFA] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            Missão & Compromisso Técnico M3D
          </span>
          <h2
            id="heading-missao"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Engenharia de software tratada como infraestrutura crítica de negócio.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#52525B]">
            Nossa missão é eliminar o abismo técnico entre a operação física (chão de
            fábrica, balcão e campo) e a tomada de decisão executiva em nuvem, com
            contratos determinísticos de qualidade e transparência.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.badge}
                className={`bento-card flex flex-col justify-between p-6 ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#008CDD]">
                      {pillar.badge}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] text-[#131316]">
                      <Icon className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-sans text-lg font-bold text-[#131316]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-[#E4E4E7] pt-3">
                  <span className="font-mono text-[11px] font-medium text-[#0A2540]">
                    {pillar.techTag}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Card Resumo de Governança */}
          <div className="bento-card flex flex-col justify-between border-[#008CDD]/30 bg-linear-to-br from-[#0A2540] to-[#131316] p-6 text-white">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[#008CDD] uppercase">
                COMPROMISSO EXECUTIVO
              </span>
              <h3 className="mt-4 font-sans text-lg font-bold text-white">
                Do Código-Fonte ao Runbook de Operação
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#D4D4D8]">
                Cada entrega acompanha repositório Git organizado, SBOM (Software Bill of
                Materials) em CycloneDX, guia de deploy reproduzível e transferência de
                conhecimento para sua equipe interna.
              </p>
            </div>
            <div className="mt-5 border-t border-white/15 pt-3 font-mono text-[11px] text-[#008CDD]">
              100% Rastreável · Audit-Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
