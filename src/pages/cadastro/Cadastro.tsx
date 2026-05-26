import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  usuarioApi,
  session,
} from "../../services/api";

export default function Cadastro() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    tipo: "user",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function updateField(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {

      setLoading(true);
      setErro("");

      // cadastra usuário
      await usuarioApi.cadastrar(formData);

      // login automático
      const response = await usuarioApi.logar({
        usuario: formData.usuario,
        senha: formData.senha,
      });

      // salva sessão
      session.save(response);

      // entra direto na aplicação
      navigate("/home");

    } catch (error: any) {

      console.error(error);

      setErro("Erro ao cadastrar usuário: a senha deve conter no mínimo 8 caracteres.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1E2D3] px-4">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 rounded-2xl shadow-xl w-full max-w-md bg-white text-black"
      >

        <h1 className="text-5xl font-logo-rangoo text-[#2A4B2A] tracking-tighter text-center">
          Cadastro
        </h1>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={updateField}
          className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2A4B2A]"
          required
        />

        <input
          type="email"
          name="usuario"
          placeholder="Email"
          value={formData.usuario}
          onChange={updateField}
          className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2A4B2A]"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={updateField}
          className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2A4B2A]"
          required
        />

        <input
          type="text"
          name="foto"
          placeholder="URL da Foto"
          value={formData.foto}
          onChange={updateField}
          className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2A4B2A]"
        />

        {erro && (
          <p className="text-red-500 text-sm text-center">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#2A4B2A] hover:bg-[#1F3A1F] text-white p-3 rounded-lg font-medium transition-all duration-200"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="text-center text-sm text-gray-700">

          Já possui conta?

          <Link
            to="/"
            className="text-[#2A4B2A] font-semibold ml-1 hover:underline"
          >
            Entrar
          </Link>

        </p>

      </form>
    </div>
  );
}