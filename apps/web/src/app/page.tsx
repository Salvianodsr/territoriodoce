"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeroCake from '../components/HeroCake';
import { Star, Flame, Trophy, Heart, Coffee, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
  const { addToCart } = useStore();
  const [tastingSubmitted, setTastingSubmitted] = useState(false);

  // Destaques da vitrine
  const featured = [
    {
      id: 'prod-2',
      name: 'Bolo de Pistache Siciliano',
      price: 280.00,
      image: '/assets/pistache-cake.png',
      tag: 'Mais Pedido',
      desc: 'Elaborado com pistaches da Sicília e geleia fresca de framboesas.',
    },
    {
      id: 'prod-4',
      name: 'Bolo Chocolatier Extrême',
      price: 195.00,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300',
      tag: 'Alta Trufa',
      desc: 'Massa fudge com cacau Barry Callebaut 80% e raspas trufadas.',
    },
    {
      id: 'prod-5',
      name: 'Naked Cake Red Berries',
      price: 220.00,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=300',
      tag: 'Chef Assina',
      desc: 'Clássico romântico adornado com flores comestíveis e frutas frescas.',
    }
  ];

  // Feedbacks de luxo
  const testimonials = [
    { name: 'Isabella Stewart', title: 'Noiva Real', quote: 'O bolo de casamento de 4 andares foi a atração principal da nossa festa nos Jardins! Sabor trufado incomparável, simplesmente perfeito.' },
    { name: 'Ricardo Mantovani', title: 'Diretor Corporate', quote: 'Encomendamos 400 macarons personalizados com o logo da nossa empresa. A embalagem de luxo e a maciez do doce surpreenderam nossos convidados.' },
    { name: 'Mariana Vasconcellos', title: 'Celebrante VIP', quote: 'A facilidade de usar o construtor 3D para o bolo de 15 anos da minha filha foi sensacional. Equipe de entrega super pontual e prestativa.' },
  ];

  // FAQ
  const faqs = [
    { q: 'Qual a antecedência mínima para encomendas?', a: 'Para bolos de vitrine clássicos, solicitamos 24 horas. Para bolos customizados exclusivos ou bolos de casamento reais, a antecedência mínima é de 7 a 15 dias úteis.' },
    { q: 'Como funciona a logística de entrega?', a: 'Possuímos frota climatizada exclusiva com motoristas treinados. Entregamos em toda a capital de São Paulo, Campinas, ABC e litoral paulista com agendamento rígido.' },
    { q: 'Posso fazer alteração de sabores na encomenda customizada?', a: 'Sim! Com o nosso Construtor Sob Encomenda, você é livre para criar a montagem que desejar. Se preferir algo totalmente inédito, fale com o Chef no chat.' },
  ];

  return (
    <div className="w-full relative">
      
      {/* 1. SEÇÃO DE ANIMAÇÃO DE SCROLL (HERO) */}
      <HeroCake />

      {/* 2. FILOSOFIA E HISTÓRIA DO ATELIÊ */}
      <section id="sobre" className="w-full py-24 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 relative">
            {/* Elemento de iluminação */}
            <div className="absolute top-0 left-0 w-32 h-32 filter blur-[50px] bg-velvet/5"></div>
            
            <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Nossa Essência</span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Transformando momentos <br/>
              <span className="text-gradient-velvet">em doçura</span>
            </h2>

            <p className="text-sm font-light text-chocolate/80 dark:text-cream/80 leading-relaxed">
              Em nosso laboratório gastronômico, cada receita é tratada como um projeto de alta arquitetura. Importamos o pistache da Sicília, a baunilha de Madagascar e o chocolate da Bélgica para criar sabores tridimensionais, intensos e balanceados.
            </p>

            <p className="text-xs font-light text-chocolate/60 dark:text-cream/60 leading-relaxed">
              O acabamento manual detalhado, seja com fios de ouro comestíveis ou flores frescas higienizadas de produtores orgânicos parceiros, assegura que cada fatia conte uma história de luxo, afeto e sofisticação incomparáveis.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 text-center">
              <div className="flex flex-col items-center">
                <Trophy className="h-6 w-6 text-champagne mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Chef Premiado</span>
              </div>
              <div className="flex flex-col items-center">
                <Coffee className="h-6 w-6 text-champagne mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">100% Artesanal</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 text-champagne mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Frota Própria</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-premium border border-champagne/10 animate-float-delayed">
            <img 
              src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800" 
              alt="Ateliê de Confeitaria de Luxo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-cream">
              <span className="text-[10px] uppercase font-bold tracking-widest text-champagne">Premium Experience</span>
              <p className="font-serif text-lg font-bold">Onde a paixão encontra a precisão</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VITRINE DE PRODUTOS DESTAQUE */}
      <section className="w-full py-24 bg-white/30 dark:bg-chocolate-dark/30">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div className="space-y-3">
              <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Os Favoritos</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Criações Assinatura em Destaque</h2>
            </div>
            
            <Link 
              href="/loja"
              className="text-xs font-bold text-velvet dark:text-champagne border-b border-velvet/40 dark:border-champagne/40 pb-1 hover:text-chocolate dark:hover:text-white transition-colors mt-4 md:mt-0"
            >
              Ver Toda a Vitrine →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((p) => (
              <div 
                key={p.id} 
                className="glass p-5 rounded-3xl border border-velvet/10 dark:border-champagne/10 shadow-premium flex flex-col group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
              >
                {/* Imagem */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-4">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-velvet text-cream text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {p.tag}
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-display font-bold text-base text-chocolate dark:text-cream group-hover:text-velvet dark:group-hover:text-champagne transition-colors">{p.name}</h3>
                <p className="text-xs text-chocolate/60 dark:text-cream/60 mt-1 font-light leading-relaxed flex-1">{p.desc}</p>

                {/* Preço e Ação */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-velvet/5 dark:border-champagne/5">
                  <span className="font-display font-bold text-base text-velvet dark:text-champagne">R$ {p.price.toFixed(2)}</span>
                  
                  <button 
                    onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })}
                    className="bg-chocolate dark:bg-champagne text-cream dark:text-chocolate text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:scale-105 transition-transform"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DEPOIMENTOS VIP */}
      <section className="w-full py-24 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full filter blur-[100px] bg-velvet/5 pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-6 text-center max-w-3xl space-y-12 relative z-10">
          <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Experiência Território</span>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">O Que Dizem Nossos Clientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
            {testimonials.map((t, index) => (
              <div 
                key={index}
                className="bg-white/40 dark:bg-white/5 border border-velvet/10 dark:border-champagne/10 rounded-2xl p-6 shadow-sm flex flex-col space-y-4"
              >
                <div className="flex text-champagne gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-xs text-chocolate/85 dark:text-cream/85 font-light leading-relaxed italic flex-1">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-display font-bold text-xs text-chocolate dark:text-cream">{t.name}</h4>
                  <span className="text-[10px] text-velvet dark:text-champagne font-bold uppercase tracking-widest">{t.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEGUSTAÇÃO DE CASAMENTO / CONTACT FORM */}
      <section id="contato" className="w-full py-24 bg-white/30 dark:bg-chocolate-dark/30">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          <div className="lg:col-span-2 space-y-6">
            <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Casamentos & Bodas</span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Agende sua Degustação <span className="text-gradient-velvet">Exclusiva</span>
            </h2>

            <p className="text-xs font-light text-chocolate/85 dark:text-cream/85 leading-relaxed">
              Para casamentos e bodas reais, oferecemos uma experiência de degustação privativa em nosso ateliê físico nos Jardins. Nosso Chef apresentará as opções de massas, recheios e desenhará o layout de andares junto com o seu cerimonialista.
            </p>

            <div className="space-y-4 text-xs font-medium pt-2 text-chocolate/75 dark:text-cream/75">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-champagne" />
                <span>Alameda Lorena, 890 - Jardins, São Paulo / SP</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-champagne" />
                <span>+55 (11) 99999-7700 (WhatsApp Concierge)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-champagne" />
                <span>casamentos@territoriodoce.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 glass p-6 sm:p-8 rounded-3xl border border-velvet/10 dark:border-champagne/10 shadow-premium">
            {tastingSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <span className="text-5xl animate-float">💌</span>
                <h3 className="font-serif text-xl font-bold text-velvet dark:text-champagne">Solicitação Enviada!</h3>
                <p className="text-xs text-chocolate/60 dark:text-cream/60 max-w-sm mx-auto">
                  Nosso concierge VIP entrará em contato em menos de 2 horas úteis pelo WhatsApp para validar as datas disponíveis do tasting. Obrigado!
                </p>
                <button 
                  onClick={() => setTastingSubmitted(false)}
                  className="bg-chocolate dark:bg-cream text-cream dark:text-chocolate font-bold text-xs px-6 py-2 rounded-full mt-4"
                >
                  Fazer nova solicitação
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setTastingSubmitted(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Seu Nome</label>
                    <input required type="text" placeholder="Nome Completo" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">WhatsApp</label>
                    <input required type="tel" placeholder="(11) 99999-9999" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Data do Casamento</label>
                    <input required type="date" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Número de Convidados</label>
                    <input required type="number" placeholder="Ex: 150" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Mensagem & Preferências</label>
                  <textarea rows={3} placeholder="Conte-nos os sabores que mais chamaram sua atenção e o estilo decorativo do evento (Ex: Boho Chic, Clássico Imperial)." className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream"></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-velvet hover:bg-velvet-dark text-white font-display font-bold text-xs tracking-widest uppercase py-3.5 rounded-full transition-all shadow-premium"
                >
                  Solicitar Agendamento Privé
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 6. FAQ SEÇÃO */}
      <section id="faq" className="w-full py-24 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream border-t border-velvet/5 dark:border-champagne/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Suporte Ateliê</span>
            <h2 className="font-serif text-3xl font-bold tracking-tight">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div 
                key={i}
                className="bg-white/40 dark:bg-white/5 border border-velvet/10 dark:border-champagne/10 rounded-2xl p-5 shadow-sm"
              >
                <h4 className="font-display font-bold text-xs sm:text-sm text-chocolate dark:text-cream flex items-center gap-2">
                  <span className="text-velvet">Q.</span> {f.q}
                </h4>
                <p className="text-xs text-chocolate/70 dark:text-cream/70 font-light mt-2 leading-relaxed pl-5">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
