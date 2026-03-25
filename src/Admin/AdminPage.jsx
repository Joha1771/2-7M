import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddProduct, EditProduct, ProductsList } from "./AdminProducts";
import { AddReview, ReviewsList } from "./AdminReviews";
import { OrdersList } from "./AdminOrders";

/* ── NAV ITEMS ── */
const NAV = [
  {
    id: "products",
    label: "Products",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "orders",
    label: "Orders",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

/* ── PRODUCTS TAB ── */
function ProductsTab() {
  const [view, setView] = useState("list"); // list | add | edit
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setView("edit");
  };

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
    setView("list");
  };

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "list", label: "All Products" },
          { key: "add", label: "+ Add New" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${view === key ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "list" && <ProductsList key={refreshKey} onEdit={handleEdit} />}
      {view === "add" && <AddProduct onSuccess={handleSuccess} />}
      {view === "edit" && editingProduct && (
        <EditProduct
          product={editingProduct}
          onSuccess={handleSuccess}
          onCancel={() => setView("list")}
        />
      )}
    </div>
  );
}

/* ── REVIEWS TAB ── */
function ReviewsTab() {
  const [view, setView] = useState("list");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[
          { key: "list", label: "All Reviews" },
          { key: "add", label: "+ Add Review" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${view === key ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "list" && <ReviewsList key={refreshKey} />}
      {view === "add" && (
        <AddReview
          onSuccess={() => {
            setRefreshKey((k) => k + 1);
            setView("list");
          }}
        />
      )}
    </div>
  );
}

/* ── ORDERS TAB ── */
function OrdersTab() {
  return <OrdersList />;
}

/* ── MAIN ADMIN PAGE ── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const renderTab = () => {
    if (activeTab === "products") return <ProductsTab />;
    if (activeTab === "reviews") return <ReviewsTab />;
    if (activeTab === "orders") return <OrdersTab />;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-60" : "w-16"} flex-shrink-0 bg-[#1a1a1a] border-r border-white/5 flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5">
          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-white rounded-xl">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f0f0f"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </div>
          {sidebarOpen && (
            <span className="text-sm font-black tracking-tight text-white">
              Admin Panel
            </span>
          )}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={`${sidebarOpen ? "ml-auto" : "mx-auto"} text-gray-600 hover:text-white transition`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {sidebarOpen ? (
                <path d="M15 18l-6-6 6-6" />
              ) : (
                <path d="M9 18l6-6-6-6" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-medium ${
                activeTab === item.id
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              } ${!sidebarOpen ? "justify-center" : ""}`}
              title={!sidebarOpen ? item.label : ""}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition text-sm ${!sidebarOpen ? "justify-center" : ""}`}
            title={!sidebarOpen ? "Logout" : ""}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur border-b border-white/5 px-6 py-4">
          <h1 className="text-xl font-black text-white capitalize">
            {activeTab}
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">
            Manage your store's {activeTab}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl p-6">{renderTab()}</div>
      </main>
    </div>
  );
}
