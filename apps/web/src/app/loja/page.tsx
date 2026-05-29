"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Eye, ShoppingCart, Sparkles, FilterX } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promoPrice?: number;
  image: string;
  category: string;
  occasion: string[];
  rating: number;
  sellerName: string;
}

export default function Loja() {
  const { addToCart } = useStore();
  const searchParams = useSearchParams();

  // Estados de Filtro
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedOccasion, setSelectedOccasion] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('relevant');
  const [loading, setLoading] = useState(false);

  // Lê ocasiões repassadas via query params (Ex: links da home)
  useEffect(() => {
    const occ = searchParams.get('occasion');
    if (occ) setSelectedOccasion(occ);
    
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Lista Mock de produtos
  const allProducts: Product[] = [
    {
      id: 'prod-1',
      name: 'Bolo de Casamento Royal Velvet & Ouro',
      slug: 'royal-velvet-ouro',
      description: 'Nossa maior obra de arte gastronômica. Bolo de casamento premium com 4 andares majestosos, recheio trufado de chocolate belga aromatizado com fava de baunilha de Madagascar, coberto por buttercream de champagne cristalizado e detalhes folheados a ouro comestível de 24 quilates.',
      price: 2450.00,
      promoPrice: 2200.00,
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600',
      category: 'Casamento',
      occasion: ['casamento', 'corporativo'],
      rating: 5.0,
      sellerName: 'Ateliê do Açúcar Real',
    },
    {
      id: 'prod-2',
      name: 'Bolo de Pistache Siciliano & Frutas Silvestres',
      slug: 'pistache-siciliano-frutas-silvestres',
      description: 'Elaborado com pistaches genuínos da região do Bronte na Sicília, massa chiffon aerada de amêndoas e recheio cremoso de frutas vermelhas infusionadas com licor de framboesa Chambord.',
      price: 280.00,
      image: '/assets/pistache-cake.png',
      category: 'Bolos Finos',
      occasion: ['aniversario', 'formatura'],
      rating: 4.9,
      sellerName: 'Território Doce Principal',
    },
    {
      id: 'prod-3',
      name: 'Macarons de Paris Imperial (Caixa Premium 12un)',
      slug: 'macarons-paris-imperial',
      description: 'Uma seleção de 12 clássicos macarons franceses com casca crocante e interior cremoso. Sabores: Trufa Negra de Chocolate Belga, Lavanda Francesa, Caramelo Salgado e Limão Meyer.',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600',
      category: 'Sobremesas',
      occasion: ['corporativo', 'aniversario'],
      rating: 4.8,
      sellerName: 'La Maison du Macaron',
    },
    {
      id: 'prod-4',
      name: 'Bolo Chocolatier Extrême com Nibs de Cacau',
      slug: 'chocolatier-extreme-nibs',
      description: 'O paraíso para os amantes de chocolate escuro. Massa fudge úmida com cacau 80% Barry Callebaut, camadas espessas de ganache meio amargo e finalização rústica com nibs de cacau orgânicos.',
      price: 195.00,
      promoPrice: 175.00,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
      category: 'Bolos Finos',
      occasion: ['aniversario', 'corporativo'],
      rating: 4.9,
      sellerName: 'Território Doce Principal',
    },
    {
      id: 'prod-5',
      name: 'Naked Cake de Frutas Vermelhas & Flores Comestíveis',
      slug: 'naked-cake-flores-comestiveis',
      description: 'Rústico, fresco e romântico. Massa pão de ló super leve banhada com calda de baunilha, recheio generoso de creme de cream cheese trufado e abundância de frutas vermelhas e flores decorativas da estação.',
      price: 220.00,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600',
      category: 'Bolos Finos',
      occasion: ['aniversario', 'infantil', 'casamento'],
      rating: 5.0,
      sellerName: 'Ateliê do Açúcar Real',
    },
    {
      id: 'prod-6',
      name: 'Red Velvet Majestic Gourmet',
      slug: 'red-velvet-majestic',
      description: 'Inspirado na clássica confeitaria americana com um toque contemporâneo. Massa aveludada vermelha infusionada com extrato de cacau belga e recheio ultra aveludado de brigadeiro de limão siciliano.',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600',
      category: 'Bolos Finos',
      occasion: ['aniversario', 'infantil'],
      rating: 4.7,
      sellerName: 'Doce Sonho Gourmet',
    }
  ];

  // Filtros de busca no cliente
  const filteredProducts = allProducts.filter(product => {
    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                        product.description.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
    const occasionMatch = selectedOccasion === 'Todos' || product.occasion.includes(selectedOccasion.toLowerCase());
    
    const actualPrice = product.promoPrice || product.price;
    const priceMatch = actualPrice <= maxPrice;

    return searchMatch && categoryMatch && occasionMatch && priceMatch;
  });

  // Ordenação
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.promoPrice || a.price;
    const priceB = b.promoPrice || b.price;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Padrão
  });

  const categories = ['Todos', 'Casamento', 'Bolos Finos', 'Sobremesas'];
  const occasions = ['Todos', 'Casamento', 'Aniversário', 'Infantil', 'Formatura', 'Corporativo'];

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('Todos');
    setSelectedOccasion('Todos');
    setMaxPrice(2500);
    setSortBy('relevant');
  };

  return (
    <div className="w-full py-16 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Loja */}
        <div className="border-b border-velvet/10 dark:border-champagne/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block">La Boutique</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">Nossa Vitrine Gourmet</h1>
            <p className="text-xs text-chocolate/60 dark:text-cream/60">Explore e compre nossa seleção de alta confeitaria pronta para entrega refrigerada agendada.</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-chocolate/40 dark:text-cream/40" />
              <input 
                type="text" 
                placeholder="Busca inteligente..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-full border border-velvet/20 dark:border-champagne/20 bg-transparent text-xs focus:outline-none focus:border-velvet w-64 text-chocolate dark:text-cream"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* BARRA LATERAL: FILTROS (1 COLUNA) */}
          <div className="space-y-8 glass p-6 rounded-3xl border border-velvet/10 dark:border-champagne/10 h-fit">
            <div className="flex items-center justify-between border-b border-velvet/5 pb-3">
              <h3 className="font-serif text-sm font-bold text-velvet dark:text-champagne uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4" /> Filtros Refinados
              </h3>
              {(search || selectedCategory !== 'Todos' || selectedOccasion !== 'Todos' || maxPrice !== 2500 || sortBy !== 'relevant') && (
                <button 
                  onClick={resetFilters} 
                  className="text-[10px] text-velvet dark:text-champagne hover:underline flex items-center gap-1 font-bold"
                >
                  <FilterX className="h-3.5 w-3.5" /> Limpar
                </button>
              )}
            </div>

            {/* Categorias */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Categorias</label>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-xs py-1.5 px-3 rounded-full transition-all ${
                      selectedCategory === cat 
                        ? 'bg-velvet text-white font-bold shadow-sm' 
                        : 'hover:bg-velvet/5 text-chocolate/75 dark:text-cream/75'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Ocasiões */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Por Ocasião</label>
              <div className="flex flex-wrap gap-1.5">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`text-xs py-1 px-3.5 rounded-full border transition-all ${
                      selectedOccasion === occ 
                        ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5 text-velvet dark:text-champagne font-bold' 
                        : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/20 text-chocolate/70 dark:text-cream/70'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Preço Máximo */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">
                <span>Preço Máximo</span>
                <span className="text-velvet dark:text-champagne font-display font-bold">R$ {maxPrice}</span>
              </div>
              <input 
                type="range" 
                min={100} 
                max={2500} 
                step={50} 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1 bg-chocolate/10 dark:bg-cream/10 rounded-lg appearance-none cursor-pointer accent-velvet"
              />
            </div>

            {/* Ordenação */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-chocolate/50 dark:text-cream/50">Ordenar por</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-full border border-chocolate/15 dark:border-cream/15 bg-cream-light dark:bg-chocolate-light focus:outline-none focus:border-velvet"
              >
                <option value="relevant">Mais Relevantes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>

          </div>

          {/* LISTAGEM GRID PRODUTOS (3 COLUNAS) */}
          <div className="lg:col-span-3 space-y-6">
            
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/40 dark:bg-white/5 border border-dashed border-chocolate/20 rounded-3xl flex flex-col items-center justify-center space-y-3">
                <span className="text-4xl animate-float">🎂</span>
                <h3 className="font-serif text-lg font-bold text-velvet dark:text-champagne">Nenhum doce localizado</h3>
                <p className="text-xs text-chocolate/50 dark:text-cream/50 max-w-sm">Ajuste os filtros refinados da barra lateral para expandir sua pesquisa gastronômica.</p>
                <button onClick={resetFilters} className="bg-chocolate dark:bg-champagne text-cream dark:text-chocolate text-xs font-bold px-6 py-2 rounded-full mt-4">Restaurar Filtros</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((p) => {
                  const price = p.promoPrice || p.price;
                  return (
                    <div 
                      key={p.id}
                      className="glass p-4 rounded-3xl border border-velvet/10 dark:border-champagne/10 shadow-sm flex flex-col group hover:scale-[1.01] transition-all relative"
                    >
                      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-chocolate/10">
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {p.promoPrice && (
                          <span className="absolute top-2.5 left-2.5 bg-velvet text-cream text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Oferta</span>
                        )}
                        <span className="absolute bottom-2.5 right-2.5 bg-black/60 text-champagne text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                          {p.category}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm truncate text-chocolate dark:text-cream group-hover:text-velvet dark:group-hover:text-champagne transition-colors">{p.name}</h3>
                        <span className="text-[9px] text-chocolate/40 dark:text-cream/40 block mt-0.5">Por: {p.sellerName}</span>
                        <p className="text-[11px] text-chocolate/60 dark:text-cream/60 line-clamp-2 mt-1.5 leading-relaxed font-light">{p.description}</p>
                      </div>

                      {/* Avaliações */}
                      <div className="flex items-center gap-1 mt-3.5">
                        {[...Array(5)].map((_, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[10px] ${
                              idx < Math.floor(p.rating) ? 'text-champagne' : 'text-chocolate/20 dark:text-cream/20'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-[10px] font-bold ml-1">{p.rating.toFixed(1)}</span>
                      </div>

                      {/* Rodapé Card */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-velvet/5 dark:border-champagne/5">
                        <div className="flex flex-col">
                          {p.promoPrice && (
                            <span className="text-[10px] text-chocolate/40 dark:text-cream/40 line-through">R$ {p.price.toFixed(2)}</span>
                          )}
                          <span className="font-display font-bold text-sm text-velvet dark:text-champagne">R$ {price.toFixed(2)}</span>
                        </div>

                        <button 
                          onClick={() => addToCart({ id: p.id, name: p.name, price: price, image: p.image })}
                          className="bg-velvet hover:bg-velvet-dark text-white rounded-full p-2.5 shadow-gold hover:scale-105 transition-transform"
                          title="Adicionar à Cesta"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
