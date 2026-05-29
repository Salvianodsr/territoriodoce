import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtService } from '@nestjs/jwt';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get('my-chat')
  findMyChat(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autenticação ausente.');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      return this.chatsService.findByUser(decoded.id);
    } catch (e) {
      throw new UnauthorizedException('Sessão expirada. Faça login novamente.');
    }
  }

  @Post()
  sendMessage(@Headers('authorization') authHeader: string, @Body() body: any) {
    const { message, isAdminMsg } = body;
    let userId = 'guest-customer';
    let userName = 'Cliente Anonimo';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        userId = decoded.id;
        userName = decoded.name;
      } catch (e) {
        // Fallback para visitante
      }
    }

    return this.chatsService.sendMessage(userId, userName, message, isAdminMsg);
  }
}
