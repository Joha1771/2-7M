import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import DressStyle from "./sections/Dressstyle";
import { Footer } from "./sections/Footer";
import { HappyCustomers } from "./sections/HappyCustomers";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import { Newsletter } from "./sections/Newsletter";
import ProductSections from "./sections/ProductSection";

import AdminLogin from "./Admin/AdminLogin";
import AdminPage from "./Admin/AdminPage";
import ProtectedRoute from "./Admin/ProtectedRoute";
import FilterSection from "./sections/FilterSection";

// Функция для быстрой проверки токена
const isAuthenticated = () => !!localStorage.getItem("admin_token");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Hero />
        <ProductSections />
        <DressStyle />
        <HappyCustomers />
        <Newsletter />
        <Footer />
      </>
    ),
  },
  {
    path: "/admin/login",
    // Если уже залогинен, при попытке зайти на логин кидаем в админку
    element: isAuthenticated() ? (
      <Navigate to="/admin" replace />
    ) : (
      <AdminLogin />
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
    // Если в AdminPage есть вложенные пути (tabs), добавьте children здесь
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/shop",
    element: (
      <>
        <Header />
        <FilterSection />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
