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
        width="20"
        height="20"
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
        width="20"
        height="20"
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
        width="20"
        height="20"
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
  const [view, setView] = useState("list");
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

/* ── MAIN ADMIN PAGE ── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const renderTab = () => {
    if (activeTab === "products") return <ProductsTab />;
    if (activeTab === "reviews") return <ReviewsTab />;
    if (activeTab === "orders") return <OrdersList />;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR (desktop: always visible, mobile: slide-in drawer) ── */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 lg:w-60
          flex-shrink-0 bg-[#1a1a1a] border-r border-white/5 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
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
          <span className="text-sm font-black tracking-tight text-white">
            Admin Panel
          </span>
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-gray-500 transition hover:text-white lg:hidden"
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
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-medium ${
                activeTab === item.id
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition text-sm"
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
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-w-0 pb-20 overflow-auto lg:pb-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur border-b border-white/5 px-4 lg:px-6 py-4 flex items-center gap-3">
          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex-shrink-0 text-gray-400 transition lg:hidden hover:text-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-black text-white capitalize lg:text-xl">
              {activeTab}
            </h1>
            <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">
              Manage your store's {activeTab}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl p-4 lg:p-6">{renderTab()}</div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="fixed bottom-0 inset-x-0 z-20 bg-[#1a1a1a]/95 backdrop-blur border-t border-white/5 flex lg:hidden">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${
              activeTab === item.id ? "text-white" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
            {activeTab === item.id && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-white rounded-full" />
            )}
          </button>
        ))}
        {/* Logout on bottom nav */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center flex-1 gap-1 py-3 text-gray-500 transition hover:text-red-400"
        >
          <svg
            width="20"
            height="20"
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
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
}
