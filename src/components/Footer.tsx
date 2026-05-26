import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2A4B2A] text-white px-6 sm:px-12 lg:px-16 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Principal de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 items-start mb-16">
          
          {/* Coluna da Marca (Logo + Slogan) */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-4xl font-serif font-black tracking-normal text-white">
                Rangoo
              </span>
            </Link>
            <p className="text-[#C2D4C4] text-sm leading-relaxed max-w-50">
              Alimentação saudável com sabor e tecnologia.
            </p>
          </div>

          {/* Coluna Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold tracking-wide text-white">
              Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home',        path: '/'           },
                { label: 'Produtos',    path: '/produtos'   },
                { label: 'Prato Smart', path: '/PratoSmart' },
                { label: 'Sobre Nós',   path: '/sobre'      },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-[#C2D4C4] hover:text-white text-sm transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna Contato */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold tracking-wide text-white">
              Contato
            </h4>
            <ul className="space-y-2 text-[#C2D4C4] text-sm">
              <li>
                <a href="mailto:contato@rangoo.com" className="hover:text-white transition-colors">
                  contato@rangoo.com
                </a>
              </li>
              <li>(24) 99999-9999</li>
              <li>Volta Redonda - RJ</li>
            </ul>
          </div>

          {/* Coluna Redes Sociais */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold tracking-wide text-white">
              Redes sociais
            </h4>
            <ul className="space-y-2">
              {['Instagram', 'Facebook', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#C2D4C4] hover:text-white text-sm transition-colors duration-150">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna Área Institucional */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold tracking-wide text-white">
              Área institucional
            </h4>
            <ul className="space-y-2">
              {['Política de Privacidade', 'Termos de Uso', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#C2D4C4] hover:text-white text-sm transition-colors duration-150">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Linha Inferior - Copyright */}
        <div className="pt-6 border-t border-[#3B5C3B]/40">
          <p className="text-sm text-[#C2D4C4] tracking-wide">
            © 2026 Rangoo. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}