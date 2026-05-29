"use client";

import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Upload, ChevronRight, ChevronLeft, Sparkles, Check, HelpCircle } from 'lucide-react';

export default function CustomCakeBuilder() {
  const { addToCart } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Estados das escolhas do bolo
  const [size, setSize] = useState('20 fatias - 2.5kg');
  const [batter, setBatter] = useState('Massa Fudge de Cacau Belga');
  const [filling, setFilling] = useState('Creme Trufado de Pistache Siciliano');
  const [frosting, setFrosting] = useState('Buttercream de Champagne Imperial');
  const [decoration, setDecoration] = useState('Fios de Ouro 24k & Macarons no Topo');
  const [topperText, setTopperText] = useState('');
  const [colors, setColors] = useState<string[]>(['#E3C89B', '#FAF5EE']); // Paleta inicial
  const [notes, setNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryPeriod, setDeliveryPeriod] = useState('Tarde (13h às 18h)');
  const [uploadedPics, setUploadedPics] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Mocks de dados de opções de customização
  const sizes = [
    { value: '10 fatias - 1.2kg', label: 'Pequeno / Petit (10 fatias)', price: 180, desc: 'Ideal para comemorações íntimas.' },
    { value: '20 fatias - 2.5kg', label: 'Médio / Clássico (20 fatias)', price: 290, desc: 'Nosso tamanho mais solicitado.' },
    { value: '35 fatias - 4kg', label: 'Grande / Real (35 fatias)', price: 480, desc: 'Perfeito para festas de aniversário.' },
    { value: '50 fatias - 6kg', label: 'Gala / Majestoso (50 fatias)', price: 680, desc: 'Andares acoplados, impacto visual máximo.' },
  ];

  const batters = [
    { value: 'Massa Fudge de Cacau Belga', label: 'Cacau Belga 80%', price: 20, desc: 'Intensa, super úmida e aveludada.' },
    { value: 'Pão de Ló de Baunilha de Madagascar', label: 'Baunilha de Madagascar', price: 10, desc: 'Leve, aerada e perfumada com favas naturais.' },
    { value: 'Red Velvet Majestic', label: 'Red Velvet', price: 15, desc: 'Massa rubi com toque sutil de cacau.' },
    { value: 'Chiffon de Amêndoas e Limão', label: 'Amêndoas e Limão Meyer', price: 25, desc: 'Textura rica e toque cítrico refrescante.' },
  ];

  const fillings = [
    { value: 'Creme Trufado de Pistache Siciliano', label: 'Pistache Siciliano Bronte', price: 40, desc: 'Ganache aerada com pistaches sicilianos triturados.' },
    { value: 'Brigadeiro Gourmet ao Leite Barry Callebaut', label: 'Brigadeiro Belga ao Leite', price: 15, desc: 'O clássico elevado à máxima sofisticação.' },
    { value: 'Coulis de Frutas Vermelhas & Cream Cheese', label: 'Frutas Vermelhas Silvestres', price: 30, desc: 'Acidez perfeita de framboesas e amoras frescas.' },
    { value: 'Doce de Leite na Fava de Baunilha com Nozes Pecã', label: 'Doce de Leite & Nozes Pecã', price: 20, desc: 'Cozido por 8 horas com nozes pecãs caramelizadas.' },
  ];

  const frostings = [
    { value: 'Buttercream de Champagne Imperial', label: 'Buttercream de Champagne', price: 30, desc: 'Creme de manteiga acetinado infusionado com champagne brut.' },
    { value: 'Ganache Velvet de Chocolate Branco', label: 'Ganache de Chocolate Branco', price: 20, desc: 'Capa lisa e moderna, super resistente e elegante.' },
    { value: 'Pasta Americana Esculpida', label: 'Pasta Americana Artística', price: 50, desc: 'Visual perfeitamente liso ideal para decorações esculpidas.' },
    { value: 'Rústico Semi-Naked Cream', label: 'Naked Cake Rústico', price: 10, desc: 'Camadas de massa e recheio levemente expostas.' },
  ];

  const decorations = [
    { value: 'Fios de Ouro 24k & Macarons no Topo', label: 'Ouro 24k & Macarons', price: 60, desc: 'Folhas de ouro comestíveis e 4 macarons franceses adornando.' },
    { value: 'Flores Naturais Orgânicas da Estação', label: 'Flores Naturais Silvestres', price: 40, desc: 'Rosas e flores selecionadas pelo Chef e higienizadas.' },
    { value: 'Morangos Frescos Glaceados e Chocolate Belga', label: 'Morangos & Chocolates Belgas', price: 30, desc: 'Festa de morangos vermelhos e raspas trufadas.' },
    { value: 'Minimalista Clássico com Perolado', label: 'Clean Perolado', price: 15, desc: 'Textura em ondas e pérolas de açúcar gourmet.' },
  ];

  const colorOptions = [
    { label: 'Champagne Rosé', values: ['#FFE4E1', '#FAF0E6', '#E3C89B'] },
    { label: 'Royal Velvet & Ouro', values: ['#BE2C54', '#E3C89B', '#19110F'] },
    { label: 'Tiffany & Pérola', values: ['#E0F2F1', '#FAF5EE', '#B09160'] },
    { label: 'Creme Minimalista', values: ['#FAF5EE', '#FCFAF7', '#D5C7C3'] },
  ];

  // Cálculo Dinâmico de Preço Estimado
  const getCalculatedPrice = () => {
    const sizePrice = sizes.find(s => s.value === size)?.price || 0;
    const batterPrice = batters.find(b => b.value === batter)?.price || 0;
    const fillingPrice = fillings.find(f => f.value === filling)?.price || 0;
    const frostingPrice = frostings.find(fr => fr.value === frosting)?.price || 0;
    const decorationPrice = decorations.find(d => d.value === decoration)?.price || 0;
    
    return sizePrice + batterPrice + fillingPrice + frostingPrice + decorationPrice;
  };

  // Mock Upload de referências
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Simula fotos adicionadas do computador ou Pinterest
    const mockUrls = [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=300',
      'https://images.unsplash.com/photo-1518047601542-79f18c655718?q=80&w=300',
    ];
    setUploadedPics(prev => [...prev, mockUrls[Math.floor(Math.random() * mockUrls.length)]]);
  };

  const handleManualUpload = () => {
    const mockUrls = [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=300',
      'https://images.unsplash.com/photo-1518047601542-79f18c655718?q=80&w=300',
    ];
    setUploadedPics(prev => [...prev, mockUrls[Math.floor(Math.random() * mockUrls.length)]]);
  };

  // Adiciona encomenda customizada ao carrinho do Zustand
  const handleAddToOrder = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart({
        id: `custom-cake-${Date.now()}`,
        name: `Bolo Sob Encomenda: ${size.split(' - ')[0]}`,
        price: getCalculatedPrice(),
        image: uploadedPics[0] || 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=300',
        customCakeDetails: {
          size,
          batter,
          filling,
          frosting,
          decoration,
          topperText: topperText || undefined,
          colors,
        }
      });
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 bg-white/40 dark:bg-white/5 rounded-3xl border border-velvet/10 dark:border-champagne/10 backdrop-blur-xl shadow-premium">
      
      {/* ProgressBar */}
      <div className="flex items-center justify-between mb-8 border-b border-velvet/5 dark:border-champagne/5 pb-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-initial">
            <button 
              onClick={() => step > s && setStep(s)}
              className={`h-9 w-9 rounded-full font-display text-xs font-bold flex items-center justify-center border transition-all ${
                step === s 
                  ? 'bg-velvet border-velvet text-cream shadow-gold scale-105' 
                  : step > s 
                    ? 'bg-champagne border-champagne text-chocolate' 
                    : 'bg-transparent border-chocolate/20 dark:border-cream/20 text-chocolate/50 dark:text-cream/50'
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </button>
            
            {s < 4 && (
              <div className={`h-[2px] flex-1 mx-4 transition-colors ${
                step > s ? 'bg-champagne' : 'bg-chocolate/10 dark:bg-cream/10'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* COLUNA ESQUERDA: FORMULÁRIO DE SELEÇÕES (3 COLUNAS) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* STEP 1: TAMANHO DO BOLO */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-velvet dark:text-champagne">Escolha o Tamanho & Fatias</h3>
              <p className="text-xs text-chocolate/60 dark:text-cream/60">Selecione a capacidade recomendada para os convidados de sua festa.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {sizes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSize(s.value)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      size === s.value 
                        ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5 ring-1 ring-velvet/30' 
                        : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/40'
                    }`}
                  >
                    <h4 className="font-display font-bold text-sm text-chocolate dark:text-cream">{s.label}</h4>
                    <p className="text-[10px] text-chocolate/50 dark:text-cream/50 mt-1">{s.desc}</p>
                    <span className="inline-block mt-3 text-xs font-bold text-velvet dark:text-champagne">Base: R$ {s.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: RECEITA (MASSA & RECHEIO) */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-velvet dark:text-champagne mb-1">Escolha a Massa</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {batters.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setBatter(b.value)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        batter === b.value 
                          ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5' 
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/20'
                      }`}
                    >
                      <h4 className="font-display font-bold text-chocolate dark:text-cream">{b.label}</h4>
                      <p className="text-[9px] text-chocolate/40 dark:text-cream/40 mt-0.5">{b.desc}</p>
                      <span className="inline-block mt-1 font-bold text-velvet dark:text-champagne text-[10px]">+ R$ {b.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-velvet dark:text-champagne mb-1">Escolha o Recheio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {fillings.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilling(f.value)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        filling === f.value 
                          ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5' 
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/20'
                      }`}
                    >
                      <h4 className="font-display font-bold text-chocolate dark:text-cream">{f.label}</h4>
                      <p className="text-[9px] text-chocolate/40 dark:text-cream/40 mt-0.5">{f.desc}</p>
                      <span className="inline-block mt-1 font-bold text-velvet dark:text-champagne text-[10px]">+ R$ {f.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DECORAÇÃO, COBERTURA & CORES */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-velvet dark:text-champagne mb-1">Cobertura Externa</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {frostings.map((fr) => (
                    <button
                      key={fr.value}
                      onClick={() => setFrosting(fr.value)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        frosting === fr.value 
                          ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5' 
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/20'
                      }`}
                    >
                      <h4 className="font-display font-bold text-chocolate dark:text-cream">{fr.label}</h4>
                      <p className="text-[9px] text-chocolate/40 dark:text-cream/40 mt-0.5">{fr.desc}</p>
                      <span className="inline-block mt-1 font-bold text-velvet dark:text-champagne text-[10px]">+ R$ {fr.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-velvet dark:text-champagne mb-1">Estilo de Finalização</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {decorations.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDecoration(d.value)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        decoration === d.value 
                          ? 'border-velvet dark:border-champagne bg-velvet/5 dark:bg-champagne/5' 
                          : 'border-chocolate/10 dark:border-cream/10 hover:border-velvet/20'
                      }`}
                    >
                      <h4 className="font-display font-bold text-chocolate dark:text-cream">{d.label}</h4>
                      <p className="text-[9px] text-chocolate/40 dark:text-cream/40 mt-0.5">{d.desc}</p>
                      <span className="inline-block mt-1 font-bold text-velvet dark:text-champagne text-[10px]">+ R$ {d.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-xs text-chocolate/80 dark:text-cream/80 mb-2">Paleta de Cores do Bolo</h4>
                <div className="flex gap-4">
                  {colorOptions.map((palette) => (
                    <button
                      key={palette.label}
                      onClick={() => setColors(palette.values)}
                      className={`p-1.5 rounded-full border flex gap-1 ${
                        JSON.stringify(colors) === JSON.stringify(palette.values)
                          ? 'border-velvet dark:border-champagne bg-velvet/5' 
                          : 'border-transparent'
                      }`}
                      title={palette.label}
                    >
                      {palette.values.map(color => (
                        <div key={color} className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: color }}></div>
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DETALHES, UPLOAD & LOGÍSTICA */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-velvet dark:text-champagne">Finalização & Entrega</h3>
              
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-chocolate/80 dark:text-cream/80">Texto Plaqueta de Topo (Opcional)</label>
                <input 
                  type="text" 
                  value={topperText} 
                  onChange={(e) => setTopperText(e.target.value)} 
                  placeholder="Ex: Feliz Aniversário Maria! (Max 25 caracteres)" 
                  className="w-full text-xs px-4 py-3 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet"
                />
              </div>

              {/* Drag and Drop Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-chocolate/80 dark:text-cream/80">Anexar Referências Visuais (Pinterest/Inspirações)</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-velvet bg-velvet/5' 
                      : 'border-chocolate/20 dark:border-cream/20 hover:border-velvet/40'
                  }`}
                  onClick={handleManualUpload}
                >
                  <Upload className="h-8 w-8 text-chocolate/40 dark:text-cream/40" />
                  <p className="text-xs font-bold text-chocolate dark:text-cream">Arraste referências ou clique para fazer upload</p>
                  <p className="text-[9px] text-chocolate/40 dark:text-cream/40">Suporta JPG, PNG e links directos (Compressão automática ativada)</p>
                </div>

                {uploadedPics.length > 0 && (
                  <div className="flex gap-2 pt-2 overflow-x-auto">
                    {uploadedPics.map((pic, idx) => (
                      <div key={idx} className="relative h-12 w-12 rounded-xl overflow-hidden border border-velvet/20">
                        <img src={pic} alt="inspiração" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-chocolate/80 dark:text-cream/80">Data Desejada</label>
                  <input 
                    type="date" 
                    value={deliveryDate} 
                    onChange={(e) => setDeliveryDate(e.target.value)} 
                    className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-transparent focus:outline-none focus:border-velvet"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-chocolate/80 dark:text-cream/80">Período de Entrega</label>
                  <select 
                    value={deliveryPeriod} 
                    onChange={(e) => setDeliveryPeriod(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 rounded-xl border border-chocolate/10 dark:border-cream/10 bg-cream-light dark:bg-chocolate-light focus:outline-none focus:border-velvet"
                  >
                    <option>Manhã (08h às 12h)</option>
                    <option>Tarde (13h às 18h)</option>
                    <option>Noite (19h às 21h)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Botões Navegação */}
          <div className="flex justify-between items-center pt-6 border-t border-chocolate/10 dark:border-cream/10">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 text-xs font-bold text-chocolate/60 dark:text-cream/60 hover:text-velvet transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Voltar
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button 
                onClick={() => setStep(step + 1)}
                className="bg-chocolate dark:bg-cream text-cream dark:text-chocolate font-display font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full hover:scale-105 transition-transform flex items-center gap-1.5"
              >
                Avançar <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button 
                onClick={handleAddToOrder}
                disabled={loading || success}
                className="bg-velvet text-white font-display font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full hover:scale-105 transition-transform disabled:opacity-55 shadow-premium flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> 
                {loading ? 'Adicionando à Cesta...' : success ? 'Bolo Adicionado!' : 'Encomendar Bolo Assinatura'}
              </button>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: VISUAL PREVIEW & RESUMO DO BOLO (2 COLUNAS) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-5 rounded-2xl border border-velvet/10 dark:border-champagne/10 relative overflow-hidden flex flex-col h-full min-h-[350px]">
            
            <h4 className="font-serif text-sm font-bold text-velvet dark:text-champagne border-b border-velvet/5 dark:border-champagne/5 pb-2 uppercase tracking-wider flex items-center gap-1.5">
              👑 Modelo do seu Bolo
            </h4>

            {/* DYNAMIC VISUAL CAKE MOCKUP */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
              
              {/* Cores flutuando */}
              <div className="absolute top-1/4 left-1/4 w-28 h-28 filter blur-[35px] opacity-25 rounded-full" style={{ backgroundColor: colors[0] }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-28 h-28 filter blur-[35px] opacity-25 rounded-full" style={{ backgroundColor: colors[1] || colors[0] }}></div>

              {/* Elementos Estilizados Simulação do Bolo */}
              <div className="relative flex flex-col items-center justify-end w-48 h-48 select-none">
                
                {/* Topper text simulation */}
                {topperText && (
                  <div className="absolute bottom-[115px] bg-champagne text-chocolate font-serif text-[7px] py-0.5 px-2 rounded-full font-bold shadow-md animate-bounce">
                    {topperText}
                  </div>
                )}

                {/* Andar 1 (Topo) */}
                <div 
                  className="w-16 h-10 rounded-t-lg border-t border-x transition-colors duration-500 shadow-md relative z-30"
                  style={{ 
                    backgroundColor: colors[0],
                    borderColor: colors[1] || '#e3c89b',
                  }}
                >
                  <span className="absolute inset-x-0 bottom-1 flex items-center justify-center font-serif text-[5px] text-black/30 tracking-widest uppercase">TERRA</span>
                </div>

                {/* Camada Recheio 1 */}
                <div className="w-14 h-1.5 bg-[#4A2E1B] dark:bg-[#321C0D] border-x border-black/10 relative z-25"></div>

                {/* Andar 2 (Meio) */}
                <div 
                  className="w-28 h-14 border-t border-x transition-colors duration-500 shadow-lg relative z-20"
                  style={{ 
                    backgroundColor: colors[1] || colors[0],
                    borderColor: colors[2] || colors[0],
                  }}
                >
                  {/* Decoração fita */}
                  <div className="absolute bottom-1.5 inset-x-0 h-1 bg-champagne-dark opacity-80"></div>
                </div>

                {/* Camada Recheio 2 */}
                <div className="w-24 h-2 bg-[#4A2E1B] dark:bg-[#321C0D] border-x border-black/10 relative z-15"></div>

                {/* Andar 3 (Base) */}
                <div 
                  className="w-40 h-16 rounded-b-lg border-x border-b transition-colors duration-500 shadow-2xl relative z-10"
                  style={{ 
                    backgroundColor: colors[2] || colors[0],
                    borderColor: colors[0],
                  }}
                >
                  {/* Raspas peroladas */}
                  <div className="absolute inset-x-4 top-2 h-0.5 bg-white/20 rounded-full"></div>
                </div>

                {/* Prato do Bolo */}
                <div className="w-48 h-2 bg-gradient-to-r from-neutral-300 to-neutral-500 rounded-full shadow-lg mt-1"></div>

              </div>

            </div>

            {/* RESUMO ESCRITO E PREÇO */}
            <div className="border-t border-velvet/5 dark:border-champagne/5 pt-4 mt-auto space-y-3">
              <div className="text-[11px] text-chocolate/80 dark:text-cream/80 space-y-1">
                <p><strong>Tamanho:</strong> {size}</p>
                <p><strong>Massa:</strong> {batter}</p>
                <p><strong>Recheio:</strong> {filling}</p>
                <p><strong>Cobertura:</strong> {frosting}</p>
                <p><strong>Decoração:</strong> {decoration}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-dashed border-velvet/10">
                <span className="font-serif text-sm font-bold text-chocolate dark:text-cream flex items-center gap-1">
                  Orçamento Estimado <HelpCircle className="h-3.5 w-3.5 text-chocolate/30" />
                </span>
                <span className="font-display text-xl font-bold text-velvet dark:text-champagne">
                  R$ {getCalculatedPrice().toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
