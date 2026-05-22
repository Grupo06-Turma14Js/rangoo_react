import { useState } from "react";
import { useRef } from "react";
import bowlSalada from "../assets/images/BowlSalada5.png";

import bebidas from "../assets/images/Bebidas.png";
import maisPedidos from "../assets/images/Mais_pedidos.png";
import marmitas from "../assets/images/Marmitas.png";
import organico from "../assets/images/Organico.png";
import sobremesa from "../assets/images/Sobremesas.png";
import {
  Leaf,
  CookingPot,
  Globe,
  ArrowRight,
  Star,
  Quotes,
  ShoppingCartSimple,
  CheckCircle,
  ClipboardText,
  Timer,
} from "@phosphor-icons/react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Marmitas");

  // Mock de Dados das Categorias
  const categories = [
    "Sobremesas",
    "Marmitas",
    "Bebidas",
    "Orgânicos",
    "Mais Pedidos",
  ];

  // Mock de Dados das Escolhas Saudáveis do Dia
  const products = [
    {
      id: 1,
      name: "Salmão Grelhado com Ervas & Arroz Negro",
      price: "R$ 42,90",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80",
      tag: "Mais Vendido",
    },
    {
      id: 2,
      name: "Bowl de Frango Orgânico com Quinoa",
      price: "R$ 34,50",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
      tag: "Fit",
    },
    {
      id: 3,
      name: "Mix de Folhas Premium com Atum Selado",
      price: "R$ 38,90",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
      tag: "Low Carb",
    },
    {
      id: 4,
      name: "Nhoque de Batata Doce ao Sugo Funcional",
      price: "R$ 32,00",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80",
      tag: "Veggie",
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F5]  space-y-24 overflow-hidden">
      {/* SEÇÃO HERO */}
      <div className="w-full bg-[#D1E2D3] pt-24">
        <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-8 pb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Lado Esquerdo - Textos e Botões */}
            <div className="lg:col-span-7 space-y-6 text-left relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[#2A4B2A]/70 font-sans font-bold text-xs tracking-wider uppercase">
                <Leaf size={14} weight="fill" className="text-[#2A4B2A]" />{" "}
                INGREDIENTES 100% NATURAL
              </span>

              {/* Título Corrigido */}
              <h1 className="tracking-tight leading-[1.1] text-left">
                <span className="block text-[#2A4B2A] font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-2 tracking-wide">
                  PEÇA A SUA
                </span>
                <span className="block font-sans font-black text-5xl sm:text-6xl lg:text-7xl uppercase wrap-break-word">
                  <span className="text-white">COMIDA </span>
                  <span className="text-[#2A4B2A]">SAUDAVEL!</span>
                </span>
              </h1>

              <p className="text-[#2A4B2A]/80 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                Refeições deliciosas e nutritivas, preparadas com ingredientes
                frescos e orgânicos para uma vida melhor.
              </p>

              <div className="flex flex-row items-center gap-4 pt-4">
                <button className="px-8 py-3.5 bg-[#2A4B2A] hover:bg-[#1F3A1F] text-white font-bold rounded-full shadow-lg shadow-black/20 transition-all transform hover:-translate-y-0.5 whitespace-nowrap text-sm sm:text-base">
                  Peça Agora
                </button>
                <button className="px-8 py-3.5 bg-transparent text-white font-bold rounded-full border border-white/60 hover:border-white transition-all whitespace-nowrap text-sm sm:text-base">
                  Saiba Mais
                </button>
              </div>
            </div>

            {/* Lado Direito - Bowl de Salada Redondo e Flutuante */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none w-full animate-float-custom">
                <img
                  src={bowlSalada}
                  alt="Salada Saudável Rangoo"
                  className="w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] scale-105 lg:scale-110"
                />
              </div>
            </div>
          </div>

          {/* BLOCK CLARO DE BENEFÍCIOS (EMBUTIDO CONFORME IMAGEM) */}
          <div className="mt-16 bg-white rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/3 border border-white/50 max-w-4xl relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start">
              {/* Benefício 1 */}
              <div className="flex items-start gap-4 px-2">
                <div className="w-12 h-12 rounded-full bg-[#8EAA90] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Leaf size={22} weight="fill" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">
                    100% Saudavel
                  </h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">
                    Cardápios validados por nutricionistas especializados
                    garantindo o balanço ideal.
                  </p>
                </div>
              </div>

              {/* Benefício 2 */}
              <div className="flex items-start gap-4 px-2 border-t md:border-t-0 md:border-x border-slate-100 pt-6 md:pt-0 md:mx-2">
                <div className="w-12 h-12 rounded-full bg-[#C2D4C4] text-[#2A4B2A] flex items-center justify-center shrink-0">
                  <CookingPot size={22} weight="regular" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">
                    Rico em Nutrição
                  </h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">
                    Densidade nutritiva máxima em cada porção, rico em vitaminas
                    e minerais.
                  </p>
                </div>
              </div>

              {/* Benefício 3 */}
              <div className="flex items-start gap-4 px-2 border-t md:border-t-0 pt-6 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#8EAA90] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Globe size={22} weight="regular" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">
                    Eco Friendly
                  </h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">
                    Embalagens biodegradáveis e processos sustentáveis que
                    respeitam o ambiente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*ESTEIRA INFINITA DE MARCAS (MARQUEE TICKER)*/}
        <div className="w-full bg-[#FAF9F5] border-t-2 border-b-2 border-[#2A4B2A] py-3.5 overflow-hidden select-none relative z-30">
          <div className="animate-marquee-infinite gap-16 items-center">
            {/* Bloco 1 (Conteúdo original) */}
            <div className="flex shrink-0 items-center gap-16 pr-16 text-3xl sm:text-2xl font-logo-rangoo text-[#2A4B2A] tracking-wide">
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
            </div>

            {/* Bloco 2 (Duplicado para criar o efeito infinito perfeito e contínuo) */}
            <div
              className="flex shrink-0 items-center gap-16 pr-16 text-3xl sm:text-2xl font-logo-rangoo text-[#2A4B2A] tracking-wide"
              aria-hidden="true"
            >
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
              <span>Rangoo</span>
              <span className="text-outline-marquee">Rangoo</span>
            </div>
          </div>
        </div>
      </div>
      {/* SEÇÃO: CATEGORIAS (MAIS PEDIDOS)*/}
      <section
        id="categorias-section"
        className="w-full bg-[#FAF9F5] py-16 px-4 sm:px-6 lg:px-8 select-none"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da Seção */}
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#2A4B2A] tracking-tight">
                Categoria
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base font-medium">
                Mais pedidos
              </p>
            </div>

            {/* Botão Ver Todos -> Rola até a listagem ou produtos */}
            <button
              onClick={() =>
                document
                  .getElementById("produtos-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 text-[#2A4B2A] font-sans font-semibold text-sm sm:text-base hover:opacity-80 transition-opacity"
            >
              Ver Todos
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Carrossel / Grid de Cards */}
          <div className="relative flex items-center group">
            {/* Seta Esquerda (Navegação/Estética) */}
            <button className="absolute -left-4 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 hover:bg-slate-50 transition-colors text-slate-700">
              <span className="text-xl font-bold">←</span>
            </button>

            {/* Container de Cards Clicáveis */}
            <div className="w-full flex gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory px-2">
              {/* Card 1: Sobremesas */}
              <div
                onClick={() =>
                  document
                    .getElementById("categoria-sobremesas")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="min-w-52.5 flex-1 snap-start bg-[#FFF7ED] border border-orange-50/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group/card"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-4 mix-blend-multiply group-hover/card:scale-105 transition-transform">
                  <img
                    src={sobremesa}
                    alt="Sobremesas"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-logo-rangoo text-xl text-[#2C2520] font-medium">
                  Sobremesas
                </h3>
              </div>

              {/* Card 2: Marmitas (Destaque Ativo) */}
              <div
                onClick={() =>
                  document
                    .getElementById("categoria-marmitas")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="min-w-[210px] flex-1 snap-start bg-[#E8F0E8] border border-emerald-100/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-[0_12px_24px_-8px_rgba(42,75,42,0.15)] cursor-pointer hover:-translate-y-1 transition-all duration-300 relative group/card"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-4 mix-blend-multiply group-hover/card:scale-105 transition-transform">
                  <img
                    src={marmitas}
                    alt="Marmitas"
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="font-logo-rangoo text-2xl text-[#2A4B2A] font-medium">
                  Marmitas
                </h3>
              </div>

              {/* Card 3: Bebidas */}
              <div
                onClick={() =>
                  document
                    .getElementById("categoria-bebidas")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="min-w-[210px] flex-1 snap-start bg-[#FDF2F4] border border-pink-50/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group/card"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-4 mix-blend-multiply group-hover/card:scale-105 transition-transform">
                  <img
                    src={bebidas}
                    alt="Bebidas"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-logo-rangoo text-xl text-[#3C2025] font-medium">
                  Bebidas
                </h3>
              </div>

              {/* Card 4: Orgânicos */}
              <div
                onClick={() =>
                  document
                    .getElementById("categoria-organicos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="min-w-[210px] flex-1 snap-start bg-[#EEF2FF] border border-indigo-50/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group/card"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-4 mix-blend-multiply group-hover/card:scale-105 transition-transform">
                  <img
                    src={organico}
                    alt="Orgânicos"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-logo-rangoo text-xl text-[#1E253C] font-medium">
                  Orgânicos
                </h3>
              </div>

              {/* Card 5: Mais Pedidos */}
              <div
                onClick={() =>
                  document
                    .getElementById("categoria-mais-pedidos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="min-w-[210px] flex-1 snap-start bg-[#FEFCE8] border border-yellow-50/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group/card"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-4 mix-blend-multiply group-hover/card:scale-105 transition-transform">
                  <img
                    src={maisPedidos}
                    alt="Mais Pedidos"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-logo-rangoo text-xl text-[#3C371E] font-medium">
                  Mais Pedidos
                </h3>
              </div>
            </div>

            {/* Seta Direita Laranja Dinâmica */}
            <button className="absolute -right-4 z-10 w-12 h-12 bg-[#F27A24] rounded-full flex items-center justify-center shadow-lg hover:bg-[#D96516] transition-colors text-white">
              <span className="text-xl font-bold">→</span>
            </button>
          </div>
        </div>
      </section>
      
    {/* SEÇÃO: POR QUE A RANGOO EXISTE? */}
      <section className="w-full bg-[#FAF9F5] py-20 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LADO ESQUERDO: IMAGEM COM SELO DE CERTIFICAÇÃO */}
            <div className="relative group">
              {/* Imagem Principal da Família Cozinhando */}
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80"
                  alt="Família cozinhando junta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Selo: 100% Orgânico Certificado (Posicionado sobre a imagem) */}
              <div className="absolute bottom-8 left-8 bg-[#2A4B2A] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float-custom border border-white/20">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircle size={24} weight="fill" className="text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    Garantia
                  </p>
                  <p className="text-sm font-black">
                    100% Orgânico Certificado
                  </p>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: TEXTOS E DIFERENCIAIS */}
            <div className="space-y-10">
              {/* Cabeçalho do Conteúdo */}
              <div className="space-y-4">
                <span className="text-xs font-black text-[#2A4B2A]/60 tracking-[0.2em] uppercase">
                  NOSSA MISSÃO
                </span>
                <h2 className="text-4xl lg:text-5xl font-logo-rangoo text-[#2A4B2A] leading-tight">
                  Por que a Rangoo existe?
                </h2>
                <p className="text-[#64748B] text-base lg:text-lg leading-relaxed max-w-xl">
                  Acreditamos que alimentação saudável não precisa ser
                  complicada. Na Rangoo, aliamos tecnologia de ponta com ciência
                  nutricional para criar refeições que nutrem corpo e mente.
                  Nossa missão é tornar o bem-estar acessível a todos, sem abrir
                  mão do sabor.
                </p>
              </div>

              {/* Lista de Diferenciais (Tiles) */}
              <div className="space-y-8">
                {/* Item 1: Ingredientes Frescos */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-full bg-[#E8F0E8] text-[#2A4B2A] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <CookingPot size={28} weight="bold" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#0F172A]">
                      Ingredientes Frescos
                    </h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      Trabalhamos apenas com fornecedores locais selecionados.
                      Todos os ingredientes são frescos, orgânicos e sem
                      conservantes.
                    </p>
                  </div>
                </div>

                {/* Item 2: Nutrição Personalizada */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-full bg-[#FFF7ED] text-[#F27A24] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <ClipboardText size={28} weight="bold" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#0F172A]">
                      Nutrição Personalizada
                    </h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      Nosso algoritmo analisa seu IMC, preferências e objetivos
                      para criar planos de refeições sob medida para você.
                    </p>
                  </div>
                </div>

                {/* Item 3: Entrega Rápida e Saudável */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Timer size={28} weight="bold" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#0F172A]">
                      Entrega Rápida e Saudável
                    </h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      Entregamos em até 30 minutos em embalagens sustentáveis e
                      térmicas que mantém a temperatura ideal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ==========================================
          SEÇÃO ESCOLHAS SAUDÁVEIS DO DIA
          ========================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#2A4B2A] tracking-widest uppercase block mb-1">
            Especiais
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            Escolhas Saudáveis do Dia
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden aspect-4/3">
                <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#2A4B2A] border border-white/40 shadow-sm">
                  {product.tag}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 grow flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-orange-500 text-xs font-bold">
                    <Star size={14} weight="fill" />
                    <span>{product.rating}</span>
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug line-clamp-2 group-hover:text-[#2A4B2A] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-black text-[#0F172A]">
                    {product.price}
                  </span>
                  <button className="p-3 rounded-2xl bg-[#F8FAFC] text-[#0F172A] hover:bg-[#2A4B2A] hover:text-white transition-all duration-200 shadow-sm">
                    <ShoppingCartSimple size={18} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ==========================================
          SEÇÃO FEEDBACKS
          ========================================== */}
      <section className="bg-linear-to-b from-white to-[#F8FAFC] py-20 border-t border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 sm:px-12 text-center space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#2A4B2A] tracking-widest uppercase block">
              FEEDBACKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
              O que eles têm a dizer?
            </h2>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-xl relative mt-4">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#2A4B2A] text-white flex items-center justify-center shadow-md">
              <Quotes size={24} weight="fill" />
            </div>

            <p className="text-base sm:text-lg text-[#64748B] italic leading-relaxed font-medium pt-2">
              "Pedir na Rangoo mudou completamente a minha rotina de
              alimentação. As marmitas chegam sempre frescas, tempero no ponto
              certo e com aquela sensação de comida de verdade. Além disso, o
              aplicativo é super prático."
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-slate-200 mb-2 overflow-hidden border-2 border-[#2A4B2A]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Alice Tunker"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-[#0F172A] text-base">
                Alice Tunker
              </h4>
              <span className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">
                Cliente Fiel
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
