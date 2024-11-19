import { Module } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { AccessModule } from '../../infra/access/access.module';

@Module({
  imports: [AccessModule],
  controllers: [FornecedoresController],
  providers: [FornecedoresService],
  exports: [FornecedoresService]
})
export class FornecedoresModule {}
