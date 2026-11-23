import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, FileText } from "lucide-react";
import { LogoNavbar } from "@/components/brand/LogoNavbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade e Conformidade LGPD | M3D Multidev",
  description:
    "Política de Privacidade, Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD) e Termos de Confidencialidade no atendimento técnico da M3D Multidev.",
};

export default function PrivacidadePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#FAFAFA] text-[#131316]">
      <header className="sticky top-0 z-50 border-b border-[#E4E4E7] bg-[#FAFAFA]/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <LogoNavbar href="/" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-4 py-2 font-sans text-xs font-semibold text-[#131316] hover:border-[#008CDD] hover:text-[#008CDD]"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
            <span>Voltar ao Site</span>
          </Link>
        </div>
      </header>

      <main id="conteudo-principal" className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E4E4E7] bg-white p-8 shadow-xs sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold text-[#008CDD] uppercase">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Conformidade LGPD · Lei nº 13.709/2018
          </div>

          <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl">
            Política de Privacidade e Proteção de Dados
          </h1>

          <p className="mt-3 font-mono text-xs text-[#52525B]">
            Última atualização: Novembro de 2026 · Aplicação: Site Institucional e Canal de
            Diagnóstico Técnico via WhatsApp Business da M3D Multidev.
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#52525B]">
            <section>
              <h2 className="flex items-center gap-2 font-sans text-lg font-bold text-[#131316]">
                <Lock className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                1. Compromisso de Privacy by Design (Art. 46 da LGPD)
              </h2>
              <p className="mt-2">
                A <strong className="text-[#131316]">M3D Multidev</strong> adota o princípio de
                minimização de dados desde a concepção de seus sistemas e de seu próprio
                site institucional. Este site não exige o preenchimento de formulários com
                dados pessoais sensíveis para que você compreenda nossa arquitetura ou
                inicie contato técnico.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 font-sans text-lg font-bold text-[#131316]">
                <FileText className="h-4 w-4 text-[#008CDD]" aria-hidden="true" />
                2. Telemetria Não-PII (GA4 / Google Tag Manager)
              </h2>
              <p className="mt-2">
                Quando você utiliza nosso micro-qualificador de escopo (plataformas Windows,
                Android ou Web, natureza do projeto e prazo alvo), registramos em nossa
                camada de telemetria (<code className="font-mono text-[#0A2540]">dataLayer</code>)
                exclusivamente metadados técnicos agregados e anônimos:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 font-mono text-xs text-[#131316]">
                <li>origin_section (seção da página onde ocorreu o clique)</li>
                <li>selected_platforms (plataformas técnicas selecionadas)</li>
                <li>project_scope (novo sistema, modernização ou integração)</li>
                <li>utm_source / utm_medium / utm_campaign (atribuição de campanha)</li>
              </ul>
              <p className="mt-2">
                Nenhum nome, CPF, e-mail, número de telefone ou conteúdo digitado é
                capturado ou enviado para ferramentas de analytics antes do redirecionamento
                voluntário ao WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-bold text-[#131316]">
                3. Atendimento via WhatsApp Business e Consentimento
              </h2>
              <p className="mt-2">
                Ao clicar voluntariamente nos botões de contato via WhatsApp, você é
                direcionado ao aplicativo oficial do WhatsApp com uma mensagem técnica
                pré-preenchida que você pode revisar ou editar antes de enviar. Os dados de
                contato compartilhados nessa conversa são utilizados estritamente para:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Realizar o diagnóstico de engenharia e elaborar propostas técnicas/comerciais
                  (execução de procedimentos preliminares a contrato — Art. 7º, V da LGPD);
                </li>
                <li>
                  Formalizar Acordos de Confidencialidade (NDA) antes do compartilhamento de
                  especificações sensíveis;
                </li>
                <li>
                  <strong className="text-[#131316]">Garantia Anti-Spam:</strong> Nunca
                  incluímos seu número de telefone em listas de transmissão automatizadas ou
                  campanhas de marketing sem o seu consentimento livre, informado e
                  inequívoco.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-sans text-lg font-bold text-[#131316]">
                4. Direitos do Titular (Art. 18 da LGPD)
              </h2>
              <p className="mt-2">
                A qualquer momento, você pode solicitar a confirmação da existência de
                tratamento, acesso, correção ou eliminação de seus dados de contato de nosso
                registro comercial diretamente pelo nosso canal oficial de atendimento
                durante o horário comercial (Segunda a Sexta, das 08h30 às 18h00 BRT).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
