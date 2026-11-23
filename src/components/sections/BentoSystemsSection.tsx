"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Monitor,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  Database,
  WifiOff,
  Workflow,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

/**
 * BentoSystemsSection — Bento Grid Assimétrico de Engenharia Multiplataforma:
 * Detalha o escopo sob medida para Windows, Android, Web e Modernização/Integração de Sistemas Legados.
 */
export function BentoSystemsSection() {
  return (
    <section
      id="multi-sistemas"
      aria-labelledby="heading-multi-sistemas"
      className="border-t border-[#E4E4E7] bg-[#FAFAFA] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Engenharia Multiplataforma Sob Medida
            </span>
            <h2
              id="heading-multi-sistemas"
              className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
            >
              Um único parceiro de engenharia para desktop, campo e nuvem.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#52525B]">
            Eliminamos a fragmentação entre fornecedores de app, software desktop e
            consultorias web. Projetamos contratos de dados unificados ponta a ponta.
          </p>
        </div>

        {/* Bento Grid Assimétrico (12 colunas no Desktop) */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Windows Desktop & Automação Local (7 colunas) */}
          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="bento-card flex flex-col justify-between p-7 lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#F7F7F8] px-3 py-1 font-mono text-xs font-semibold text-[#131316]">
                  <Monitor className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  WINDOWS · DESKTOP & AUTOMAÇÃO LOCAL
                </span>
                <span className="font-mono text-xs text-[#52525B]">
                  .NET / C# · Rust / Tauri · Win32 / Services
                </span>
              </div>

              <h3 className="mt-5 font-sans text-2xl font-bold tracking-tight text-[#131316]">
                Sistemas Windows de Missão Crítica, ERPs, PDVs e Periféricos
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                Onde navegadores comuns não alcançam: comunicação direta de baixa latência
                com portas seriais (RS-232/RS-485), USB HID, balanças industriais,
                impressoras térmicas fiscais, leitores biométricos e execução resiliente em
                segundo plano (Windows Services).
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Comunicação nativa com CLPs, balanças e periféricos USB/Serial",
                  "Operação local autônoma mesmo durante quedas de link WAN",
                  "Instaladores assinados digitalmente (Code Signing) e auto-update seguro",
                  "Hardening segundo OWASP Desktop App Security Top 10 & TCASVS",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-3 text-xs text-[#131316]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E4E4E7] pt-5">
              <div className="flex items-center gap-2 font-mono text-xs text-[#52525B]">
                <Cpu className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                <span>Latência I/O local &lt; 2 ms · Fila SQLite/PostgreSQL local</span>
              </div>
              <WhatsAppContextualTrigger
                originSection="bento_windows"
                label="Consultar Projeto Windows"
                defaultPlatform="Windows (Desktop / ERP / Automação)"
                variant="outline"
              />
            </div>
          </motion.article>

          {/* Card 2: Android Mobile & Campo Offline-First (5 colunas) */}
          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="bento-card flex flex-col justify-between p-7 lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#F7F7F8] px-3 py-1 font-mono text-xs font-semibold text-[#131316]">
                  <Smartphone className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  ANDROID · CAMPO & FORÇA DE VENDAS
                </span>
                <span className="font-mono text-xs text-[#008CDD]">Offline-First</span>
              </div>

              <h3 className="mt-5 font-sans text-2xl font-bold tracking-tight text-[#131316]">
                Aplicativos Android Corporativos e Coletores Industriais
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                Projetados para equipes em campo, logística, agronegócio, vistoria técnica
                e chão de fábrica. Sincronia bidirecional inteligente com resolução de
                conflitos quando o sinal 4G/5G ou Wi-Fi retorna.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-[#52525B]">
                {[
                  "Kotlin Nativo / Jetpack Compose e integração com SDKs Zebra/Honeywell",
                  "Persistência local criptografada (SQLCipher / Android Keystore)",
                  "Leitura óptica de alta velocidade (Barcode, QR Code, NFC, OCR)",
                  "Conformidade com OWASP MASVS & MASTG (anti-tampering e TLS Pinning)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <WifiOff
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-[#E4E4E7] pt-5">
              <WhatsAppContextualTrigger
                originSection="bento_android"
                label="Consultar App Android"
                defaultPlatform="Android (Mobile / Coleta Offline-First)"
                variant="outline"
              />
            </div>
          </motion.article>

          {/* Card 3: Web Cloud & Comando Gerencial (5 colunas) */}
          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="bento-card flex flex-col justify-between p-7 lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#F7F7F8] px-3 py-1 font-mono text-xs font-semibold text-[#131316]">
                  <Globe className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                  WEB · NUVEM & CENTRO DE COMANDO
                </span>
                <span className="font-mono text-xs text-[#52525B]">OpenAPI 3.1</span>
              </div>

              <h3 className="mt-5 font-sans text-2xl font-bold tracking-tight text-[#131316]">
                Portais B2B, Dashboards Executivos e Backends de Alta Escala
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                Centralize a governança da operação em tempo real. Painéis web responsivos,
                controle de acesso granular (RBAC/ABAC), relatórios auditáveis e APIs
                documentadas para parceiros.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-[#52525B]">
                {[
                  "Arquitetura moderna Next.js / React 19 / TypeScript Strict",
                  "APIs REST & GraphQL com validação estrita de schema e rate-limiting",
                  "Filas assíncronas, Webhooks assinados (HMAC-SHA256) e multi-tenancy",
                  "Proteção OWASP Top 10:2025 e API Security Top 10",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Database
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-[#E4E4E7] pt-5">
              <WhatsAppContextualTrigger
                originSection="bento_web"
                label="Consultar Plataforma Web"
                defaultPlatform="Web (Nuvem / Painel & APIs)"
                variant="outline"
              />
            </div>
          </motion.article>

          {/* Card 4: Modernização & Integração de Sistemas Legados (7 colunas) */}
          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="bento-card flex flex-col justify-between bg-linear-to-br from-white via-white to-[#F4F8FB] p-7 lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#008CDD]/30 bg-[#008CDD]/10 px-3 py-1 font-mono text-xs font-semibold text-[#008CDD]">
                  <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
                  MODERNIZAÇÃO & INTEGRAÇÃO DE LEGADOS
                </span>
                <span className="font-mono text-xs text-[#0A2540]">
                  Strangler Fig Pattern · Zero Downtime
                </span>
              </div>

              <h3 className="mt-5 font-sans text-2xl font-bold tracking-tight text-[#131316]">
                Evolua seu ERP ou Sistema Legado sem Paralisar a Operação
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                Sua operação depende de bancos de dados antigos, sistemas Delphi/VB6/FoxPro
                ou ERPs fechados? Construímos camadas de integração seguras (conectores,
                APIs de fachada e sincronizadores bidirecionais) para acoplar novos apps
                Android e portais Web com transição gradual e risco controlado.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E4E4E7] bg-white p-3.5">
                  <div className="font-mono text-xs font-bold text-[#0A2540]">
                    01. Diagnóstico & ADRs
                  </div>
                  <p className="mt-1 text-xs text-[#52525B]">
                    Mapeamento de banco, gargalos e contratos de API sem impacto em produção.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E4E4E7] bg-white p-3.5">
                  <div className="font-mono text-xs font-bold text-[#0A2540]">
                    02. Ponte Bidirecional
                  </div>
                  <p className="mt-1 text-xs text-[#52525B]">
                    Agentes locais Windows sincronizando dados legados com Android e Web.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E4E4E7] bg-white p-3.5">
                  <div className="font-mono text-xs font-bold text-[#0A2540]">
                    03. Migração Progressiva
                  </div>
                  <p className="mt-1 text-xs text-[#52525B]">
                    Substituição modular por microsserviços ou monólito modular documentado.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E4E4E7] pt-5">
              <div className="flex items-center gap-2 font-mono text-xs text-[#0A2540]">
                <Terminal className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                <span>Compatível com SQL Server, Oracle, Firebird, PostgreSQL e REST/SOAP</span>
              </div>
              <WhatsAppContextualTrigger
                originSection="bento_legado"
                label="Avaliar Modernização de Legado"
                defaultPlatform="Windows + Android + Web (Integração Completa)"
                defaultScope="Modernização de Sistema Legado"
                variant="primary"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default BentoSystemsSection;
