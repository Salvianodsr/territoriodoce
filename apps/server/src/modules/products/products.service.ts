import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promoPrice?: number;
  stock: number;
  images: string[];
  category: string;
  occasion: string[];
  rating: number;
  isFeatured: boolean;
  sellerName: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 'prod-1',
      name: 'Bolo de Casamento Royal Velvet & Ouro',
      slug: 'royal-velvet-ouro',
      description: 'Nossa maior obra de arte gastronômica. Bolo de casamento premium com 4 andares majestosos, recheio trufado de chocolate belga aromatizado com fava de baunilha de Madagascar, coberto por buttercream de champagne cristalizado e detalhes folheados a ouro comestível de 24 quilates.',
      price: 2450.00,
      promoPrice: 2200.00,
      stock: 5,
      images: [
        'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600',
        'https://images.unsplash.com/photo-1525252525252-a5bba5bba5bb?q=80&w=600'
      ],
      category: 'Casamento',
      occasion: ['casamento', 'corporativo'],
      rating: 5.0,
      isFeatured: true,
      sellerName: 'Ateliê do Açúcar Real',
    },
    {
      id: 'prod-2',
      name: 'Bolo de Pistache Siciliano & Frutas Silvestres',
      slug: 'pistache-siciliano-frutas-silvestres',
      description: 'Elaborado com pistaches genuínos da região do Bronte na Sicília, massa chiffon aerada de amêndoas e recheio cremoso de frutas vermelhas infusionadas com licor de framboesa Chambord.',
      price: 280.00,
      stock: 12,
      images: [
        '/assets/pistache-cake.png',
      ],
      category: 'Bolos Finos',
      occasion: ['aniversario', 'formatura'],
      rating: 4.9,
      isFeatured: true,
      sellerName: 'Território Doce Principal',
    },
    {
      id: 'prod-3',
      name: 'Macarons de Paris Imperial (Caixa Premium 12un)',
      slug: 'macarons-paris-imperial',
      description: 'Uma seleção de 12 clássicos macarons franceses com casca crocante e interior cremoso. Sabores: Trufa Negra de Chocolate Belga, Lavanda Francesa, Caramelo Salgado e Limão Meyer.',
      price: 120.00,
      stock: 40,
      images: [
        'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600',
      ],
      category: 'Sobremesas',
      occasion: ['corporativo', 'aniversario'],
      rating: 4.8,
      isFeatured: false,
      sellerName: 'La Maison du Macaron',
    },
    {
      id: 'prod-4',
      name: 'Bolo Chocolatier Extrême com Nibs de Cacau',
      slug: 'chocolatier-extreme-nibs',
      description: 'O paraíso para os amantes de chocolate escuro. Massa fudge úmida com cacau 80% Barry Callebaut, camadas espessas de ganache meio amargo e finalização rústica com nibs de cacau orgânicos.',
      price: 195.00,
      promoPrice: 175.00,
      stock: 15,
      images: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600',
      ],
      category: 'Bolos Finos',
      occasion: ['aniversario', 'corporativo'],
      rating: 4.9,
      isFeatured: true,
      sellerName: 'Território Doce Principal',
    },
    {
      id: 'prod-5',
      name: 'Naked Cake de Frutas Vermelhas & Flores Comestíveis',
      slug: 'naked-cake-flores-comestiveis',
      description: 'Rústico, fresco e romântico. Massa pão de ló super leve banhada com calda de baunilha, recheio generoso de creme de cream cheese trufado e abundância de frutas vermelhas e flores decorativas da estação.',
      price: 220.00,
      stock: 8,
      images: [
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600',
      ],
      category: 'Bolos Finos',
      occasion: ['aniversario', 'infantil', 'casamento'],
      rating: 5.0,
      isFeatured: false,
      sellerName: 'Ateliê do Açúcar Real',
    },
    {
      id: 'prod-6',
      name: 'Red Velvet Majestic Gourmet',
      slug: 'red-velvet-majestic',
      description: 'Inspirado na clássica confeitaria americana com um toque contemporâneo. Massa aveludada vermelha infusionada com extrato de cacau belga e recheio ultra aveludado de brigadeiro de limão siciliano.',
      price: 180.00,
      stock: 20,
      images: [
        'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600',
      ],
      category: 'Bolos Finos',
      occasion: ['aniversario', 'infantil'],
      rating: 4.7,
      isFeatured: false,
      sellerName: 'Doce Sonho Gourmet',
    }
  ];

  findAll(query?: { search?: string; category?: string; occasion?: string; maxPrice?: number }) {
    let filtered = [...this.products];

    if (query) {
      if (query.search) {
        const searchLower = query.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower)
        );
      }
      if (query.category && query.category !== 'Todos') {
        filtered = filtered.filter(p => p.category.toLowerCase() === query.category.toLowerCase());
      }
      if (query.occasion && query.occasion !== 'Todos') {
        filtered = filtered.filter(p => p.occasion.includes(query.occasion.toLowerCase()));
      }
      if (query.maxPrice) {
        filtered = filtered.filter(p => (p.promoPrice || p.price) <= query.maxPrice);
      }
    }

    return filtered;
  }

  findBySlug(slug: string) {
    const product = this.products.find(p => p.slug === slug);
    if (!product) {
      throw new NotFoundException('O doce ou bolo solicitado não foi localizado em nossa vitrine.');
    }
    return product;
  }

  findById(id: string) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException('Produto não localizado.');
    }
    return product;
  }

  getCategories() {
    return ['Todos', 'Casamento', 'Bolos Finos', 'Sobremesas'];
  }

  getOccasions() {
    return ['Todos', 'casamento', 'aniversario', 'infantil', 'formatura', 'corporativo'];
  }
}
