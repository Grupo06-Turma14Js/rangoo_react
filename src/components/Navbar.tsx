import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MagnifyingGlass,
  ShoppingCart,
  List,
  X,
} from "@phosphor-icons/react";

import { session } from "../services/api";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { setIsCartOpen, cartItems } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const usuarioLogado = session.getUsuario();

  // Verifica se está na página de produtos
  const isProdutosPage =
    location.pathname.toLowerCase() === "/produtos";

  // Texto branco apenas no topo da página produtos
  const useWhiteText =
    isProdutosPage &&
    !isScrolled &&
    !isMenuOpen;

  function logout() {
    session.clear();
    navigate("/");
  }

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Produtos", path: "/produtos" },
    { name: "Prato Smart", path: "/PratoSmart" },
    { name: "Sobre Nós", path: "/sobre" },
  ];

  const isActive = (path: string) =>
    location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-[#D1E2D3] border-b border-[#C2D4C4] shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/home"
          className="flex items-center shrink-0"
        >
          <span
            className={`text-4xl font-logo-rangoo tracking-tighter transition-colors duration-300 ${
              useWhiteText
                ? "text-white"
                : "text-[#2A4B2A]"
            }`}
          >
            Rangoo
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                useWhiteText
                  ? isActive(link.path)
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                  : isActive(link.path)
                  ? "text-[#2A4B2A]"
                  : "text-[#2A4B2A]/90 hover:text-[#1F3A1F]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AÇÕES */}
        <div className="hidden md:flex items-center gap-6">

          {/* BUSCA */}
          <button
            className={`transition-colors p-1 ${
              useWhiteText
                ? "text-white hover:text-white/80"
                : "text-[#2A4B2A] hover:text-[#1F3A1F]"
            }`}
            aria-label="Buscar"
          >
            <MagnifyingGlass
              size={22}
              weight="regular"
            />
          </button>

          {/* CARRINHO */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`transition-colors p-1 relative ${
              useWhiteText
                ? "text-white hover:text-white/80"
                : "text-[#2A4B2A] hover:text-[#1F3A1F]"
            }`}
            aria-label="Carrinho"
          >
            <ShoppingCart
              size={22}
              weight="regular"
            />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D9A441] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* BOTÃO LOGIN */}
          {usuarioLogado ? (
            <button
              onClick={logout}
              className={`px-9 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-sm ${
                useWhiteText
                  ? "bg-white text-[#2A4B2A] hover:bg-gray-100"
                  : "bg-[#2A4B2A] text-white hover:bg-[#1F3A1F]"
              }`}
            >
              Sair
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`px-9 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer ${
                useWhiteText
                  ? "bg-white text-[#2A4B2A] hover:bg-gray-100"
                  : "bg-[#2A4B2A] text-white hover:bg-[#1F3A1F]"
              }`}
            >
              Entrar
            </button>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-4">

          {/* CARRINHO MOBILE */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`p-1 transition-colors relative ${
              useWhiteText
                ? "text-white"
                : "text-[#2A4B2A]"
            }`}
          >
            <ShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D9A441] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* MENU */}
          <button
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className={`p-1 transition-colors ${
              useWhiteText
                ? "text-white"
                : "text-[#2A4B2A]"
            }`}
          >
            {isMenuOpen ? (
              <X
                size={24}
                weight="bold"
              />
            ) : (
              <List
                size={24}
                weight="bold"
              />
            )}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#D1E2D3] border-t border-[#C2D4C4] p-6 shadow-xl flex flex-col gap-5 animate-fadeIn">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={`text-base font-bold py-1 ${
                isActive(link.path)
                  ? "text-[#1F3A1F]"
                  : "text-[#2A4B2A]"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <hr className="border-[#C2D4C4]" />

          <div className="flex items-center justify-between pt-2">

            <button className="text-[#2A4B2A] flex items-center gap-2 font-semibold text-sm">
              <MagnifyingGlass size={20} />
              Buscar
            </button>

            {usuarioLogado ? (
              <button
                onClick={logout}
                className="px-8 py-2.5 rounded-full bg-[#2A4B2A] text-white font-medium text-sm"
              >
                Sair
              </button>
            ) : (
              <button
                onClick={() => navigate("/")}
                className="px-8 py-2.5 rounded-full bg-[#2A4B2A] text-white font-medium text-sm"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}