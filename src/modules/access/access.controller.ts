import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Query } from '@nestjs/common';
import { AccessService } from './access.service';

@Controller('modulo')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get(':module/fornecedores')
  async getDataFornecedores(@Param('module') module: string, @Query() filters: Record<string, any>) {
    //IDTipo = 8 para ser fornecedores (ADM)
    const query = 'SELECT [ID Cadastro] as IdFornecedor, Nome, UF FROM Cadastros WHERE [ID Tipo] = 8 ORDER BY Nome ASC';
    
    try {
      return await this.accessService.getDataWithFilters(query, module, filters);
    } catch (er) {
      if (er.message.includes('Módulo não encontrado!'))
        throw new NotFoundException(er.message)

      throw new InternalServerErrorException('Erro ao buscar dados dos fornecedores')
    }    
  }

  @Get(':module/clientes')
  async getDataClientes(@Param('module') module: string, @Query() filters: Record<string, any>) {
    //IDTipo = 2 para ser clientes
    const query = 'SELECT [ID Cadastro] as IdCliente, Nome, UF FROM Cadastros WHERE [ID Tipo] = 2 ORDER BY Nome ASC';
    
    try {
      return await this.accessService.getDataWithFilters(query, module, filters);
    } catch (er) {
      if (er.message.includes('Módulo não encontrado!'))
        throw new NotFoundException(er.message)

      throw new InternalServerErrorException('Erro ao buscar dados dos clientes')
    }    
  }
}