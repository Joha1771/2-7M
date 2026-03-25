import { useEffect, useRef, useState } from "react";
import axiosInstance from "../config/axios";

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────────── */
function ReviewCard({ review }) {
  const name = review?.user
    ? `${review.user.first_name ?? ""} ${(review.user.last_name ?? "").charAt(0)}.`.trim()
    : (review?.name ?? "Anonymous");

  return (
    <div className="flex-shrink-0 w-[300px] md:w-[360px] bg-white border border-gray-200 rounded-[20px] p-6 snap-start">
      <Stars rating={review?.rating ?? 5} />
      <div className="flex items-center gap-2 mb-3">
        <span className="font-bold text-gray-900 text-[15px]">{name}</span>
        <svg
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
        {review?.comment ?? review?.body ?? ""}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OUR HAPPY CUSTOMERS
───────────────────────────────────────────── */
export function HappyCustomers() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get("/reviews");

        const data = res.data;

        const list =
          data?.reviews ??
          data?.results ??
          data?.data ??
          (Array.isArray(data) ? data : []);

        setReviews(list);
      } catch (err) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-black uppercase tracking-tight text-gray-900 leading-tight max-w-[260px] md:max-w-none">
          Our Happy Customers
        </h2>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      {loading ? (
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[360px] h-[180px] bg-gray-100 rounded-[20px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((r, i) => (
            <ReviewCard key={r?.id ?? i} review={r} />
          ))}
        </div>
      )}
    </section>
  );
}
