import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/site/content";
import Legal from "@/site/Legal";
import CookieSettingsButton from "@/site/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Which cookies and browser storage babartechsolutions.com uses, and how to control them.",
  alternates: { canonical: "/cookies/" },
};

export default function Cookies() {
  return (
    <Legal title="Cookie *policy*" updated="26 September 2026">
      <p>
        Cookies and similar technologies (like your browser&apos;s local storage) let a website remember things. We use as few as possible, and nothing
        beyond the strictly necessary runs until you say yes.
      </p>
      <p><CookieSettingsButton /></p>

      <h2>Strictly necessary</h2>
      <p>These make the site work as you&apos;d expect and can&apos;t be switched off. They don&apos;t track you.</p>
      <table>
        <thead><tr><th>Name</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td className="mono">bts-consent</td><td>Local storage</td><td>Remembers your cookie choices</td><td>12 months</td></tr>
          <tr><td className="mono">bts-welcome-seen</td><td>Local storage</td><td>Makes sure our welcome note only appears once</td><td>Until cleared</td></tr>
        </tbody>
      </table>

      <h2>Analytics (optional)</h2>
      <p>
        Only set if you allow analytics. They help us see which pages are useful, in aggregate. We use Google Analytics 4 with IP anonymisation and
        Google Consent Mode, so no analytics cookies are written before you opt in.
      </p>
      <table>
        <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td className="mono">_ga</td><td>Google</td><td>Distinguishes visitors, anonymously</td><td>2 years</td></tr>
          <tr><td className="mono">_ga_*</td><td>Google</td><td>Keeps track of a session</td><td>2 years</td></tr>
        </tbody>
      </table>

      <h2>Marketing (optional)</h2>
      <p>
        We don&apos;t currently run advertising pixels. If we add them in future, they&apos;ll be listed here and will only load if you allow marketing
        cookies.
      </p>

      <h2>Third-party sites</h2>
      <p>
        When you click through to Calendly, Upwork, LinkedIn, Instagram or Facebook, those sites set their own cookies under their own policies. We link
        to them rather than embedding them, so they can&apos;t set cookies while you&apos;re on our site.
      </p>

      <h2>Changing your mind</h2>
      <p>
        Use the button above or the &ldquo;Cookie settings&rdquo; link in the footer at any time. You can also clear cookies and site data in your
        browser settings. Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or read our <Link href="/privacy/">privacy policy</Link>.
      </p>
    </Legal>
  );
}
