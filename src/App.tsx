import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { InventoryProvider } from "./context/InventoryContext";
import Layout from "./components/Layout";
import RestockManager from "./utils/RestockManager";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import LookbookPage from "./pages/LookbookPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFailure from "./pages/CheckoutFailure";
import CheckoutPending from "./pages/CheckoutPending";

function App() {
  return (
    <InventoryProvider>
      <CartProvider>
        <RestockManager />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/failure" element={<CheckoutFailure />} />
            <Route path="/checkout/pending" element={<CheckoutPending />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/lookbook" element={<LookbookPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </InventoryProvider>
  );
}

export default App;
