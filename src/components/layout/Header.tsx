"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoNavbar } from "@/components/brand/LogoNavbar";
import { WhatsAppContextualTrigger } from "@/components/conversion/WhatsAppContextualTrigger";

const NAV_LINKS = [
  { href: "#multi-sistemas", label: "Multi-Sistemas" },
  { href: "#fluxo-integrado", label: "Fluxo Integrado" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#seguranca-sla", label: "Segurança & SLA" },
  { href: "#missao", label: "Missão" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E4E7] bg-[#FAFAFA]/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <LogoNavbar />

        {/* Navegação Desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-[#52525B] transition-colors hover:text-[#131316]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Header Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <WhatsAppContextualTrigger
            originSection="navbar_header"
            label="Diagnóstico no WhatsApp"
            variant="compact"
          />
        </div>

        {/* Botão Menu Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          className="inline-flex items-center justify-center rounded-xl border border-[#E4E4E7] bg-white p-2 text-[#131316] lg:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menu Mobile Expandido (Sem botões flutuantes que cubram CTAs) */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E4E4E7] bg-white px-4 pt-3 pb-6 lg:hidden">
          <nav aria-label="Menu mobile" className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-sans text-sm font-medium text-[#131316] hover:bg-[#F7F7F8]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border-t border-[#E4E4E7] pt-4">
            <WhatsAppContextualTrigger
              originSection="navbar_mobile"
              label="Falar com Engenheiro no WhatsApp"
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
