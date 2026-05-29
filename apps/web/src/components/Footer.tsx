import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-chocolate dark:bg-chocolate-dark text-cream/90 pt-16 pb-8 border-t border-champagne/10 relative overflow-hidden">
      
      {/* Luz dourada de fundo */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full filter blur-[80px] bg-champagne/10 opacity-30"></div>
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full filter blur-[80px] bg-velvet/10 opacity-20"></div>

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        
        {/* Coluna 1: Sobre */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/logo2.png" alt="Território Doce Logo" className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
          
          <p className="text-xs text-cream/60 leading-relaxed font-light pr-8">
            Fundado sob a premissa de que a alta confeitaria é uma forma de expressão artística, o Território Doce ateliê cria experiências sensoriais inesquecíveis, fundindo ingredientes importados, técnica francesa clássica e design contemporâneo.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 text-xs font-semibold text-champagne">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
            <span className="text-cream/20">•</span>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TIKTOK</a>
            <span className="text-cream/20">•</span>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WHATSAPP CONCIERGE</a>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div>
          <h4 className="font-serif text-sm font-bold tracking-wider text-champagne mb-6 uppercase">Navegação</h4>
          <ul className="space-y-3 text-xs text-cream/60 font-light">
            <li><Link href="/loja" className="hover:text-champagne transition-colors">Nossa Vitrine</Link></li>
            <li><Link href="/encomenda" className="hover:text-champagne transition-colors">Encomenda Personalizada</Link></li>
            <li><Link href="/loja?category=Casamento" className="hover:text-champagne transition-colors">Bolos de Casamento</Link></li>
            <li><Link href="/#sobre" className="hover:text-champagne transition-colors">Nossa Filosofia</Link></li>
            <li><Link href="/#faq" className="hover:text-champagne transition-colors">Perguntas Frequentes</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Ajuda & Termos */}
        <div>
          <h4 className="font-serif text-sm font-bold tracking-wider text-champagne mb-6 uppercase">Suporte</h4>
          <ul className="space-y-3 text-xs text-cream/60 font-light">
            <li><Link href="/minha-conta" className="hover:text-champagne transition-colors">Meus Pedidos</Link></li>
            <li><Link href="/#faq" className="hover:text-champagne transition-colors">Política de Cancelamento</Link></li>
            <li><Link href="/#contato" className="hover:text-champagne transition-colors"> Degustações Privativas</Link></li>
            <li><Link href="/admin" className="hover:text-champagne transition-colors">Portal Administrativo</Link></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Segurança & Privacidade</a></li>
          </ul>
        </div>

        {/* Coluna 4: Newsletter */}
        <div>
          <h4 className="font-serif text-sm font-bold tracking-wider text-champagne mb-6 uppercase">Clube Privé</h4>
          <p className="text-xs text-cream/50 mb-4 font-light">Assine nossa newsletter luxo para convites de tasting privativos, receitas sazonais do chef e lançamentos limitados.</p>
          <div className="space-y-2">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-champagne"
            />
            <button className="w-full bg-champagne text-chocolate font-bold text-xs py-2 rounded-full hover:bg-white hover:text-chocolate transition-all">
              Cadastrar-se
            </button>
          </div>
        </div>

      </div>

      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-cream/40 space-y-4 md:space-y-0">
        <p>© 2026 Território Doce S.A. Todos os direitos reservados. Feito com amor e sofisticação.</p>
        <p>São Paulo • Jardins • Campinas • Rio de Janeiro</p>
      </div>
    </footer>
  );
}
