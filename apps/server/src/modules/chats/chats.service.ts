import { Injectable } from '@nestjs/common';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  isAdminMsg: boolean;
  createdAt: string;
}

@Injectable()
export class ChatsService {
  private messages: ChatMessage[] = [
    {
      id: 'msg-1',
      userId: 'customer-id-123',
      userName: 'Salviano Mendes',
      message: 'Olá! Gostaria de saber se vocês fazem entrega de bolos de casamento em Campinas?',
      isAdminMsg: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutos atrás
    },
    {
      id: 'msg-2',
      userId: 'customer-id-123',
      userName: 'Concierge Território Doce',
      message: 'Olá, Salviano! Seja muito bem-vindo ao Território Doce. Sim, atendemos toda a região metropolitana de Campinas com nossa frota refrigerada exclusiva de transporte premium, garantindo que seu bolo chegue impecável. Como podemos adoçar seu dia hoje?',
      isAdminMsg: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(), // 14 minutos atrás
    }
  ];

  findAll() {
    return this.messages;
  }

  findByUser(userId: string) {
    return this.messages.filter(m => m.userId === userId);
  }

  sendMessage(userId: string, userName: string, message: string, isAdminMsg = false) {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId,
      userName: isAdminMsg ? 'Concierge Território Doce' : userName,
      message,
      isAdminMsg,
      createdAt: new Date().toISOString(),
    };

    this.messages.push(newMessage);

    // Se a mensagem foi enviada pelo cliente, disparamos a resposta inteligente da IA da Confeitaria!
    if (!isAdminMsg) {
      setTimeout(() => {
        this.triggerAiResponse(userId, message);
      }, 1000);
    }

    return newMessage;
  }

  private triggerAiResponse(userId: string, customerMessage: string) {
    const text = customerMessage.toLowerCase();
    let reply = 'Agradecemos o seu contato. Um de nossos especialistas em alta confeitaria entrará em contato em instantes.';

    if (text.includes('bolo') && text.includes('casamento')) {
      reply = 'Os nossos bolos de casamento são verdadeiras esculturas comestíveis! Oferecemos massa trufada, recheio de pistache siciliano ou frutas vermelhas, e cobertura em buttercream de champagne. Gostaria de agendar uma degustação privativa em nosso ateliê com o Chef?';
    } else if (text.includes('prazo') || text.includes('entrega') || text.includes('frete')) {
      reply = 'Nossas entregas são feitas por motoristas especializados em caixas climatizadas sob medida. O frete é calculado por quilometragem e o rastreamento em tempo real estará disponível na sua área do cliente logo após a confirmação.';
    } else if (text.includes('personalizado') || text.includes('encomenda') || text.includes('customizado')) {
      reply = 'Para encomendas exclusivas, você pode utilizar o nosso incrível Construtor de Bolos 3D na aba "Encomenda Personalizada"! Lá é possível escolher cada camada de recheio, massa, cor e anexar referências visuais diretamente do Pinterest para nosso chef confeitador.';
    } else if (text.includes('sabor') || text.includes('recheio') || text.includes('cardapio') || text.includes('opcoes')) {
      reply = 'Nossos sabores assinatura incluem: Pistache com Frutas Silvestres, Velvet Rose com Baunilha de Madagascar, Chocolatier Belga 80% Barry Callebaut e Limão Meyer Caramelizado. Todos produzidos artesanalmente com ingredientes importados de altíssima qualidade.';
    } else if (text.includes('cupom') || text.includes('desconto')) {
      reply = 'Excelente escolha! Utilize o cupom de boas-vindas **DOCELUXO10** no checkout e receba 10% de desconto imediato na sua primeira encomenda, além de acumular cashback exclusivo em nosso programa de fidelidade!';
    }

    const aiMessage: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      userId,
      userName: 'IA Concierge Gourmet',
      message: reply,
      isAdminMsg: true,
      createdAt: new Date().toISOString(),
    };

    this.messages.push(aiMessage);
  }
}
