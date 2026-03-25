import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Your existing pages/sections
import Hero from "./sections/Hero";
import ProductSections from "./sections/ProductSection";
// ... other existing imports

// Admin imports
import AdminLogin from "./sections/AdminLogin";
import AdminPage from "./sections/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Hero />
        <ProductSections />
        {/* ...rest of your home page */}
      </>
    ),
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
