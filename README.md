# M3D Multidev — Site Institucional & Landing Page B2B

Site institucional e landing page de alta conversão da **M3D Multidev**, especializada no desenvolvimento de multi-sistemas sob medida integrando **Windows (Desktop/Automação)**, **Android (Mobile/Campo Offline-First)** e **Web (Nuvem/Comando & APIs)**.

## Arquitetura & Stack Técnica

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (`strict: true`)
- **Design System (Light Mode):** Tailwind CSS v4 (`#FAFAFA` / `#FFFFFF` / `#F7F7F8`, grafite `#131316`, ardósia `#0A2540` e acento único azul elétrico `#008CDD`), tipografia **Geist Sans** + **Geist Mono**
- **Gráficos 3D & Coreografia:**
  - Three.js + React Three Fiber v9 (`@react-three/fiber`) + `@react-three/drei`
  - Cubo M3D procedural (`RoundedBox` + `MeshPhysicalMaterial` + `Environment` + `ContactShadows`)
  - Orçamento GPU protegido: `frameloop="demand"`, pausa via `IntersectionObserver` e `visibilitychange`, degradação automática de DPR via `PerformanceMonitor`, carregamento dinâmico (`ssr: false`) com placeholder imediato `LogoFullSVG`
  - Dutos vetoriais animados em azul elétrico com **GSAP (`ScrollTrigger` + `DrawSVGPlugin`)**, rolagem suave via **Lenis** e microinterações com **Motion**
  - Respeito integral a `prefers-reduced-motion: reduce` e controle acessível de pausa (WCAG 2.2 AA)
- **Conversão B2B & Compliance:**
  - `WhatsAppContextualTrigger` com micro-qualificador de 3 cliques (Zero PII)
  - Telemetria `dataLayer` (GA4/GTM) estritamente sem dados pessoais sensíveis
  - Seções de Segurança (OWASP Top 10:2025, ASVS 5.0, MASVS/MASTG, TCASVS, TLS 1.3, AES-256-GCM, Argon2id), LGPD (Lei nº 13.709/2018 Art. 46), Propriedade Intelectual (Lei nº 9.609/1998 Art. 4º) e Matriz SLA transparente (99,9% / 99,99%)

## Variáveis de Ambiente (Vercel)

Configure na Vercel (opcional):

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

## Comandos

```bash
npm install --legacy-peer-deps
npm run typecheck
npm run build
npm run dev
```
