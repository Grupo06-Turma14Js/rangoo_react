import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Sobre from "./pages/Sobre/Sobre";
import Products from "./pages/Produtos/Produto";
import PratoSmart from "./pages/pratosmart/PratoSmart";

import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";


function Layout() {
  const location = useLocation();

  // esconde navbar/footer no login e cadastro
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <div className="min-h-screen flex flex-col bg-[#050A14] text-white font-inter">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* ROTAS PÚBLICAS */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/home" element={<Home />} />

          <Route path="/sobre" element={<Sobre />} />

          <Route path="/produtos" element={<Products />} />

          <Route path="/PratoSmart" element={<PratoSmart />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
