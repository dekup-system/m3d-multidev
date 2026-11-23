import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "M3D Multidev | Engenharia de Multi-Sistemas Windows, Android e Web",
  description:
    "Desenvolvimento de sistemas integrados sob medida para Windows (ERP, PDV, automação local), Android (coleta em campo Offline-First) e Web (painéis em nuvem e APIs). Propriedade do código (Lei 9.609/98), LGPD Art. 46 e SLA 99,9%.",
  keywords: [
    "M3D Multidev",
    "desenvolvimento de software sob medida",
    "sistemas integrados Windows Android Web",
    "automação comercial e industrial Windows",
    "aplicativo Android offline-first B2B",
    "modernização de sistemas legados",
    "engenharia de software B2B Brasil",
  ],
  authors: [{ name: "M3D Multidev" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "M3D Multidev — Sistemas Integrados Windows, Android e Web Sob Medida",
    description:
      "Conectamos operação desktop, campo móvel e gestão em nuvem em um único fluxo contínuo sem retrabalho ou planilhas paralelas.",
    siteName: "M3D Multidev",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-[#FAFAFA] font-sans text-[#131316] antialiased selection:bg-[#008CDD]/15 selection:text-[#0A2540]">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-[#131316] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-white"
        >
          Pular para o conteúdo principal
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
