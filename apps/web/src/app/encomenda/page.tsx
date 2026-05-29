"use client";

import React from 'react';
import CustomCakeBuilder from '../../components/CustomCakeBuilder';
import { Sparkles, Compass, ShieldCheck, Heart } from 'lucide-react';

export default function Encomenda() {
  return (
    <div className="w-full py-16 bg-cream-light dark:bg-chocolate text-chocolate dark:text-cream">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="font-serif italic text-sm text-velvet dark:text-champagne tracking-widest uppercase block flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4" /> Alta Customização Artística
          </span>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Monte seu Bolo dos Sonhos
          </h1>
          
          <p className="text-xs sm:text-sm font-light text-chocolate/70 dark:text-cream/70 leading-relaxed">
            Seja para comemorações íntimas, festas corporativas ou aniversários de gala, nosso construtor interativo permite escolher cada detalhe de massa, recheio e finalização.
          </p>
        </div>

        {/* COMPONENTE BUILDER */}
        <CustomCakeBuilder />

        {/* Diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4">
            <div className="h-10 w-10 bg-velvet/10 rounded-full flex items-center justify-center text-velvet mb-3">
              <Compass className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-1.5">Design Sem Limites</h4>
            <p className="text-[11px] text-chocolate/50 dark:text-cream/50 leading-relaxed font-light">Envie suas fotos de inspiração do Pinterest e nossa equipe artística cuidará do visual tridimensional.</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="h-10 w-10 bg-velvet/10 rounded-full flex items-center justify-center text-velvet mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-1.5">Logística Cuidadosa</h4>
            <p className="text-[11px] text-chocolate/50 dark:text-cream/50 leading-relaxed font-light">Transporte refrigerado exclusivo e embalagem rígida com travas antiqueda patenteadas.</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="h-10 w-10 bg-velvet/10 rounded-full flex items-center justify-center text-velvet mb-3">
              <Heart className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-1.5">Matéria-Prima Pura</h4>
            <p className="text-[11px] text-chocolate/50 dark:text-cream/50 leading-relaxed font-light">Zero essências artificiais. Recheios cozidos longamente com favas de baunilha e frutas puras.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
