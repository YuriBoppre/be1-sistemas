import { Injectable } from '@nestjs/common';
import { AccessRepository } from '../../infra/access/access.repository';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { FornecedorDto } from './dto/fornecedor.dto';

@Injectable()
export class FornecedoresService {
  constructor(private readonly accessRepository: AccessRepository) { }

  async create(data: CreateFornecedorDto) {
    //return await this.accessRepository.insert('Cadastros', data);
  }

  async findAll(filters: Record<string, any>/*, dto: FornecedorDto*/) {

    // if (!dto) {
    // const dto = new FornecedorDto();
    // }

    const dtoFields = ['idCadastro', 'nome', 'uf'] as (keyof FornecedorDto)[];
    
    const fieldMapping = {
      idCadastro: '[ID Cadastro]',
      nome: 'Nome',
      uf: 'uf',
    };

    return await this.accessRepository.find('Cadastros', dtoFields, filters, fieldMapping);
  }

  async findOne() {

  }

  async update() {

  }

  async remove() {

  }
}