import React from "react";
import {
  ShieldCheck,
  Lock,
  FileKey2,
  Scale,
  ServerCrash,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

const SLA_RESPONSE_MATRIX = [
  {
    severity: "P1 · Crítico",
    scenario: "Indisponibilidade total de produção ou bloqueio severo de faturamento/operação",
    responseTime: "Até 15 min",
    resolutionTarget: "Até 4 horas",
    channel: "Plantão Direto + War Room",
  },
  {
    severity: "P2 · Alto",
    scenario: "Degradação relevante em um dos nós (Windows, Android ou Web) sem parada total",
    responseTime: "Até 1 hora",
    resolutionTarget: "Até 8 horas",
    channel: "Canal Prioritário Engenharia",
  },
  {
    severity: "P3 · Médio",
    scenario: "Anomalia funcional com solução de contorno (workaround) operacional ativo",
    responseTime: "Até 4 horas",
    resolutionTarget: "Até 24 horas",
    channel: "Service Desk Técnico",
  },
  {
    severity: "P4 · Baixo",
    scenario: "Dúvidas técnicas, ajustes cosméticos ou solicitações evolutivas planejadas",
    responseTime: "Até 8 horas",
    resolutionTarget: "Até 72 horas",
    channel: "Backlog Evolutivo",
  },
];

const VULNERABILITY_SLA = [
  {
    cvss: "Crítica (CVSS 9.0 – 10.0)",
    window: "24 a 48 horas",
    action: "Hotfix imediato, rotação de segredos e mitigação WAF/Edge",
  },
  {
    cvss: "Alta (CVSS 7.0 – 8.9)",
    window: "Até 7 dias corridos",
    action: "Patch prioritário validado em suite SAST/DAST",
  },
  {
    cvss: "Média (CVSS 4.0 – 6.9)",
    window: "Até 30 dias corridos",
    action: "Correção programada na release quinzenal + atualização SBOM",
  },
];

export function SecuritySlaSection() {
  return (
    <section
      id="seguranca-sla"
      aria-labelledby="heading-seguranca-sla"
      className="border-t border-[#E4E4E7] bg-[#FBFBFA] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Segurança da Informação, Compliance Jurídico & SLA
          </span>
          <h2
            id="heading-seguranca-sla"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Rigor OWASP multiplataforma, propriedade intelectual garantida em contrato e SLA transparente.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#52525B]">
            Projetamos sistemas para passar pelo escrutínio de diretorias de TI, equipes de
            Segurança da Informação (AppSec/SecOps) e departamentos jurídicos corporativos.
          </p>
        </div>

        {/* Grid 4 Pilares de Segurança & Compliance */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1. OWASP Multiplataforma & DevSecOps */}
          <div className="bento-card p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#008CDD] uppercase">
                01 · APPSec & OWASP MULTIPLATAFORMA
              </span>
              <ShieldCheck className="h-5 w-5 text-[#008CDD]" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-sans text-xl font-bold text-[#131316]">
              Verificação de Segurança em Web, Android e Windows
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#52525B]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Web & APIs:</strong> Conformidade com{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    OWASP Top 10:2025
                  </code>
                  ,{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    ASVS 5.0
                  </code>{" "}
                  e{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    API Security Top 10
                  </code>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Android Mobile:</strong> Hardening e
                  verificação segundo{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    OWASP MASVS
                  </code>{" "}
                  e{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    MASTG
                  </code>{" "}
                  (proteção de armazenamento local, Keystore e comunicação).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Windows Desktop:</strong> Diretrizes{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    OWASP TCASVS
                  </code>{" "}
                  e{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    Desktop App Security Top 10
                  </code>{" "}
                  (além de isolamento de contexto em runtimes híbridos quando aplicável).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Pipeline SAST/DAST & SBOM:</strong>{" "}
                  Varredura estática/dinâmica automatizada e emissão de inventário de
                  dependências em padrão{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    CycloneDX
                  </code>
                  .
                </span>
              </li>
            </ul>
          </div>

          {/* 2. Criptografia Moderna & Autenticação */}
          <div className="bento-card p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#008CDD] uppercase">
                02 · CRIPTOGRAFIA & IDENTIDADE
              </span>
              <FileKey2 className="h-5 w-5 text-[#008CDD]" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-sans text-xl font-bold text-[#131316]">
              Proteção Criptográfica em Trânsito e em Repouso
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#52525B]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Em Trânsito:</strong> Exclusivamente{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    TLS 1.3
                  </code>{" "}
                  com cifras autenticadas{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    AEAD AES-GCM
                  </code>{" "}
                  e{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    ChaCha20-Poly1305
                  </code>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Em Repouso:</strong> Criptografia de
                  volumes, backups e bancos locais móveis com{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    AES-256-GCM
                  </code>{" "}
                  e gerenciamento seguro de chaves (KMS / DPAPI / Android Keystore).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Autenticação & Credenciais:</strong>{" "}
                  Hashing de senhas com{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    Argon2id
                  </code>{" "}
                  alinhado à norma{" "}
                  <code className="rounded bg-[#F7F7F8] px-1 font-mono text-[#0A2540]">
                    NIST SP 800-63B
                  </code>
                  , suporte a MFA e SSO corporativo (OIDC / SAML 2.0).
                </span>
              </li>
            </ul>
          </div>

          {/* 3. LGPD (Lei nº 13.709/2018) */}
          <div className="bento-card p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#008CDD] uppercase">
                03 · PRIVACIDADE & LGPD (LEI Nº 13.709/2018)
              </span>
              <Lock className="h-5 w-5 text-[#008CDD]" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-sans text-xl font-bold text-[#131316]">
              Privacy by Design desde a Concepção (Art. 46)
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
              Adotamos medidas técnicas e administrativas aptas a proteger os dados
              pessoais contra acessos não autorizados desde a fase de modelagem do banco:
            </p>
            <ul className="mt-3 space-y-2 text-xs text-[#52525B]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Minimização e Finalidade:</strong>{" "}
                  Coleta restrita ao estritamente necessário para a finalidade operacional.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Logs de Auditoria Imutáveis:</strong>{" "}
                  Trilha de quem acessou ou alterou registros críticos com retenção
                  configurável.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]" aria-hidden="true" />
                <span>
                  <strong className="text-[#131316]">Controlador vs. Operador:</strong>{" "}
                  Delimitação contratual cristalina de responsabilidades e DPA (Data
                  Processing Agreement).
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Propriedade Intelectual (Lei do Software nº 9.609/1998, Art. 4º) */}
          <div className="bento-card p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#008CDD] uppercase">
                04 · PROPRIEDADE INTELECTUAL (LEI Nº 9.609/1998)
              </span>
              <Scale className="h-5 w-5 text-[#008CDD]" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-sans text-xl font-bold text-[#131316]">
              O Código Desenvolvido Sob Encomenda Pertence à Sua Empresa
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
              Em conformidade estrita com o{" "}
              <strong className="text-[#131316]">Art. 4º da Lei nº 9.609/1998</strong>{" "}
              (Lei do Software), nossos contratos de desenvolvimento sob encomenda
              formalizam por escrito a{" "}
              <strong className="text-[#131316]">
                cessão integral dos direitos patrimoniais
              </strong>{" "}
              sobre o código-fonte específico, documentação técnica e artefatos gerados
              para o cliente contratante.
            </p>
            <div className="mt-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3 font-mono text-[11px] text-[#0A2540]">
              ✓ Cessão Patrimonial Escrita · ✓ Repositório Git Dedicado · ✓ Zero Royalties Ocultos
            </div>
          </div>
        </div>

        {/* Matriz SLA Transparente */}
        <div className="mt-12 rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E4E4E7] pb-6 lg:flex-row lg:items-center">
            <div>
              <span className="font-mono text-xs font-semibold text-[#008CDD] uppercase">
                ACORDO DE NÍVEL DE SERVIÇO (SLA) AUDITÁVEL
              </span>
              <h3 className="mt-1 font-sans text-2xl font-bold text-[#131316]">
                Matriz de Disponibilidade, Resposta a Incidentes e Remediação
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] px-4 py-2.5">
                <div className="font-mono text-[10px] text-[#52525B] uppercase">
                  SLA Padrão Empresarial
                </div>
                <div className="font-mono text-sm font-bold text-[#131316]">
                  99,9%{" "}
                  <span className="text-xs font-normal text-[#52525B]">
                    (máx. 43,8 min/mês)
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-[#008CDD]/30 bg-[#008CDD]/8 px-4 py-2.5">
                <div className="font-mono text-[10px] text-[#008CDD] uppercase">
                  SLA Missão Crítica (Opcional)
                </div>
                <div className="font-mono text-sm font-bold text-[#0A2540]">
                  99,99%{" "}
                  <span className="text-xs font-normal text-[#52525B]">
                    (Alta Disponibilidade Multi-AZ)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Tempos de Resposta e Resolução (P1 a P4) */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[#E4E4E7] font-mono text-[11px] text-[#52525B] uppercase">
                  <th className="py-3 pr-4">Severidade</th>
                  <th className="py-3 px-4">Escopo do Incidente</th>
                  <th className="py-3 px-4">Tempo de Resposta</th>
                  <th className="py-3 px-4">Meta de Resolução / Contorno</th>
                  <th className="py-3 pl-4">Canal de Atendimento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4E7]">
                {SLA_RESPONSE_MATRIX.map((row) => (
                  <tr key={row.severity} className="hover:bg-[#FAFAFA]">
                    <td className="py-3.5 pr-4 font-mono font-bold text-[#131316]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                        {row.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#52525B]">{row.scenario}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#0A2540]">
                      {row.responseTime}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#131316]">
                      {row.resolutionTarget}
                    </td>
                    <td className="py-3.5 pl-4 font-mono text-[#52525B]">{row.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Janelas de Remediação de Vulnerabilidades */}
          <div className="mt-8 border-t border-[#E4E4E7] pt-6">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#131316] uppercase">
              <AlertTriangle className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
              <span>SLA de Remediação de Vulnerabilidades de Segurança (AppSec / CVE)</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {VULNERABILITY_SLA.map((v) => (
                <div
                  key={v.cvss}
                  className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4"
                >
                  <div className="font-mono text-xs font-bold text-[#131316]">
                    {v.cvss}
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-[#008CDD]">
                    Janela: {v.window}
                  </div>
                  <p className="mt-1.5 text-xs text-[#52525B]">{v.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA de Governança */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5 text-xs text-[#52525B]">
              <ServerCrash className="h-4 w-4 shrink-0 text-[#008CDD]" aria-hidden="true" />
              <span>
                Precisa de minuta contratual de SLA ou questionário de due diligence de
                segurança preenchido?
              </span>
            </div>
            <WhatsAppContextualTrigger
              originSection="sla_compliance"
              label="Solicitar Minuta Técnica & SLA"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySlaSection;
