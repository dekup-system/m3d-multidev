/**
 * Telemetria GA4 / GTM e Construção de URL WhatsApp Business compatível com a LGPD.
 * - NENHUM dado pessoal sensível (PII) é coletado ou enviado ao dataLayer.
 * - Utiliza https://api.whatsapp.com/send?phone=...&text=... com encodeURIComponent
 *   para preservar acentuação em português em desktop e mobile.
 */

export type PlatformChoice =
  | "Windows + Android + Web (Integração Completa)"
  | "Windows (Desktop / ERP / Automação)"
  | "Android (Mobile / Coleta Offline-First)"
  | "Web (Nuvem / Painel & APIs)";

export type ScopeChoice =
  | "Novo Sistema Sob Medida"
  | "Modernização de Sistema Legado"
  | "Integração entre Plataformas / APIs";

export type TimelineChoice =
  | "Imediato (Urgência Operacional)"
  | "1 a 3 meses"
  | "Planejamento Arquitetural";

export interface WhatsAppLeadMetadata {
  origin_section: string;
  selected_platforms: PlatformChoice;
  project_scope: ScopeChoice;
  target_timeline?: TimelineChoice;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Número configurável via variável de ambiente NEXT_PUBLIC_WHATSAPP_NUMBER
 * ou fallback explícito pronto para configuração em produção na Vercel.
 */
export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";

export function getUtmParams(): {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
} {
  if (typeof window === "undefined") {
    return {
      utm_source: "direct",
      utm_medium: "landing_page",
      utm_campaign: "m3d_b2b",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "landing_page",
    utm_campaign: params.get("utm_campaign") || "m3d_b2b",
  };
}

/**
 * Dispara evento `generate_lead` e `whatsapp_click` no `window.dataLayer` (GTM / GA4)
 * contendo estritamente metadados técnicos não-PII (LGPD Art. 6º — minimização).
 */
export function trackWhatsAppConversion(metadata: WhatsAppLeadMetadata): void {
  if (typeof window === "undefined") return;

  const utms = getUtmParams();
  window.dataLayer = window.dataLayer || [];

  const payload = {
    event: "generate_lead",
    lead_channel: "whatsapp_business",
    origin_section: metadata.origin_section,
    selected_platforms: metadata.selected_platforms,
    project_scope: metadata.project_scope,
    target_timeline: metadata.target_timeline || "Imediato (Urgência Operacional)",
    utm_source: metadata.utm_source || utms.utm_source,
    utm_medium: metadata.utm_medium || utms.utm_medium,
    utm_campaign: metadata.utm_campaign || utms.utm_campaign,
  };

  window.dataLayer.push(payload);
  window.dataLayer.push({
    ...payload,
    event: "whatsapp_click",
  });
}

/**
 * Monta o link oficial do WhatsApp Business API sem corrupção de acentos.
 */
export function buildWhatsAppUrl(metadata: WhatsAppLeadMetadata): string {
  const utms = getUtmParams();
  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, "");

  const lines = [
    "Olá, equipe de engenharia da *M3D Multidev*!",
    "",
    "Gostaria de solicitar um diagnóstico técnico para um projeto sob medida:",
    `• *Plataformas:* ${metadata.selected_platforms}`,
    `• *Escopo:* ${metadata.project_scope}`,
    `• *Prazo alvo:* ${metadata.target_timeline || "Imediato (Urgência Operacional)"}`,
    `• *Seção de origem:* ${metadata.origin_section} (UTM: ${utms.utm_source})`,
    "",
    "Podemos agendar uma conversa técnica sob NDA?",
  ];

  const encodedText = encodeURIComponent(lines.join("\n"));
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
