import { useState } from "react";

/* ─────────────────────────────────────────────
   NEWSLETTER BANNER
───────────────────────────────────────────── */
export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
      <div className="bg-black rounded-[30px] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h3 className="text-white text-[26px] md:text-[32px] lg:text-[36px] font-black uppercase tracking-tight leading-tight max-w-[340px]">
          Stay Upto Date About Our Latest Offers
        </h3>
        <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[340px]">
          <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3">
            <svg
              className="w-5 h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="bg-white text-black font-semibold rounded-full py-3 px-6 text-sm hover:bg-gray-100 transition text-center">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  );
}
