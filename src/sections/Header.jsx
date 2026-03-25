import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ─── DESKTOP LAYOUT ─── */}
        <div className="hidden md:flex items-center gap-8 h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 text-black no-underline">
            {/* INSERT LOGO SVG HERE */}
            <span className="font-black text-xl tracking-tight">SHOP.CO</span>
          </a>

          {/* Nav */}
          <nav className="flex items-center gap-6 flex-shrink-0">
            <div className="flex items-center gap-1 text-sm cursor-pointer hover:opacity-60 transition-opacity">
              <span>Shop</span>
              {/* INSERT CHEVRON DOWN SVG HERE */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <a
              href="/sale"
              className="text-sm text-black no-underline hover:opacity-60 transition-opacity whitespace-nowrap"
            >
              On Sale
            </a>
            <a
              href="/new-arrivals"
              className="text-sm text-black no-underline hover:opacity-60 transition-opacity whitespace-nowrap"
            >
              New Arrivals
            </a>
            <a
              href="/brands"
              className="text-sm text-black no-underline hover:opacity-60 transition-opacity whitespace-nowrap"
            >
              Brands
            </a>
          </nav>

          {/* Search */}
          <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-4 h-10 min-w-0">
            {/* INSERT SEARCH SVG HERE */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="flex-shrink-0"
            >
              <circle
                cx="7"
                cy="7"
                r="5.5"
                stroke="#9ca3af"
                strokeWidth="1.5"
              />
              <path
                d="M11 11L14 14"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-black placeholder-gray-400 min-w-0"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="p-1 bg-transparent border-none cursor-pointer text-black hover:opacity-60 transition-opacity flex items-center justify-center"
              aria-label="Cart"
            >
              {/* INSERT CART SVG HERE */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M16 10a4 4 0 01-8 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="p-1 bg-transparent border-none cursor-pointer text-black hover:opacity-60 transition-opacity flex items-center justify-center"
              aria-label="Account"
            >
              {/* INSERT ACCOUNT SVG HERE */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── MOBILE LAYOUT ─── */}
        <div className="flex md:hidden items-center justify-between h-14">
          {/* Hamburger */}
          <button
            className="p-1 bg-transparent border-none cursor-pointer text-black flex items-center"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* INSERT HAMBURGER SVG HERE */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Logo */}
          <a href="/" className="text-black no-underline">
            {/* INSERT LOGO SVG HERE */}
            <span className="font-black text-lg tracking-tight">SHOP.CO</span>
          </a>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button
              className="p-1 bg-transparent border-none cursor-pointer text-black flex items-center"
              aria-label="Search"
            >
              {/* INSERT SEARCH SVG HERE */}
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 11L14 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              className="p-1 bg-transparent border-none cursor-pointer text-black flex items-center"
              aria-label="Cart"
            >
              {/* INSERT CART SVG HERE */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M16 10a4 4 0 01-8 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="p-1 bg-transparent border-none cursor-pointer text-black flex items-center"
              aria-label="Account"
            >
              {/* INSERT ACCOUNT SVG HERE */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav className="flex md:hidden flex-col border-t border-gray-100 py-2">
            <div className="flex items-center gap-2 text-sm text-black py-3 border-b border-gray-50 cursor-pointer">
              Shop
              {/* INSERT CHEVRON DOWN SVG HERE */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <a
              href="/sale"
              className="text-sm text-black no-underline py-3 border-b border-gray-50"
            >
              On Sale
            </a>
            <a
              href="/new-arrivals"
              className="text-sm text-black no-underline py-3 border-b border-gray-50"
            >
              New Arrivals
            </a>
            <a href="/brands" className="text-sm text-black no-underline py-3">
              Brands
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
