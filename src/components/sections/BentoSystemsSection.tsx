"use client";

import React from "react";
import {
  Monitor,
  Smartphone,
  Globe,
  Workflow,
  Layers,
  CheckCircle2,
} from "lucide-react";

const SOLUTIONS = [
  {
    title: "Sistemas para Windows",
    tag: "DESKTOP & AUTOMAÇÃO",
    description:
      "Programas rápidos instalados direto no computador para frente de caixa, controle de produção e integração com balanças, impressoras e equipamentos.",
    points: [
      "Alta velocidade no uso diário",
      "Integração com periféricos USB e Seriais",
      "Continua operando mesmo sem internet",
    ],
    icon: Monitor,
  },
  {
    title: "Aplicativos Android",
    tag: "MOBILE & CAMPO",
    description:
      "Apps sob medida para equipes comerciais, entregas, vistorias e coletores de dados, com sincronização inteligente.",
    points: [
      "Funciona online e offline",
      "Leitura de QR Code, código de barras e câmera",
      "Interface simples e fácil de usar em campo",
    ],
    icon: Smartphone,
  },
  {
    title: "Plataformas e Portais Web",
    tag: "NUVEM & GESTÃO",
    description:
      "Painéis administrativos modernos, sistemas SaaS e portais de clientes acessíveis de qualquer navegador com segurança.",
    points: [
      "Relatórios e indicadores em tempo real",
      "Controle de acessos por perfil de usuário",
      "Visual limpo adaptado para computador e celular",
    ],
    icon: Globe,
  },
  {
    title: "Integração e Modernização",
    tag: "CONEXÃO ENTRE SISTEMAS",
    description:
      "Conectamos o sistema que você já usa hoje a novos aplicativos ou portais web, sem precisar parar sua empresa.",
    points: [
      "Fim da redigitação e das planilhas soltas",
      "Evolução gradual do seu sistema atual",
      "APIs seguras para conectar parceiros e ERPs",
    ],
    icon: Workflow,
  },
];

export function BentoSystemsSection() {
  return (
    <section
      id="multi-sistemas"
      aria-labelledby="heading-multi-sistemas"
      className="border-t border-[#E4E4E7] bg-[#FAFAFA] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            O Que Desenvolvemos
          </span>
          <h2
            id="heading-multi-sistemas"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Soluções sob medida para a sua operação
          </h2>
          <p className="mt-3 text-base text-[#52525B]">
            Um único time cuidando do seu software do início ao fim, no desktop, no celular
            e na web.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SOLUTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="bento-card flex flex-col justify-between p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#008CDD]">
                      {item.tag}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] text-[#131316]">
                      <Icon className="h-5 w-5 text-[#008CDD]" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-sans text-xl font-bold text-[#131316]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                    {item.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 border-t border-[#E4E4E7] pt-4">
                  {item.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-2 text-xs font-medium text-[#131316]"
                    >
                      <CheckCircle2
                        className="h-3.5 w-3.5 shrink-0 text-[#008CDD]"
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BentoSystemsSection;
