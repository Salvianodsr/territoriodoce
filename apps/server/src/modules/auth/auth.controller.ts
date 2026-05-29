import { Controller, Post, Get, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('signup')
  async signUp(@Body() body: any) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  async signIn(@Body() body: any) {
    return this.authService.signIn(body);
  }

  @Get('profile')
  async getProfile(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autorização não enviado ou inválido.');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      return this.authService.getProfile(decoded.id);
    } catch (e) {
      throw new UnauthorizedException('Token de autenticação expirado ou inválido.');
    }
  }
}
