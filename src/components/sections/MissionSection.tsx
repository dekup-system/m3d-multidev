import React from "react";
import { Compass, CalendarCheck, Unlock, Sparkles } from "lucide-react";

const PILLARS = [
  {
    title: "Entregas Claras e Sem Surpresas",
    description:
      "Você acompanha a evolução do projeto em etapas visíveis e testáveis, com prazos bem definidos desde o início.",
    icon: CalendarCheck,
  },
  {
    title: "Qualidade e Estabilidade",
    description:
      "Sistemas rápidos, fáceis de usar pela sua equipe e testados antes de cada atualização para não travar o seu dia a dia.",
    icon: Sparkles,
  },
  {
    title: "Liberdade e Evolução Contínua",
    description:
      "O software cresce junto com a sua empresa. Você tem total autonomia sobre o projeto e conta com nosso suporte para novas funções.",
    icon: Unlock,
  },
];

export function MissionSection() {
  return (
    <section
      id="missao"
      aria-labelledby="heading-missao"
      className="border-t border-[#E4E4E7] bg-[#FAFAFA] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            Nosso Compromisso
          </span>
          <h2
            id="heading-missao"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Tecnologia pensada para simplificar o seu negócio
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bento-card p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] text-[#008CDD]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-sans text-lg font-bold text-[#131316]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
