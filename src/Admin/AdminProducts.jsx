import { useState, useEffect } from "react";
import axios from "../config/axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── ADD PRODUCT ── */
export function AddProduct({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    description: "",
    pictures: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const body = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
        pictures: form.pictures
          ? form.pictures.split(",").map((s) => s.trim())
          : [],
      };
      await axios.post("/products", body);
      setMsg({ type: "success", text: "Product added successfully!" });
      setForm({
        name: "",
        price: "",
        discount: "",
        description: "",
        pictures: "",
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
    <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-white/5">
      <h3 className="flex items-center gap-2 mb-5 text-lg font-bold text-white">
        <span className="flex items-center justify-center text-sm text-green-400 rounded-lg w-7 h-7 bg-green-500/20">
          +
        </span>
        Add Product
      </h3>
      {msg && (
        <div
          className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${msg.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
        >
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Price & Discount side by side on mobile too */}
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Product Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Classic T-Shirt"
            className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
              Price ($)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="29"
              className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
              Discount (%)
            </label>
            <input
              type="number"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              placeholder="10"
              className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Image URLs (comma separated)
          </label>
          <input
            type="text"
            value={form.pictures}
            onChange={(e) => setForm({ ...form, pictures: e.target.value })}
            placeholder="https://..."
            className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Product description..."
            rows={3}
            className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-sm font-bold text-black transition bg-white rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

/* ── EDIT PRODUCT ── */
export function EditProduct({ product, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    discount: product.discount || "",
    description: product.description || "",
    pictures: (product.pictures || []).join(", "),
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const body = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
        pictures: form.pictures
          ? form.pictures.split(",").map((s) => s.trim())
          : [],
      };
      await axios.put(`/products/${product._id}`, body);
      setMsg({ type: "success", text: "Updated!" });
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
    <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-yellow-500/20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="flex items-center justify-center text-sm text-yellow-400 rounded-lg w-7 h-7 bg-yellow-500/20">
            ✎
          </span>
          Edit Product
        </h3>
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 transition hover:text-white"
        >
          Cancel
        </button>
      </div>
      {msg && (
        <div
          className={`mb-4 px-4 py-2.5 rounded-xl text-sm ${msg.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
        >
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Product Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
              Price ($)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
              Discount (%)
            </label>
            <input
              type="number"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Image URLs (comma separated)
          </label>
          <input
            type="text"
            value={form.pictures}
            onChange={(e) => setForm({ ...form, pictures: e.target.value })}
            className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-sm font-bold text-black transition bg-yellow-400 rounded-xl hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

/* ── PRODUCTS LIST ── */
export function ProductsList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/products");
      setProducts(res.data.products || res.data || []);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_();
  }, []);

  const handleDelete = async (product) => {
    setDeletingId(product._id);
    try {
      await axios.delete(`/products/${product._id}`);
      setProducts((p) => p.filter((x) => x._id !== product._id));
    } catch (error) {
      console.error("Delete error", error);
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="py-10 text-sm text-center text-gray-500">
        Loading products...
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/30 transition text-sm"
        />
        <button
          onClick={fetch_}
          className="px-4 py-2.5 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm flex-shrink-0"
        >
          ↻
        </button>
      </div>
      <p className="mb-3 text-xs text-gray-500">{filtered.length} products</p>

      {filtered.map((p) => (
        <div key={p._id}>
          {confirmDelete?._id === p._id ? (
            <div className="bg-[#1a1a1a] border border-red-500/20 rounded-2xl p-4">
              <p className="mb-1 text-sm font-medium text-white">
                Delete this product?
              </p>
              <p className="mb-4 text-xs text-gray-400 truncate">{p.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(p)}
                  disabled={deletingId === p._id}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-400 disabled:opacity-50 transition"
                >
                  {deletingId === p._id ? "Deleting..." : "Delete"}
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
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:border-white/10 transition">
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0f0f0f] flex-shrink-0">
                {p.pictures?.[0] ? (
                  <img
                    src={p.pictures[0]}
                    alt={p.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-xs text-gray-600">
                    N/A
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {p.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  ${p.price}
                  {p.discount > 0 && (
                    <span className="ml-2 text-red-400">-{p.discount}%</span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-shrink-0 gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="p-2 sm:px-3 sm:py-1.5 bg-yellow-500/10 text-yellow-400 rounded-lg text-xs font-medium hover:bg-yellow-500/20 transition"
                >
                  <span className="hidden sm:inline">Edit</span>
                  <svg
                    className="sm:hidden"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => setConfirmDelete(p)}
                  className="p-2 sm:px-3 sm:py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20 transition"
                >
                  <span className="hidden sm:inline">Delete</span>
                  <svg
                    className="sm:hidden"
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
