import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/site/content";
import Legal from "@/site/Legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Babar Tech Solutions collects, uses and protects personal information.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <Legal title="Privacy *policy*" updated="26 September 2026">
      <p>
        This policy explains what personal information Babar Tech Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you visit{" "}
        <a href={SITE.url}>babartechsolutions.com</a> or contact us, why we collect it, and the choices you have. We keep it short because we
        collect very little.
      </p>

      <h2>Who is responsible</h2>
      <p>
        Babar Tech Solutions is the controller of the personal information described here. You can reach us about anything in this policy at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li><strong>Contact form and email.</strong> Your name, email address, company (optional), the services you&apos;re interested in, and your message. The form also records your browser&apos;s time zone so we can suggest the right working hours.</li>
        <li><strong>Calls.</strong> If you book a call, the booking is handled by Calendly, which collects your name, email and chosen time under its own privacy policy.</li>
        <li><strong>Client work.</strong> If you become a client, we process the information needed to deliver the service, as set out in our agreement with you or through Upwork.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Server logs.</strong> Our hosting provider records standard request data (IP address, browser type, pages requested, time) to keep the site secure and working. These logs are kept for a short period and are not used to identify you.</li>
        <li><strong>Analytics, only with your consent.</strong> If you allow analytics cookies, Google Analytics 4 collects aggregated information about how the site is used, such as pages viewed, approximate location (country or city) and device type. IP anonymisation is enabled. If you don&apos;t consent, no analytics code is loaded.</li>
        <li><strong>Local storage.</strong> We store your cookie choice and whether you&apos;ve seen our welcome note in your browser. See the <Link href="/cookies/">cookie policy</Link>.</li>
      </ul>

      <h2>Why we use it, and our legal basis</h2>
      <table>
        <thead><tr><th>Purpose</th><th>Legal basis (UK/EU GDPR)</th></tr></thead>
        <tbody>
          <tr><td>Replying to your enquiry and preparing a quote</td><td>Steps at your request before entering a contract; legitimate interests</td></tr>
          <tr><td>Delivering services to clients</td><td>Performance of a contract</td></tr>
          <tr><td>Keeping the website secure and working</td><td>Legitimate interests</td></tr>
          <tr><td>Understanding how the site is used (analytics)</td><td>Consent, which you can withdraw at any time</td></tr>
          <tr><td>Keeping business and tax records</td><td>Legal obligation</td></tr>
        </tbody>
      </table>
      <p>We do not sell your personal information, and we do not use it for automated decision-making or profiling.</p>

      <h2>Who we share it with</h2>
      <p>We share information only with service providers who help us run the business, and only as much as they need:</p>
      <ul>
        <li><strong>Netlify</strong>: website hosting and form handling.</li>
        <li><strong>Our email provider</strong>: to receive and reply to your messages.</li>
        <li><strong>Calendly</strong>: call scheduling, if you choose to book.</li>
        <li><strong>Google</strong>: analytics, only if you consent.</li>
        <li><strong>Upwork</strong>: if you hire us through Upwork, under Upwork&apos;s terms and privacy policy.</li>
      </ul>
      <p>We may also disclose information if required by law, or to protect our rights or the safety of others.</p>

      <h2>International transfers</h2>
      <p>
        Our team is based in Pakistan and some of our providers are based in the United States. When personal information is transferred outside
        the UK or European Economic Area, we rely on appropriate safeguards such as the European Commission&apos;s Standard Contractual Clauses or
        the provider&apos;s certification under the EU–US Data Privacy Framework.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Enquiries that don&apos;t lead to work: up to 24 months, then deleted.</li>
        <li>Client records: for the length of the engagement plus up to 6 years for legal and tax purposes.</li>
        <li>Analytics data: 14 months, the shortest retention Google Analytics offers.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or export your personal information, to object to or restrict
        how we use it, and to withdraw consent at any time. Residents of California have the right to know what we collect, to request deletion, and
        not to be discriminated against for exercising these rights. We do not sell or share personal information for cross-context behavioural advertising.
      </p>
      <p>
        To exercise any right, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We&apos;ll reply within 30 days. You also have the right to
        complain to your local data protection authority, such as the ICO in the UK.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS, access to client information is limited to the people who need it, and we use reputable providers with their own
        security programmes. No system is perfectly secure, but we take reasonable care to protect what you share with us.
      </p>

      <h2>Children</h2>
      <p>This site and our services are for businesses. We don&apos;t knowingly collect information from anyone under 16.</p>

      <h2>Changes</h2>
      <p>If we change this policy we&apos;ll update the date at the top. Significant changes will be highlighted on the site.</p>
    </Legal>
  );
}
