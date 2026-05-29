"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, Copy, Sparkles, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Checkout() {
  const { cart, getCartTotal, clearCart, user, setAuth } = useStore();

  const [step, setStep] = useState('form'); // form | payment | success
  const [payMethod, setPayMethod] = useState<'PIX' | 'CREDIT_CARD'>('PIX');
  const [loading, setLoading] = useState(false);

  // Estados Form
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Av. Paulista, 1000 - Ap 142, São Paulo - SP');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Pix Key
  const pixKey = "00020126580014br.gov.bcb.pix0136td-key-pix-territorio-doce-2026-5802BR5915TerritorioDoce6009SaoPaulo62070503***6304D1B0";
  const [copied, setCopied] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') {
      setStep('payment');
      return;
    }

    setLoading(true);
    
    // Simula validações do Stripe / Mercado Pago
    setTimeout(() => {
      const code = `TD-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderCode(code);
      setLoading(false);
      setStep('success');

      // Se o cliente estiver logado, creditamos o Cashback da compra!
      if (user) {
        const cashbackEarned = getCartTotal() * 0.05; // 5% de cashback
        setAuth({
          ...user,
          cashbackVal: user.cashbackVal + cashbackEarned,
          loyaltyPoints: user.loyaltyPoints + Math.floor(getCartTotal() * 0.5),
        }, 'mock-jwt-token-2026');
      }

      // Adiciona o pedido simulado no localStorage para rastrear no perfil
      const localOrders = JSON.parse(localStorage.getItem('td_local_orders') || '[]');
      localOrders.unshift({
        id: code,
        items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
        total: getCartTotal(),
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('td_local_orders', JSON.stringify(localOrders));

      clearCart();
    }, 1800);
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="w-full py-24 text-center max-w-md mx-auto space-y-4">
        <span className="text-5xl animate-float">🛒</span>
        <h2 className="font-serif text-2xl font-bold text-velvet dark:text-champagne">Carrinho Vazio</h2>
        <p className="text-xs text-chocolate/50 dark:text-cream/50">Não há produtos em sua sacola para prosseguir para o checkout.</p>
        <Link href="/loja" className="bg-chocolate dark:bg-champagne text-cream dark:text-chocolate text-xs font-bold px-6 py-2.5 rounded-full inline-block mt-4">
          Ir para a Vitrine
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full py-16 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="text-center mb-12 space-y-2">
          <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Finalização</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Checkout Seguro</h1>
        </div>

        {step !== 'success' ? (
          <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* COLUNA ESQUERDA: SHIP E PAYMENT (3 COLUNAS) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* ENDEREÇO E CONTATO */}
              {step === 'form' && (
                <div className="glass p-5 sm:p-6 rounded-3xl border border-velvet/10 dark:border-champagne/10 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-velvet dark:text-champagne border-b border-velvet/5 pb-2 mb-2">
                    1. Informações de Entrega
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Nome do Destinatário</label>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome Completo" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">WhatsApp de Contato</label>
                      <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Período de Preferência</label>
                      <select className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-cream-light dark:bg-chocolate-light focus:outline-none focus:border-velvet">
                        <option>Tarde (13h às 18h)</option>
                        <option>Manhã (08h às 12h)</option>
                        <option>Noite (18h às 21h)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Endereço de Entrega</label>
                    <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, número, complemento, bairro - Cidade - SP" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-chocolate dark:bg-champagne text-cream dark:text-chocolate font-display font-bold text-xs tracking-widest uppercase py-3 rounded-full hover:scale-105 transition-transform"
                  >
                    Ir Para o Pagamento
                  </button>
                </div>
              )}

              {/* OPÇÃO DE PAGAMENTOS */}
              {step === 'payment' && (
                <div className="glass p-5 sm:p-6 rounded-3xl border border-velvet/10 dark:border-champagne/10 space-y-6">
                  <h3 className="font-serif text-lg font-bold text-velvet dark:text-champagne border-b border-velvet/5 pb-2 mb-2">
                    2. Escolha o Método de Pagamento
                  </h3>

                  {/* Abas */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPayMethod('PIX')}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        payMethod === 'PIX'
                          ? 'border-velvet bg-velvet/5 text-velvet dark:border-champagne dark:bg-champagne/5 dark:text-champagne'
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/30'
                      }`}
                    >
                      <QrCode className="h-4 w-4" /> PIX (Desconto & Auto-validação)
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPayMethod('CREDIT_CARD')}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        payMethod === 'CREDIT_CARD'
                          ? 'border-velvet bg-velvet/5 text-velvet dark:border-champagne dark:bg-champagne/5 dark:text-champagne'
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/30'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" /> Cartão de Crédito (Stripe)
                    </button>
                  </div>

                  {/* PIX GATEWAY SIMULATOR */}
                  {payMethod === 'PIX' && (
                    <div className="space-y-4 text-center py-4 bg-white/40 dark:bg-white/5 rounded-2xl p-4 border border-dashed border-velvet/15">
                      <div className="flex justify-center">
                        {/* Mock QR CODE */}
                        <div className="bg-white p-3.5 rounded-xl border border-neutral-250 shadow-md">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TerritorioDoceBoutiqueGourmetPixPaymentKeyVerificationActive2026" 
                            alt="QR CODE PIX" 
                            className="h-32 w-32 object-contain" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2 max-w-sm mx-auto">
                        <p className="text-[11px] text-chocolate/80 dark:text-cream/80 font-medium">Escaneie o QR Code no app do seu banco ou copie a chave Pix abaixo.</p>
                        
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            readOnly 
                            value={`${pixKey.substring(0, 30)}...`} 
                            className="flex-1 text-[10px] px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 focus:outline-none"
                          />
                          <button 
                            type="button"
                            onClick={handleCopyPix}
                            className="bg-chocolate dark:bg-champagne text-cream dark:text-chocolate px-3.5 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1 hover:scale-102"
                          >
                            <Copy className="h-3 w-3" /> {copied ? 'Copiado!' : 'Copiar'}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-velvet dark:text-champagne font-bold pt-2 animate-pulse">
                        <Clock className="h-3.5 w-3.5" /> Aguardando recebimento da transação bancária...
                      </div>
                    </div>
                  )}

                  {/* CREDIT CARD GATEWAY SIMULATOR (STRIPE) */}
                  {payMethod === 'CREDIT_CARD' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Nome Impresso no Cartão</label>
                        <input required type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="NOME DO PORTADOR" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream uppercase" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Número do Cartão</label>
                        <input required type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Vencimento</label>
                          <input required type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/AA" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Código CVV</label>
                          <input required type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="000" className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet text-chocolate dark:text-cream" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Parcelamento</label>
                        <select className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-cream-light dark:bg-chocolate-light focus:outline-none focus:border-velvet">
                          <option>1x de R$ {getCartTotal().toFixed(2)} (Sem juros)</option>
                          <option>2x de R$ {(getCartTotal() / 2).toFixed(2)} (Sem juros)</option>
                          <option>3x de R$ {(getCartTotal() / 3).toFixed(2)} (Sem juros)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setStep('form')}
                      className="text-xs font-bold text-chocolate/50 dark:text-cream/50 hover:underline px-4 py-3"
                    >
                      Voltar
                    </button>
                    
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-velvet text-white font-display font-bold text-xs tracking-widest uppercase py-3.5 rounded-full hover:scale-105 transition-transform disabled:opacity-55 shadow-premium flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="h-4.5 w-4.5" /> 
                      {loading ? 'Validando transação...' : 'Aprovar Encomenda de Luxo'}
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* COLUNA DIREITA: DADOS DO CARRINHO (2 COLUNAS) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass p-5 rounded-2xl border border-velvet/10 dark:border-champagne/10 space-y-4">
                <h4 className="font-serif text-sm font-bold text-velvet dark:text-champagne border-b border-velvet/5 pb-2 mb-2 uppercase tracking-wider">
                  🛒 Resumo da Cesta
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs items-center">
                      <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-lg border border-velvet/10" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold truncate text-chocolate dark:text-cream">{item.name}</h5>
                        <p className="text-[10px] text-chocolate/50 dark:text-cream/50">{item.quantity}un x R$ {item.price.toFixed(2)}</p>
                      </div>
                      <span className="font-bold text-chocolate dark:text-cream">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-velvet/10 pt-4 space-y-2 text-xs text-chocolate/70 dark:text-cream/70">
                  <div className="flex justify-between">
                    <span>Taxa de Entrega Climatizada</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">Cortesia VIP</span>
                  </div>
                  
                  <div className="flex justify-between font-serif text-base font-bold text-chocolate dark:text-cream pt-2 border-t border-velvet/5">
                    <span>Total Final</span>
                    <span className="text-velvet dark:text-champagne text-lg font-bold">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                {user && (
                  <div className="bg-champagne/10 border border-champagne/20 rounded-xl p-3 text-[10px] text-champagne-dark font-medium flex items-center gap-1.5 leading-relaxed">
                    <Sparkles className="h-4 w-4 text-champagne" />
                    <div>
                      Você acumulará **R$ {(getCartTotal() * 0.05).toFixed(2)}** de **Cashback** na sua carteira digital ao concluir este pedido!
                    </div>
                  </div>
                )}
              </div>
            </div>

          </form>
        ) : (
          
          /* TELA DE SUCESSO DO CHECKOUT */
          <div className="max-w-xl mx-auto glass p-8 rounded-3xl border border-champagne/20 text-center space-y-6 animate-float relative overflow-hidden">
            
            <div className="absolute top-[-50px] left-[-50px] w-24 h-24 bg-velvet/10 rounded-full filter blur-xl"></div>
            
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 shadow-md">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-champagne font-extrabold uppercase tracking-widest bg-chocolate px-3 py-1 rounded-full border border-champagne/15">
                Código do Pedido: {orderCode}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate dark:text-cream pt-2">Sua Encomenda Foi Confirmada!</h2>
              <p className="text-xs text-chocolate/60 dark:text-cream/60 max-w-sm mx-auto leading-relaxed">
                Nossos chefs confeiteiros já receberam os detalhes do seu pedido e começaram a seleção dos ingredientes importados.
              </p>
            </div>

            <div className="bg-white/40 dark:bg-white/5 border border-velvet/10 dark:border-champagne/10 rounded-2xl p-4 text-xs max-w-sm mx-auto text-left space-y-2">
              <p><strong>Destinatário:</strong> {name || 'Salviano Mendes'}</p>
              <p><strong>Endereço:</strong> {address}</p>
              <p><strong>Horário de Entrega Estimado:</strong> Hoje, das 13h às 18h (Frota Refrigerada)</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 max-w-sm mx-auto">
              <Link 
                href="/minha-conta"
                className="flex-1 bg-velvet hover:bg-velvet-dark text-white font-display font-bold text-xs tracking-wider uppercase py-3.5 rounded-full hover:scale-105 transition-transform text-center shadow-premium"
              >
                Rastrear Pedido Realtime
              </Link>
              
              <Link 
                href="/loja"
                className="flex-1 bg-transparent hover:bg-white/10 text-chocolate dark:text-cream border border-chocolate/20 dark:border-cream/20 font-display font-bold text-xs tracking-wider uppercase py-3.5 rounded-full hover:scale-105 transition-transform text-center"
              >
                Voltar à Vitrine
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
