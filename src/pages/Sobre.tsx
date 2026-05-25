import { Leaf, Heart, Calculator, ForkKnife, TrendUp } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function Sobre() {
  const palavrasTicker = [
    { text: "Rangoo", dark: true },
    { text: "Rangoo", dark: false },
    { text: "Rangoo", dark: true },
    { text: "Rangoo", dark: false },
    { text: "Rangoo", dark: true },
    { text: "Rangoo", dark: false },
    { text: "Rangoo", dark: true },
    { text: "Rangoo", dark: false },
    { text: "Rangoo", dark: true },
    { text: "Rangoo", dark: false },
  ];

  return (
    <div className="w-full bg-[#E4EB9C] text-[#142C14] pt-28 pb-0 font-sans">
      
      {/* Seção Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Texto e botões */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
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
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2D5128] hover:bg-[#142C14] text-white font-bold rounded-full transition-all shadow-sm cursor-pointer text-center"
            >
                Nosso Projeto
            </a>

            <Link 
                to="/produtos" 
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#2D5128] font-bold rounded-full border-2 border-[#2D5128] hover:bg-[#2D5128]/20 transition-all cursor-pointer text-center"
            >
                Produtos
            </Link>
            </div>
          </div>

          {/* Rango à direita com efeito de deslocamento */}
          <div className="lg:col-span-5 flex justify-center pt-6 lg:pt-0">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rotate-2">
              <div className="absolute inset-0 bg-[#A8B291]/50 rounded-[2.5rem] translate-x-4 translate-y-4 shadow-md"></div>
              <div className="absolute inset-0 bg-white p-1 rounded-[2.5rem] shadow-xl overflow-hidden">
                <img 
                  src="https://ik.imagekit.io/yytwlza66/rangoo_sobre.png" 
                  alt="Bowl saudável Rangoo" 
                  className="rounded-[2.2rem] object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Faixa de Texto */}
      <div className="w-full bg-white border-t border-b border-[#2D5128]/10 py-3 overflow-hidden select-none my-8">
        <div className="flex justify-around items-center gap-8 whitespace-nowrap px-4">
          {palavrasTicker.map((item, index) => (
            <span 
              key={index} 
              className={`text-xl sm:text-2xl font-logo-rangoo tracking-tight ${
                item.dark ? 'text-[#142C14]' : 'text-[#A8B291]'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Nossa história */}
    <section id="secao-sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-smooth">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="max-w-sm sm:max-w-md w-full relative">
              <img 
                src="https://ik.imagekit.io/yytwlza66/casal_sobre%20(1).png" 
                alt="Casal cozinhando juntos com ingredientes frescos" 
                className="rounded-[2.5rem] shadow-xl object-cover aspect-4/5 w-full border-4 border-white"
              />
              
              <div className="absolute bottom-6 right-4 sm:-right-4 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                <Heart size={16} weight="fill" className="text-[#2D5128] animate-pulse shrink-0" />
                <span className="text-xs font-bold text-[#2D5128]">Feito com Amor & Cuidado</span>
              </div>
            </div>
          </div>

          {/* Texto nossa História */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-1">
              <span className="inline-block px-4 py-1.5 bg-[#2D5128]/10 text-[#2D5128] text-xs font-bold uppercase tracking-wider rounded-full">
                Nossa História
              </span>
              <h2 className="text-3xl sm:text-4xl font-logo-rangoo text-[#2D5128]">Por que criamos a Rangoo?</h2>
            </div>

            <div className="text-[#142C14]/80 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Todos conhecemos a sensação: dias longos, listas intermináveis de tarefas, e a pergunta constante: <strong className="text-[#142C14]">o que vou comer?</strong>
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

            {/* Selo 100% natural */}
            <div className="flex items-center gap-3 pt-4">
              <div className="w-10 h-10 rounded-full bg-[#2D5128] flex items-center justify-center text-white shadow-sm">
                <Leaf size={20} weight="fill" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#142C14]">100% Natural</p>
                <p className="text-xs text-[#142C14]/70">Sem conservantes, sem atalhos.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Inovação */}
        <div className="pt-28 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-4 py-1.5 bg-[#2D5128]/10 text-[#2D5128] text-xs font-bold uppercase tracking-wider rounded-full">
              Inovação
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-logo-rangoo text-[#2D5128] leading-tight">
              Tecnologia que entende <br /> sua rotina.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            
            {/* Calculadora a esquerda */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-slate-200/30 max-w-sm sm:max-w-md w-full aspect-square flex items-center justify-center overflow-visible">
                
            {/* Link na imagem redirecionando para a calculadora */}
            <Link 
            to="/calculadora" 
            className="absolute inset-0 w-full h-full cursor-pointer z-10 block rounded-[2.6rem]"
            aria-label="Ir para Calculadora IMC"
            >
            <img 
                src="https://ik.imagekit.io/yytwlza66/imagem_calculadora%20(1).png" 
                alt="Interface do Aplicativo Rangoo" 
                className="w-full h-full object-contain p-1" 
            />
            </Link>
                {/* Tags Flutuante*/}
                <div className="absolute top-12 -right-4 bg-white px-3 py-2 rounded-2xl shadow-md border border-slate-100/80 flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-xl bg-[#E2F0D9] flex items-center justify-center text-[#2D5128]">
                    <Heart size={16} weight="fill" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Frequência Cardíaca</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">72 bpm</p>
                  </div>
                </div>

                <div className="absolute bottom-16 -left-6 bg-white px-3 py-2 rounded-2xl shadow-md border border-slate-100/80 flex items-center gap-2.5 z-20">
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

            {/* Texto */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <p className="text-[#142C14]/80 text-sm sm:text-base leading-relaxed mb-4">
                A Rangoo vai além da simples entrega de refeições. Nosso sistema inteligente de recomendação aprende suas preferências, objetivos e rotina diária para sugerir refeições que fazem sentido para <strong className="text-[#142C14]">você</strong>. Calcule seu IMC, defina seus objetivos de bem-estar e deixe nosso algoritmo fazer o resto.
              </p>

              {/* Card 1 : Calculadora */}
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-slate-200/60 flex items-center justify-center text-[#2D5128] shrink-0">
                  <Calculator size={22} weight="regular" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#142C14]">Calculadora IMC Inteligente</h3>
                  <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">
                    Obtenha insights instantâneos sobre sua saúde e metas de nutrição personalizadas com base no seu perfil corporal.
                  </p>
                </div>
              </div>

              {/* card 2: Planos */}
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-slate-200/60 flex items-center justify-center text-[#2D5128] shrink-0">
                  <ForkKnife size={22} weight="regular" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#142C14]">Planos de Refeição Personalizados</h3>
                  <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">
                    Recomendações com IA que se adaptam às suas preferências de sabor, restrições alimentares e objetivos de fitness.
                  </p>
                </div>
              </div>

              {/* card 3: Progresso */}
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-slate-200/60 flex items-center justify-center text-[#2D5128] shrink-0">
                  <TrendUp size={22} weight="regular" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#142C14]">Acompanhamento de Progresso</h3>
                  <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">
                    Monitore sua jornada nutricional com dashboards intuitivos e celebrações de marcos alcançados.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Como funciona */}
        <div className="pt-28 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-4 py-1.5 bg-[#2D5128]/10 text-[#2D5128] text-xs font-bold uppercase tracking-wider rounded-full">
              Como Funciona
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-logo-rangoo text-[#2D5128] leading-tight">
              Três passos simples para o bem-estar
            </h2>
          </div>

          {/* Grid */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Linha */}
            <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-0.5 bg-[#2D5128]/10 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center relative z-10">
              
              {/* Passos */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#2D5128]">
                    <Calculator size={24} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2D5128] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    1
                  </span>
                </div>
                <div className="space-y-1 max-w-xs">
                  <h3 className="text-base font-bold text-[#142C14]">Calcule seu IMC</h3>
                  <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">
                    Insira seus dados e obtenha insights instantâneos sobre seu perfil de saúde.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#2D5128]">
                    <ForkKnife size={24} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2D5128] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    2
                  </span>
                </div>
                <div className="space-y-1 max-w-xs">
                  <h3 className="text-base font-bold text-[#142C14]">Descubra refeições personalizadas</h3>
                  <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">
                    Receba recomendações de refeições selecionadas adaptadas ao seu corpo e objetivos.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#2D5128]">
                    <TrendUp size={24} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2D5128] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    3
                  </span>
                </div>
                <div className="space-y-1 max-w-xs">
                  <h3 className="text-base font-bold text-[#142C14]">Peça comida saudável instantaneamente</h3>
                  <p className="text-xs sm:text-sm text-[#142C14]/70 leading-relaxed">
                    Um toque para pedir. Refeições frescas e deliciosas entregues rapidamente no seu endereço.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        </section>

      {/* Nossa Filosofia */}
      <section 
        className="w-full min-h-125 md:min-h-150 flex items-center justify-center bg-cover bg-center bg-no-repeat py-20 px-4 text-white relative overflow-hidden"
        style={{ 
          backgroundImage: `url('https://ik.imagekit.io/yytwlza66/filosofia_sobre_4mb%20(1).png')` 
        }}
      >
        {/* Overlay verde na imagem */}
        <div className="absolute inset-0 bg-[#2D5128]/85 backdrop-blur-[2px] z-0"></div>

        {/* Banner */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          <div className="flex justify-center">
            <span className="px-5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-xs">
              Nossa Filosofia
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-logo-rangoo font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            “Pequenas escolhas saudáveis <br /> criam rotinas melhores.”
          </h2>

          <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Cada refeição é uma oportunidade de nutrir seu corpo e mente. Na Rangoo, acreditamos que o bem-estar não é um destino, mas uma coleção de escolhas conscientes feitas todos os dias.
          </p>

          {/* Tags Transparentes */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm font-medium tracking-wide">
              Alimentação Consciente
            </span>
            <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm font-medium tracking-wide">
              Nutrição Equilibrada
            </span>
            <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm font-medium tracking-wide">
              Bem-Estar Diário
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Sobre;