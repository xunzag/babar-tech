import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#05091A" }}>
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10">
          <div
            className="text-[10rem] font-bold leading-none mb-4"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #FF8C42)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #f97316)",
              boxShadow: "0 0 24px rgba(255,107,53,0.3)",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
