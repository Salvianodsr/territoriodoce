"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare, X, Send, Sparkles, Wand2 } from 'lucide-react';

export default function ChatWidget() {
  const { chatOpen, setChatOpen, messages, addMessage } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Rolagem suave para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const clientMsg = {
      id: `msg-client-${Date.now()}`,
      userId: 'customer-id-123',
      userName: 'Salviano Mendes',
      message: input,
      isAdminMsg: false,
      createdAt: new Date().toISOString(),
    };

    addMessage(clientMsg);
    setInput('');

    // Simulação do AI Concierge Gourmet
    setIsTyping(true);
    setTimeout(() => {
      let reply = 'Agradecemos o seu contato. Um de nossos especialistas em confeitaria de luxo retornará em instantes.';
      const text = clientMsg.message.toLowerCase();

      if (text.includes('bolo') && text.includes('casamento')) {
        reply = 'Nossos bolos de casamento são verdadeiras esculturas comestíveis! Oferecemos massa trufada, recheio de pistache siciliano ou frutas vermelhas, e cobertura em buttercream de champagne. Gostaria de agendar uma degustação privativa em nosso ateliê com o Chef?';
      } else if (text.includes('prazo') || text.includes('entrega') || text.includes('frete')) {
        reply = 'Nossas entregas são feitas por motoristas especializados em caixas climatizadas sob medida. O frete é calculado por quilometragem e o rastreamento em tempo real estará disponível na sua área do cliente logo após a confirmação.';
      } else if (text.includes('personalizado') || text.includes('encomenda') || text.includes('customizado')) {
        reply = 'Para encomendas exclusivas, você pode utilizar o nosso incrível Construtor de Bolos 3D na aba "Encomenda Personalizada"! Lá é possível escolher cada camada de recheio, massa, cor e anexar referências visuais diretamente do Pinterest para nosso chef confeitador.';
      } else if (text.includes('sabor') || text.includes('recheio') || text.includes('cardapio') || text.includes('opcoes')) {
        reply = 'Nossos sabores assinatura incluem: Pistache com Frutas Silvestres, Velvet Rose com Baunilha de Madagascar, Chocolatier Belga 80% Barry Callebaut e Limão Meyer Caramelizado. Todos produzidos artesanalmente com ingredientes importados de altíssima qualidade.';
      } else if (text.includes('cupom') || text.includes('desconto')) {
        reply = 'Excelente escolha! Utilize o cupom de boas-vindas **DOCELUXO10** no checkout e receba 10% de desconto imediato na sua primeira encomenda, além de acumular cashback exclusivo em nosso programa de fidelidade!';
      }

      addMessage({
        id: `msg-ai-${Date.now()}`,
        userId: 'concierge-ai',
        userName: 'IA Concierge Gourmet',
        message: reply,
        isAdminMsg: true,
        createdAt: new Date().toISOString(),
      });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* BOTÃO FLUTUANTE */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-velvet text-cream shadow-2xl hover:scale-105 active:scale-95 transition-all animate-float"
          title="Falar com o Concierge"
        >
          <MessageSquare className="h-6 w-6" />
          <div className="absolute inset-0 rounded-full border-2 border-champagne/40 animate-ping opacity-20"></div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-chocolate font-display text-[8px] font-bold ring-1 ring-cream">
            AI
          </span>
        </button>
      )}

      {/* JANELA DE CHAT EXPANDIDA */}
      {chatOpen && (
        <div className="w-80 sm:w-96 h-[480px] rounded-3xl glass shadow-2xl border border-velvet/10 dark:border-champagne/10 flex flex-col overflow-hidden animate-float">
          
          {/* Header do Chat */}
          <div className="bg-velvet dark:bg-chocolate-light p-4 flex items-center justify-between border-b border-velvet/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-champagne flex items-center justify-center text-chocolate">
                <Wand2 className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xs font-bold text-cream flex items-center gap-1">
                  Atendimento IA <Sparkles className="h-3 w-3 text-champagne" />
                </span>
                <span className="text-[9px] text-cream/70 font-light">Online • Boutique Exclusive</span>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full text-cream"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Histórico de Mensagens */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream-light/30 dark:bg-chocolate-dark/30">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[80%] ${
                  msg.isAdminMsg ? 'mr-auto items-start' : 'ml-auto items-end'
                }`}
              >
                <span className="text-[8px] text-chocolate/40 dark:text-cream/40 mb-0.5 px-1">{msg.userName}</span>
                <div 
                  className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.isAdminMsg 
                      ? 'bg-white dark:bg-white/5 border border-velvet/10 dark:border-champagne/10 text-chocolate dark:text-cream rounded-tl-sm shadow-sm' 
                      : 'bg-velvet text-white rounded-tr-sm shadow-gold'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col max-w-[80%] mr-auto items-start">
                <span className="text-[8px] text-chocolate/40 dark:text-cream/40 mb-0.5 px-1">IA Concierge Gourmet</span>
                <div className="px-3 py-2.5 rounded-2xl text-xs bg-white dark:bg-white/5 border border-velvet/5 text-chocolate/40 dark:text-cream/40 rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-velvet animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-velvet animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-velvet animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input de Mensagens */}
          <form onSubmit={handleSend} className="p-3 border-t border-velvet/10 dark:border-champagne/10 flex gap-2 bg-white/50 dark:bg-chocolate/40">
            <input 
              type="text" 
              placeholder="Pergunte sobre sabores, prazos, cupons..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className="flex-1 text-xs px-4 py-2.5 rounded-full border border-velvet/20 dark:border-champagne/20 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream"
            />
            <button 
              type="submit"
              className="h-9 w-9 rounded-full bg-velvet text-cream flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
