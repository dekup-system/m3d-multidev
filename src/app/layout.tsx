import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.m3dmultidev.com.br"),
  title: {
    default: "M3D Multidev | Desenvolvimento de Software Sob Medida para Windows, Android, iOS e Web",
    template: "%s | M3D Multidev",
  },
  description:
    "M3D Multidev — Engenharia de software sob medida para Windows, dispositivos móveis (Android e iOS) e plataformas Web com IA integrada. Criadora dos sistemas DEKUP, NexIA Core e Kitefy.",
  keywords: [
    "M3D Multidev",
    "M3D Developer",
    "desenvolvimento de software sob medida",
    "sistemas sob medida Windows Android iOS Web",
    "empresa de desenvolvimento de software Brasil",
    "desenvolvimento de aplicativos Android e iOS",
    "software desktop Windows sob medida",
    "engenharia de software e inteligência artificial",
    "DEKUP",
    "NexIA Core",
    "Kitefy",
  ],
  authors: [{ name: "M3D Multidev", url: "https://www.m3dmultidev.com.br" }],
  creator: "M3D Multidev",
  publisher: "M3D Multidev",
  alternates: {
    canonical: "https://www.m3dmultidev.com.br/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.m3dmultidev.com.br",
    title: "M3D Multidev — Sistemas Sob Medida para Windows, Android, iOS e Web",
    description:
      "Onde ideias extraordinárias se tornam tecnologia inteligente. Engenharia de softwares sob medida integrando Windows, Android, iOS e plataformas Web.",
    siteName: "M3D Multidev",
    images: [
      {
        url: "/logo-m3d-original.png",
        width: 288,
        height: 288,
        alt: "M3D Multidev — Engenharia de Software Sob Medida",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "M3D Multidev — Sistemas Sob Medida para Windows, Android, iOS e Web",
    description:
      "Engenharia de softwares sob medida integrando Windows, dispositivos móveis (Android e iOS) e plataformas Web.",
    images: ["/logo-m3d-original.png"],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.m3dmultidev.com.br/#website",
      url: "https://www.m3dmultidev.com.br",
      name: "M3D Multidev",
      alternateName: ["M3D MultiDev", "M3D Developer"],
      inLanguage: "pt-BR",
      publisher: { "@id": "https://www.m3dmultidev.com.br/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://www.m3dmultidev.com.br/#organization",
      name: "M3D Multidev",
      alternateName: "M3D MultiDev",
      url: "https://www.m3dmultidev.com.br",
      logo: "https://www.m3dmultidev.com.br/logo-m3d-original.png",
      email: "suporte@m3dmultidev.com.br",
      description:
        "Desenvolvimento de sistemas integrados sob medida para Windows, dispositivos móveis (Android e iOS) e plataformas Web em nuvem.",
      knowsAbout: [
        "Desenvolvimento de Software Desktop Windows",
        "Desenvolvimento de Aplicativos Móveis Android e iOS",
        "Plataformas SaaS e Sistemas Web",
        "Inteligência Artificial Local e em Nuvem",
      ],
      sameAs: [
        "https://www.dekup.com.br",
        "https://www.nexiacore.com.br",
        "https://www.kitefy.com.br",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.m3dmultidev.com.br/#portfolio",
      name: "Sistemas Desenvolvidos pela M3D Multidev",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "DEKUP",
            url: "https://www.dekup.com.br/",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Windows",
            description:
              "Infraestrutura inteligente de pré-edição para eventos e videocasts com sincronização multicâmera e Assistente IA 100% local e offline.",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: "NexIA Core",
            url: "https://www.nexiacore.com.br/",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Windows 10/11",
            description:
              "Plataforma Windows para descoberta, topologia, auditoria de segurança e diagnóstico de rede com IA privada local.",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "WebApplication",
            name: "Kitefy",
            url: "https://www.kitefy.com.br/",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Estúdio web de marketing orgânico e artigos otimizados para buscadores e IAs (GEO).",
          },
        },
      ],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
