import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customCakeDetails?: {
    size: string;
    batter: string;
    filling: string;
    frosting: string;
    decoration: string;
    topperText?: string;
    colors: string[];
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN' | 'PASTRY_CHEF' | 'DELIVERY_DRIVER' | 'SELLER';
  avatarUrl?: string;
  cashbackVal: number;
  loyaltyPoints: number;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  message: string;
  isAdminMsg: boolean;
  createdAt: string;
}

interface AppState {
  // Estado de Autenticação
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;

  // Estado do Carrinho
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  discount: number;
  applyCoupon: (code: string) => boolean;


  // Estado do Chat
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;
}

export const useStore = create<AppState>((set, get) => {
  // Inicialização segura de localStorage no browser
  const isClient = typeof window !== 'undefined';
  const initialUser = isClient ? JSON.parse(localStorage.getItem('td_user') || 'null') : null;
  const initialToken = isClient ? localStorage.getItem('td_token') : null;
  const initialCart = isClient ? JSON.parse(localStorage.getItem('td_cart') || '[]') : [];

  return {
    user: initialUser,
    token: initialToken,
    setAuth: (user, token) => {
      if (isClient) {
        if (user) localStorage.setItem('td_user', JSON.stringify(user));
        else localStorage.removeItem('td_user');
        
        if (token) localStorage.setItem('td_token', token);
        else localStorage.removeItem('td_token');
      }
      set({ user, token });
    },
    logout: () => {
      if (isClient) {
        localStorage.removeItem('td_user');
        localStorage.removeItem('td_token');
      }
      set({ user: null, token: null });
    },

    cart: initialCart,
    discount: 0,
    addToCart: (item) => {
      const currentCart = get().cart;
      const existing = currentCart.find((i) => i.id === item.id);
      let newCart;
      
      if (existing) {
        newCart = currentCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      } else {
        newCart = [...currentCart, { ...item, quantity: item.quantity || 1 }];
      }

      if (isClient) localStorage.setItem('td_cart', JSON.stringify(newCart));
      set({ cart: newCart });
    },
    removeFromCart: (id) => {
      const newCart = get().cart.filter((item) => item.id !== id);
      if (isClient) localStorage.setItem('td_cart', JSON.stringify(newCart));
      set({ cart: newCart });
    },
    updateQuantity: (id, quantity) => {
      if (quantity <= 0) {
        get().removeFromCart(id);
        return;
      }
      const newCart = get().cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      if (isClient) localStorage.setItem('td_cart', JSON.stringify(newCart));
      set({ cart: newCart });
    },
    clearCart: () => {
      if (isClient) localStorage.removeItem('td_cart');
      set({ cart: [], discount: 0 });
    },
    getCartTotal: () => {
      const total = get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return Math.max(0, total - get().discount);
    },
    getCartItemsCount: () => {
      return get().cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    applyCoupon: (code) => {
      const c = code.toUpperCase();
      if (c === 'DOCELUXO10') {
        const total = get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ discount: total * 0.1 }); // 10% de desconto!
        return true;
      }
      if (c === 'PROMO20') {
        set({ discount: 20 }); // R$ 20 desconto fixo
        return true;
      }
      return false;
    },


    chatOpen: false,
    setChatOpen: (chatOpen) => set({ chatOpen }),
    messages: [
      {
        id: 'init-msg',
        userId: 'concierge',
        userName: 'Concierge Território Doce',
        message: 'Bem-vindo ao ateliê gastronômico de alta confeitaria Território Doce. Como posso ajudar com seu bolo dos sonhos ou encomenda hoje?',
        isAdminMsg: true,
        createdAt: new Date().toISOString(),
      }
    ],
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    setMessages: (messages) => set({ messages }),
  };
});
