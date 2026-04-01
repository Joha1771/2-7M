import { useState, useEffect } from "react";
import axios from "../config/axios";

/* ── STARS ── */
const Stars = ({ rating }) => {
  // Guard: rating could be an object from API
  const safeRating =
    typeof rating === "object" || rating === null || rating === undefined
      ? 0
      : Number(rating) || 0;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 14 14">
          <path
            d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.632l3.455-.502L7 1z"
            fill={safeRating >= s ? "#FFC633" : "#374151"}
          />
        </svg>
      ))}
    </div>
  );
};

/* ── SAFE HELPERS ── */
const getProductInfo = (r) => {
  if (r.product && typeof r.product === "object") {
    const name = r.product.name;
    if (typeof name === "string") return name;
    if (name && typeof name === "object") {
      return String(name.uz || name.ru || name.en || "");
    }
    // _id can also be a Mongo ObjectId object — always stringify
    return r.product._id ? String(r.product._id) : "N/A";
  }
  if (typeof r.product === "string") return r.product;
  if (r.productId) return String(r.productId);
  return "N/A";
};

const getUserName = (r) => {
  if (r.userName && typeof r.userName === "string") return r.userName;
  if (r.user && typeof r.user === "object") {
    const name = r.user.name;
    if (typeof name === "string") return name;
    if (name && typeof name === "object") {
      return String(name.uz || name.ru || name.en || "Anonymous");
    }
  }
  return "Anonymous";
};

/* ── ADD REVIEW ── */
export function AddReview({ onSuccess }) {
  const [form, setForm] = useState({
    productId: "",
    rating: "5",
    comment: "",
    userName: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await axios.post("/reviews", { ...form, rating: Number(form.rating) });
      setMsg({ type: "success", text: "Review added!" });
      setForm({ productId: "", rating: "5", comment: "", userName: "" });
      onSuccess?.();
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm";

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-white/5">
      <h3 className="mb-5 text-lg font-bold text-white">Add Review</h3>

      {msg && (
        <div
          className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${
            msg.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Product ID
          </label>
          <input
            placeholder="Product ID"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            User Name
          </label>
          <input
            placeholder="User Name"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Rating
          </label>
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className={inputClass}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} stars
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Comment
          </label>
          <textarea
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-sm font-bold text-black transition bg-white rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Review"}
        </button>
      </form>
    </div>
  );
}

/* ── REVIEWS LIST ── */
export function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/reviews");
      const raw = res.data.reviews || res.data || [];
      setReviews(Array.isArray(raw) ? raw : []);
    } catch (error) {
      console.error("Fetch reviews error:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/reviews/${id}`);
      setReviews((r) => r.filter((x) => x._id !== id));
    } catch (error) {
      console.error("Delete review error:", error);
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  if (loading)
    return (
      <div className="py-10 text-sm text-center text-gray-500">
        Loading reviews...
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-500">{reviews.length} reviews</p>
        <button
          onClick={fetch_}
          className="px-4 py-2 text-sm text-gray-300 transition bg-white/5 rounded-xl hover:bg-white/10"
        >
          ↻ Refresh
        </button>
      </div>

      {reviews.length === 0 && (
        <div className="py-10 text-sm text-center text-gray-600">
          No reviews found
        </div>
      )}

      {reviews.map((r) => {
        // Derive safe primitive strings BEFORE rendering — never pass raw API values to JSX
        const userName = getUserName(r);
        const productInfo = getProductInfo(r);
        const comment = typeof r.comment === "string" ? r.comment : "";
        const reviewId = r._id ? String(r._id) : String(Math.random());

        return (
          <div
            key={reviewId}
            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4"
          >
            {confirmDelete === r._id ? (
              <div>
                <p className="mb-3 text-sm text-white">Delete this review?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(r._id)}
                    disabled={deletingId === r._id}
                    className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-400 disabled:opacity-50 transition"
                  >
                    {deletingId === r._id ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 text-sm text-gray-300 bg-white/5 rounded-xl hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="flex items-center justify-center flex-shrink-0 text-sm font-semibold text-white rounded-full w-9 h-9 bg-white/10">
                  {userName.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {userName}
                    </p>
                    <button
                      onClick={() => setConfirmDelete(r._id)}
                      className="flex-shrink-0 p-1.5 text-gray-600 hover:text-red-400 transition rounded-lg hover:bg-red-500/10"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>

                  <Stars rating={r.rating} />

                  {comment && (
                    <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                      {comment}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-1.5 truncate">
                    Product: {productInfo}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
