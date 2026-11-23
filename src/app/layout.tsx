import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "M3D Multidev | Sistemas Sob Medida para Windows, Android, iOS e Web",
  description:
    "Onde ideias extraordinárias se tornam tecnologia inteligente. Desenvolvimento de sistemas integrados sob medida para Windows, dispositivos móveis (Android e iOS) e Web.",
  keywords: [
    "M3D Multidev",
    "desenvolvimento de software sob medida",
    "sistemas integrados Windows Android iOS Web",
    "aplicativos móveis Android e iOS",
    "engenharia de software Brasil",
  ],
  authors: [{ name: "M3D Multidev" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "M3D Multidev — Onde ideias extraordinárias se tornam tecnologia inteligente",
    description:
      "Engenharia de softwares sob medida integrando Windows, dispositivos móveis (Android e iOS) e plataformas Web.",
    siteName: "M3D Multidev",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F7F6",
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
      <body className="bg-[#F7F7F6] font-sans text-[#131316] antialiased selection:bg-[#008CDD]/15 selection:text-[#0A2540]">
        {children}
      </body>
    </html>
  );
}
