export type Consent = { necessary: true; analytics: boolean; marketing: boolean; ts: number; v: 1 };

const KEY = "bts-consent";
export const CONSENT_EVENT = "bts:consent";
export const OPEN_SETTINGS_EVENT = "bts:cookie-settings";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    // Re-ask after 12 months, per common regulator guidance
    if (c.v !== 1 || Date.now() - c.ts > 365 * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean, marketing: boolean): Consent {
  const c: Consent = { necessary: true, analytics, marketing, ts: Date.now(), v: 1 };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: the choice still applies for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
