"use client";

import { useEffect } from "react";

/**
 * Safety net: if anything on a page throws, show a branded recovery screen
 * instead of the browser's generic "couldn't load" page.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center pt-[var(--nav-h)]">
      <div className="wrap">
        <p className="eyebrow">Something slipped</p>
        <h1 className="h2 mt-6 max-w-[16ch]">That page tripped over its own feet.</h1>
        <p className="lede mt-6 max-w-md">It&apos;s on us, not you. Try again, and if it keeps happening, email hello@babartechsolutions.com.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => reset()} className="btn btn-orange">Try again</button>
          <button onClick={() => window.location.reload()} className="btn btn-line">Reload the page</button>
        </div>
      </div>
    </section>
  );
}
