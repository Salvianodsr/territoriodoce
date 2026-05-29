import { Injectable, NotFoundException } from '@nestjs/common';

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  customCakeDetails?: {
    size: string;
    batter: string;
    filling: string;
    frosting: string;
    decoration: string;
    topperText?: string;
    colors: string[];
    referencePics?: string[];
  };
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'DECORATING' | 'READY_TO_SHIP' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
  total: number;
  shippingCost: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryAddress: string;
  deliveryEta?: string;
  currentLat?: number;
  currentLng?: number;
  createdAt: string;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    {
      id: 'TD-9021',
      customerId: 'customer-id-123',
      customerName: 'Salviano Mendes',
      items: [
        {
          id: 'item-1',
          productName: 'Bolo de Casamento Royal Velvet & Ouro',
          quantity: 1,
          price: 2200.00,
        }
      ],
      status: 'DECORATING', // Confeiteiros enfeitando
      total: 2200.00,
      shippingCost: 80.00,
      discount: 0.00,
      paymentMethod: 'PIX',
      paymentStatus: 'PAID',
      deliveryAddress: 'Av. Paulista, 1000 - Ap 142, São Paulo - SP',
      deliveryEta: '2026-05-28T18:00:00Z',
      currentLat: -23.5616,
      currentLng: -46.6560,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
    },
    {
      id: 'TD-9018',
      customerId: 'customer-id-123',
      customerName: 'Salviano Mendes',
      items: [
        {
          id: 'item-2',
          productName: 'Bolo Customizado - Encomenda Exclusiva',
          quantity: 1,
          price: 450.00,
          customCakeDetails: {
            size: '25 fatias (2.5kg)',
            batter: 'Massa Fudge de Cacau Belga',
            filling: 'Creme Trufado de Pistache',
            frosting: 'Buttercream Aveludado de Limão Siciliano',
            decoration: 'Estilo Rústico com Flores Naturais',
            topperText: 'Parabéns Salviano!',
            colors: ['#FFE4E1', '#FAF0E6', '#F5F5DC'],
            referencePics: ['https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=300'],
          }
        }
      ],
      status: 'SHIPPING', // Em rota de entrega ativa!
      total: 475.00,
      shippingCost: 25.00,
      discount: 0.00,
      paymentMethod: 'CREDIT_CARD',
      paymentStatus: 'PAID',
      deliveryAddress: 'Rua Augusta, 450 - Ap 12, São Paulo - SP',
      deliveryEta: '2026-05-28T12:30:00Z',
      currentLat: -23.5539,
      currentLng: -46.6625,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 horas atrás
    },
    {
      id: 'TD-8992',
      customerId: 'other-cust',
      customerName: 'Ana Clara Souza',
      items: [
        {
          id: 'item-3',
          productName: 'Bolo de Pistache Siciliano & Frutas Silvestres',
          quantity: 1,
          price: 280.00,
        },
        {
          id: 'item-4',
          productName: 'Macarons de Paris Imperial (Caixa Premium 12un)',
          quantity: 2,
          price: 120.00,
        }
      ],
      status: 'DELIVERED',
      total: 520.00,
      shippingCost: 20.00,
      discount: 20.00,
      paymentMethod: 'PIX',
      paymentStatus: 'PAID',
      deliveryAddress: 'Alameda Lorena, 890 - Jardins, São Paulo - SP',
      createdAt: '2026-05-27T15:30:00Z',
    },
    {
      id: 'TD-8951',
      customerId: 'other-cust-2',
      customerName: 'Roberto Carlos',
      items: [
        {
          id: 'item-5',
          productName: 'Red Velvet Majestic Gourmet',
          quantity: 1,
          price: 180.00,
        }
      ],
      status: 'DELIVERED',
      total: 195.00,
      shippingCost: 15.00,
      discount: 0.00,
      paymentMethod: 'PAYPAL',
      paymentStatus: 'PAID',
      deliveryAddress: 'Rua Pamplona, 1200 - Jardim Paulista, São Paulo - SP',
      createdAt: '2026-05-26T18:00:00Z',
    }
  ];

  findAll() {
    return this.orders;
  }

  findByUser(customerId: string) {
    return this.orders.filter(o => o.customerId === customerId);
  }

  findById(id: string) {
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new NotFoundException('Pedido não localizado.');
    }
    return order;
  }

  createOrder(customerId: string, customerName: string, body: any) {
    const { items, paymentMethod, deliveryAddress, discount, shippingCost } = body;
    
    let calculatedTotal = 0;
    const mappedItems: OrderItem[] = items.map((item: any, index: number) => {
      const price = item.price || 150;
      calculatedTotal += price * item.quantity;
      return {
        id: `item-${Date.now()}-${index}`,
        productName: item.name,
        quantity: item.quantity,
        price: price,
        customCakeDetails: item.customCakeDetails ? {
          size: item.customCakeDetails.size,
          batter: item.customCakeDetails.batter,
          filling: item.customCakeDetails.filling,
          frosting: item.customCakeDetails.frosting,
          decoration: item.customCakeDetails.decoration,
          topperText: item.customCakeDetails.topperText,
          colors: item.customCakeDetails.colors || [],
          referencePics: item.customCakeDetails.referencePics || [],
        } : undefined,
      };
    });

    const netDiscount = discount || 0;
    const freight = shippingCost || 20;

    const newOrder: Order = {
      id: `TD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId,
      customerName,
      items: mappedItems,
      status: 'PENDING',
      total: calculatedTotal - netDiscount + freight,
      shippingCost: freight,
      discount: netDiscount,
      paymentMethod: paymentMethod || 'PIX',
      paymentStatus: paymentMethod === 'PIX' ? 'PENDING' : 'PAID', // Pix inicia pending
      deliveryAddress: deliveryAddress || 'Endereço para entrega',
      createdAt: new Date().toISOString(),
      currentLat: -23.5505,
      currentLng: -46.6333,
    };

    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateStatus(id: string, status: any) {
    const order = this.findById(id);
    order.status = status;
    
    // Atualização de simulação de coordenadas para entregador rodando
    if (status === 'SHIPPING') {
      order.currentLat = -23.5600;
      order.currentLng = -46.6500;
      order.deliveryEta = new Date(Date.now() + 1000 * 60 * 45).toISOString(); // 45 minutos da entrega
    }
    
    return order;
  }

  updateCoordinates(id: string, lat: number, lng: number) {
    const order = this.findById(id);
    order.currentLat = lat;
    order.currentLng = lng;
    return order;
  }

  // Dashboard de Produção de Cozinha (Pedidos Ativos na Esteira)
  getKitchenProduction() {
    return this.orders.filter(o => 
      o.status === 'PENDING' || 
      o.status === 'CONFIRMED' || 
      o.status === 'PREPARING' || 
      o.status === 'DECORATING' || 
      o.status === 'READY_TO_SHIP'
    );
  }

  // Dashboard Financeiro do Admin
  getFinanceStats() {
    // Faturamento Total e Ticket Médio
    const completedOrders = this.orders.filter(o => o.status !== 'CANCELLED');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
    const averageTicket = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
    
    // Gráfico de Faturamento Mensal (Jan-Mai 2026)
    const monthlyRevenue = [
      { name: 'Jan', vendas: 45000, pedidos: 110 },
      { name: 'Fev', vendas: 58000, pedidos: 130 },
      { name: 'Mar', vendas: 72000, pedidos: 160 },
      { name: 'Abr', vendas: 98000, pedidos: 210 },
      { name: 'Mai', vendas: totalRevenue + 120000, pedidos: completedOrders.length + 240 }, // Adiciona real + histórico
    ];

    // Produtos mais vendidos
    const topProducts = [
      { name: 'Bolo de Casamento Royal Velvet', quantity: 24, revenue: 52800 },
      { name: 'Bolo de Pistache Siciliano', quantity: 82, revenue: 22960 },
      { name: 'Macarons de Paris Imperial', quantity: 185, revenue: 22200 },
      { name: 'Red Velvet Majestic', quantity: 64, revenue: 11520 },
    ];

    // Distribuição de vendas por categoria
    const categoryDistribution = [
      { name: 'Casamento', value: 45 },
      { name: 'Bolos Finos', value: 35 },
      { name: 'Sobremesas', value: 15 },
      { name: 'Sob Encomenda', value: 5 },
    ];

    return {
      totalRevenue,
      averageTicket,
      completedOrdersCount: completedOrders.length,
      monthlyRevenue,
      topProducts,
      categoryDistribution,
    };
  }
}
