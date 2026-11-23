import React from "react";
import {
  FileCheck2,
  ArrowRight,
  Lock,
  TrendingUp,
  Layers,
  AlertCircle,
} from "lucide-react";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

interface CaseStudy {
  id: string;
  sectorDescriptor: string;
  ndaBadge: string;
  title: string;
  problem: string;
  solutionWindows: string;
  solutionAndroid: string;
  solutionWeb: string;
  metric3MonthsPlaceholder: string;
  metric12MonthsPlaceholder: string;
  metricLabel3M: string;
  metricLabel12M: string;
}

/**
 * REGRA ANTI-ALUCINAÇÃO:
 * Nenhum nome de cliente real é inventado e nenhuma métrica é fabricada como se fosse
 * resultado real não-auditado. Utilizamos descritores credíveis de setor/porte sob NDA
 * e placeholders explícitos {{...}} prontos para preenchimento com dados auditados.
 */
const NDA_CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-01",
    sectorDescriptor: "[SETOR_INDUSTRIAL_LOGISTICO_MEDIO_GRANDE_PORTE]",
    ndaBadge: "NDA Art. 4º · Auditoria Interna",
    title: "Sincronização entre Pesagem/Expedição Local, Coleta em Pátio e ERP Web",
    problem:
      "Apontamentos manuais em planilhas paralelas entre balanças rodoviárias/industriais (Windows), conferentes de pátio (papel/rádio) e faturamento central geravam divergências de estoque e atrasos na liberação de carga.",
    solutionWindows:
      "Serviço Windows nativo integrado via RS-232 às balanças e impressoras térmicas com fila transacional local.",
    solutionAndroid:
      "App Android Offline-First em coletores industriais para conferência de lotes por QR Code/código de barras no galpão.",
    solutionWeb:
      "Painel Web gerencial com rastreabilidade em tempo real de docas, alertas de divergência e API conectada ao ERP.",
    metricLabel3M: "Redução de retrabalho e divergência (Janela 3 meses)",
    metric3MonthsPlaceholder: "{{METRICA_REAL_3M_EX_REDUCAO_ERRO_EXPEDICAO_%}}",
    metricLabel12M: "Ganho de vazão operacional auditado (Janela 12 meses)",
    metric12MonthsPlaceholder: "{{METRICA_REAL_12M_EX_GANHO_THROUGHPUT_ANUAL_%}}",
  },
  {
    id: "case-02",
    sectorDescriptor: "[SETOR_DISTRIBUICAO_E_FORCA_DE_VENDAS_B2B]",
    ndaBadge: "NDA Comercial · LGPD Compliant",
    title: "Automação de Força de Vendas em Campo Conectada ao Retaguarda Desktop e Portal B2B",
    problem:
      "Representantes externos sofriam com perda de pedidos em zonas sem cobertura celular, enquanto a equipe interna precisava redigitar condições comerciais no sistema Windows legado.",
    solutionWindows:
      "Conector sincronizador Windows Service acoplado ao banco de dados do ERP legado com validação de regras fiscais.",
    solutionAndroid:
      "Aplicativo Android com catálogo completo, cálculo de impostos/margem offline e sincronia delta automática.",
    solutionWeb:
      "Portal Web B2B de autoatendimento e dashboard de acompanhamento de metas e comissionamento em tempo real.",
    metricLabel3M: "Tempo médio de ciclo do pedido (Janela 3 meses)",
    metric3MonthsPlaceholder: "{{METRICA_REAL_3M_EX_REDUCAO_CICLO_PEDIDO_%}}",
    metricLabel12M: "Eliminação de redigitação manual (Janela 12 meses)",
    metric12MonthsPlaceholder: "{{METRICA_REAL_12M_EX_AUTOMACAO_PEDIDOS_%}}",
  },
  {
    id: "case-03",
    sectorDescriptor: "[SETOR_SERVICOS_TECNICOS_E_ENGENHARIA_DE_CAMPO]",
    ndaBadge: "NDA Operacional · SLA Missão Crítica",
    title: "Gestão de Ordens de Serviço, Telemetria de Equipamentos e Laudos Técnicos",
    problem:
      "Falta de padronização entre diagnósticos de bancada (software técnico Windows), checklists fotográficos em campo (Android) e liberação de laudos para clientes corporativos (Web).",
    solutionWindows:
      "Aplicação desktop Windows para leitura de instrumentos de bancada via USB e geração de pacotes criptografados.",
    solutionAndroid:
      "App Android para técnicos em campo com captura de evidências, assinatura digital, geolocalização e modo offline.",
    solutionWeb:
      "Central Web de despacho, controle de SLA em tempo real e portal do cliente para download de certificados.",
    metricLabel3M: "Conformidade de SLA no primeiro atendimento (3 meses)",
    metric3MonthsPlaceholder: "{{METRICA_REAL_3M_EX_SLA_PRIMEIRO_ATENDIMENTO_%}}",
    metricLabel12M: "Redução no tempo de emissão de laudos (12 meses)",
    metric12MonthsPlaceholder: "{{METRICA_REAL_12M_EX_REDUCAO_TEMPO_LAUDO_%}}",
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      aria-labelledby="heading-portfolio"
      className="border-t border-[#E4E4E7] bg-[#FBFBFA] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
              <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
              Portfólio & Arquiteturas de Referência (Compatível com NDA)
            </span>
            <h2
              id="heading-portfolio"
              className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
            >
              Estudos de Caso: Problema → Solução Multiplataforma → Resultado
            </h2>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-[#E4E4E7] bg-white p-3.5 text-xs text-[#52525B] lg:max-w-sm">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#008CDD]" aria-hidden="true" />
            <span>
              Em respeito aos acordos de confidencialidade (NDA) e à LGPD, identificadores
              de clientes são anonimizados e métricas exibem placeholders explícitos para
              dados auditados.
            </span>
          </div>
        </div>

        {/* Lista de Estudos de Caso */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {NDA_CASE_STUDIES.map((item) => (
            <article
              key={item.id}
              className="bento-card flex flex-col justify-between p-6 sm:p-7"
            >
              <div>
                {/* Descritor de Setor e Selo NDA */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E4E7] pb-4">
                  <span className="font-mono text-[11px] font-bold text-[#0A2540]">
                    {item.sectorDescriptor}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F7F8] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#52525B]">
                    <Lock className="h-2.5 w-2.5 text-[#008CDD]" aria-hidden="true" />
                    {item.ndaBadge}
                  </span>
                </div>

                {/* Título */}
                <h3 className="mt-4 font-sans text-lg font-bold leading-snug text-[#131316]">
                  {item.title}
                </h3>

                {/* 1. Problema */}
                <div className="mt-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#131316] uppercase">
                    <AlertCircle className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                    <span>1. Cenário & Gargalo Operacional</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#52525B]">
                    {item.problem}
                  </p>
                </div>

                {/* 2. Solução Multiplataforma (Windows + Android + Web) */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#008CDD] uppercase">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>2. Arquitetura Integrada M3D</span>
                  </div>

                  <div className="rounded-lg border border-[#E4E4E7] bg-white p-2.5 text-xs">
                    <strong className="font-mono text-[#131316]">Windows: </strong>
                    <span className="text-[#52525B]">{item.solutionWindows}</span>
                  </div>

                  <div className="rounded-lg border border-[#E4E4E7] bg-white p-2.5 text-xs">
                    <strong className="font-mono text-[#131316]">Android: </strong>
                    <span className="text-[#52525B]">{item.solutionAndroid}</span>
                  </div>

                  <div className="rounded-lg border border-[#E4E4E7] bg-white p-2.5 text-xs">
                    <strong className="font-mono text-[#131316]">Web: </strong>
                    <span className="text-[#52525B]">{item.solutionWeb}</span>
                  </div>
                </div>
              </div>

              {/* 3. Resultados Mensuráveis (Placeholders Auditáveis 3M e 12M) */}
              <div className="mt-6 border-t border-[#E4E4E7] pt-5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#0A2540] uppercase">
                  <TrendingUp className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  <span>3. Indicadores Auditados (3 e 12 Meses)</span>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-[#008CDD]/25 bg-[#008CDD]/6 p-3">
                    <div className="text-[11px] text-[#52525B]">{item.metricLabel3M}</div>
                    <div className="mt-1 break-all font-mono text-xs font-bold text-[#0A2540]">
                      {item.metric3MonthsPlaceholder}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#008CDD]/25 bg-[#008CDD]/6 p-3">
                    <div className="text-[11px] text-[#52525B]">{item.metricLabel12M}</div>
                    <div className="mt-1 break-all font-mono text-xs font-bold text-[#0A2540]">
                      {item.metric12MonthsPlaceholder}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Rodapé da Seção com CTA para Demonstração Técnica sob NDA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-6 sm:flex-row">
          <div>
            <h3 className="font-sans text-base font-bold text-[#131316]">
              Deseja avaliar uma arquitetura similar para o seu setor sob NDA?
            </h3>
            <p className="mt-1 text-xs text-[#52525B]">
              Apresentamos diagramas C4, contratos OpenAPI 3.1 e demonstrações funcionais
              diretamente com um engenheiro sênior.
            </p>
          </div>
          <WhatsAppContextualTrigger
            originSection="portfolio_nda"
            label="Solicitar Demonstração sob NDA"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
