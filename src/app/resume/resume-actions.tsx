"use client";

import Link from "next/link";

export function ResumeActions() {
  return (
    <div className="mb-4 flex justify-center gap-3 print:hidden">
      <Link
        href="/"
        className="inline-flex items-center rounded-full border border-[#D8D1C2] bg-white px-4 py-2 text-sm font-medium text-[#4B5563] shadow-sm transition-colors hover:border-[#B89B5E] hover:text-[#111111]"
      >
        Back to Portfolio
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center rounded-full bg-[#A68A64] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        Print / Save PDF
      </button>
    </div>
  );
}
