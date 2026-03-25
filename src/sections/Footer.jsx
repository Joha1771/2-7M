/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const footerLinks = {
  COMPANY: ["About", "Features", "Works", "Career"],
  HELP: [
    "Customer Support",
    "Delivery Details",
    "Terms & Conditions",
    "Privacy Policy",
  ],
  FAQ: ["Account", "Manage Deliveries", "Orders", "Payments"],
  RESOURCES: [
    "Free eBooks",
    "Development Tutorial",
    "How to - Blog",
    "Youtube Playlist",
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-black text-xl tracking-tight text-gray-900 mb-3">
              SHOP.CO
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3">
              {/* Twitter */}
              <a
                href="#"
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Github */}
              <a
                href="#"
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links — desktop: 4 columns, mobile: 2x2 */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-semibold text-xs tracking-widest text-gray-900 mb-4 uppercase">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-gray-500 text-sm hover:text-gray-900 transition"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex items-center gap-3">
            {/* Visa */}
            <div className="h-8 px-3 bg-white border border-gray-200 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 38 24" className="h-5 w-auto">
                <rect width="38" height="24" rx="4" fill="white" />
                <path
                  d="M16 7l-3 10h-2L8 9.5c-.1-.4-.3-.7-.7-.9C6.7 8.3 6 8.1 5.3 8V7.8l3.3-.3c.4 0 .8.3.9.7l.8 4.3L12.6 7H16zm1.5 0L16 17h-2.5L15 7h2.5zm8.5 6.8c0-2.5-3.5-2.7-3.5-3.8 0-.3.3-.7 1-.8.3 0 1.3-.1 2.3.4l.4-1.9c-.6-.2-1.3-.4-2.2-.4-2.3 0-3.9 1.2-3.9 3 0 1.3 1.2 2 2 2.5.9.5 1.2.8 1.2 1.3 0 .7-.7 1-1.4 1-1.2 0-1.9-.3-2.4-.6l-.4 2c.5.2 1.5.5 2.5.5 2.5 0 4.1-1.2 4.1-3.2h-.7zm6 3.2H34l-1.7-10h-2c-.5 0-.9.3-1.1.7L26 17h2.5l.5-1.4h3l.3 1.4zM29.6 14l1.2-3.3.7 3.3h-1.9z"
                  fill="#1A1F71"
                />
              </svg>
            </div>
            {/* Mastercard */}
            <div className="h-8 px-2 bg-white border border-gray-200 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 38 24" className="h-5 w-auto">
                <rect width="38" height="24" rx="4" fill="white" />
                <circle cx="15" cy="12" r="7" fill="#EB001B" />
                <circle cx="23" cy="12" r="7" fill="#F79E1B" />
                <path
                  d="M19 6.8A7 7 0 0122.2 12 7 7 0 0119 17.2 7 7 0 0115.8 12 7 7 0 0119 6.8z"
                  fill="#FF5F00"
                />
              </svg>
            </div>
            {/* PayPal */}
            <div className="h-8 px-2 bg-white border border-gray-200 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 38 24" className="h-5 w-auto">
                <rect width="38" height="24" rx="4" fill="white" />
                <path
                  d="M13.5 7h4.8c2.3 0 3.2 1.1 3 2.9-.4 2.7-1.9 4.1-4.5 4.1h-1.2l-.7 4H12l1.5-11zm2.3 5.1h.9c1.1 0 1.7-.5 1.9-1.6.1-.8-.3-1.2-1.1-1.2h-1l-.7 2.8z"
                  fill="#003087"
                />
                <path
                  d="M22.5 10h4.8c2.3 0 3.2 1.1 3 2.9-.4 2.7-1.9 4.1-4.5 4.1h-1.2l-.7 4H21l1.5-11zm2.3 5.1h.9c1.1 0 1.7-.5 1.9-1.6.1-.8-.3-1.2-1.1-1.2h-1l-.7 2.8z"
                  fill="#009CDE"
                />
              </svg>
            </div>
            {/* Apple Pay */}
            <div className="h-8 px-2 bg-white border border-gray-200 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 38 24" className="h-5 w-auto">
                <rect width="38" height="24" rx="4" fill="white" />
                <path
                  d="M19.5 7.5c.5-.7 1.4-1.2 2.2-1.2.1.9-.3 1.7-.8 2.3-.5.6-1.3 1.1-2.1 1-.1-.8.3-1.6.7-2.1zm-3.7 8.2c-.8 0-1.5-.5-2-.5-.5 0-1.3.5-2 .4-.9 0-1.8-.5-2.3-1.4-.6-1-.8-2.7-.2-4 .4-.8 1.1-1.4 1.9-1.4.7 0 1.3.5 1.9.5.6 0 1.4-.5 2.3-.4.5 0 1.7.2 2.3 1.3-.1 0-1.4.8-1.4 2.3 0 1.7 1.5 2.3 1.5 2.3s-.7 1.9-2 1.9z"
                  fill="#000"
                />
              </svg>
            </div>
            {/* G Pay */}
            <div className="h-8 px-2 bg-white border border-gray-200 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 38 24" className="h-5 w-auto">
                <rect width="38" height="24" rx="4" fill="white" />
                <text
                  x="7"
                  y="16"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#4285F4"
                >
                  G
                </text>
                <text
                  x="13"
                  y="16"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#34A853"
                >
                  P
                </text>
                <text
                  x="19"
                  y="16"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#EA4335"
                >
                  a
                </text>
                <text
                  x="24"
                  y="16"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#FBBC05"
                >
                  y
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
