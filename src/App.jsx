import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import PartnerSignup from "./pages/PartnerSignup";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./Layout"; // Imported layout wrapper
import './css/index.css'
import { CartProvider } from "./hooks/CartContext";

// Shop routes wrapper with layout integration
function ShopRoutes() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/partner-signup" element={<PartnerSignup />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Customer Storefront (with Cart Context & Global Layout Wrapper) */}
        <Route path="/*" element={<ShopRoutes />} />

        {/* Centralized Admin Dashboard (Isolated from client layout and cart memory) */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;