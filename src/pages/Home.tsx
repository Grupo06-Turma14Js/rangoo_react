import { useState } from 'react';
import { Leaf, Heart, Recycle, ArrowRight, Star, Quotes, ShoppingCartSimple } from '@phosphor-icons/react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Marmitas');

  // Mock de Dados das Categorias
  const categories = ['Sobremesas', 'Marmitas', 'Bebidas', 'Orgânicos', 'Mais Pedidos'];

  // Mock de Dados das Escolhas Saudáveis do Dia
  const products = [
    {
      id: 1,
      name: 'Salmão Grelhado com Ervas & Arroz Negro',
      price: 'R$ 42,90',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80',
      tag: 'Mais Vendido'
    },
    {
      id: 2,
      name: 'Bowl de Frango Orgânico com Quinoa',
      price: 'R$ 34,50',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
      tag: 'Fit'
    },
    {
      id: 3,
      name: 'Mix de Folhas Premium com Atum Selado',
      price: 'R$ 38,90',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
      tag: 'Low Carb'
    },
    {
      id: 4,
      name: 'Nhoque de Batata Doce ao Sugo Funcional',
      price: 'R$ 32,00',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
      tag: 'Veggie'
    }
  ];

  return (
    <div className="pt-24 space-y-24 overflow-hidden">
      
      {/* ==========================================
          SEÇÃO HERO
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informações de Texto */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-100 text-[#166534] text-xs font-bold uppercase tracking-wider">
              <Leaf size={14} weight="fill" /> INGREDIENTES 100% NATURAL
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
              COMIDA SAUDÁVEL!<br />
              <span className="text-[#22C55E]">PEÇA A SUA</span>
            </h1>
            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Refeições deliciosas e nutritivas, preparadas com ingredientes frescos e orgânicos para uma vida melhor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#22C55E] hover:bg-[#166534] text-white font-bold rounded-full shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                Peça Agora 
                <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-[#0F172A] font-semibold rounded-full border border-slate-200 shadow-sm transition-all">
                Saiba Mais
              </button>
            </div>
          </div>

          {/* Mídia da Direita + Elementos Flutuantes */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Círculo Abstrato de Fundo Decorações */}
            <div className="absolute w-[320px] h-80 sm:w-112.5 sm:h-112.5 bg-linear-to-tr from-green-100 to-emerald-50 rounded-full -z-10 blur-xl animate-pulse"></div>
            
            {/* Imagem Hero Principal */}
            <div className="relative max-w-md sm:max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80" 
                alt="Prato Saudável Premium Rangoo" 
                className="rounded-[2.5rem] shadow-2xl object-cover w-full aspect-square border-4 border-white"
              />

              {/* Card Flutuante 1 */}
              <div className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden sm:flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
                  <Star size={20} weight="fill" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#64748B]">Avaliação Média</p>
                  <p className="text-sm font-black text-[#0F172A]">4.9 / 5.0 Estrelas</p>
                </div>
              </div>

              {/* Card Flutuante 2 */}
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden sm:flex items-center gap-3 animate-bounce [animation-duration:5s]">
                <div className="p-2.5 rounded-xl bg-green-100 text-[#22C55E]">
                  <Leaf size={20} weight="fill" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#0F172A]">100% Orgânico</p>
                  <p className="text-xs font-semibold text-[#64748B]">Direto do Produtor</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          CARDS DE BENEFÍCIOS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#22C55E] mb-6 group-hover:bg-[#22C55E] group-hover:text-white transition-colors duration-300">
              <Leaf size={26} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">100% Saudável</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Cardápios validados por nutricionistas especializados garantindo o balanço ideal de macronutrientes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#22C55E] mb-6 group-hover:bg-[#22C55E] group-hover:text-white transition-colors duration-300">
              <Heart size={26} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Rico em Nutrição</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Densidade nutritiva máxima em cada porção, rico em vitaminas e minerais essenciais.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#22C55E] mb-6 group-hover:bg-[#22C55E] group-hover:text-white transition-colors duration-300">
              <Recycle size={26} weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Eco Friendly</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Embalagens biodegradáveis e processos sustentáveis que respeitam o meio ambiente.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================
          SEÇÃO CATEGORIAS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-5 mb-8">
          <div>
            <span className="text-xs font-bold text-[#22C55E] tracking-widest uppercase block mb-1">Escolha por</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Categoria</h2>
          </div>
          <button className="text-sm font-bold text-[#22C55E] hover:text-[#166534] flex items-center gap-1 transition-colors">
            Ver Todos <ArrowRight size={16} weight="bold" />
          </button>
        </div>

        {/* Scroll Horizontal de Categorias Premium */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar mask-image-linear">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeCategory === category
                  ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-md shadow-green-500/15'
                  : 'bg-white text-[#64748B] border-slate-200 hover:border-slate-300 hover:text-[#0F172A]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* ==========================================
          SEÇÃO ESCOLHAS SAUDÁVEIS DO DIA
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#22C55E] tracking-widest uppercase block mb-1">Especiais</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Escolhas Saudáveis do Dia</h2>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              
              {/* Box da Imagem */}
              <div className="relative overflow-hidden aspect-4/3">
                <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#166534] border border-white/40 shadow-sm">
                  {product.tag}
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Informações */}
              <div className="p-6 grow flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-orange-500 text-xs font-bold">
                    <Star size={14} weight="fill" />
                    <span>{product.rating}</span>
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug line-clamp-2 group-hover:text-[#22C55E] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-black text-[#0F172A]">{product.price}</span>
                  <button className="p-3 rounded-2xl bg-[#F8FAFC] text-[#0F172A] hover:bg-[#22C55E] hover:text-white transition-all duration-200 shadow-sm group-active:scale-95">
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#22C55E] tracking-widest uppercase block">FEEDBACKS</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">O que eles têm a dizer?</h2>
          </div>

          {/* Card de Depoimento Premium / Glassmorphism leve */}
          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-xl relative mt-4">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-md shadow-green-500/20">
              <Quotes size={24} weight="fill" />
            </div>

            <p className="text-base sm:text-lg text-[#64748B] italic leading-relaxed font-medium pt-2">
              "Pedir na Rangoo mudou completamente a minha rotina de alimentação. As marmitas chegam sempre frescas, tempero no ponto certo e com aquela sensação de comida de verdade. Além disso, o aplicativo é super prático."
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-slate-200 mb-2 overflow-hidden border-2 border-[#22C55E]">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
                  alt="Alice Tunker"
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="font-bold text-[#0F172A] text-base">Alice Tunker</h4>
              <span className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Cliente Fiel</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}