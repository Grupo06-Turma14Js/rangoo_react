import { useState } from "react";
import { Leaf, Heart, Package, Lightbulb, ArrowLeft, ArrowRight, Spinner } from "@phosphor-icons/react";
import { session, produtoApi, type Produto, type Objetivo } from "../../services/api";
import feedbackBg from "../../assets/images/feedback-bg.png";

interface IMCResult {
    valor: number;
    classificacao: string;
    dica: string;
}

function calcularIMC(peso: number, altura: number): IMCResult {
    const h = altura / 100;
    const imc = peso / (h * h);
    if (imc < 18.5) return { valor: imc, classificacao: "Abaixo do peso", dica: "Seu IMC indica abaixo do peso ideal. Recomendamos refeições com maior aporte calórico e proteico para ajudar a atingir um peso saudável." };
    if (imc < 25)   return { valor: imc, classificacao: "Peso saudável",   dica: "Seu IMC está dentro da faixa saudável. Continue mantendo uma alimentação equilibrada e hábitos saudáveis com nossas refeições de bem-estar cuidadosamente selecionadas." };
    if (imc < 30)   return { valor: imc, classificacao: "Sobrepeso",       dica: "Seu IMC indica sobrepeso. Nossas refeições leves e nutritivas podem te ajudar a retomar o equilíbrio de forma saborosa e saudável." };
    if (imc < 35)   return { valor: imc, classificacao: "Obesidade grau I", dica: "Recomendamos refeições com controle calórico e alto valor nutricional para apoiar sua jornada de saúde." };
    return { valor: imc, classificacao: "Obesidade grau II+", dica: "Priorize refeições ricas em fibras e proteína magra. Nossas opções especializadas podem ser um ótimo ponto de partida." };
}

const OBJETIVOS: { id: Objetivo; label: string; emoji: string }[] = [
    { id: "emagrecimento", label: "Emagrecimento",  emoji: "🔥" },
    { id: "ganho-massa",   label: "Ganho de massa", emoji: "💪" },
    { id: "vegetariano", label: "Vegetariano", emoji: "🥦" },
    { id: "diabetico",     label: "Diabético",       emoji: "🩺" },
    { id: "sem-lactose",   label: "Sem lactose",     emoji: "🥛" },
    { id: "sem-gluten",    label: "Sem glúten",      emoji: "🌾" },
];

const VISIBLE = 4;

export default function PratoSmart() {
    const usuario = session.getUsuario();

    const [nome]          = useState(usuario?.nome ?? "");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [resultado, setResultado] = useState<IMCResult | null>(null);
    const [objetivo, setObjetivo]   = useState<Objetivo | null>(null);
    const [produtos, setProdutos]   = useState<Produto[]>([]);
    const [loadingProd, setLoadingProd] = useState(false);
    const [carouselIdx, setCarouselIdx] = useState(0);

    function handleCalcular() {
        const p = parseFloat(peso);
        const a = parseFloat(altura);
        if (!p || !a || p <= 0 || a <= 0) return;
        setResultado(calcularIMC(p, a));
        setObjetivo(null);
        setProdutos([]);
        setCarouselIdx(0);
    }

    async function handleObjetivo(obj: Objetivo) {
        if (!resultado) return;
        setObjetivo(obj);
        setLoadingProd(true);
        setProdutos([]);
        setCarouselIdx(0);
        try {
            const data = await produtoApi.findRecomendados(resultado.valor, obj);
            setProdutos(data);
        } catch {
            setProdutos([]);
        } finally {
            setLoadingProd(false);
            setTimeout(() => document.getElementById("recomendados")?.scrollIntoView({ behavior: "smooth" }), 100);
        }
    }

    const maxIdx = Math.max(0, produtos.length - VISIBLE);
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

                <div className="bg-white rounded-2xl shadow-sm border border-[#e8ede4] p-8 text-left mb-6">
                    <div className="mb-5">
                        <label className="block text-xs text-[#5a6a52] mb-1.5">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            readOnly
                            placeholder="Seu nome"
                            className="w-full border border-[#dde5d8] rounded-lg px-4 py-2.5 text-sm text-[#1a1a1a] bg-[#f5f5f0] placeholder-[#b0bca8] cursor-default focus:outline-none"
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

                        <div className="bg-[#f5f5f0] rounded-xl p-4 text-left flex gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#e8ede4] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                <Lightbulb size={16} color="#5a6a52" weight="duotone" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-[#1a1a1a] mb-1">Dica personalizada</p>
                                <p className="text-xs text-[#5a6a52] leading-relaxed">{resultado.dica}</p>
                            </div>
                        </div>

                        {/* ── MENU DE OBJETIVOS ── */}
                        <div className="border-t border-[#e8ede4] pt-6">
                            <p className="text-sm font-semibold text-[#1a1a1a] mb-4">Qual é o seu objetivo?</p>
                            <div className="grid grid-cols-2 gap-2">
                                {OBJETIVOS.map((obj) => (
                                    <button
                                        key={obj.id}
                                        onClick={() => handleObjetivo(obj.id)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all
                                            ${objetivo === obj.id
                                                ? "bg-[#2d5a27] text-white border-[#2d5a27]"
                                                : "bg-white text-[#5a6a52] border-[#dde5d8] hover:border-[#2d5a27] hover:text-[#2d5a27]"}
                                            ${obj.id === "sem-gluten"}`}
                                    >
                                        <span>{obj.emoji}</span>
                                        {obj.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* ── RECOMENDADOS ── */}
            {resultado && objetivo && (
                <section id="recomendados" className="px-8 py-12 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 text-center">Recomendado para você</h2>
                    <p className="text-sm text-[#7a8a72] text-center mb-10 max-w-xl mx-auto leading-relaxed">
                        Com base no seu IMC e no objetivo selecionado, aqui estão as refeições que nosso algoritmo selecionou para o seu bem-estar.
                    </p>

                    {/* Loading */}
                    {loadingProd && (
                        <div className="flex justify-center py-16">
                            <Spinner size={36} color="#2d5a27" className="animate-spin" />
                        </div>
                    )}

                    {/* Vazio */}
                    {!loadingProd && produtos.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-[#7a8a72] text-sm">Nenhum produto encontrado para este perfil.</p>
                        </div>
                    )}

                    {/* Carousel */}
                    {!loadingProd && produtos.length > 0 && (
                        <div className="relative">
                            <button
                                onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))}
                                disabled={!canPrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white border border-[#e8ede4] shadow flex items-center justify-center hover:bg-[#f5f5f0] transition disabled:opacity-30"
                            >
                                <ArrowLeft size={18} color="#2d5a27" weight="bold" />
                            </button>

                            <div className="overflow-hidden">
                                <div
                                    className="flex gap-4 transition-transform duration-300"
                                    style={{ transform: `translateX(calc(-${carouselIdx * (100 / VISIBLE)}% - ${carouselIdx * 4}px))` }}
                                >
                                    {produtos.map((p) => (
                                        <div
                                            key={p.id}
                                            className="bg-white rounded-2xl border border-[#e8ede4] shadow-sm shrink-0 overflow-hidden flex flex-col"
                                            style={{ width: `calc(${100 / VISIBLE}% - 12px)` }}
                                        >
                                            <div className="relative h-36 overflow-hidden bg-[#e8ede4]">
                                                <span className="absolute top-2 left-2 bg-[#2d5a27] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full z-10">
                                                    Saudável
                                                </span>
                                                {p.foto ? (
                                                    <img
                                                        src={p.foto}
                                                        alt={p.nome}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            const img = e.target as HTMLImageElement;
                                                            img.onerror = null;
                                                            img.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Leaf size={32} color="#c8d8b8" weight="duotone" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex flex-col flex-1">
                                                <p className="text-xs font-bold text-[#1a1a1a] mb-1 leading-snug">{p.nome}</p>
                                                <p className="text-[10px] text-[#7a8a72] leading-relaxed mb-3 flex-1">{p.descricao}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-[#1a1a1a]">
                                                        R$ {Number(p.preco).toFixed(2)}
                                                    </span>
                                                    <button className="bg-[#2d5a27] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full hover:bg-[#3d7535] transition">
                                                        Peça Agora
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setCarouselIdx((i) => Math.min(maxIdx, i + 1))}
                                disabled={!canNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-[#f97316] shadow flex items-center justify-center hover:bg-[#ea6c0a] transition disabled:opacity-30"
                            >
                                <ArrowRight size={18} color="white" weight="bold" />
                            </button>
                        </div>
                    )}
                </section>
            )}

            {/* ── BENEFÍCIOS ── */}
                    <section
                    className="w-full py-20 px-8 overflow-hidden relative bg-no-repeat bg-top"
                    style={{
                        backgroundImage: `url(${feedbackBg})`,
                        backgroundSize: "100% auto",
                    }}
                    >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#2d5a27] mb-1">Benefícios a Saúde</h2>
                    <p className="text-sm text-[#5a6a52] mb-10">Combinamos tecnologia + excelência.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-[#e8f5e0] rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Leaf size={24} color="#2d5a27" weight="duotone" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Ingredientes Frescos</h3>
                            <p className="text-xs text-[#7a8a72] leading-relaxed">
                                Cada refeição é elaborada com produtos orgânicos de origem local, colhidos no auge da frescura para maximizar o sabor e os nutrientes.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-[#fde8e8] rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Heart size={24} color="#e05c5c" weight="duotone" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Nutrição Personalizada</h3>
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