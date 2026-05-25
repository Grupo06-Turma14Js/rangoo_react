import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import CartSidebar from "./components/CardSidebar";
import Home from "./pages/home/Home";
import Produto from "./pages/Produtos/Produto";
import Login from "./pages/login/Login";
import PratoSmart from "./pages/pratosmart/PratoSmart";
import Sobre from "./pages/Sobre/Sobre";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#050A14] text-white font-inter">

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="dark"
          />

          <Navbar />

          <CartSidebar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/produtos" element={<Produto />} />
              <Route path="/PratoSmart" element={<PratoSmart />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;