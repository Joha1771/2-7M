import { useState, useEffect } from "react";

const API = "https://e-commerce-api-v2.nt.azimumarov.uz/api/v1/orders";
const token = () => localStorage.getItem("admin_token");

const STATUS_COLORS = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

/* ── ORDER DETAIL MODAL ── */
function OrderDetail({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70">
      <div className="bg-[#1a1a1a] rounded-3xl p-6 w-full max-w-lg border border-white/10 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Order Details</h3>
          <button
            onClick={onClose}
            className="text-xl leading-none text-gray-500 transition hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Order ID", value: order._id?.slice(-8) || "N/A" },
              { label: "Status", value: order.status || "pending" },
              {
                label: "Customer",
                value: order.userName || order.user?.name || "N/A",
              },
              {
                label: "Total",
                value: order.totalPrice ? `$${order.totalPrice}` : "N/A",
              },
              {
                label: "Created",
                value: order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A",
              },
              { label: "Payment", value: order.paymentMethod || "N/A" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#0f0f0f] rounded-xl px-4 py-3">
                <p className="mb-1 text-xs tracking-widest text-gray-500 uppercase">
                  {label}
                </p>
                <p className="text-sm font-medium text-white truncate">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {order.items?.length > 0 && (
            <div>
              <p className="mb-2 text-xs tracking-widest text-gray-400 uppercase">
                Items
              </p>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#0f0f0f] rounded-xl px-4 py-3 flex justify-between items-center"
                  >
                    <p className="flex-1 text-sm text-white truncate">
                      {item.name || item.product}
                    </p>
                    <p className="ml-3 text-xs text-gray-400">
                      x{item.quantity} · ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.shippingAddress && (
            <div className="bg-[#0f0f0f] rounded-xl px-4 py-3">
              <p className="mb-1 text-xs tracking-widest text-gray-500 uppercase">
                Shipping Address
              </p>
              <p className="text-sm text-white">
                {typeof order.shippingAddress === "string"
                  ? order.shippingAddress
                  : JSON.stringify(order.shippingAddress)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── UPDATE ORDER STATUS ── */
export function UpdateOrderStatus({ order, onSuccess, onCancel }) {
  const [status, setStatus] = useState(order.status || "pending");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`${API}/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setMsg({ type: "success", text: "Status updated!" });
      onSuccess?.();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-blue-500/20 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Update Order Status</h3>
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 transition hover:text-white"
        >
          Cancel
        </button>
      </div>
      <p className="mb-3 text-xs text-gray-500 truncate">
        Order #{order._id?.slice(-8)}
      </p>
      {msg && (
        <div
          className={`mb-3 px-3 py-2 rounded-xl text-xs ${msg.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
        >
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/30 transition text-sm"
        >
          {["pending", "processing", "shipped", "delivered", "cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ),
          )}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-bold py-2.5 rounded-xl hover:bg-blue-400 transition disabled:opacity-50 text-sm"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>
    </div>
  );
}

/* ── ORDERS LIST ── */
export function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      setOrders(data.orders || data || []);
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
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      setOrders((o) => o.filter((x) => x._id !== id));
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  if (loading)
    return (
      <div className="py-10 text-sm text-center text-gray-500">
        Loading orders...
      </div>
    );

  return (
    <div>
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          "all",
          "pending",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === s ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <button
          onClick={fetch_}
          className="ml-auto px-4 py-1.5 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition text-xs"
        >
          ↻ Refresh
        </button>
      </div>

      <p className="mb-3 text-xs text-gray-500">{filtered.length} orders</p>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="py-10 text-sm text-center text-gray-600">
            No orders found
          </div>
        )}

        {filtered.map((o) => (
          <div key={o._id}>
            {updatingOrder?._id === o._id ? (
              <UpdateOrderStatus
                order={o}
                onSuccess={() => {
                  setUpdatingOrder(null);
                  fetch_();
                }}
                onCancel={() => setUpdatingOrder(null)}
              />
            ) : confirmDelete === o._id ? (
              <div className="bg-[#1a1a1a] border border-red-500/20 rounded-2xl p-4">
                <p className="mb-1 text-sm text-white">
                  Delete order #{o._id?.slice(-8)}?
                </p>
                <p className="mb-3 text-xs text-gray-500">
                  This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(o._id)}
                    disabled={deletingId === o._id}
                    className="flex-1 py-2 text-sm font-bold text-white transition bg-red-500 rounded-xl hover:bg-red-400 disabled:opacity-50"
                  >
                    {deletingId === o._id ? "Deleting..." : "Delete"}
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
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-mono text-sm font-semibold text-white">
                      #{o._id?.slice(-8) || "N/A"}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[o.status] || STATUS_COLORS.pending}`}
                    >
                      {o.status || "pending"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {o.userName || o.user?.name || "Unknown customer"}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {o.totalPrice ? `$${o.totalPrice}` : "—"}
                    {o.createdAt &&
                      ` · ${new Date(o.createdAt).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex flex-wrap justify-end flex-shrink-0 gap-2">
                  <button
                    onClick={() => setSelectedOrder(o)}
                    className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-xs hover:bg-white/10 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setUpdatingOrder(o)}
                    className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/20 transition"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => setConfirmDelete(o._id)}
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
    </div>
  );
}
