import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axiosInstance from "../config/axios";

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const COLORS = [
  { hex: "00C12B", label: "Green" },
  { hex: "F50606", label: "Red" },
  { hex: "F5DD06", label: "Yellow" },
  { hex: "F57906", label: "Orange" },
  { hex: "06CAF5", label: "Light Blue" },
  { hex: "063AF5", label: "Blue" },
  { hex: "7D06F5", label: "Purple" },
  { hex: "F506A4", label: "Pink" },
  { hex: "FFFFFF", label: "White" },
  { hex: "000000", label: "Black" },
];

const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];

const SORT_OPTIONS = [
  { value: "most-popular", label: "Most Popular" },
  { value: "recently-added", label: "Recently Added" },
  { value: "starts", label: "Top Rated" },
];

const LIMIT = 9;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rank }) {
  const stars = Math.max(0, Math.min(5, rank ?? 0));
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= stars ? "#FFC633" : "#e5e7eb"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-gray-400">{stars}/5</span>
    </div>
  );
}

function ProductCard({ product }) {
  const getName = (name) => {
    if (!name) return "No name";
    if (typeof name === "object")
      return name.uz || name.ru || name.en || "No name";
    return name;
  };
  const price =
    typeof product.price === "object" ? 0 : Number(product.price) || 0;
  const discount =
    typeof product.discount === "object" ? 0 : Number(product.discount) || 0;
  const discountedPrice =
    discount > 0 ? Math.round(price * (1 - discount / 100)) : null;

  return (
    <div className="bg-[#F0EEEE] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="w-full overflow-hidden bg-gray-200 aspect-square">
        {product.pictures?.[0] ? (
          <img
            src={product.pictures[0]}
            alt={getName(product.name)}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="px-3.5 pt-3 pb-4">
        <p className="text-sm font-bold text-gray-900 leading-tight mb-1.5 line-clamp-2 min-h-[2.5rem]">
          {getName(product.name)}
        </p>
        <StarRating rank={product.rank} />
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {discountedPrice ? (
            <>
              <span className="text-lg font-extrabold text-gray-900">
                ${discountedPrice}
              </span>
              <span className="text-sm font-medium text-gray-400 line-through">
                ${price}
              </span>
              <span className="text-[10px] font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            </>
          ) : (
            <span className="text-lg font-extrabold text-gray-900">
              ${price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pt-4 mt-4 border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-transparent"
      >
        <span className="text-sm font-bold text-gray-900">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function RangeSlider({ min, max, valueMin, valueMax, onChange }) {
  const minPct = ((valueMin - min) / (max - min)) * 100;
  const maxPct = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="py-1">
      <div className="relative h-1.5 my-4 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-gray-900 rounded-full"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={valueMin}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), valueMax - 1);
            onChange(v, valueMax);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: valueMin > max - 10 ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={valueMax}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), valueMin + 1);
            onChange(valueMin, v);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        {/* Visual thumbs */}
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-900 rounded-full pointer-events-none top-1/2"
          style={{ left: `${minPct}%` }}
        />
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-900 rounded-full pointer-events-none top-1/2"
          style={{ left: `${maxPct}%` }}
        />
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>${valueMin}</span>
        <span>${valueMax}</span>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-between pt-5 mt-8 border-t border-gray-200">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-1">
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                p === page
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FilterSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Read applied params from URL ──
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "most-popular";
  const appliedType = searchParams.get("type") || "";
  const appliedColor = searchParams.get("colors") || "";
  const appliedSize = searchParams.get("size") || "";
  const appliedStyle = searchParams.get("dress-style") || "";
  const appliedMin = Number(searchParams.get("price-from")) || 0;
  const appliedMax = Number(searchParams.get("price-to")) || 500;

  // ── Local draft state (applied only on button click) ──
  const [draftType, setDraftType] = useState(appliedType);
  const [draftColor, setDraftColor] = useState(appliedColor);
  const [draftSize, setDraftSize] = useState(appliedSize);
  const [draftStyle, setDraftStyle] = useState(appliedStyle);
  const [draftMin, setDraftMin] = useState(appliedMin);
  const [draftMax, setDraftMax] = useState(appliedMax);

  // Sync drafts if URL changes externally
  useEffect(() => {
    setDraftType(appliedType);
    setDraftColor(appliedColor);
    setDraftSize(appliedSize);
    setDraftStyle(appliedStyle);
    setDraftMin(appliedMin);
    setDraftMax(appliedMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  // ── Apply filters → write to URL ──
  const applyFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");

      const set = (key, val, defaultVal) => {
        if (!val || val === defaultVal) next.delete(key);
        else next.set(key, val);
      };

      set("type", draftType, "");
      set("colors", draftColor, "");
      set("size", draftSize, "");
      set("dress-style", draftStyle, "");
      set("price-from", String(draftMin), "0");
      set("price-to", String(draftMax), "500");

      return next;
    });
  };

  const updateSort = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!value || value === "most-popular") next.delete("sort");
      else next.set("sort", value);
      next.set("page", "1");
      return next;
    });
  };

  const updatePage = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (p === 1) next.delete("page");
      else next.set("page", String(p));
      return next;
    });
  };

  // ── React Query fetch ──
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: [
      "products-filter",
      {
        page,
        sort,
        appliedType,
        appliedColor,
        appliedSize,
        appliedStyle,
        appliedMin,
        appliedMax,
      },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: LIMIT, sort });
      if (appliedType) params.set("type", appliedType);
      if (appliedColor) params.set("colors", appliedColor);
      if (appliedSize) params.set("size", appliedSize);
      if (appliedStyle) params.set("dress-style", appliedStyle);
      if (appliedMin > 0) params.set("price-from", appliedMin);
      if (appliedMax < 500) params.set("price-to", appliedMax);
      const res = await axiosInstance.get(`/products?${params}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const products = data?.products ?? [];
  const count = data?.count ?? 0;
  const totalPages = Math.ceil(count / LIMIT);
  const from = count === 0 ? 0 : (page - 1) * LIMIT + 1;
  const to = Math.min(page * LIMIT, count);

  // ── Breadcrumb label ──
  const breadcrumbLabel = appliedStyle || appliedType || "Products";

  return (
    <div className="max-w-screen-xl px-4 py-6 mx-auto md:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
        <a href="/" className="transition hover:text-gray-900">
          Home
        </a>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-medium text-gray-900">{breadcrumbLabel}</span>
      </nav>

      <div className="flex items-start gap-6">
        {/* ── SIDEBAR ── */}
        <aside className="sticky w-64 p-5 bg-white border border-gray-200 shrink-0 rounded-2xl top-20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Filters</h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M7 12h10M10 18h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Type */}
          <div>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setDraftType(draftType === t ? "" : t)}
                className={`w-full flex items-center justify-between py-2.5 text-sm transition ${
                  draftType === t
                    ? "font-bold text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {t}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Price */}
          <SidebarSection title="Price">
            <RangeSlider
              min={0}
              max={500}
              valueMin={draftMin}
              valueMax={draftMax}
              onChange={(mn, mx) => {
                setDraftMin(mn);
                setDraftMax(mx);
              }}
            />
          </SidebarSection>

          {/* Colors */}
          <SidebarSection title="Colors">
            <div className="flex flex-wrap gap-2.5 mt-1">
              {COLORS.map(({ hex, label }) => (
                <button
                  key={hex}
                  title={label}
                  onClick={() => setDraftColor(draftColor === hex ? "" : hex)}
                  className={`w-8 h-8 rounded-full border-2 transition flex items-center justify-center ${
                    draftColor === hex
                      ? "border-gray-900 scale-110"
                      : "border-transparent hover:border-gray-400"
                  }`}
                  style={{
                    backgroundColor: `#${hex}`,
                    boxShadow:
                      hex === "FFFFFF" ? "inset 0 0 0 1px #e5e7eb" : undefined,
                  }}
                >
                  {draftColor === hex && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke={
                          hex === "FFFFFF" || hex === "F5DD06" ? "#333" : "#fff"
                        }
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* Size */}
          <SidebarSection title="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setDraftSize(draftSize === s ? "" : s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    draftSize === s
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-gray-100 text-gray-600 border-transparent hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* Dress Style */}
          <SidebarSection title="Dress Style">
            <div className="space-y-0.5">
              {DRESS_STYLES.map((ds) => (
                <button
                  key={ds}
                  onClick={() => setDraftStyle(draftStyle === ds ? "" : ds)}
                  className={`w-full flex items-center justify-between py-2 text-sm transition ${
                    draftStyle === ds
                      ? "font-bold text-gray-900"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {ds}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* Apply Filter Button */}
          <button
            onClick={applyFilters}
            className="w-full py-3 mt-5 text-sm font-semibold text-white transition bg-gray-900 rounded-full hover:bg-black active:scale-95"
          >
            Apply Filter
          </button>
        </aside>

        {/* ── PRODUCTS AREA ── */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                {appliedStyle || appliedType || "All Products"}
              </h1>
              {count > 0 && (
                <p className="text-sm text-gray-500 mt-0.5">
                  Showing {from}-{to} of <strong>{count}</strong> Products
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => updateSort(e.target.value)}
                className="font-semibold text-gray-900 bg-transparent border-none outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products grid */}
          {isLoading ? (
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[20px] overflow-hidden animate-pulse bg-gray-100"
                >
                  <div className="bg-gray-200 aspect-square" />
                  <div className="p-3.5 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                    <div className="w-1/2 h-3 bg-gray-200 rounded" />
                    <div className="w-1/3 h-5 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="mb-4 text-gray-300"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="font-medium text-gray-500">No products found</p>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-opacity ${isPlaceholderData ? "opacity-50" : "opacity-100"}`}
            >
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={updatePage}
          />
        </div>
      </div>
    </div>
  );
}
