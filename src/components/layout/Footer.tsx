import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Rodapé institucional M3D Multidev"
      className="border-t border-[#E4E4E7] bg-white py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#131316]/15 bg-[#131316] p-1.5">
              <Image
                src="/logo-m3d-original.png"
                alt="Logo M3D Multidev"
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="font-sans text-lg font-bold tracking-tight text-[#131316]">
                M3D Multidev
              </span>
              <p className="text-xs text-[#52525B]">
                Desenvolvimento de sistemas sob medida para Windows, Android e Web.
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-[#52525B]">
                <Clock className="h-3.5 w-3.5 text-[#008CDD]" aria-hidden="true" />
                <span>Seg–Sex, 08h30 às 18h00</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppContextualTrigger
              originSection="footer_cta"
              label="Falar no WhatsApp"
              variant="primary"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#E4E4E7] pt-6 text-xs text-[#71717A] sm:flex-row">
          <p>© {currentYear} M3D Multidev. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#portfolio" className="hover:text-[#131316]">
              Portfólio
            </a>
            <Link href="/privacidade" className="underline hover:text-[#131316]">
              Política de Privacidade (LGPD)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
