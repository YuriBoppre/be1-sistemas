import { Controller, Get, Param } from '@nestjs/common';
import { AccessService } from './access.service';

@Controller('modulo')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get('cadastro/:dbName/fornecedores')
  async getDataFromModule(@Param('dbName') dbName: string) {
    //IDTipo = 8 para ser fornecedores (ADM)
    const query = 'SELECT Nome FROM Cadastros WHERE [ID Tipo] = 8 ORDER BY Nome ASC';
    
    return await this.accessService.getData(query, 'cadastro', dbName);
  }
}