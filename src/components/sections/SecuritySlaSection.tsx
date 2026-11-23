import React from "react";
import { ShieldCheck, Lock, Scale, Clock } from "lucide-react";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

const GUARANTEES = [
  {
    title: "Segurança de Ponta a Ponta",
    description:
      "Seus dados e os de seus clientes trafegam protegidos por criptografia moderna e backups seguros no Windows, Android e Web.",
    icon: ShieldCheck,
  },
  {
    title: "Adequação à LGPD",
    description:
      "Sistemas construídos respeitando a privacidade de dados (Lei nº 13.709/2018), com controle de acesso e histórico de operações.",
    icon: Lock,
  },
  {
    title: "O Código Pertence à Sua Empresa",
    description:
      "Garantimos em contrato a titularidade do software desenvolvido sob encomenda para o seu negócio, sem taxas ocultas.",
    icon: Scale,
  },
  {
    title: "Alta Disponibilidade & Suporte Ágil",
    description:
      "Meta de 99,9% de disponibilidade e atendimento prioritário para manter sua operação sempre rodando com tranquilidade.",
    icon: Clock,
  },
];

export function SecuritySlaSection() {
  return (
    <section
      id="seguranca-sla"
      aria-labelledby="heading-seguranca-sla"
      className="border-t border-[#E4E4E7] bg-[#FBFBFA] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#008CDD]/25 bg-[#008CDD]/8 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#008CDD] uppercase">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Segurança & Garantias
          </span>
          <h2
            id="heading-seguranca-sla"
            className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#131316] sm:text-4xl"
          >
            Tranquilidade jurídica, proteção de dados e suporte próximo
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bento-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] text-[#008CDD]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-[#131316]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-6 sm:flex-row">
          <div>
            <h3 className="font-sans text-base font-bold text-[#131316]">
              Pronto para conversar sobre o seu sistema?
            </h3>
            <p className="mt-1 text-sm text-[#52525B]">
              Fale conosco pelo WhatsApp e tire suas dúvidas sem compromisso.
            </p>
          </div>
          <WhatsAppContextualTrigger
            originSection="sla_compliance"
            label="Falar com Especialista"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

export default SecuritySlaSection;
