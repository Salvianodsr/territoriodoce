"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User as UserIcon, X, Trash2, Plus, Minus, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header() {
  const { 
    cart, user, token, setAuth, logout, 
    updateQuantity, removeFromCart, getCartTotal, getCartItemsCount,
    applyCoupon, discount,
  } = useStore();

  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mocks de Login rápido para avaliação
  const mockRoles = [
    { name: 'Cliente (Salviano)', email: 'cliente@territoriodoce.com', role: 'CUSTOMER', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256' },
    { name: 'Administrador', email: 'admin@territoriodoce.com', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256' },
    { name: 'Confeiteiro Chef', email: 'confeiteiro@territoriodoce.com', role: 'PASTRY_CHEF', avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=256' },
    { name: 'Entregador', email: 'entregador@territoriodoce.com', role: 'DELIVERY_DRIVER', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256' },
    { name: 'Vendedor Parceiro', email: 'vendedor@territoriodoce.com', role: 'SELLER', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256' },
  ];

  const handleQuickLogin = (email: string) => {
    // Simula a requisição ao NestJS
    const selected = mockRoles.find(r => r.email === email);
    if (selected) {
      setAuth(
        {
          id: selected.role.toLowerCase() + '-id',
          email: selected.email,
          name: selected.name,
          role: selected.role as any,
          avatarUrl: selected.avatar,
          cashbackVal: selected.role === 'CUSTOMER' ? 48.50 : 0.0,
          loyaltyPoints: selected.role === 'CUSTOMER' ? 340 : 0,
        },
        'mock-jwt-token-2026'
      );
      setLoginOpen(false);
    }
  };

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);
    if (!couponCode.trim()) return;

    const ok = applyCoupon(couponCode);
    if (ok) {
      setCouponSuccess(true);
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
    }
  };



  return (
    <header className="sticky top-0 z-40 w-full glass shadow-premium transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-12 md:h-16 items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img src="/assets/logo.png" alt="Território Doce Logo" className="h-full w-auto object-contain shadow-sm" />
          </div>
        </Link>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-semibold text-chocolate/80 dark:text-cream/80">
          <Link href="/loja" className="hover:text-velvet dark:hover:text-champagne transition-colors">Loja</Link>
          <Link href="/encomenda" className="hover:text-velvet dark:hover:text-champagne transition-colors">Sob Encomenda</Link>
          <Link href="/loja?occasion=casamento" className="hover:text-velvet dark:hover:text-champagne transition-colors">Casamentos</Link>
          <Link href="/#sobre" className="hover:text-velvet dark:hover:text-champagne transition-colors">O Ateliê</Link>
          <Link href="/#contato" className="hover:text-velvet dark:hover:text-champagne transition-colors">Contato</Link>
          
          {/* Acesso rápido a dashboards se logado com funções administrativas */}
          {user && user.role !== 'CUSTOMER' && (
            <Link 
              href="/admin" 
              className="bg-velvet/10 dark:bg-champagne/10 text-velvet dark:text-champagne px-3 py-1 rounded-full text-xs font-bold hover:scale-105 transition-transform border border-velvet/20 dark:border-champagne/20"
            >
              Painel {user.role === 'ADMIN' ? 'Admin' : user.role === 'PASTRY_CHEF' ? 'Cozinha' : user.role === 'DELIVERY_DRIVER' ? 'Entregas' : 'Vendedor'}
            </Link>
          )}
        </nav>

        {/* CONTROLES DA DIREITA */}
        <div className="flex items-center gap-4">

          {/* Perfil / Login */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/minha-conta" className="flex items-center gap-2 group">
                  <img 
                    src={user.avatarUrl || 'https://api.dicebear.com/7.x/adventurer/svg'} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full border border-champagne object-cover group-hover:scale-105 transition-transform" 
                  />
                  <span className="hidden lg:inline text-xs font-bold max-w-[100px] truncate text-chocolate dark:text-cream">{user.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-xs text-velvet hover:underline font-bold"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setLoginOpen(true)} 
                className="p-2 hover:bg-velvet/5 dark:hover:bg-cream/5 rounded-full transition-colors text-chocolate/80 dark:text-cream/80"
                title="Acessar Conta"
              >
                <UserIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Carrinho Sacola */}
          <button 
            onClick={() => setCartOpen(true)} 
            className="relative p-2 bg-velvet text-cream rounded-full hover:scale-105 transition-transform shadow-gold"
          >
            <ShoppingBag className="h-5 w-5" />
            {getCartItemsCount() > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-champagne text-chocolate font-display text-[10px] font-bold ring-2 ring-cream">
                {getCartItemsCount()}
              </span>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-velvet/5 rounded-full transition-colors text-chocolate/80 dark:text-cream/80"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-velvet/10 dark:border-champagne/10 bg-cream-light/95 dark:bg-chocolate-dark/95 backdrop-blur-md transition-all duration-300 ease-in-out">
          <nav className="flex flex-col p-6 space-y-4 font-display text-sm font-semibold text-chocolate/80 dark:text-cream/80">
            <Link 
              href="/loja" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-velvet dark:hover:text-champagne transition-colors py-2 border-b border-velvet/5 dark:border-champagne/5"
            >
              Loja
            </Link>
            <Link 
              href="/encomenda" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-velvet dark:hover:text-champagne transition-colors py-2 border-b border-velvet/5 dark:border-champagne/5"
            >
              Sob Encomenda
            </Link>
            <Link 
              href="/loja?occasion=casamento" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-velvet dark:hover:text-champagne transition-colors py-2 border-b border-velvet/5 dark:border-champagne/5"
            >
              Casamentos
            </Link>
            <Link 
              href="/#sobre" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-velvet dark:hover:text-champagne transition-colors py-2 border-b border-velvet/5 dark:border-champagne/5"
            >
              O Ateliê
            </Link>
            <Link 
              href="/#contato" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-velvet dark:hover:text-champagne transition-colors py-2"
            >
              Contato
            </Link>
            
            {user && user.role !== 'CUSTOMER' && (
              <Link 
                href="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-velvet/10 dark:bg-champagne/10 text-velvet dark:text-champagne px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform border border-velvet/20 dark:border-champagne/20 text-center"
              >
                Painel {user.role === 'ADMIN' ? 'Admin' : user.role === 'PASTRY_CHEF' ? 'Cozinha' : user.role === 'DELIVERY_DRIVER' ? 'Entregas' : 'Vendedor'}
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* PAINEL SIDEBAR DO CARRINHO */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="absolute right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-light dark:bg-chocolate-dark shadow-2xl p-6 flex flex-col">
            
            {/* Header Cesta */}
            <div className="flex items-center justify-between pb-4 border-b border-velvet/10 dark:border-champagne/10">
              <h3 className="font-serif text-xl font-bold text-velvet dark:text-champagne flex items-center gap-2">
                <ShoppingBag /> Sua Cesta Gourmet
              </h3>
              <button 
                onClick={() => setCartOpen(false)} 
                className="p-2 hover:bg-velvet/5 dark:hover:bg-cream/5 rounded-full"
              >
                <X className="h-6 w-6 text-chocolate dark:text-cream" />
              </button>
            </div>

            {/* Corpo Cesta */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <span className="text-5xl animate-float">🧁</span>
                  <p className="font-display font-medium text-chocolate/60 dark:text-cream/60">Sua cesta está vazia no momento.</p>
                  <p className="text-xs text-chocolate/40 dark:text-cream/40 px-6">Adicione delícias da nossa vitrine!</p>
                  <Link 
                    href="/loja" 
                    onClick={() => setCartOpen(false)}
                    className="bg-velvet hover:bg-velvet-dark text-cream text-xs font-bold px-4 py-2 rounded-full transition-colors mt-2"
                  >
                    Ir para a Loja
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-white/50 dark:bg-white/5 rounded-2xl border border-velvet/5 dark:border-champagne/5">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-xl border border-velvet/10 dark:border-champagne/10" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm truncate text-chocolate dark:text-cream">{item.name}</h4>
                      {item.customCakeDetails ? (
                        <p className="text-[10px] text-velvet dark:text-champagne font-semibold mt-0.5 truncate">
                          Massa: {item.customCakeDetails.batter} | Recheio: {item.customCakeDetails.filling}
                        </p>
                      ) : (
                        <p className="text-xs text-chocolate/60 dark:text-cream/60 mt-0.5">R$ {item.price.toFixed(2)}</p>
                      )}
                      
                      {/* Qtd Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-velvet/20 dark:border-champagne/20 rounded-full px-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-velvet">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-velvet">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-chocolate/40 hover:text-red-500 transition-colors p-1" title="Remover item">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-bold text-sm text-velvet dark:text-champagne">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Cesta */}
            {cart.length > 0 && (
              <div className="border-t border-velvet/10 dark:border-champagne/10 pt-4 space-y-4">
                
                {/* Cupons */}
                <form onSubmit={handleCouponApply} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Cupom (Ex: DOCELUXO10)" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)} 
                    className="flex-1 text-xs px-3 py-2 rounded-full border border-velvet/20 dark:border-champagne/20 bg-transparent focus:outline-none focus:border-velvet"
                  />
                  <button type="submit" className="bg-chocolate dark:bg-champagne text-cream dark:text-chocolate font-bold text-xs px-4 py-2 rounded-full hover:scale-105 transition-transform">
                    Aplicar
                  </button>
                </form>
                {couponError && <p className="text-[10px] text-red-500 font-semibold px-2">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-green-500 font-semibold px-2">Cupom aplicado com sucesso!</p>}

                {/* Subtotais */}
                <div className="space-y-1.5 text-sm text-chocolate/80 dark:text-cream/80">
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg font-bold text-chocolate dark:text-cream pt-1 border-t border-dashed border-velvet/10">
                    <span>Total</span>
                    <span className="text-velvet dark:text-champagne">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center bg-velvet text-cream font-display font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-premium text-sm tracking-wide"
                >
                  Finalizar Encomenda
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL SIMULADOR DE LOGIN RÁPIDO */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-cream-light dark:bg-chocolate dark:text-cream rounded-3xl p-6 shadow-2xl border border-champagne/20 relative animate-float">
            <button 
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-velvet/5 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-velvet dark:text-champagne text-center mb-1">
              ✨ Confeitaria Território Doce
            </h3>
            <p className="text-xs text-chocolate/60 dark:text-cream/60 text-center mb-6">Simulador de Perfis (Fácil Teste)</p>

            <div className="space-y-3">
              {mockRoles.map((role) => (
                <button
                  key={role.email}
                  onClick={() => handleQuickLogin(role.email)}
                  className="w-full flex items-center gap-3 p-3 bg-white/40 dark:bg-white/5 rounded-2xl hover:bg-velvet/5 dark:hover:bg-champagne/5 border border-velvet/10 dark:border-champagne/10 transition-all text-left"
                >
                  <img src={role.avatar} alt={role.name} className="h-10 w-10 rounded-full border border-champagne object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-xs truncate text-chocolate dark:text-cream">{role.name}</h4>
                    <p className="text-[10px] text-chocolate/50 dark:text-cream/50 truncate">{role.email}</p>
                  </div>
                  <span className="bg-velvet/10 dark:bg-champagne/10 text-velvet dark:text-champagne text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {role.role}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 text-center">
              <p className="text-[10px] text-chocolate/40 dark:text-cream/40">
                Selecione qualquer perfil para habilitar as visualizações exclusivas nos painéis de controle, checkout e áreas de rastreamento.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
