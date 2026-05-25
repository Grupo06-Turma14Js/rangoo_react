import { useState, useRef, useEffect, useCallback } from "react";
import bowlSalada from "../../assets/images/BowlSalada5.png";
import { FEEDBACKS_DATA } from "../../data/feedbacks";
import feedbackDelivery from "../../assets/images/feedbackDelivery.png";
import feedbackBg from "../../assets/images/feedback-bg.png";

import bebidas from "../../assets/images/Bebidas.png";
import maisPedidos from "../../assets/images/Mais_pedidos.png";
import marmitas from "../../assets/images/Marmitas.png";
import organico from "../../assets/images/Organico.png";
import sobremesa from "../../assets/images/Sobremesas.png";
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
  ArrowLeft,
} from "@phosphor-icons/react";

// ─────────────────────────────────────────────
// Hook: detecta quando um elemento entra na viewport
// ─────────────────────────────────────────────
function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // anima apenas uma vez
        }
      },
      { threshold: 0.15, ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─────────────────────────────────────────────
// Hook: callback ref — aceita vários elementos (para stagger)
// ─────────────────────────────────────────────
function useStaggerInView(
  count: number,
  options: IntersectionObserverInit = {},
) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());

  const setRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      refs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet((prev) => new Set(prev).add(i));
            observer.disconnect();
          }
        },
        { threshold: 0.1, ...options },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [count]);

  return { setRef, visibleSet };
}

// ─────────────────────────────────────────────
// Classes de animação reutilizáveis
// ─────────────────────────────────────────────
const fadeUp = (inView: boolean, delay = 0) =>
  `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

const fadeLeft = (inView: boolean, delay = 0) =>
  `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
  }`;

const fadeRight = (inView: boolean, delay = 0) =>
  `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
    inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
  }`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Marmitas");
  const [activeFeedback, setActiveFeedback] = useState(0);

  const productsRef = useRef<HTMLDivElement | null>(null);

  const scrollProducts = (direction: string) => {
    if (productsRef.current) {
      const { scrollLeft, clientWidth } = productsRef.current;
      const scrollAmount = clientWidth * 0.8;
      productsRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ── Refs de animação por seção ──
  const benefitsSection = useInView();
  const categoriesHeader = useInView();
  const missaoLeft = useInView();
  const missaoRight = useInView();
  const productsHeader = useInView();
  const testimonialsSection = useInView();

  // Stagger para cards de benefícios (3 itens)
  const benefitCards = useStaggerInView(3);
  // Stagger para cards de categoria (5 itens)
  const categoryCards = useStaggerInView(5);
  // Stagger para cards de diferenciais (3 itens)
  const diferenciais = useStaggerInView(3);
  // Stagger para cards de produtos (6 itens)
  const productCards = useStaggerInView(6);

  // ── Dados ──
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
    {
      id: 5,
      name: "Tilápia Grelhada com Purê de Mandioquinha",
      price: "R$ 36,90",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80",
      tag: "Destaque",
    },
    {
      id: 6,
      name: "Strogonoff Vegano de Cogumelos",
      price: "R$ 31,50",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop&q=80",
      tag: "Sem Lactose",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alice Tunker",
      role: "CLIENTE FIEL",
      text: "Pedir na Rangoo mudou completamente a minha rotina de alimentação. As marmitas chegam sempre frescas, tempero no ponto certo e com aquela sensação de comida de verdade. Além disso, o aplicativo é super prático.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Bruno Silva",
      role: "CLIENTE HÁ 6 MESES",
      text: "O plano Smart me ajudou a economizar tempo e manter a dieta sem errar. A entrega é sempre pontual e a variedade de pratos saudáveis impede que a rotina fique enjoativa. Recomendo de olhos fechados!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Camila Rocha",
      role: "ENTUSIASTA FITNESS",
      text: "A qualidade dos ingredientes é nítida logo na primeira garfada. Os vegetais têm cor, o frango é suculento e o sabor é caseiro de verdade. Não passo mais duas horas na cozinha no domingo!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "Diego Ramos",
      role: "FOCO NA DIETA",
      text: "Minha taxa de colesterol despencou depois que troquei o delivery comum pelas marmitas da Rangoo. Saber a quantidade exata de macros em cada prato facilitou muito o meu processo de emagrecimento.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      name: "Elena Martins",
      role: "ROTINA CORRIDA",
      text: "Trabalho home office e mal tinha tempo de almoçar direito. A Rangoo salvou meus dias com refeições ultracongeladas que parecem que foram feitas na hora. O nhoque de batata doce é de outro mundo!",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  ];

  const categoryData = [
    {
      id: "sobremesas",
      label: "Sobremesas",
      count: 18,
      src: sobremesa,
      bg: "bg-[#FFF7ED]",
      border: "border-orange-50/50",
      textColor: "text-[#2C2520]",
      subColor: "text-[#2C2520]/60",
      arrowBg: "bg-[#D97706]",
    },
    {
      id: "marmitas",
      label: "Marmitas",
      count: 52,
      src: marmitas,
      bg: "bg-[#E8F0E8]",
      border: "border-emerald-100/50",
      textColor: "text-[#2A4B2A]",
      subColor: "text-[#2A4B2A]/60",
      arrowBg: "bg-[#2A4B2A]",
    },
    {
      id: "bebidas",
      label: "Bebidas",
      count: 25,
      src: bebidas,
      bg: "bg-[#FDF2F4]",
      border: "border-pink-50/50",
      textColor: "text-[#3C2025]",
      subColor: "text-[#3C2025]/60",
      arrowBg: "bg-[#9F2C43]",
    },
    {
      id: "organicos",
      label: "Orgânicos",
      count: 30,
      src: organico,
      bg: "bg-[#EEF2FF]",
      border: "border-indigo-50/50",
      textColor: "text-[#1E253C]",
      subColor: "text-[#1E253C]/60",
      arrowBg: "bg-[#3B4680]",
    },
    {
      id: "mais-pedidos",
      label: "Mais Pedidos",
      count: 12,
      src: maisPedidos,
      bg: "bg-[#FEFCE8]",
      border: "border-yellow-50/50",
      textColor: "text-[#3C371E]",
      subColor: "text-[#3C371E]/60",
      arrowBg: "bg-[#A1821F]",
    },
  ];

  const diferencialData = [
    {
      icon: CookingPot,
      title: "Ingredientes Frescos",
      desc: "Trabalhamos apenas com fornecedores locais selecionados. Todos os ingredientes são frescos, orgânicos e sem conservantes.",
      bg: "bg-[#E8F0E8]",
      iconColor: "text-[#2A4B2A]",
    },
    {
      icon: ClipboardText,
      title: "Nutrição Personalizada",
      desc: "Nosso algoritmo analisa seu IMC, preferências e objetivos para criar planos de refeições sob medida para você.",
      bg: "bg-[#FFF7ED]",
      iconColor: "text-[#F27A24]",
    },
    {
      icon: Timer,
      title: "Entrega Rápida e Saudável",
      desc: "Entregamos em até 30 minutos em embalagens sustentáveis e térmicas que mantém a temperatura ideal.",
      bg: "bg-[#EEF2FF]",
      iconColor: "text-[#4F46E5]",
    },
  ];

  return (
    <div className="w-full bg-[#F8F6F1] space-y-24 overflow-hidden">
      {/* ── SEÇÃO HERO ── */}
      <div className="w-full bg-[#D1E2D3] pt-24">
        <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-8 pb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Esquerdo — anima ao montar (hero sempre visível) */}
            <div
              className="lg:col-span-7 space-y-6 text-left relative z-10 animate-[fadeSlideUp_0.8s_ease-out_both]"
              style={{ animationFillMode: "both" }}
            >
              <span className="inline-flex items-center gap-1.5 text-[#2A4B2A]/70 font-sans font-bold text-xs tracking-wider uppercase">
                <Leaf size={14} weight="fill" className="text-[#2A4B2A]" />{" "}
                INGREDIENTES 100% NATURAL
              </span>
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
                <button className="px-8 py-3.5 bg-transparent text-[#2A4B2A] font-bold rounded-full border border-[#2A4B2A] hover:bg-[#2A4B2A] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all whitespace-nowrap text-sm sm:text-base">
                  Saiba Mais
                </button>
              </div>
            </div>

            {/* Direito — hero image com delay */}
            <div
              className="lg:col-span-5 relative flex justify-center lg:justify-end animate-[fadeSlideUp_0.9s_0.2s_ease-out_both]"
              style={{ animationFillMode: "both" }}
            >
              <div className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none w-full animate-float-custom">
                <img
                  src={bowlSalada}
                  alt="Salada Saudável Rangoo"
                  className="w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] scale-105 lg:scale-110"
                />
              </div>
            </div>
          </div>

          {/* ── BLOCK DE BENEFÍCIOS — scroll animado ── */}
          <div
            ref={benefitsSection.ref as React.RefObject<HTMLDivElement>}
            className={`mt-5 bg-white rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/3 border border-white/50 max-w-4xl relative z-20 transition-all duration-700 ease-out ${
              benefitsSection.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start">
              {[
                {
                  Icon: Leaf,
                  iconBg: "bg-[#8EAA90]",
                  iconText: "text-white",
                  title: "100% Saudavel",
                  desc: "Cardápios validados por nutricionistas especializados garantindo o balanço ideal.",
                  border: "",
                },
                {
                  Icon: CookingPot,
                  iconBg: "bg-[#C2D4C4]",
                  iconText: "text-[#2A4B2A]",
                  title: "Rico em Nutrição",
                  desc: "Densidade nutritiva máxima em cada porção, rico em vitaminas e minerais.",
                  border:
                    "border-t md:border-t-0 md:border-x border-slate-100 pt-6 md:pt-0 md:mx-2",
                },
                {
                  Icon: Globe,
                  iconBg: "bg-[#8EAA90]",
                  iconText: "text-white",
                  title: "Eco Friendly",
                  desc: "Embalagens biodegradáveis e processos sustentáveis que respeitam o ambiente.",
                  border: "border-t md:border-t-0 pt-6 md:pt-0",
                },
              ].map(({ Icon, iconBg, iconText, title, desc, border }, i) => (
                <div
                  key={i}
                  ref={
                    benefitCards.setRef(i) as React.RefCallback<HTMLDivElement>
                  }
                  className={`flex items-start gap-4 px-2 ${border} transition-all duration-600 ease-out ${
                    benefitCards.visibleSet.has(i)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${iconBg} ${iconText} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <Icon size={22} weight={i === 0 ? "fill" : "regular"} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">
                      {title}
                    </h4>
                    <p className="text-[#64748B] text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="w-full bg-[#FAF9F5] border-t-2 border-b-2 border-[#2A4B2A] py-3.5 overflow-hidden select-none relative z-30">
          <div className="animate-marquee-infinite gap-16 items-center">
            {[1, 2].map((_, bi) => (
              <div
                key={bi}
                className="flex shrink-0 items-center gap-16 pr-16 text-3xl sm:text-2xl font-logo-rangoo text-[#2A4B2A] tracking-wide"
                aria-hidden={bi === 1}
              >
                {[
                  "Rangoo",
                  "Rangoo",
                  "Rangoo",
                  "Rangoo",
                  "Rangoo",
                  "Rangoo",
                  "Rangoo",
                  "Rangoo",
                ].map((t, j) => (
                  <span
                    key={j}
                    className={j % 2 === 1 ? "text-outline-marquee" : ""}
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEÇÃO CATEGORIAS ── */}
      <section
        id="categorias-section"
        className="w-full bg-[#FAF9F5] pt-10 pb-2 px-4 sm:px-6 lg:px-8 select-none"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header da seção — fade up */}
          <div
            ref={categoriesHeader.ref as React.RefObject<HTMLDivElement>}
            className={`flex items-end justify-between mb-6 transition-all duration-700 ease-out ${
              categoriesHeader.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2A4B2A] tracking-widest uppercase block mb-1">
                MAIS PEDIDOS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                Categorias
              </h2>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("produtos-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-1 text-[#2A4B2A] font-sans font-semibold text-xs sm:text-sm hover:opacity-80 transition-opacity"
            >
              Ver Todos <span className="text-base">→</span>
            </button>
          </div>

          {/* Cards de categoria — stagger */}
          <div className="relative flex items-center group">
            <div className="w-full flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory px-2 overflow-visible">
              {categoryData.map((cat, i) => (
                <div
                  key={cat.id}
                  ref={
                    categoryCards.setRef(i) as React.RefCallback<HTMLDivElement>
                  }
                  onClick={() =>
                    document
                      .getElementById(`categoria-${cat.id}`)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`relative min-w-43.75 flex-1 snap-start ${cat.bg} border ${cat.border} rounded-2xl p-4 pb-7 flex flex-col items-center text-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 group/card
                    ${categoryCards.visibleSet.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{
                    transitionDelay: `${i * 100}ms`,
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="w-24 h-24 flex items-center justify-center mb-3 mix-blend-multiply group-hover/card:scale-110 transition-transform duration-300">
                    <img
                      src={cat.src}
                      alt={cat.label}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3
                    className={`font-logo-rangoo text-lg ${cat.textColor} font-medium`}
                  >
                    {cat.label}
                  </h3>
                  <p className={`text-[11px] ${cat.subColor} mt-0.5`}>
                    ({cat.count} opções)
                  </p>
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full ${cat.arrowBg} text-white flex items-center justify-center shadow-md opacity-0 scale-75 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300 z-10`}
                  >
                    <ArrowRight size={16} weight="bold" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO POR QUE A RANGOO EXISTE? ── */}
      <section
        id="porque-rangoo"
        className="w-full bg-[#FAF9F5] pt-6 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Esquerdo — desliza da esquerda */}
            <div
              ref={missaoLeft.ref as React.RefObject<HTMLDivElement>}
              className={`relative group transition-all duration-800 ease-out ${
                missaoLeft.inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
              }`}
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80"
                  alt="Família cozinhando junta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
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

            {/* Direito — desliza da direita */}
            <div
              ref={missaoRight.ref as React.RefObject<HTMLDivElement>}
              className={`space-y-10 transition-all duration-800 ease-out ${
                missaoRight.inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
            >
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

              {/* Diferenciais com stagger */}
              <div className="space-y-8">
                {diferencialData.map(
                  ({ icon: Icon, title, desc, bg, iconColor }, i) => (
                    <div
                      key={i}
                      ref={
                        diferenciais.setRef(
                          i,
                        ) as React.RefCallback<HTMLDivElement>
                      }
                      className={`flex items-start gap-5 group transition-all ease-out ${
                        diferenciais.visibleSet.has(i)
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-10"
                      }`}
                      style={{
                        transitionDelay: `${i * 150}ms`,
                        transitionDuration: "600ms",
                      }}
                    >
                      <div
                        className={`w-14 h-14 rounded-full ${bg} ${iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}
                      >
                        <Icon size={28} weight="bold" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-[#0F172A]">
                          {title}
                        </h4>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO ESCOLHAS SAUDÁVEIS DO DIA ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-16 select-none overflow-hidden bg-[#FAF9F5]">
        {/* Header — fade up */}
        <div
          ref={productsHeader.ref as React.RefObject<HTMLDivElement>}
          className={`mb-10 flex items-center justify-between transition-all duration-700 ease-out ${
            productsHeader.inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#2A4B2A] tracking-widest uppercase block mb-1">
              Especiais
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
              Escolhas Saudáveis do Dia
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollProducts("left")}
              className="w-10 h-10 rounded-full border border-[#2A4B2A]/20 flex items-center justify-center text-[#2A4B2A] hover:bg-[#2A4B2A] hover:text-white transition-all bg-white shadow-sm"
              aria-label="Rolar para esquerda"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => scrollProducts("right")}
              className="w-10 h-10 rounded-full border border-[#2A4B2A]/20 flex items-center justify-center text-[#2A4B2A] hover:bg-[#2A4B2A] hover:text-white transition-all bg-white shadow-sm"
              aria-label="Rolar para direita"
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Cards de produto — stagger */}
        <div
          ref={productsRef}
          className="w-full flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory px-2 overflow-visible"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={productCards.setRef(i) as React.RefCallback<HTMLDivElement>}
              className={`min-w-60 sm:min-w-65 max-w-65 flex-1 snap-start bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group
                ${productCards.visibleSet.has(i) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transitionDuration: "600ms",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="relative overflow-hidden aspect-4/3">
                <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#2A4B2A] border border-white/40 shadow-sm">
                  {product.tag}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 grow flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-orange-500 text-[11px] font-bold">
                    <Star size={12} weight="fill" />
                    <span>{product.rating}</span>
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-sm leading-snug line-clamp-2 group-hover:text-[#2A4B2A] transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-black text-[#0F172A]">
                    {product.price}
                  </span>
                  <button className="p-2.5 rounded-xl bg-[#F8FAFC] text-[#0F172A] hover:bg-[#2A4B2A] hover:text-white transition-all duration-200 shadow-sm">
                    <ShoppingCartSimple size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* ── SEÇÃO FEEDBACKS ── */}
      <section
        className="w-full py-20 px-6 lg:px-12 overflow-hidden relative bg-no-repeat bg-top"
        style={{
          backgroundImage: `url(${feedbackBg})`,
          backgroundSize: "100% auto",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            {/* IMAGEM */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute bottom-0 left-4 w-[90%] h-[90%] bg-[#2A4B2A] rounded-[2.8rem]"></div>

                <img
                  src={feedbackDelivery}
                  alt="Entregador Rangoo"
                  className="relative z-10 w-full max-w-md object-contain"
                />
              </div>
            </div>

            {/* CONTEÚDO */}
            <div className="space-y-6">
              <div>
                <span className="uppercase text-sm font-bold tracking-widest text-[#2A4B2A]/70">
                  Feedbacks
                </span>

                <h2 className="text-4xl lg:text-6xl font-black text-[#1D351D] leading-tight mt-2">
                  O que eles tem a dizer?
                </h2>
              </div>

              {/* CLIENTE */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-3xl font-bold text-[#2A4B2A]">
                    {FEEDBACKS_DATA[activeFeedback].name}
                  </h3>

                  <div className="flex items-center gap-1">
                    {[...Array(FEEDBACKS_DATA[activeFeedback].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={18}
                          weight="fill"
                          className="text-yellow-400"
                        />
                      ),
                    )}
                  </div>
                </div>

                <p className="text-[#2A4B2A]/85 italic text-lg leading-relaxed max-w-2xl">
                  “{FEEDBACKS_DATA[activeFeedback].comment}”
                </p>
              </div>

              {/* AVATARES + BOTÕES */}
              <div className="flex items-center gap-4 pt-4">
                {/* BOTÃO ESQUERDA */}
                <button
                  onClick={() =>
                    setActiveFeedback((prev) =>
                      prev === 0 ? FEEDBACKS_DATA.length - 1 : prev - 1,
                    )
                  }
                  className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-[#2A4B2A] hover:bg-[#2A4B2A] hover:text-white transition-all"
                >
                  <ArrowLeft size={20} weight="bold" />
                </button>

                {/* AVATARES */}
                <div className="flex items-center -space-x-3">
                  {FEEDBACKS_DATA.map((feedback, index) => (
                    <button
                      key={feedback.id}
                      onClick={() => setActiveFeedback(index)}
                      className={`relative transition-all duration-300 ${
                        activeFeedback === index
                          ? "scale-110 z-20"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={feedback.avatar}
                        alt={feedback.name}
                        className={`w-14 h-14 rounded-full object-cover border-4 ${
                          activeFeedback === index
                            ? "border-[#2A4B2A]"
                            : "border-white"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* BOTÃO DIREITA */}
                <button
                  onClick={() =>
                    setActiveFeedback((prev) =>
                      prev === FEEDBACKS_DATA.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="w-12 h-12 rounded-xl bg-[#8AA17D] shadow-md flex items-center justify-center text-white hover:bg-[#2A4B2A] transition-all"
                >
                  <ArrowRight size={20} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
