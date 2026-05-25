import { useState, useRef, useEffect, useCallback } from 'react';
import { Leaf, Heart, Calculator, ForkKnife, TrendUp } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────
// Hook: detecta entrada na viewport (anima uma vez)
// ─────────────────────────────────────────────
function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─────────────────────────────────────────────
// Hook: stagger para listas de elementos
// ─────────────────────────────────────────────
function useStaggerInView(count: number, options: IntersectionObserverInit = {}) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSet(prev => new Set(prev).add(i));
          observer.disconnect();
        }
      }, { threshold: 0.1, ...options });
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [count]);

  return { setRef, visibleSet };
}

function Sobre() {
  // ── Refs de seção ──
  const heroText    = useInView();
  const heroImage   = useInView();
  const historiaLeft  = useInView();
  const historiaRight = useInView();
  const inovacaoHeader = useInView();
  const inovacaoLeft   = useInView();
  const inovacaoRight  = useInView();
  const comoHeader  = useInView();
  const filosofia   = useInView();

  // ── Stagger ──
  const inovCards = useStaggerInView(3);
  const steps     = useStaggerInView(3);

  return (
    <div className="w-full bg-[#F8F6F1] text-[#142C14] pt-28 pb-0 font-sans">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Texto */}
          <div
            ref={heroText.ref as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-7 space-y-6 text-center lg:text-left transition-all duration-700 ease-out ${
              heroText.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-logo-rangoo text-[#2D5128] leading-[1.15]">
              Alimentação saudável <br />
              deveria ser simples.
            </h1>

            <p className="text-[#2D5128]/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              A Rangoo foi criada para transformar a alimentação saudável em algo prático, personalizado e delicioso para o dia a dia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#secao-sobre"
                className="px-8 py-3.5 bg-[#2A4B2A] hover:bg-[#1F3A1F] text-white font-bold rounded-full shadow-lg shadow-black/20 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap text-sm sm:text-base active:scale-95"
              >
                Nosso Projeto
              </a>
              <Link
                to="/produtos"
                className="px-8 py-3.5 bg-transparent text-[#2A4B2A] font-bold rounded-full border border-[#2A4B2A] hover:bg-[#2A4B2A] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 whitespace-nowrap text-sm sm:text-base active:scale-95"
              >
                Produtos
              </Link>
            </div>
          </div>

          {/* Imagem hero */}
          <div
            ref={heroImage.ref as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-5 flex justify-center pt-6 lg:pt-0 transition-all duration-800 ease-out ${
              heroImage.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rotate-2 group">
              <div className="absolute inset-0 bg-[#A8B291]/50 rounded-[2.5rem] translate-x-4 translate-y-4 shadow-md transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <div className="absolute inset-0 bg-white p-1 rounded-[2.5rem] shadow-xl overflow-hidden transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]">
                <img
                  src="https://ik.imagekit.io/yytwlza66/rangoo_sobre.png"
                  alt="Bowl saudável Rangoo"
                  className="rounded-[2.2rem] object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
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
              {['Rangoo','Rangoo','Rangoo','Rangoo','Rangoo','Rangoo','Rangoo','Rangoo'].map((t, j) => (
                <span key={j} className={j % 2 === 1 ? 'text-outline-marquee' : ''}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── NOSSA HISTÓRIA ── */}
      <section id="secao-sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-smooth">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Imagem — slide da esquerda */}
          <div
            ref={historiaLeft.ref as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-5 flex justify-center relative transition-all duration-800 ease-out ${
              historiaLeft.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-14'
            }`}
          >
            <div className="max-w-sm sm:max-w-md w-full relative group">
              <img
                src="https://ik.imagekit.io/yytwlza66/casal_sobre%20(1).png"
                alt="Casal cozinhando juntos com ingredientes frescos"
                className="rounded-[2.5rem] shadow-xl object-cover aspect-4/5 w-full border-4 border-white transition-transform duration-600 group-hover:scale-[1.02] group-hover:shadow-2xl"
              />

              {/* Floating badge */}
              <div className="absolute bottom-6 right-4 sm:-right-4 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-default">
                <Heart size={16} weight="fill" className="text-[#2D5128] animate-pulse shrink-0" />
                <span className="text-xs font-bold text-[#2D5128]">Feito com Amor & Cuidado</span>
              </div>
            </div>
          </div>

          {/* Texto — slide da direita */}
          <div
            ref={historiaRight.ref as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-7 space-y-5 text-left transition-all duration-800 ease-out ${
              historiaRight.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-14'
            }`}
          >
            <div className="space-y-1">
              <span className="inline-block px-4 py-1.5 bg-[#2D5128]/10 text-[#2D5128] text-xs font-bold uppercase tracking-wider rounded-full">
                Nossa História
              </span>
              <h2 className="text-3xl sm:text-4xl font-logo-rangoo text-[#2D5128]">Por que criamos a Rangoo?</h2>
            </div>

            <div className="text-[#142C14]/80 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Todos conhecemos a sensação: dias longos, listas intermináveis de tarefas, e a pergunta constante:{' '}
                <strong className="text-[#142C14]">o que vou comer?</strong>
              </p>
              <p>
                A rotina moderna faz a alimentação saudável parecer um luxo em vez de uma parte natural da vida. Vimos amigos, familiares e nós mesmos escolhendo a conveniência em vez da nutrição, não porque não nos importamos, mas porque as opções saudáveis eram complicadas demais, lentas demais ou simplesmente não projetadas para a vida real.
              </p>
              <p className="font-semibold text-[#142C14]">
                A Rangoo nasceu de uma crença simples: todos merecem comer bem sem sacrificar o tempo ou o sabor.
              </p>
              <p>
                Reunimos nutricionistas, chefs e tecnologia para criar algo diferente: uma plataforma que combina conveniência, nutrição e personalização inteligente em uma experiência fluida. Because cuidar de si mesmo nunca deve parecer uma obrigação.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 group cursor-default w-fit">
              <div className="w-10 h-10 rounded-full bg-[#2D5128] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Leaf size={20} weight="fill" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#142C14]">100% Natural</p>
                <p className="text-xs text-[#142C14]/70">Sem conservantes, sem atalhos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── INOVAÇÃO ── */}
        <div className="pt-28 space-y-12">

          {/* Header */}
          <div
            ref={inovacaoHeader.ref as React.RefObject<HTMLDivElement>}
            className={`text-center space-y-3 transition-all duration-700 ease-out ${
              inovacaoHeader.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1.5 bg-[#2D5128]/10 text-[#2D5128] text-xs font-bold uppercase tracking-wider rounded-full">
              Inovação
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-logo-rangoo text-[#2D5128] leading-tight">
              Tecnologia que entende <br /> sua rotina.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">

            {/* Calculadora — slide da esquerda */}
            <div
              ref={inovacaoLeft.ref as React.RefObject<HTMLDivElement>}
              className={`lg:col-span-5 flex justify-center relative transition-all duration-800 ease-out ${
                inovacaoLeft.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-14'
              }`}
            >
              <div className="relative bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-slate-200/30 max-w-sm sm:max-w-md w-full aspect-square flex items-center justify-center overflow-visible group transition-shadow duration-300 hover:shadow-2xl">

                <Link
                  to="/calculadora"
                  className="absolute inset-0 w-full h-full cursor-pointer z-10 block rounded-[2.6rem]"
                  aria-label="Ir para Calculadora IMC"
                >
                  <img
                    src="https://ik.imagekit.io/yytwlza66/imagem_calculadora%20(1).png"
                    alt="Interface do Aplicativo Rangoo"
                    className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>

                {/* Floating tag 1 */}
                <div className="absolute top-12 -right-4 bg-white px-3 py-2 rounded-2xl shadow-md border border-slate-100/80 flex items-center gap-2.5 z-20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-[#E2F0D9] flex items-center justify-center text-[#2D5128]">
                    <Heart size={16} weight="fill" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Frequência Cardíaca</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">72 bpm</p>
                  </div>
                </div>

                {/* Floating tag 2 */}
                <div className="absolute bottom-16 -left-6 bg-white px-3 py-2 rounded-2xl shadow-md border border-slate-100/80 flex items-center gap-2.5 z-20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-[#E2F0D9] flex items-center justify-center text-[#2D5128]">
                    <Leaf size={16} weight="fill" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Calorias</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">1.850</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards de inovação — slide da direita + stagger */}
            <div
              ref={inovacaoRight.ref as React.RefObject<HTMLDivElement>}
              className={`lg:col-span-7 space-y-5 text-left transition-all duration-800 ease-out ${
                inovacaoRight.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-14'
              }`}
            >
              <p className="text-[#142C14]/80 text-sm sm:text-base leading-relaxed mb-4">
                A Rangoo vai além da simples entrega de refeições. Nosso sistema inteligente de recomendação aprende suas preferências, objetivos e rotina diária para sugerir refeições que fazem sentido para{' '}
                <strong className="text-[#142C14]">você</strong>. Calcule seu IMC, defina seus objetivos de bem-estar e deixe nosso algoritmo fazer o resto.
              </p>

              {[
                {
                  Icon: Calculator,
                  title: 'Calculadora IMC Inteligente',
                  desc: 'Obtenha insights instantâneos sobre sua saúde e metas de nutrição personalizadas com base no seu perfil corporal.',
                },
                {
                  Icon: ForkKnife,
                  title: 'Planos de Refeição Personalizados',
                  desc: 'Recomendações com IA que se adaptam às suas preferências de sabor, restrições alimentares e objetivos de fitness.',
                },
                {
                  Icon: TrendUp,
                  title: 'Acompanhamento de Progresso',
                  desc: 'Monitore sua jornada nutricional com dashboards intuitivos e celebrações de marcos alcançados.',
                },
              ].map(({ Icon, title, desc }, i) => (
                <div
                  key={i}
                  ref={inovCards.setRef(i) as React.RefCallback<HTMLDivElement>}
                  className={`bg-white p-5 rounded-2xl border border-slate-100 flex gap-4 items-start cursor-default
                    transition-all ease-out hover:shadow-lg hover:-translate-y-0.5 hover:border-[#2D5128]/20
                    ${inovCards.visibleSet.has(i) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: `${i * 130}ms`, transitionDuration: '600ms' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-slate-200/60 flex items-center justify-center text-[#2D5128] shrink-0 transition-all duration-300 group-hover:bg-[#2D5128] group-hover:text-white">
                    <Icon size={22} weight="regular" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-[#142C14]">{title}</h3>
                    <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COMO FUNCIONA ── */}
        <div className="pt-28 space-y-16">

          {/* Header */}
          <div
            ref={comoHeader.ref as React.RefObject<HTMLDivElement>}
            className={`text-center space-y-3 transition-all duration-700 ease-out ${
              comoHeader.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1.5 bg-[#2D5128]/10 text-[#2D5128] text-xs font-bold uppercase tracking-wider rounded-full">
              Como Funciona
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-logo-rangoo text-[#2D5128] leading-tight">
              Três passos simples para o bem-estar
            </h2>
          </div>

          {/* Steps — stagger */}
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-0.5 bg-[#2D5128]/10 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center relative z-10">
              {[
                { Icon: Calculator, label: 'Calcule seu IMC', desc: 'Insira seus dados e obtenha insights instantâneos sobre seu perfil de saúde.' },
                { Icon: ForkKnife, label: 'Descubra refeições personalizadas', desc: 'Receba recomendações de refeições selecionadas adaptadas ao seu corpo e objetivos.' },
                { Icon: TrendUp, label: 'Peça comida saudável instantaneamente', desc: 'Um toque para pedir. Refeições frescas e deliciosas entregues rapidamente no seu endereço.' },
              ].map(({ Icon, label, desc }, i) => (
                <div
                  key={i}
                  ref={steps.setRef(i) as React.RefCallback<HTMLDivElement>}
                  className={`flex flex-col items-center space-y-4 group cursor-default
                    transition-all ease-out
                    ${steps.visibleSet.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms`, transitionDuration: '650ms' }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#2D5128] transition-all duration-300 group-hover:bg-[#2D5128] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#2D5128]/20">
                      <Icon size={24} />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2D5128] text-white text-xs font-bold flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </span>
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-base font-bold text-[#142C14] transition-colors duration-200 group-hover:text-[#2D5128]">{label}</h3>
                    <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── NOSSA FILOSOFIA ── */}
      <section
        ref={filosofia.ref as React.RefObject<HTMLElement>}
        className={`w-full min-h-125 md:min-h-150 flex items-center justify-center bg-cover bg-center bg-no-repeat py-20 px-4 text-white relative overflow-hidden transition-all duration-900 ease-out ${
          filosofia.inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url('https://ik.imagekit.io/yytwlza66/filosofia_sobre_4mb%20(1).png')` }}
      >
        <div className="absolute inset-0 bg-[#2D5128]/85 backdrop-blur-[2px] z-0"></div>

        <div
          className={`relative z-10 max-w-4xl mx-auto text-center space-y-8 transition-all duration-700 ease-out delay-200 ${
            filosofia.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-center">
            <span className="px-5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-xs hover:bg-white/20 transition-colors duration-200 cursor-default">
              Nossa Filosofia
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-logo-rangoo font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            "Pequenas escolhas saudáveis <br /> criam rotinas melhores."
          </h2>

          <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Cada refeição é uma oportunidade de nutrir seu corpo e mente. Na Rangoo, acreditamos que o bem-estar não é um destino, mas uma coleção de escolhas conscientes feitas todos os dias.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {['Alimentação Consciente', 'Nutrição Equilibrada', 'Bem-Estar Diário'].map((tag, i) => (
              <span
                key={i}
                className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm font-medium tracking-wide cursor-default transition-all duration-200 hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Sobre;