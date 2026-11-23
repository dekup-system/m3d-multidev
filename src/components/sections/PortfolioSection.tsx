import React from "react";
import { ArrowUpRight, Globe, Layers, Sparkles } from "lucide-react";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

interface PortfolioProject {
  name: string;
  category: string;
  url: string;
  displayUrl: string;
  description: string;
  highlights: string[];
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: "DEKUP",
    category: "Pré-Edição Audiovisual Inteligente",
    url: "https://www.dekup.com.br/",
    displayUrl: "dekup.com.br",
    description:
      "Infraestrutura inteligente de pré-edição para profissionais de eventos e videocasts. Leva o material do bruto à timeline estruturada: sincroniza múltiplos canais, analisa áudio e vídeo, organiza e monta projetos multicâmeras com Assistente IA 100% local e offline na estação.",
    highlights: [
      "Assistente IA 100% Offline",
      "Sincronismo & Montagem Multicâmeras",
      "Videocast 2.0 & Same-Day Edit",
    ],
  },
  {
    name: "NexIA Core",
    category: "Inteligência e Diagnóstico de Rede Local",
    url: "https://www.nexiacore.com.br/",
    displayUrl: "nexiacore.com.br",
    description:
      "Plataforma desktop (Windows 10/11) para descoberta de ativos, mapeamento de topologia, auditoria de postura de segurança e diagnóstico de rede em um único painel. Opera 100% localmente com IA privada (Ollama), modo somente leitura e geração de relatórios executivos sem enviar dados à nuvem.",
    highlights: [
      "Descoberta & Topologia Local",
      "Auditoria de Segurança & Postura",
      "IA Privada 100% Offline (Windows)",
    ],
  },
  {
    name: "Kitefy",
    category: "Estúdio Ágil de Marketing Orgânico & GEO",
    url: "https://kitefy.vercel.app",
    displayUrl: "kitefy.vercel.app",
    description:
      "Plataforma web que extrai o perfil e tom de voz da marca a partir da URL em segundos para gerar roteiros com ganchos A/B, carrosséis e artigos otimizados para buscadores e assistentes de IA (GEO / Schema.org), com aprovação rápida e exportação direta sem exigir conexão de redes sociais.",
    highlights: [
      "Roteiros, Carrosséis & Artigos GEO",
      "Diagnóstico de Marca por URL",
      "Aprendizado por Telemetria",
    ],
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      aria-labelledby="heading-portfolio"
      className="border-t border-[#E4E4E7] bg-[#FBFBFA] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Limpo e Direto */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Portfólio M3D Multidev
          </span>
          <h2
            id="heading-portfolio"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Alguns dos sistemas desenvolvidos
          </h2>
          <p className="mt-3 text-base text-[#52525B]">
            Conheça algumas das plataformas e soluções reais criadas pela nossa engenharia.
          </p>
        </div>

        {/* Cards dos 3 Projetos Reais */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project) => (
            <article
              key={project.name}
              className="bento-card group flex flex-col justify-between p-7 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-[#008CDD]">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#F7F7F8] px-2.5 py-1 font-mono text-[11px] text-[#52525B]">
                    <Globe className="h-3 w-3 text-[#008CDD]" aria-hidden="true" />
                    {project.displayUrl}
                  </span>
                </div>

                <h3 className="mt-4 font-sans text-2xl font-bold text-[#131316]">
                  {project.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1 font-mono text-[11px] font-medium text-[#131316]"
                    >
                      <Layers className="h-3 w-3 text-[#008CDD]" aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-[#E4E4E7] pt-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-between rounded-xl bg-[#F7F7F8] px-4 py-2.5 font-sans text-sm font-semibold text-[#131316] transition-colors group-hover:bg-[#008CDD] group-hover:text-white"
                >
                  <span>Acessar {project.name}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Enxuto */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-6 sm:flex-row">
          <div>
            <h3 className="font-sans text-base font-bold text-[#131316]">
              Quer tirar o seu projeto do papel com esse padrão de entrega?
            </h3>
            <p className="mt-1 text-sm text-[#52525B]">
              Converse direto com a nossa equipe e receba uma proposta sob medida.
            </p>
          </div>
          <WhatsAppContextualTrigger
            originSection="portfolio"
            label="Solicitar Orçamento no WhatsApp"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
