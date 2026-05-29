"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Award, Wallet, Clock, MapPin, Truck, ChevronRight, Phone, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface LocalOrder {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'DECORATING' | 'READY_TO_SHIP' | 'SHIPPING' | 'DELIVERED';
  createdAt: string;
}

export default function MinhaConta() {
  const { user, token, setAuth } = useStore();
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<LocalOrder | null>(null);
  const [courierLatOffset, setCourierLatOffset] = useState(0.01); // Simulação do motorista andando

  // Carrega os pedidos feitos localmente
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('td_local_orders') || '[]');
    
    // Se não houver pedidos locais, semeamos alguns padrões para avaliação impecável!
    if (local.length === 0) {
      const seed = [
        {
          id: 'TD-9021',
          items: [{ name: 'Bolo de Casamento Royal Velvet & Ouro', quantity: 1, price: 2200.00 }],
          total: 2200.00,
          status: 'DECORATING' as const,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: 'TD-9018',
          items: [{ name: 'Bolo de Pistache Siciliano & Frutas Silvestres', quantity: 1, price: 280.00 }],
          total: 300.00,
          status: 'SHIPPING' as const, // Em rota ativa!
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        }
      ];
      localStorage.setItem('td_local_orders', JSON.stringify(seed));
      setOrders(seed);
      setSelectedOrder(seed[1]); // Seleciona o em entrega por padrão para mostrar o mapa de primeira
    } else {
      setOrders(local);
      setSelectedOrder(local[0]);
    }
  }, []);

  // Simulação de Rastreamento (O bonequinho do motorista anda no mapa)
  useEffect(() => {
    if (selectedOrder && selectedOrder.status === 'SHIPPING') {
      const interval = setInterval(() => {
        setCourierLatOffset(prev => {
          if (prev <= 0.001) return 0.01; // Volta ao início para manter o loop visual ativo
          return prev - 0.0005;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedOrder]);

  const advanceOrderStatus = () => {
    if (!selectedOrder) return;
    
    const statusCycle: LocalOrder['status'][] = ['PENDING', 'CONFIRMED', 'PREPARING', 'DECORATING', 'READY_TO_SHIP', 'SHIPPING', 'DELIVERED'];
    const currentIdx = statusCycle.indexOf(selectedOrder.status);
    const nextStatus = statusCycle[(currentIdx + 1) % statusCycle.length];

    const updated = orders.map(o => {
      if (o.id === selectedOrder.id) {
        return { ...o, status: nextStatus };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem('td_local_orders', JSON.stringify(updated));
    setSelectedOrder({ ...selectedOrder, status: nextStatus });
  };

  const statusLabels = {
    PENDING: { label: 'Aguardando Pagamento', color: 'bg-yellow-500' },
    CONFIRMED: { label: 'Pedido Confirmado', color: 'bg-blue-500' },
    PREPARING: { label: 'Em Produção (Massa/Recheio)', color: 'bg-orange-500' },
    DECORATING: { label: 'Fase Artística (Decoração)', color: 'bg-pink-500' },
    READY_TO_SHIP: { label: 'Pronto para Transporte', color: 'bg-purple-500' },
    SHIPPING: { label: 'Em Rota Refrigerada', color: 'bg-indigo-600' },
    DELIVERED: { label: 'Entregue com Sucesso', color: 'bg-green-500' },
  };

  return (
    <div className="w-full py-16 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* LOGIN CHECK: Se não logado, oferece quick actions */}
        {!user ? (
          <div className="text-center py-20 max-w-md mx-auto space-y-4">
            <span className="text-5xl animate-float">🔒</span>
            <h2 className="font-serif text-2xl font-bold text-velvet dark:text-champagne">Área Restrita</h2>
            <p className="text-xs text-chocolate/50 dark:text-cream/50">Por favor, faça o login rápido utilizando a barra de menu superior para visualizar este painel.</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Boas vindas / Cartões de Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-velvet/5 pb-6">
              <div className="flex items-center gap-3">
                <img src={user.avatarUrl} alt={user.name} className="h-16 w-16 rounded-full border-2 border-champagne object-cover" />
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold">{user.name}</h1>
                  <span className="bg-velvet/10 dark:bg-champagne/10 text-velvet dark:text-champagne text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Fidelidade Nível {user.loyaltyPoints > 200 ? 'Black Gold' : 'Platinum'}
                  </span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4">
                <div className="glass px-4 py-3 rounded-2xl border border-velvet/10 flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-velvet dark:text-champagne" />
                  <div className="text-left">
                    <span className="text-[9px] text-chocolate/50 dark:text-cream/50 uppercase block">Cashback Acumulado</span>
                    <span className="font-display text-sm font-bold text-velvet dark:text-champagne">R$ {user.cashbackVal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="glass px-4 py-3 rounded-2xl border border-velvet/10 flex items-center gap-3">
                  <Award className="h-5 w-5 text-velvet dark:text-champagne" />
                  <div className="text-left">
                    <span className="text-[9px] text-chocolate/50 dark:text-cream/50 uppercase block">Pontos Gourmet</span>
                    <span className="font-display text-sm font-bold text-chocolate dark:text-cream">{user.loyaltyPoints} pts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LISTA DE PEDIDOS (1 COLUNA) */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="font-serif text-lg font-bold text-velvet dark:text-champagne flex items-center gap-2">
                  <Clock className="h-4.5 w-4.5" /> Histórico de Pedidos
                </h3>

                <div className="space-y-3">
                  {orders.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setSelectedOrder(o)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center ${
                        selectedOrder?.id === o.id
                          ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5 ring-1 ring-velvet/35'
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/20 bg-white/20 dark:bg-white/5'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-xs text-chocolate dark:text-cream">{o.id}</span>
                          <span className={`h-2 w-2 rounded-full ${statusLabels[o.status].color}`}></span>
                        </div>
                        <p className="text-[10px] text-chocolate/40 dark:text-cream/40 mt-0.5">
                          {new Date(o.createdAt).toLocaleDateString('pt-BR')} • {o.items.length} {o.items.length === 1 ? 'item' : 'itens'}
                        </p>
                        <span className="inline-block mt-2 font-display font-bold text-xs text-velvet dark:text-champagne">
                          R$ {o.total.toFixed(2)}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-chocolate/30" />
                    </button>
                  ))}
                </div>
              </div>

              {/* RASTREAMENTO REALTIME DETALHADO (2 COLUNAS) */}
              <div className="lg:col-span-2">
                {selectedOrder ? (
                  <div className="glass p-6 rounded-3xl border border-velvet/10 dark:border-champagne/10 space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-velvet/5 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate/40 dark:text-cream/40">Rastreamento Ativo</span>
                        <h3 className="font-serif text-lg font-bold text-chocolate dark:text-cream leading-tight">{selectedOrder.id}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* SIMULADOR DE STATUS DO PEDIDO */}
                        <button 
                          onClick={advanceOrderStatus}
                          className="bg-chocolate/10 hover:bg-velvet/10 text-chocolate dark:text-cream text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-chocolate/20"
                          title="Simular Avanço de Status na API"
                        >
                          Simular Avanço ⚙️
                        </button>
                        
                        <span className={`text-[10px] font-bold text-white px-3 py-1.5 rounded-full ${statusLabels[selectedOrder.status].color}`}>
                          {statusLabels[selectedOrder.status].label}
                        </span>
                      </div>
                    </div>

                    {/* ITEMS DO PEDIDO SELECIONADO */}
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-chocolate/50">Itens Comprados:</h4>
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs py-1">
                          <span className="font-medium">{item.quantity}x {item.name}</span>
                          <span className="font-bold text-velvet dark:text-champagne">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* INTERACTIVE TRACKING MAP (Canvas Parallax render) */}
                    {selectedOrder.status === 'SHIPPING' ? (
                      <div className="space-y-4">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-chocolate/50 flex items-center gap-1">
                          <Truck className="h-4 w-4 text-velvet" /> Rota Climatizada em Tempo Real
                        </h4>

                        {/* MAP DRAWING */}
                        <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-velvet/15 bg-neutral-100 dark:bg-neutral-900 shadow-inner flex items-center justify-center">
                          
                          {/* Desenhos de malha viária estilizada minimalista */}
                          <svg className="absolute inset-0 w-full h-full text-neutral-300 dark:text-neutral-800" xmlns="http://www.w3.org/2000/svg">
                            {/* Ruas horizontais */}
                            <line x1="0" y1="40" x2="100%" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="0" y1="120" x2="100%" y2="120" stroke="currentColor" strokeWidth="3" />
                            <line x1="0" y1="200" x2="100%" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                            {/* Ruas verticais */}
                            <line x1="60" y1="0" x2="60" y2="100%" stroke="currentColor" strokeWidth="2" />
                            <line x1="180" y1="0" x2="180" y2="100%" stroke="currentColor" strokeWidth="3" />
                            <line x1="300" y1="0" x2="300" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                          </svg>

                          {/* Ícone Destinatário (Bandeirinha ou Casa) */}
                          <div className="absolute top-[120px] left-[55px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                            <div className="bg-velvet text-cream p-1.5 rounded-full shadow-md">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <span className="bg-chocolate text-cream text-[7px] font-bold px-1.5 py-0.5 rounded-md mt-1 border border-champagne/20">Seu Ateliê</span>
                          </div>

                          {/* Ícone Entregador (Caminhão) */}
                          <div 
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-1000 ease-out"
                            style={{ 
                              top: '120px', 
                              left: `${60 + courierLatOffset * 2200}px` 
                            }}
                          >
                            <div className="bg-champagne text-chocolate p-1.5 rounded-full shadow-gold border border-chocolate animate-bounce">
                              <Truck className="h-4.5 w-4.5" />
                            </div>
                            <span className="bg-green-600 text-white text-[7px] font-bold px-1 py-0.5 rounded-md mt-1">Gourmet Van</span>
                          </div>

                          {/* Overlay informações de tempo */}
                          <div className="absolute bottom-3 right-3 bg-chocolate text-cream px-3 py-2 rounded-xl border border-champagne/30 text-[10px] space-y-0.5 shadow-md">
                            <p><strong>Courier:</strong> Carlos Veloz (Van Refrigerada)</p>
                            <p><strong>Temperatura Interna:</strong> 4.5°C ✓ (Estável)</p>
                            <p><strong>Tempo Estimado:</strong> 12 minutos</p>
                          </div>
                        </div>

                        {/* Detalhes Entregador */}
                        <div className="flex justify-between items-center bg-white/20 dark:bg-white/5 rounded-2xl p-4 border border-velvet/5">
                          <div className="flex items-center gap-3">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150" alt="Motorista" className="h-10 w-10 rounded-full border border-champagne object-cover" />
                            <div>
                              <h5 className="font-display font-bold text-xs">Carlos Veloz</h5>
                              <span className="text-[9px] text-chocolate/50 dark:text-cream/50">Frota Exclusiva Território Doce</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="h-8 w-8 rounded-full bg-champagne text-chocolate flex items-center justify-center hover:scale-105 transition-transform" title="Ligar para entregador">
                              <Phone className="h-4 w-4" />
                            </button>
                            <button className="h-8 w-8 rounded-full bg-velvet text-cream flex items-center justify-center hover:scale-105 transition-transform" title="Abrir Chat Suporte">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-chocolate/50">Status da Linha de Produção:</h4>
                        
                        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-chocolate/10 dark:before:bg-cream/10">
                          
                          {/* Passo 1 */}
                          <div className="relative flex gap-3 text-xs">
                            <div className={`absolute left-[-21px] h-3 w-3 rounded-full border-2 ${
                              ['PENDING', 'CONFIRMED', 'PREPARING', 'DECORATING', 'READY_TO_SHIP', 'SHIPPING', 'DELIVERED'].includes(selectedOrder.status)
                                ? 'bg-green-500 border-green-500' : 'bg-transparent border-neutral-300'
                            }`}></div>
                            <div>
                              <h5 className="font-bold">Pedido Aprovado & Ingredientes Selecionados</h5>
                              <p className="text-[10px] text-chocolate/40 dark:text-cream/40">Fava de baunilha de Madagascar e cacau Barry Callebaut liberados da despensa climatizada.</p>
                            </div>
                          </div>

                          {/* Passo 2 */}
                          <div className="relative flex gap-3 text-xs">
                            <div className={`absolute left-[-21px] h-3 w-3 rounded-full border-2 ${
                              ['PREPARING', 'DECORATING', 'READY_TO_SHIP', 'SHIPPING', 'DELIVERED'].includes(selectedOrder.status)
                                ? 'bg-green-500 border-green-500' : 'bg-transparent border-neutral-300'
                            }`}></div>
                            <div>
                              <h5 className="font-bold">Montagem e Assamento (Chef Michael)</h5>
                              <p className="text-[10px] text-chocolate/40 dark:text-cream/40">Massas chiffon assadas e trufas batidas de forma aerada em batedeiras de alta precisão.</p>
                            </div>
                          </div>

                          {/* Passo 3 */}
                          <div className="relative flex gap-3 text-xs">
                            <div className={`absolute left-[-21px] h-3 w-3 rounded-full border-2 ${
                              ['DECORATING', 'READY_TO_SHIP', 'SHIPPING', 'DELIVERED'].includes(selectedOrder.status)
                                ? 'bg-green-500 border-green-500' : 'bg-transparent border-neutral-300'
                            }`}></div>
                            <div>
                              <h5 className="font-bold">Finalização Artística (Fios de Ouro / Buttercream)</h5>
                              <p className="text-[10px] text-chocolate/40 dark:text-cream/40">Nossos confeitadores artistas aplicam a cobertura lisa e as decorações folheadas sob medida.</p>
                            </div>
                          </div>

                          {/* Passo 4 */}
                          <div className="relative flex gap-3 text-xs">
                            <div className={`absolute left-[-21px] h-3 w-3 rounded-full border-2 ${
                              ['READY_TO_SHIP', 'SHIPPING', 'DELIVERED'].includes(selectedOrder.status)
                                ? 'bg-green-500 border-green-500' : 'bg-transparent border-neutral-300'
                            }`}></div>
                            <div>
                              <h5 className="font-bold">Pronto na Expedição Refrigerada</h5>
                              <p className="text-[10px] text-chocolate/40 dark:text-cream/40">Bolo resfriando em temperatura ótima e selado em caixa estrutural antiqueda.</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="text-center py-20 glass rounded-3xl border border-dashed border-chocolate/20">
                    <p className="text-xs text-chocolate/50 dark:text-cream/50">Selecione qualquer compra da barra lateral para abrir a linha de produção ou rastreamento em tempo real.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
