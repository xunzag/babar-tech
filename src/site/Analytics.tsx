"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "./consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

/**
 * Loads Google Analytics 4 only when NEXT_PUBLIC_GA_ID is set AND the visitor
 * has opted in to analytics. Uses Consent Mode v2 so nothing is stored before that.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    let loaded = false;

    const apply = (c: Consent | null) => {
      if (!c?.analytics && !loaded) return;
      if (!loaded) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
        window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s);
        window.gtag("js", new Date());
        window.gtag("config", GA_ID, { anonymize_ip: true });
        loaded = true;
      }
      const m = c?.marketing ? "granted" : "denied";
      window.gtag!("consent", "update", {
        analytics_storage: c?.analytics ? "granted" : "denied",
        ad_storage: m, ad_user_data: m, ad_personalization: m,
      });
    };

    apply(readConsent());
    const on = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, on);
    return () => window.removeEventListener(CONSENT_EVENT, on);
  }, []);

  return null;
}
