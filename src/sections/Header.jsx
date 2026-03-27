import React, { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="px-6 mx-auto max-w-7xl">
        {/* ─── DESKTOP LAYOUT ─── */}
        <div className="items-center hidden h-16 gap-8 md:flex">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 text-black no-underline">
            {/* INSERT LOGO SVG HERE */}
            <span className="text-xl font-black tracking-tight">SHOP.CO</span>
          </a>

          {/* Nav */}
          <nav className="flex items-center flex-shrink-0 gap-6">
            <Link
              to="/shop"
              className="flex items-center gap-1 text-sm transition-opacity cursor-pointer hover:opacity-60"
            >
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
            </Link>
            <Link
              to="/sale"
              className="text-sm text-black no-underline transition-opacity hover:opacity-60 whitespace-nowrap"
            >
              On Sale
            </Link>
            <Link
              to="/"
              className="text-sm text-black no-underline transition-opacity hover:opacity-60 whitespace-nowrap"
            >
              New Arrivals
            </Link>
            <Link
              to="/"
              className="text-sm text-black no-underline transition-opacity hover:opacity-60 whitespace-nowrap"
            >
              Brands
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center flex-1 h-10 min-w-0 gap-3 px-4 bg-gray-100 rounded-full">
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
              className="flex-1 min-w-0 text-sm text-black placeholder-gray-400 bg-transparent border-none outline-none"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center flex-shrink-0 gap-3">
            <button
              className="flex items-center justify-center p-1 text-black transition-opacity bg-transparent border-none cursor-pointer hover:opacity-60"
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
              className="flex items-center justify-center p-1 text-black transition-opacity bg-transparent border-none cursor-pointer hover:opacity-60"
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
        <div className="flex items-center justify-between md:hidden h-14">
          {/* Hamburger */}
          <button
            className="flex items-center p-1 text-black bg-transparent border-none cursor-pointer"
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
            <span className="text-lg font-black tracking-tight">SHOP.CO</span>
          </a>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center p-1 text-black bg-transparent border-none cursor-pointer"
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
              className="flex items-center p-1 text-black bg-transparent border-none cursor-pointer"
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
              className="flex items-center p-1 text-black bg-transparent border-none cursor-pointer"
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
          <nav className="flex flex-col py-2 border-t border-gray-100 md:hidden">
            <Link
              to="/shop"
              className="flex items-center gap-1 text-sm transition-opacity hover:opacity-60"
            >
              <span>Shop</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              to="/sale"
              className="py-3 text-sm text-black no-underline border-b border-gray-50"
            >
              On Sale
            </Link>
            <Link
              to="/new-arrivals"
              className="py-3 text-sm text-black no-underline border-b border-gray-50"
            >
              New Arrivals
            </Link>
            <Link to="/brands" className="py-3 text-sm text-black no-underline">
              Brands
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
