import { useState, useEffect } from "react";
// Импортируем твой настроенный axios
import axios from "../config/axios";

// Добавляем интерцептор, чтобы автоматически прикреплять токен к каждому запросу
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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

      // Используем axios.post вместо fetch
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
    <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
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
        {[
          {
            key: "name",
            label: "Product Name",
            placeholder: "e.g. Classic T-Shirt",
          },
          {
            key: "price",
            label: "Price ($)",
            placeholder: "e.g. 29",
            type: "number",
          },
          {
            key: "discount",
            label: "Discount (%)",
            placeholder: "e.g. 10",
            type: "number",
          },
          {
            key: "pictures",
            label: "Image URLs (comma separated)",
            placeholder: "https://...",
          },
        ].map(({ key, label, placeholder, type = "text" }) => (
          <div key={key}>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
              {label}
            </label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/30 transition text-sm"
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Product description..."
            rows={3}
            className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/30 transition text-sm resize-none"
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

      // axios.put
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
    <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-yellow-500/20">
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
        {[
          { key: "name", label: "Product Name" },
          { key: "price", label: "Price ($)", type: "number" },
          { key: "discount", label: "Discount (%)", type: "number" },
          { key: "pictures", label: "Image URLs (comma separated)" },
        ].map(({ key, label, type = "text" }) => (
          <div key={key}>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
              {label}
            </label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/30 transition text-sm"
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/30 transition text-sm resize-none"
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
      // В axios мы просто пишем путь, baseURL берется из конфига
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
          className="px-4 py-2.5 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm"
        >
          ↻ Refresh
        </button>
      </div>
      <p className="mb-3 text-xs text-gray-500">{filtered.length} products</p>
      {filtered.map((p) => (
        <div key={p._id}>
          {confirmDelete?._id === p._id ? (
            <div className="bg-[#1a1a1a] border border-red-500/20 rounded-2xl p-5">
              <p className="mb-1 text-sm font-medium text-white">
                Delete this product?
              </p>
              <p className="mb-4 text-xs text-gray-400 truncate">{p.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(p)}
                  disabled={deletingId === p._id}
                  className="flex-1 py-2 text-sm font-bold text-white transition bg-red-500 rounded-xl hover:bg-red-400 disabled:opacity-50"
                >
                  {deletingId === p._id ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2 text-sm text-gray-300 transition bg-white/5 rounded-xl hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition">
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {p.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  ${p.price}{" "}
                  {p.discount > 0 && (
                    <span className="ml-2 text-red-400">-{p.discount}%</span>
                  )}
                </p>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-lg text-xs font-medium hover:bg-yellow-500/20 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(p)}
                  className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
