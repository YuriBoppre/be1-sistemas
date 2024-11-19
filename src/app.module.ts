import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AccessModule } from './infra/access/access.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AccessModule, FornecedoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
