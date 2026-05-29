import React from 'react';
import type { Metadata } from 'next';
import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

export const metadata: Metadata = {
  title: 'Território Doce | Confeitaria Premium & Bolos Sob Encomenda',
  description: 'Descubra a boutique mais requintada de doces finos, macarons de Paris, bolos de casamento reais e encomendas 3D personalizadas com ingredientes de alta performance.',
  keywords: 'confeitaria premium, bolos personalizados, bolos de casamento, doces finos, doces gourmet, macaron, gourmet, ateliê de doces',
  authors: [{ name: 'Território Doce Ateliê' }],
  openGraph: {
    title: 'Território Doce Ateliê | Alta Gastronomia',
    description: 'Transformando sonhos açucarados em verdadeiras esculturas comestíveis. Peça sob encomenda.',
    images: ['https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧁</text></svg>"></link>
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Camada global de luzes decorativas */}
        <div className="fixed top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none z-0">
          <div className="bg-flare top-[-100px] left-[-100px] animate-float"></div>
          <div className="bg-flare-gold bottom-[-150px] right-[-150px] animate-float-delayed"></div>
        </div>

        {/* Componentes estruturais */}
        <Header />
        
        <main className="flex-1 relative z-10">
          {children}
        </main>
        
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
