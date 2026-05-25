import { useState } from "react";
import { Leaf, Heart, Package, Lightbulb, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { session } from "../../services/api";

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

const refeicoes = [
    {
        nome: "Grilled Salmon Plate",
        desc: "Salmão grelhado com legumes frescos da época, azeite e ervas finas.",
        preco: "R$ 24,90",
        cal: "380 kcal",
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
    },
    {
        nome: "Matcha Energy Ball",
        desc: "Bolinhos de matcha com aveia, mel e sementes de chia.",
        preco: "R$ 6,50",
        cal: "210 kcal",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    },
    {
        nome: "Mediterranean Salad",
        desc: "Mix de folhas, tomate, pepino, azeitona e queijo feta.",
        preco: "R$ 16,50",
        cal: "290 kcal",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    },
    {
        nome: "Organic Oatmeal Bowl",
        desc: "Aveia orgânica com frutas vermelhas, granola e mel silvestre.",
        preco: "R$ 13,50",
        cal: "340 kcal",
        img: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&q=80",
    },
    {
        nome: "Grilled Salmon Plate",
        desc: "Salmão grelhado com legumes frescos da época, azeite e ervas finas.",
        preco: "R$ 24,90",
        cal: "380 kcal",
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
    },
    {
        nome: "Matcha Energy Ball",
        desc: "Bolinhos de matcha com aveia, mel e sementes de chia.",
        preco: "R$ 6,50",
        cal: "210 kcal",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    },
];

const VISIBLE = 4;

export default function PratoSmart() {
    const usuario = session.getUsuario();
    const [nome, setNome] = useState((usuario?.nome ?? ""));
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [resultado, setResultado] = useState<IMCResult | null>(null);
    const [carouselIdx, setCarouselIdx] = useState(0);

    function handleCalcular() {
        const p = parseFloat(peso);
        const a = parseFloat(altura);
        if (!p || !a || p <= 0 || a <= 0) return;
        setResultado(calcularIMC(p, a));
    }

    const maxIdx = refeicoes.length - VISIBLE;
    const canPrev = carouselIdx > 0;
    const canNext = carouselIdx < maxIdx;

    return (
        <div className="min-h-screen bg-[#f5f5f0] font-sans">

            {/* ── HERO ── */}
            <section className="px-8 py-12 pt-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a27] leading-tight mb-4">
                        Descubra os alimentos ideais para você
                    </h1>
                    <p className="text-sm text-[#5a6a52] leading-relaxed mb-8 max-w-sm">
                        A Rangoo combina tecnologia de ponta com ciência nutricional especializada para recomendar refeições saudáveis e personalizadas, elaboradas especificamente para sua composição corporal e objetivos de bem-estar.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => document.getElementById("imc-section")?.scrollIntoView({ behavior: "smooth" })}
                            className="bg-[#2d5a27] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#3d7535] transition"
                        >
                            Calcule IMC
                        </button>
                        <button className="border border-[#2d5a27] text-[#2d5a27] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#e8ede4] transition">
                            Saiba Mais
                        </button>
                    </div>
                </div>

                <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
                        alt="Prato saudável"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* ── IMC ── */}
            <section id="imc-section" className="px-8 py-16 max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Calcule o seu IMC</h2>
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
                            readOnly
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

            {/* ── RECOMENDADO PARA VOCÊ ── */}
            {resultado && (
                <section className="px-8 py-12 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 text-center">Recomendado para você</h2>
                    <p className="text-sm text-[#7a8a72] text-center mb-10 max-w-xl mx-auto leading-relaxed">
                        Com base no seu IMC e na sua meta de estilo de vida saudável, aqui estão as refeições que nosso algoritmo de nutrição selecionou para o seu bem-estar ideal.
                    </p>

                    <div className="relative">
                        {/* Botão esquerdo */}
                        <button
                            onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))}
                            disabled={!canPrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white border border-[#e8ede4] shadow flex items-center justify-center hover:bg-[#f5f5f0] transition disabled:opacity-30"
                        >
                            <ArrowLeft size={18} color="#2d5a27" weight="bold" />
                        </button>

                        {/* Cards */}
                        <div className="overflow-hidden">
                            <div
                                className="flex gap-4 transition-transform duration-300"
                                style={{ transform: `translateX(calc(-${carouselIdx * (100 / VISIBLE)}% - ${carouselIdx * 4}px))` }}
                            >
                                {refeicoes.map((r, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl border border-[#e8ede4] shadow-sm shrink-0 overflow-hidden flex flex-col"
                                        style={{ width: `calc(${100 / VISIBLE}% - 12px)` }}
                                    >
                                        <div className="relative h-36 overflow-hidden">
                                            <span className="absolute top-2 left-2 bg-[#2d5a27] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full z-10">
                                                Saudável
                                            </span>
                                            <img src={r.img} alt={r.nome} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <p className="text-xs font-bold text-[#1a1a1a] mb-1 leading-snug">{r.nome}</p>
                                            <p className="text-[10px] text-[#7a8a72] leading-relaxed mb-2 flex-1">{r.desc}</p>
                                            <p className="text-[10px] text-[#b0bca8] mb-3">🔥 {r.cal}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-[#1a1a1a]">{r.preco}</span>
                                                <button className="bg-[#2d5a27] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full hover:bg-[#3d7535] transition">
                                                    Peça Agora
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botão direito */}
                        <button
                            onClick={() => setCarouselIdx((i) => Math.min(maxIdx, i + 1))}
                            disabled={!canNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-[#f97316] shadow flex items-center justify-center hover:bg-[#ea6c0a] transition disabled:opacity-30"
                        >
                            <ArrowRight size={18} color="white" weight="bold" />
                        </button>
                    </div>
                </section>
            )}

            {/* ── TORN PAPER DIVIDER ── */}
            <div className="w-full overflow-hidden leading-none mt-8" style={{ height: "80px" }}>
                <svg
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,45 L8,38 L18,50 L28,32 L40,48 L52,28 L62,44 L75,22 L88,42 L100,18 L114,40 L126,15 L140,38 L155,10 L168,35 L182,8 L196,32 L210,5 L225,30 L240,8 L255,35 L270,12 L285,38 L300,15 L316,40 L332,10 L348,36 L365,8 L382,34 L400,6 L418,32 L436,4 L455,30 L474,6 L493,34 L512,2 L532,28 L552,0 L572,26 L592,4 L612,32 L633,2 L654,30 L675,5 L696,33 L718,8 L740,36 L762,6 L785,34 L808,4 L832,30 L856,2 L880,28 L904,0 L928,26 L952,4 L976,32 L1000,2 L1024,30 L1048,5 L1072,33 L1096,8 L1120,36 L1144,6 L1168,34 L1192,4 L1216,30 L1240,2 L1264,28 L1288,6 L1312,34 L1336,8 L1360,36 L1384,10 L1408,38 L1432,12 L1440,30 L1440,80 L0,80 Z"
                        fill="#c8d8b8"
                    />
                </svg>
            </div>

            {/* ── BENEFÍCIOS ── */}
            <section className="bg-[#c8d8b8] px-8 py-14">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#2d5a27] mb-1">Benefícios a Saúde</h2>
                    <p className="text-sm text-[#5a6a52] mb-10">Combinamos tecnologia + excelência.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-[#e8f5e0] rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Leaf size={24} color="#2d5a27" weight="duotone" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Igredientes Frescos</h3>
                            <p className="text-xs text-[#7a8a72] leading-relaxed">
                                Cada refeição é elaborada com produtos orgânicos de origem local, colhidos no auge da frescura para maximizar o sabor e os nutrientes.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-[#fde8e8] rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Heart size={24} color="#e05c5c" weight="duotone" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Nutriçã Personalizada</h3>
                            <p className="text-xs text-[#7a8a72] leading-relaxed">
                                Nosso algoritmo com inteligência artificial analisa seu IMC, seus objetivos e suas preferências para criar planos alimentares personalizados para o seu corpo.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-[#e8f0fe] rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Package size={24} color="#4a6ee0" weight="duotone" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Entrega rápida e saudável</h3>
                            <p className="text-xs text-[#7a8a72] leading-relaxed">
                                Receba suas refeições personalizadas e frescas em casa em menos de 30 minutos, priorizando saúde e praticidade.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}