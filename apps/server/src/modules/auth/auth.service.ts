import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN' | 'PASTRY_CHEF' | 'DELIVERY_DRIVER' | 'SELLER';
}

@Injectable()
export class AuthService {
  // Usuários pré-semeados para testes imediatos
  private mockUsers = [
    {
      id: 'customer-id-123',
      email: 'cliente@territoriodoce.com',
      name: 'Salviano Mendes',
      password: 'senha123',
      role: 'CUSTOMER',
      cashbackVal: 48.50,
      loyaltyPoints: 340,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256',
    },
    {
      id: 'admin-id-456',
      email: 'admin@territoriodoce.com',
      name: 'Patrícia Albuquerque',
      password: 'senha123',
      role: 'ADMIN',
      cashbackVal: 0.00,
      loyaltyPoints: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256',
    },
    {
      id: 'chef-id-789',
      email: 'confeiteiro@territoriodoce.com',
      name: 'Chef Michael Patissier',
      password: 'senha123',
      role: 'PASTRY_CHEF',
      cashbackVal: 0.00,
      loyaltyPoints: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=256',
    },
    {
      id: 'driver-id-321',
      email: 'entregador@territoriodoce.com',
      name: 'Carlos Veloz',
      password: 'senha123',
      role: 'DELIVERY_DRIVER',
      cashbackVal: 0.00,
      loyaltyPoints: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256',
    },
    {
      id: 'seller-id-654',
      email: 'vendedor@territoriodoce.com',
      name: 'Doce Sonho Gourmet',
      password: 'senha123',
      role: 'SELLER',
      cashbackVal: 0.00,
      loyaltyPoints: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async signUp(body: any) {
    const { email, name, password, role } = body;
    const exists = this.mockUsers.find(u => u.email === email);
    if (exists) {
      throw new BadRequestException('Este e-mail já está cadastrado em nossa confeitaria de luxo.');
    }

    const newUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      password, // Em prod: bcrypt hash
      role: role || 'CUSTOMER',
      cashbackVal: 0.00,
      loyaltyPoints: 0,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
    };

    this.mockUsers.push(newUser);
    return this.generateToken(newUser);
  }

  async signIn(body: any) {
    const { email, password } = body;
    const user = this.mockUsers.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciais incorretas. Por favor, verifique seu e-mail e senha.');
    }

    return this.generateToken(user);
  }

  async getProfile(userId: string) {
    const user = this.mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new UnauthorizedException('Perfil de usuário não encontrado.');
    }
    const { password, ...result } = user;
    return result;
  }

  private generateToken(user: any) {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        cashbackVal: user.cashbackVal,
        loyaltyPoints: user.loyaltyPoints,
      },
    };
  }
}
