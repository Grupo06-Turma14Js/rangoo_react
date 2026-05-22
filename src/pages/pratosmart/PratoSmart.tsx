import { useState } from "react";
import { Leaf, Heart, Package, Lightbulb } from "@phosphor-icons/react";

interface IMCResult {
  valor: number;
  classificacao: string;
  dica: string;
}

function calcularIMC(peso: number, altura: number): IMCResult {
  const h = altura / 100;
  const imc = peso / (h * h);

  if (imc < 18.5) return {
    valor: imc,
    classificacao: "Abaixo do peso",
    dica: "Seu IMC indica abaixo do peso ideal. Recomendamos refeições com maior aporte calórico e proteico para ajudar a atingir um peso saudável.",
  };
  if (imc < 25) return {
    valor: imc,
    classificacao: "Peso saudável",
    dica: "Seu IMC está dentro da faixa saudável. Continue mantendo uma alimentação equilibrada e hábitos saudáveis com nossas refeições de bem-estar cuidadosamente selecionadas.",
  };
  if (imc < 30) return {
    valor: imc,
    classificacao: "Sobrepeso",
    dica: "Seu IMC indica sobrepeso. Nossas refeições leves e nutritivas podem te ajudar a retomar o equilíbrio de forma saborosa e saudável.",
  };
  if (imc < 35) return {
    valor: imc,
    classificacao: "Obesidade grau I",
    dica: "Recomendamos refeições com controle calórico e alto valor nutricional para apoiar sua jornada de saúde.",
  };
  return {
    valor: imc,
    classificacao: "Obesidade grau II+",
    dica: "Priorize refeições ricas em fibras e proteína magra. Nossas opções especializadas podem ser um ótimo ponto de partida.",
  };
}

export default function PratoSmart() {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<IMCResult | null>(null);

  function handleCalcular() {
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    if (!p || !a || p <= 0 || a <= 0) return;
    setResultado(calcularIMC(p, a));
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans">

      {/* ── HERO ── */}
      <section className="px-8 py-12 pt-68 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2d5a27] leading-tight mb-4">
            Descubra os alimentos ideais para você
          </h1>
          <p className="text-sm text-[#5a6a52] leading-relaxed mb-8 max-w-xs">
            A Rangoo combina tecnologia de ponta com ciência nutricional especializada para recomendar refeições saudáveis e personalizadas, elaboradas especificamente para sua composição corporal e objetivos de bem-estar.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => document.getElementById("imc-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#2d5a27] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#3d7535] transition"
            >
              Calcule IMC
            </button>
          </div>
        </div>

        <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-lg shrink-0">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
            alt="Prato saudável"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── IMC ── */}
      <section id="imc-section" className="px-8 py-16 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Calcule o seu IMC</h2>
        <p className="text-sm text-[#7a8a72] leading-relaxed mb-10">
          Insira seus dados abaixo e nosso algoritmo inteligente analisará sua composição corporal para recomendar as refeições perfeitas para a sua jornada de bem-estar.
        </p>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8ede4] p-8 text-left mb-6">
          <div className="mb-5">
            <label className="block text-xs text-[#5a6a52] mb-1.5">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full border border-[#dde5d8] rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] placeholder-[#b0bca8] focus:outline-none focus:ring-2 focus:ring-[#2d5a27] transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs text-[#5a6a52] mb-1.5">Peso (Kg)</label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ex.: 70"
                className="w-full border border-[#dde5d8] rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] placeholder-[#b0bca8] focus:outline-none focus:ring-2 focus:ring-[#2d5a27] transition"
              />
            </div>
            <div>
              <label className="block text-xs text-[#5a6a52] mb-1.5">Tamanho (cm)</label>
              <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ex.: 175"
                className="w-full border border-[#dde5d8] rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] placeholder-[#b0bca8] focus:outline-none focus:ring-2 focus:ring-[#2d5a27] transition"
              />
            </div>
          </div>

          <button
            onClick={handleCalcular}
            className="w-full bg-[#2d5a27] hover:bg-[#3d7535] text-white text-sm font-semibold py-3 rounded-full transition active:scale-95"
          >
            Calcular meu IMC
          </button>
        </div>

        {/* Resultado */}
        {resultado && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8ede4] p-8 text-center">
            <p className="text-sm text-[#7a8a72] mb-4">Resultado</p>

            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-6xl font-light text-[#1a1a1a]">
                {resultado.valor.toFixed(1)}
              </span>
              <span className="text-lg text-[#7a8a72]">IMC</span>
            </div>

            <span className="inline-block border border-[#c8d8b8] text-[#5a6a52] text-sm px-5 py-1.5 rounded-full mb-6">
              {resultado.classificacao}
            </span>

            <div className="bg-[#f5f5f0] rounded-xl p-4 text-left flex gap-3">
              <div className="w-8 h-8 bg-[#e8ede4] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb size={16} color="#5a6a52" weight="duotone" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1a1a1a] mb-1">Dica personalizada</p>
                <p className="text-xs text-[#5a6a52] leading-relaxed">{resultado.dica}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── BENEFÍCIOS ── */}
      <section className="bg-[#c8d8b8] px-8 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#2d5a27] mb-1">Benefícios a Saúde</h2>
          <p className="text-sm text-[#5a6a52] mb-10">Combinamos tecnologia e excelência.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#e8f5e0] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Leaf size={24} color="#2d5a27" weight="duotone" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Ingredientes Frescos</h3>
              <p className="text-xs text-[#7a8a72] leading-relaxed">
                Cada refeição é elaborada com produtos orgânicos de alta qualidade, escolhidos criteriosamente pelo nosso time para maximizar o sabor e os nutrientes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#fde8e8] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart size={24} color="#e05c5c" weight="duotone" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Nutrição Personalizada</h3>
              <p className="text-xs text-[#7a8a72] leading-relaxed">
                Nossa algoritmo com inteligência artificial analisa seu IMC, seus objetivos e suas preferências para criar planos alimentares personalizados para você.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#e8f0fe] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package size={24} color="#4a6ee0" weight="duotone" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Entrega rápida e saudável</h3>
              <p className="text-xs text-[#7a8a72] leading-relaxed">
                Receba suas refeições personalizadas e saudáveis em minutos, preservando o seu sabor e praticidade.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}