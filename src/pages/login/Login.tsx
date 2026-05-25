import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  usuarioApi,
  session,
} from "../../services/api";

import bowlSalada from "../../assets/images/BowlSalada5.png";

export default function Login() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {

      setLoading(true);
      setErro("");

      const response = await usuarioApi.logar({
        usuario,
        senha,
      });

      session.save(response);

      navigate("/home");

    } catch (error) {

      console.error(error);

      setErro("Usuário ou senha inválidos");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="min-h-screen bg-[#D1E2D3] flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

        {/* IMAGEM */}
        <div className="hidden lg:flex justify-center">
          <img
            src={bowlSalada}
            alt="Salada Saudável Rangoo"
            className="w-full max-w-xl object-contain drop-shadow-2xl animate-float-custom"
          />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-8 rounded-3xl shadow-2xl w-full max-w-md bg-white text-black mx-auto"
        >

          <h1 className="text-5xl font-logo-rangoo text-[#2A4B2A] tracking-tighter text-center">
            Rangoo
          </h1>

          <p className="text-center text-gray-500 mb-2">
            Entre na sua conta
          </p>

          <input
            type="email"
            placeholder="Email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#2A4B2A]"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#2A4B2A]"
            required
          />

          {erro && (
            <p className="text-red-500 text-sm text-center">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#2A4B2A] hover:bg-[#1F3A1F] text-white p-3 rounded-xl font-medium transition-all duration-200 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm text-gray-700">

            Não possui conta?

            <Link
              to="/cadastro"
              className="text-[#2A4B2A] font-semibold ml-1 hover:underline"
            >
              Criar conta
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}