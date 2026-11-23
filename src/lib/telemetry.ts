export type PlatformChoice =
  | "Windows + Android + iOS + Web (Integração Completa)"
  | "Windows + Android + Web (Integração Completa)"
  | "Windows (Desktop / Sistemas Nativos)"
  | "Móvel (Android & iOS)"
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

export function buildWhatsAppUrl(metadata: WhatsAppLeadMetadata): string {
  const utms = getUtmParams();
  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, "");

  const lines = [
    "Olá, equipe de engenharia da *M3D Multidev*!",
    "",
    "Gostaria de conversar sobre um projeto sob medida:",
    `• *Plataformas:* ${metadata.selected_platforms}`,
    `• *Escopo:* ${metadata.project_scope}`,
    `• *Origem:* ${metadata.origin_section} (${utms.utm_source})`,
  ];

  const encodedText = encodeURIComponent(lines.join("\n"));
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
