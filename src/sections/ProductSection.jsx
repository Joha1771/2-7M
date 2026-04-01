import { useState, useEffect } from "react";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";

/* ⭐ STAR RATING */
const StarRating = ({ rating }) => {
  // Ensure rating is always a plain number
  const safeRating =
    typeof rating === "object" || isNaN(rating) ? 0 : Number(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = safeRating >= star;
          const half = !filled && safeRating >= star - 0.5;

          return (
            <svg key={star} width="14" height="14" viewBox="0 0 14 14">
              <defs>
                <linearGradient id={`half-${star}-${safeRating}`}>
                  <stop offset="50%" stopColor="#FFC633" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <path
                d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.632l3.455-.502L7 1z"
                fill={
                  filled
                    ? "#FFC633"
                    : half
                      ? `url(#half-${star}-${safeRating})`
                      : "#D1D5DB"
                }
              />
            </svg>
          );
        })}
      </div>
      <span className="text-xs text-gray-500">{safeRating}/5</span>
    </div>
  );
};

/* 🛒 PRODUCT CARD */
const ProductCard = ({ product }) => {
  // Safely extract name from string or localized object
  const getName = (name) => {
    if (!name) return "No name";
    if (typeof name === "object")
      return name.uz || name.ru || name.en || "No name";
    return String(name);
  };

  // Safely extract number — returns 0 if value is an object or NaN
  const getNumber = (val) => {
    if (val === null || val === undefined) return 0;
    if (typeof val === "object") return 0;
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  };

  const price = getNumber(product.price);
  const discount = getNumber(product.discount);

  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(price * (1 - discount / 100))
    : null;

  // rank could be an object on some API responses — guard against it
  const rawRank = product.rank;
  const rankNum =
    typeof rawRank === "object" || rawRank === null || rawRank === undefined
      ? 0
      : Number(rawRank);
  const rating =
    rankNum > 0 ? rankNum : parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));

  const hasPicture =
    Array.isArray(product.pictures) && product.pictures.length > 0;

  return (
    <div className="bg-[#F0EEEE] rounded-[20px] overflow-hidden flex flex-col h-full cursor-pointer hover:-translate-y-1 hover:shadow-lg transition">
      <div className="flex-shrink-0 w-full aspect-square">
        {hasPicture ? (
          <img
            src={product.pictures[0]}
            alt={getName(product.name)}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-200">
            No Image
          </div>
        )}
      </div>

      <div className="px-3.5 pt-3 pb-4 flex flex-col flex-grow gap-1.5">
        <p className="text-sm font-bold leading-tight min-h-[2.5rem] line-clamp-2">
          {getName(product.name)}
        </p>

        <div className="mt-auto">
          <StarRating rating={rating} />
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold">${discountedPrice}</span>
                <span className="text-gray-400 line-through">${price}</span>
                <span className="text-red-500 text-[10px] bg-red-50 px-2 py-0.5 rounded-full font-medium">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 📦 SECTION */
const ProductSection = ({ title, products, onToggle, showAll }) => {
  return (
    <section className="py-10">
      <h2 className="mb-8 text-3xl font-black text-center">{title}</h2>

      <motion.div
        layout
        className="grid items-stretch grid-cols-2 gap-4 mb-8 md:grid-cols-4"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-center">
        <button
          onClick={onToggle}
          className="px-10 py-3 font-medium transition border border-gray-200 rounded-full hover:bg-black hover:text-white"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </section>
  );
};

/* 🚀 MAIN */
export default function ProductSections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllNew, setShowAllNew] = useState(false);
  const [showAllTop, setShowAllTop] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        const data = res.data.products || res.data;

        const validProducts = (Array.isArray(data) ? data : []).filter((p) => {
          // Safely check name — could be a string or localized object
          const name = p.name;
          const hasName =
            name &&
            (typeof name === "object"
              ? name.uz || name.ru || name.en
              : name !== "string" && String(name).trim() !== "");

          const price = typeof p.price === "object" ? 0 : Number(p.price) || 0;

          return p.pictures?.length > 0 && hasName && price > 0;
        });

        setProducts(validProducts);
      } catch (err) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const newArrivals = showAllNew ? products.slice(0, 8) : products.slice(0, 4);
  const topSelling = showAllTop ? products.slice(4, 12) : products.slice(4, 8);

  if (loading)
    return <div className="py-20 font-medium text-center">Loading...</div>;
  if (error)
    return <div className="py-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals}
        showAll={showAllNew}
        onToggle={() => setShowAllNew((prev) => !prev)}
      />

      <div className="h-px bg-gray-100" />

      <ProductSection
        title="TOP SELLING"
        products={topSelling}
        showAll={showAllTop}
        onToggle={() => setShowAllTop((prev) => !prev)}
      />
    </div>
  );
}
