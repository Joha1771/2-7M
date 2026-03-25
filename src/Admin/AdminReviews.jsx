import { useState, useEffect } from "react";
import axios from "../config/axios";

/* ── STARS ── */
const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="12" height="12" viewBox="0 0 14 14">
        <path
          d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.632l3.455-.502L7 1z"
          fill={rating >= s ? "#FFC633" : "#374151"}
        />
      </svg>
    ))}
  </div>
);

/* ── SAFE HELPERS ── */
const getProductInfo = (r) => {
  if (r.product && typeof r.product === "object") {
    if (typeof r.product.name === "string") return r.product.name;
    if (r.product.name?.uz) return r.product.name.uz;
    if (r.product.name?.ru) return r.product.name.ru;
    return r.product._id || "N/A";
  }

  if (typeof r.product === "string") return r.product;
  if (r.productId) return r.productId;

  return "N/A";
};

const getUserName = (r) => {
  if (r.userName) return r.userName;

  if (r.user && typeof r.user === "object") {
    if (typeof r.user.name === "string") return r.user.name;
    if (r.user.name?.uz) return r.user.name.uz;
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
      await axios.post("/reviews", {
        ...form,
        rating: Number(form.rating),
      });

      setMsg({ type: "success", text: "Review added!" });

      setForm({
        productId: "",
        rating: "5",
        comment: "",
        userName: "",
      });

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

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
      <h3 className="mb-5 text-lg font-bold text-white">Add Review</h3>

      {msg && (
        <div
          className={`mb-4 px-4 py-2 rounded-xl text-sm ${
            msg.type === "success"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Product ID"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          className="w-full p-2 text-white bg-black rounded"
        />

        <input
          placeholder="User Name"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          className="w-full p-2 text-white bg-black rounded"
        />

        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className="w-full p-2 text-white bg-black rounded"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full p-2 text-white bg-black rounded"
        />

        <button
          disabled={loading}
          className="w-full p-2 text-black bg-white rounded"
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
      setReviews(res.data.reviews || res.data || []);
    } catch (error) {
      console.error("Fetch reviews error:", error);
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

  if (loading) {
    return (
      <div className="py-10 text-sm text-center text-gray-500">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-500">{reviews.length} reviews</p>
        <button
          onClick={fetch_}
          className="px-4 py-2 text-sm text-gray-300 bg-white/5 rounded-xl hover:bg-white/10"
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
        const userName = getUserName(r);
        const productInfo = getProductInfo(r);

        return (
          <div
            key={r._id}
            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4"
          >
            {confirmDelete === r._id ? (
              <div>
                <p className="mb-3 text-sm text-white">Delete this review?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(r._id)}
                    disabled={deletingId === r._id}
                    className="flex-1 py-2 text-white bg-red-500 rounded-xl"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2 text-gray-300 bg-white/5 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center text-white rounded-full w-9 h-9 bg-white/10">
                  {userName.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-white">{userName}</p>
                  <Stars rating={r.rating} />
                  <p className="text-sm text-gray-400">{r.comment}</p>
                  <p className="text-xs text-gray-600">
                    Product: {productInfo}
                  </p>
                </div>

                <button
                  onClick={() => setConfirmDelete(r._id)}
                  className="text-xs text-red-400"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
