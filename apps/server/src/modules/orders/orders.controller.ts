import { Controller, Get, Post, Patch, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('kitchen')
  getKitchenProduction() {
    return this.ordersService.getKitchenProduction();
  }

  @Get('finance')
  getFinanceStats() {
    return this.ordersService.getFinanceStats();
  }

  @Get('my-orders')
  getMyOrders(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autenticação ausente ou inválido.');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      return this.ordersService.findByUser(decoded.id);
    } catch (e) {
      throw new UnauthorizedException('Sessão expirada. Faça login novamente.');
    }
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Post()
  createOrder(@Headers('authorization') authHeader: string, @Body() body: any) {
    let customerId = 'guest-customer';
    let customerName = 'Cliente Visitante';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        customerId = decoded.id;
        customerName = decoded.name;
      } catch (e) {
        // Fallback para visitante se o token estiver quebrado
      }
    }

    return this.ordersService.createOrder(customerId, customerName, body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Patch(':id/coordinates')
  updateCoordinates(
    @Param('id') id: string,
    @Body('lat') lat: number,
    @Body('lng') lng: number,
  ) {
    return this.ordersService.updateCoordinates(id, lat, lng);
  }
}
