import Link from "next/link";
import { Arrow } from "@/site/Icons";
import Words from "@/site/Words";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-[var(--nav-h)]">
      <div className="wrap">
        <p className="eyebrow" data-reveal><span className="n">404</span> Page not found</p>
        <Words as="h1" className="display mt-8 max-w-[12ch]" text="This desk is *empty.*" />
        <p className="lede mt-8 max-w-md" data-reveal>The page you&apos;re after has moved or never existed. Everything else is still open for business.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
          <Link href="/" className="btn btn-orange">Back to the homepage <Arrow size={16} className="arr" /></Link>
          <Link href="/contact/" className="btn btn-line">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
