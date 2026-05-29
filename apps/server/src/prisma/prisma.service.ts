import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      console.log('✅ Conexão com o banco de dados PostgreSQL estabelecida com sucesso via Prisma!');
    } catch (error) {
      console.log('⚠️ Aviso: Banco de dados PostgreSQL offline. Ativando mocks automatizados em memória para demonstração da plataforma.');
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
    }
  }

  getDbStatus() {
    return this.isConnected ? 'ONLINE' : 'DEMO_MOCK';
  }
}
