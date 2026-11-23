import React from "react";
import Link from "next/link";
import { Static3DExperience } from "@/components/3d-experience/Static3DExperience";

export default function HomePage() {
  return (
    <>
      <Static3DExperience />
      <section
        className="sr-only"
        aria-label="M3D Multidev — Engenharia de Software Sob Medida para Windows, Android, iOS e Web"
      >
        <h1>M3D Multidev — Onde ideias extraordinárias se tornam tecnologia inteligente</h1>
        <p>
          A M3D Multidev projeta e desenvolve sistemas sob medida que unem softwares desktop no Windows,
          aplicativos móveis (Android e iOS) e plataformas inteligentes em nuvem na Web.
        </p>

        <h2>Engenharia Multiplataforma Integrada</h2>
        <ul>
          <li>
            <strong>Windows (Desktop):</strong> Softwares desktop nativos de alta performance, processamento com
            IA local offline, diagnóstico de redes e ferramentas corporativas avançadas.
          </li>
          <li>
            <strong>Móvel (Android e iOS):</strong> Aplicativos móveis modernos e fluidos para Android e iOS,
            operação online e offline, notificações em tempo real e sincronia imediata.
          </li>
          <li>
            <strong>Web e Nuvem:</strong> Plataformas SaaS, dashboards gerenciais em tempo real, automação com
            inteligência artificial e integração via APIs escaláveis.
          </li>
        </ul>

        <h2>Sistemas Desenvolvidos pela M3D Multidev</h2>
        <ul>
          <li>
            <a href="https://www.dekup.com.br/">DEKUP — Pré-Edição Inteligente de Vídeo e IA Offline</a>:
            Infraestrutura inteligente de pré-edição para eventos e videocasts. Sincroniza múltiplos canais e monta
            timelines multicâmeras com Assistente IA 100% local e offline.
          </li>
          <li>
            <a href="https://www.nexiacore.com.br/">NexIA Core — Rede e Auditoria Local com IA</a>:
            Plataforma Windows 10/11 para descoberta, topologia, auditoria de segurança e diagnóstico de rede em
            painel único com IA privada local (Ollama) sem enviar dados à nuvem.
          </li>
          <li>
            <a href="https://www.kitefy.com.br/">Kitefy — Marketing Orgânico e GEO Studio</a>:
            Estúdio web ágil que extrai o perfil da marca via URL e entrega roteiros A/B, carrosséis e artigos
            otimizados para buscadores e IAs (GEO) sem exigir OAuth social.
          </li>
        </ul>

        <h2>Segurança, Propriedade do Código e Conformidade LGPD</h2>
        <p>
          Criptografia TLS 1.3 e AES-256, cessão contratual formal do código sob encomenda (Lei 9.609/98 Art. 4º),
          conformidade LGPD (Privacy by Design) e SLA 99,9% com suporte técnico dedicado.
        </p>
        <p>
          Contato direto: <a href="mailto:suporte@m3dmultidev.com.br">suporte@m3dmultidev.com.br</a> ·{" "}
          <Link href="/privacidade">Política de Privacidade (LGPD)</Link>
        </p>
      </section>
    </>
  );
}
