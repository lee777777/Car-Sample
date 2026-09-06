import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import PartnerSignup from "./pages/PartnerSignup";
import AdminDashboard from "./pages/AdminDashboard";
import ClientLayout from "./layouts/ClientLayout"; // Imported layout wrapper
import './css/index.css'
import { CartProvider } from "./hooks/CartContext";
import { AdminLayout } from "./layouts/AdminLayout";
import { PartnerDashboard } from "./components/admin/Partners"; 
import { Inquiries } from "./components/admin/Inquiries";
import { Applications } from "./components/admin/Applications";
import { StockUpdate } from "./components/admin/StockUpdate";
import { OrdersPage } from "./components/admin/OrdersPage";
// Shop routes wrapper with layout integration
function ShopRoutes() {
  return (
    <CartProvider>
      <ClientLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/partner-signup" element={<PartnerSignup />} />
        </Routes>
      </ClientLayout>
    </CartProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Customer Storefront (with Cart Context & Global Layout Wrapper) */}
        <Route path="/*" element={<ShopRoutes />} />

        {/* Admin Dashboard (Isolated from client layout and cart memory) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="partners" element={<PartnerDashboard />} />
          <Route path="applications" element={<Applications />} />
           <Route path="inquiries" element={<Inquiries />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="stockUpdate" element={<StockUpdate />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;