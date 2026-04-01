import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useFormik } from "formik";
import * as Yup from "yup";

// ── Validation schema ──────────────────────────────────────────────────────────
const reviewSchema = Yup.object({
  productId: Yup.string()
    .min(10, "Product ID looks too short")
    .required("Product ID is required"),

  userName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .required("User name is required"),

  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),

  comment: Yup.string()
    .min(5, "Comment must be at least 5 characters")
    .max(500, "Comment is too long (max 500 chars)")
    .required("Comment is required"),
});

// ── Helpers ────────────────────────────────────────────────────────────────────
function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-400">{msg}</p>;
}

const getProductInfo = (r) => {
  if (r.product && typeof r.product === "object") {
    const name = r.product.name;
    if (typeof name === "string") return name;
    if (name && typeof name === "object")
      return String(name.uz || name.ru || name.en || "");
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
    if (name && typeof name === "object")
      return String(name.uz || name.ru || name.en || "Anonymous");
  }
  return "Anonymous";
};

// ── Stars display ──────────────────────────────────────────────────────────────
const Stars = ({ rating }) => {
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

// ── Star picker for the form ───────────────────────────────────────────────────
function StarPicker({ value, onChange, onBlur }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" onBlur={onBlur}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
          aria-label={`${s} star`}
        >
          <svg width="28" height="28" viewBox="0 0 14 14">
            <path
              d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.632l3.455-.502L7 1z"
              fill={(hovered || value) >= s ? "#FFC633" : "#374151"}
              className="transition-colors"
            />
          </svg>
        </button>
      ))}
      <span className="self-center ml-2 text-sm text-gray-400">
        {value ? `${value}/5` : "Select"}
      </span>
    </div>
  );
}

// ── ADD REVIEW ─────────────────────────────────────────────────────────────────
export function AddReview({ onSuccess }) {
  const [serverMsg, setServerMsg] = useState(null);

  const inputBase =
    "w-full bg-[#0f0f0f] border text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none transition text-sm";

  const formik = useFormik({
    initialValues: {
      productId: "",
      userName: "",
      rating: 5,
      comment: "",
    },
    validationSchema: reviewSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setServerMsg(null);
      try {
        await axios.post("/reviews", {
          ...values,
          rating: Number(values.rating),
        });
        setServerMsg({ type: "success", text: "Review added!" });
        resetForm();
        onSuccess?.();
      } catch (err) {
        setServerMsg({
          type: "error",
          text: err.response?.data?.message || err.message,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const e = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-white/5">
      <h3 className="mb-5 text-lg font-bold text-white">Add Review</h3>

      {serverMsg && (
        <div
          className={`mb-4 px-4 py-2.5 rounded-xl text-sm border ${
            serverMsg.type === "success"
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {serverMsg.text}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* Product ID */}
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Product ID
          </label>
          <input
            name="productId"
            value={formik.values.productId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Product ID from admin list"
            className={`${inputBase} ${
              e("productId")
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          <FieldError msg={e("productId")} />
        </div>

        {/* User Name */}
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            User Name
          </label>
          <input
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="John D."
            className={`${inputBase} ${
              e("userName")
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          <FieldError msg={e("userName")} />
        </div>

        {/* Rating — interactive star picker */}
        <div>
          <label className="block mb-2 text-xs tracking-widest text-gray-400 uppercase">
            Rating
          </label>
          <StarPicker
            value={formik.values.rating}
            onChange={(val) => formik.setFieldValue("rating", val)}
            onBlur={() => formik.setFieldTouched("rating", true)}
          />
          <FieldError msg={e("rating")} />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Comment
          </label>
          <textarea
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Share your experience..."
            rows={3}
            className={`${inputBase} resize-none ${
              e("comment")
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          <div className="flex justify-between mt-1">
            <FieldError msg={e("comment")} />
            <p className="ml-auto text-xs text-gray-600">
              {formik.values.comment.length}/500
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-3 text-sm font-bold text-black transition bg-white rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Adding..." : "Add Review"}
        </button>
      </form>
    </div>
  );
}

// ── REVIEWS LIST ───────────────────────────────────────────────────────────────
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
                <div className="flex items-center justify-center flex-shrink-0 text-sm font-semibold text-white rounded-full w-9 h-9 bg-white/10">
                  {userName.charAt(0).toUpperCase()}
                </div>
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
