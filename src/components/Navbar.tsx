import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  MagnifyingGlass,
  ShoppingCart,
  List,
  X,
} from "@phosphor-icons/react";

import { session } from "../services/api";

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const usuarioLogado = session.getUsuario();

  function logout() {
    session.clear();
    navigate("/");
  }

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Produtos", path: "/produtos" },
    { name: "Objetivos", path: "/Categorias" },
    { name: "Prato Smart", path: "/PratoSmart" },
    { name: "Sobre Nós", path: "/sobre" },
  ];

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#D1E2D3] border-b border-[#C2D4C4] px-4 sm:px-8 lg:px-12 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/home" className="flex items-center shrink-0">
          <span className="text-4xl font-logo-rangoo text-[#2A4B2A] tracking-tighter">
            Rangoo
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[#1F3A1F] ${
                isActive(link.path)
                  ? "text-[#2A4B2A]"
                  : "text-[#2A4B2A]/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AÇÕES */}
        <div className="hidden md:flex items-center gap-6">

          <button
            className="text-[#2A4B2A] hover:text-[#1F3A1F] transition-colors p-1"
            aria-label="Buscar"
          >
            <MagnifyingGlass size={22} weight="regular" />
          </button>

          <button
            className="text-[#2A4B2A] hover:text-[#1F3A1F] transition-colors p-1 relative"
            aria-label="Carrinho"
          >
            <ShoppingCart size={22} weight="regular" />
          </button>

          {usuarioLogado ? (
            <button
              onClick={logout}
              className="px-9 py-2.5 rounded-full bg-[#2A4B2A] hover:bg-[#1F3A1F] text-white font-medium text-sm transition-all duration-200 shadow-sm"
            >
              Sair
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="px-9 py-2.5 rounded-full bg-[#2A4B2A] hover:bg-[#1F3A1F] text-white font-medium text-sm transition-all duration-200 shadow-sm"
            >
              Entrar
            </button>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-4">

          <button className="text-[#2A4B2A] p-1">
            <ShoppingCart size={22} />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#2A4B2A] p-1 transition-colors"
          >
            {isMenuOpen ? (
              <X size={24} weight="bold" />
            ) : (
              <List size={24} weight="bold" />
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
              onClick={() => setIsMenuOpen(false)}
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