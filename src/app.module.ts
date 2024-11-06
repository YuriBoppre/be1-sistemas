import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AccessModule } from './modules/access/access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AccessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
