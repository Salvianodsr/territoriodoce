"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { BarChart3, TrendingUp, Users, ShoppingCart, RefreshCw, Layers, CheckCircle2, Truck, Plus, Package } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'DECORATING' | 'READY_TO_SHIP' | 'SHIPPING' | 'DELIVERED';
  createdAt: string;
}

export default function AdminDashboard() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'finance' | 'kitchen' | 'delivery' | 'seller'>('finance');
  const [orders, setOrders] = useState<Order[]>([]);

  // Carrega os pedidos simulados
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('td_local_orders') || '[]');
    if (local.length === 0) {
      const seed = [
        {
          id: 'TD-9021',
          customerName: 'Salviano Mendes',
          items: [{ name: 'Bolo de Casamento Royal Velvet & Ouro', quantity: 1, price: 2200.00 }],
          total: 2200.00,
          status: 'DECORATING' as const,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: 'TD-9018',
          customerName: 'Salviano Mendes',
          items: [{ name: 'Bolo de Pistache Siciliano & Frutas Silvestres', quantity: 1, price: 280.00 }],
          total: 300.00,
          status: 'SHIPPING' as const,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        },
        {
          id: 'TD-8995',
          customerName: 'Ana Clara Souza',
          items: [{ name: 'Macarons de Paris Imperial', quantity: 2, price: 120.00 }],
          total: 240.00,
          status: 'CONFIRMED' as const,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        },
        {
          id: 'TD-8980',
          customerName: 'Juliana Paes',
          items: [{ name: 'Red Velvet Majestic Gourmet', quantity: 1, price: 180.00 }],
          total: 195.00,
          status: 'DELIVERED' as const,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        }
      ];
      localStorage.setItem('td_local_orders', JSON.stringify(seed));
      setOrders(seed);
    } else {
      setOrders(local);
    }
  }, []);

  // Força sincronia da aba dependendo do perfil logado (para facilidade de testes)
  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') setActiveTab('finance');
      else if (user.role === 'PASTRY_CHEF') setActiveTab('kitchen');
      else if (user.role === 'DELIVERY_DRIVER') setActiveTab('delivery');
      else if (user.role === 'SELLER') setActiveTab('seller');
    }
  }, [user]);

  // Avança status no Kanban da Cozinha
  const handleAdvanceStatus = (id: string) => {
    const statusCycle: Order['status'][] = ['PENDING', 'CONFIRMED', 'PREPARING', 'DECORATING', 'READY_TO_SHIP', 'SHIPPING', 'DELIVERED'];
    const updated = orders.map(o => {
      if (o.id === id) {
        const currentIdx = statusCycle.indexOf(o.status);
        const nextStatus = statusCycle[(currentIdx + 1) % statusCycle.length];
        return { ...o, status: nextStatus };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem('td_local_orders', JSON.stringify(updated));
  };

  // Cálculos Financeiros
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'PENDING' ? sum + o.total : sum, 0) + 120000; // Soma base real + histórico simulado
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length;
  const completedOrdersCount = orders.filter(o => o.status === 'DELIVERED').length + 420;

  return (
    <div className="w-full py-16 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Admin */}
        <div className="border-b border-velvet/10 dark:border-champagne/10 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">Boutique Console</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Painel de Negócios</h1>
            <p className="text-xs text-chocolate/50 dark:text-cream/50">
              {user ? `Bem-vindo, ${user.name} • Perfil: ${user.role}` : 'Selecione um simulador de login rápido no cabeçalho para gerenciar os dados.'}
            </p>
          </div>

          {/* Abas Switcher */}
          <div className="flex bg-white/40 dark:bg-white/5 border border-velvet/10 rounded-full p-1 text-[11px] font-bold">
            <button onClick={() => setActiveTab('finance')} className={`px-4 py-2 rounded-full transition-all ${activeTab === 'finance' ? 'bg-velvet text-white' : ''}`}>Estatísticas</button>
            <button onClick={() => setActiveTab('kitchen')} className={`px-4 py-2 rounded-full transition-all ${activeTab === 'kitchen' ? 'bg-velvet text-white' : ''}`}>Kanban Cozinha</button>
            <button onClick={() => setActiveTab('delivery')} className={`px-4 py-2 rounded-full transition-all ${activeTab === 'delivery' ? 'bg-velvet text-white' : ''}`}>Courier Rota</button>
            <button onClick={() => setActiveTab('seller')} className={`px-4 py-2 rounded-full transition-all ${activeTab === 'seller' ? 'bg-velvet text-white' : ''}`}>Vendedor</button>
          </div>
        </div>

        {/* 1. ABA DE ANÁLISE ESTATÍSTICA (FINANCEIRA) */}
        {activeTab === 'finance' && (
          <div className="space-y-8">
            {/* Grid Cards de Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="glass p-5 rounded-2xl border border-velvet/10 flex items-center justify-between">
                <div className="text-left space-y-1">
                  <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Faturamento Geral</span>
                  <span className="font-display text-xl font-bold text-velvet dark:text-champagne">R$ {totalRevenue.toFixed(2)}</span>
                  <span className="text-[9px] text-green-600 font-bold block">↑ 18.5% vs mês anterior</span>
                </div>
                <div className="h-10 w-10 bg-velvet/10 rounded-full flex items-center justify-center text-velvet"><TrendingUp /></div>
              </div>

              <div className="glass p-5 rounded-2xl border border-velvet/10 flex items-center justify-between">
                <div className="text-left space-y-1">
                  <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Pedidos em Andamento</span>
                  <span className="font-display text-xl font-bold">{activeOrdersCount} Pedidos</span>
                  <span className="text-[9px] text-chocolate/40 dark:text-cream/40 block">Cozinha operando</span>
                </div>
                <div className="h-10 w-10 bg-chocolate/10 rounded-full flex items-center justify-center text-chocolate"><ShoppingCart /></div>
              </div>

              <div className="glass p-5 rounded-2xl border border-velvet/10 flex items-center justify-between">
                <div className="text-left space-y-1">
                  <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Entregas Concluídas</span>
                  <span className="font-display text-xl font-bold">{completedOrdersCount} Entregas</span>
                  <span className="text-[9px] text-green-600 font-bold block">Taxa de sucesso 99.8%</span>
                </div>
                <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-500"><CheckCircle2 /></div>
              </div>

              <div className="glass p-5 rounded-2xl border border-velvet/10 flex items-center justify-between">
                <div className="text-left space-y-1">
                  <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Clientes Ativos</span>
                  <span className="font-display text-xl font-bold">120 Clientes</span>
                  <span className="text-[9px] text-champagne-dark font-bold block">48 Clientes VIP Black</span>
                </div>
                <div className="h-10 w-10 bg-champagne/10 rounded-full flex items-center justify-center text-champagne"><Users /></div>
              </div>

            </div>

            {/* Gráficos customizados estáticos (Simulado via SVG elegante de Alta Fidelidade) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Gráfico de Vendas Mensais */}
              <div className="lg:col-span-2 glass p-6 rounded-3xl border border-velvet/10 space-y-4">
                <h4 className="font-serif text-sm font-bold text-chocolate dark:text-cream flex items-center gap-1.5 uppercase tracking-wider">
                  <BarChart3 className="h-4.5 w-4.5" /> Faturamento Mensal (Jan-Mai 2026)
                </h4>
                
                {/* SVG Histograma */}
                <div className="relative h-60 w-full rounded-2xl bg-white/20 dark:bg-white/5 border border-velvet/5 p-4 flex items-end justify-between">
                  <div className="absolute inset-y-4 inset-x-8 flex flex-col justify-between pointer-events-none text-[8px] text-chocolate/30 dark:text-cream/30">
                    <div className="border-b border-chocolate/5 w-full pb-1">R$ 150.000</div>
                    <div className="border-b border-chocolate/5 w-full pb-1">R$ 100.000</div>
                    <div className="border-b border-chocolate/5 w-full pb-1">R$ 50.000</div>
                    <div className="w-full pb-1">R$ 0</div>
                  </div>

                  {/* Colunas do Histograma */}
                  {[
                    { month: 'Jan', val: 45, label: 'R$ 45k' },
                    { month: 'Fev', val: 58, label: 'R$ 58k' },
                    { month: 'Mar', val: 72, label: 'R$ 72k' },
                    { month: 'Abr', val: 98, label: 'R$ 98k' },
                    { month: 'Mai', val: 125, label: 'R$ 125k', active: true },
                  ].map((col) => (
                    <div key={col.month} className="flex flex-col items-center gap-2 z-10 w-16">
                      <span className={`text-[9px] font-bold ${col.active ? 'text-velvet' : 'text-chocolate/60'}`}>{col.label}</span>
                      <div 
                        className={`w-10 rounded-t-lg transition-all duration-1000 ${
                          col.active ? 'bg-velvet shadow-gold' : 'bg-champagne-dark/50'
                        }`} 
                        style={{ height: `${col.val * 1.3}px` }}
                      ></div>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{col.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Faturamento por Categoria */}
              <div className="glass p-6 rounded-3xl border border-velvet/10 space-y-4">
                <h4 className="font-serif text-sm font-bold text-chocolate dark:text-cream flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="h-4.5 w-4.5" /> Faturamento por Categoria
                </h4>

                <div className="space-y-4 pt-2">
                  {[
                    { cat: 'Bolos de Casamento', pct: 45, color: 'bg-velvet' },
                    { cat: 'Bolos Finos Assinatura', pct: 35, color: 'bg-champagne' },
                    { cat: 'Sobremesas & Macarons', pct: 15, color: 'bg-chocolate' },
                    { cat: 'Sob Encomenda (Customizado)', pct: 5, color: 'bg-[#B09160]' },
                  ].map((item) => (
                    <div key={item.cat} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{item.cat}</span>
                        <span className="text-velvet dark:text-champagne">{item.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-chocolate/10 dark:bg-cream/10 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. ABA DO KANBAN DE PRODUÇÃO DA COZINHA */}
        {activeTab === 'kitchen' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-velvet/5">
              <h3 className="font-serif text-xl font-bold text-velvet dark:text-champagne flex items-center gap-1.5">
                👨‍🍳 Cozinha & Confeitaria Kanban (Live Dashboard)
              </h3>
              <p className="text-[10px] text-chocolate/50 dark:text-cream/50">Clique nas caixas de pedidos para avançar o status da esteira gastronômica.</p>
            </div>

            {/* Kanban Lanes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Lane 1: Pendentes / Confirmados */}
              <div className="bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-chocolate/5 flex flex-col gap-3 min-h-[300px]">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider border-b border-chocolate/5 pb-2 text-yellow-600">
                  📥 Triagem (Confirmados)
                </h4>
                {orders.filter(o => o.status === 'CONFIRMED' || o.status === 'PENDING').map(o => (
                  <button 
                    key={o.id} 
                    onClick={() => handleAdvanceStatus(o.id)}
                    className="w-full text-left p-3.5 rounded-xl border border-chocolate/10 bg-cream-light dark:bg-chocolate-light hover:border-velvet transition-colors shadow-sm space-y-2 group"
                  >
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-velvet">{o.id}</span>
                      <span>{o.customerName.split(' ')[0]}</span>
                    </div>
                    <p className="text-[10px] font-medium truncate text-chocolate/80 dark:text-cream/80">{o.items[0]?.name}</p>
                    <span className="inline-block bg-yellow-500/10 text-yellow-600 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase">Iniciar Preparo →</span>
                  </button>
                ))}
              </div>

              {/* Lane 2: Batimento e Assamento */}
              <div className="bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-chocolate/5 flex flex-col gap-3 min-h-[300px]">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider border-b border-chocolate/5 pb-2 text-orange-600">
                  🥣 Massas & Recheios (Mistura)
                </h4>
                {orders.filter(o => o.status === 'PREPARING').map(o => (
                  <button 
                    key={o.id} 
                    onClick={() => handleAdvanceStatus(o.id)}
                    className="w-full text-left p-3.5 rounded-xl border border-chocolate/10 bg-cream-light dark:bg-chocolate-light hover:border-velvet transition-colors shadow-sm space-y-2 group"
                  >
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-velvet">{o.id}</span>
                      <span>{o.customerName.split(' ')[0]}</span>
                    </div>
                    <p className="text-[10px] font-medium truncate text-chocolate/80 dark:text-cream/80">{o.items[0]?.name}</p>
                    <span className="inline-block bg-orange-500/10 text-orange-600 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase">Iniciar Confeitaria →</span>
                  </button>
                ))}
              </div>

              {/* Lane 3: Finalização Artística */}
              <div className="bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-chocolate/5 flex flex-col gap-3 min-h-[300px]">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider border-b border-chocolate/5 pb-2 text-pink-600">
                  🎨 Decorações & Detalhes
                </h4>
                {orders.filter(o => o.status === 'DECORATING').map(o => (
                  <button 
                    key={o.id} 
                    onClick={() => handleAdvanceStatus(o.id)}
                    className="w-full text-left p-3.5 rounded-xl border border-chocolate/10 bg-cream-light dark:bg-chocolate-light hover:border-velvet transition-colors shadow-sm space-y-2 group"
                  >
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-velvet">{o.id}</span>
                      <span>{o.customerName.split(' ')[0]}</span>
                    </div>
                    <p className="text-[10px] font-medium truncate text-chocolate/80 dark:text-cream/80">{o.items[0]?.name}</p>
                    <span className="inline-block bg-pink-500/10 text-pink-600 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase">Empacotar / Expedir →</span>
                  </button>
                ))}
              </div>

              {/* Lane 4: Pronto para Transporte */}
              <div className="bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-chocolate/5 flex flex-col gap-3 min-h-[300px]">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider border-b border-chocolate/5 pb-2 text-green-600">
                  📦 Expedição Climatizada
                </h4>
                {orders.filter(o => o.status === 'READY_TO_SHIP' || o.status === 'SHIPPING' || o.status === 'DELIVERED').map(o => (
                  <div 
                    key={o.id}
                    className="w-full text-left p-3.5 rounded-xl border border-chocolate/10 bg-cream-light dark:bg-chocolate-light shadow-sm space-y-2"
                  >
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-velvet">{o.id}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${o.status === 'DELIVERED' ? 'bg-green-500' : 'bg-purple-500 animate-pulse'}`}></span>
                    </div>
                    <p className="text-[10px] font-medium truncate text-chocolate/80 dark:text-cream/80">{o.items[0]?.name}</p>
                    <span className={`inline-block text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      o.status === 'DELIVERED' ? 'bg-green-500/10 text-green-600' : 'bg-purple-500/10 text-purple-600'
                    }`}>
                      {o.status === 'DELIVERED' ? 'Entregue com Sucesso' : 'Disponível Rota'}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* 3. ABA DO ENTREGADOR (LOGÍSTICA) */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-velvet dark:text-champagne flex items-center gap-1.5">
              <Truck className="h-5 w-5" /> Portal de Entregas (Mobile-First)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Rotas ativas list */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-chocolate/50">Minhas Entregas do Turno:</h4>
                
                {orders.filter(o => o.status === 'SHIPPING' || o.status === 'READY_TO_SHIP').map((o) => (
                  <div key={o.id} className="glass p-4 rounded-2xl border border-velvet/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-xs text-velvet">{o.id}</span>
                      <span className="bg-indigo-500/10 text-indigo-600 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase">Rota Climatizada</span>
                    </div>
                    <p className="text-xs"><strong>Cliente:</strong> {o.customerName}</p>
                    <p className="text-xs"><strong>Endereço:</strong> Av. Paulista, 1000 - Ap 142, São Paulo - SP</p>
                    
                    <button 
                      onClick={() => handleAdvanceStatus(o.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2 rounded-full transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Confirmar Entrega Recebida
                    </button>
                  </div>
                ))}

                {orders.filter(o => o.status === 'SHIPPING' || o.status === 'READY_TO_SHIP').length === 0 && (
                  <p className="text-xs text-chocolate/50 dark:text-cream/50">Não há faturamento de rota climatizada ativa sob sua custódia no momento.</p>
                )}
              </div>

              {/* Instruções de manuseio */}
              <div className="glass p-5 rounded-2xl border border-velvet/10 space-y-4 h-fit">
                <h4 className="font-serif text-sm font-bold text-chocolate dark:text-cream uppercase tracking-wider">Protocolo de Transporte de Ouro</h4>
                <ul className="text-xs space-y-3 font-light leading-relaxed">
                  <li>🎚️ Mantenha a refrigeração do compartimento do veículo fixada estritamente em **4.5°C**.</li>
                  <li>📦 Utilize o carrinho de elevação a vácuo para retirar os bolos de 3 e 4 andares. Nunca incline a caixa.</li>
                  <li>📸 Ao entregar ao cliente ou cerimonialista, faça o registro fotográfico do bolo na mesa e anexe no portal.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* 4. ABA DO VENDEDOR (MARKETPLACE PARCEIRO) */}
        {activeTab === 'seller' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-velvet dark:text-champagne flex items-center gap-1.5">
              <Package className="h-5 w-5" /> Portal do Vendedor (Marketplace Ateliês)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="glass p-5 rounded-2xl border border-velvet/10 text-left">
                <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Saldo de Repasses (Stripe Checkout)</span>
                <span className="font-display text-xl font-bold text-velvet dark:text-champagne">R$ 14.850,00</span>
                <button className="bg-chocolate text-cream text-[10px] font-bold px-4 py-1.5 rounded-full mt-3 hover:scale-102 transition-transform">Solicitar Saque</button>
              </div>

              <div className="glass p-5 rounded-2xl border border-velvet/10 text-left">
                <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Taxa de Comissão Marketplace</span>
                <span className="font-display text-xl font-bold">12% Fixado</span>
                <span className="text-[9px] text-chocolate/40 dark:text-cream/40 block mt-1">Plano Exclusive Gourmet</span>
              </div>

              <div className="glass p-5 rounded-2xl border border-velvet/10 text-left flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-chocolate/50 dark:text-cream/50 uppercase block">Produtos Cadastrados</span>
                  <span className="font-display text-xl font-bold">8 Doces Assinaturas</span>
                </div>
                <button className="bg-velvet text-cream text-[10px] font-bold px-3 py-1.5 rounded-full hover:scale-102 transition-transform w-fit flex items-center gap-1 mt-2">
                  <Plus className="h-3.5 w-3.5" /> Adicionar Novo Doce
                </button>
              </div>

            </div>

            {/* Listagem de produtos vendedor */}
            <div className="glass p-5 rounded-3xl border border-velvet/10">
              <h4 className="font-serif text-sm font-bold text-chocolate dark:text-cream border-b border-velvet/5 pb-2 mb-4 uppercase tracking-wider">Meus Doces e Estoque</h4>
              
              <div className="space-y-3">
                {[
                  { name: 'Bolo de Casamento Royal Velvet & Ouro', price: 2450, stock: 5, category: 'Casamento' },
                  { name: 'Naked Cake de Frutas Vermelhas & Flores', price: 220, stock: 8, category: 'Bolos Finos' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-chocolate/5 last:border-0 pb-2">
                    <div>
                      <h5 className="font-bold">{item.name}</h5>
                      <span className="text-[9px] text-chocolate/40 dark:text-cream/40">Categoria: {item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-velvet dark:text-champagne">R$ {item.price.toFixed(2)}</p>
                      <p className="text-[9px] text-chocolate/40">Estoque: {item.stock} unidades</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
