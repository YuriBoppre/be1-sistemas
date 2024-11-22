import { Injectable } from '@nestjs/common';
import { AccessRepository } from '../../infra/access/access.repository';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { FornecedorDto } from './dto/fornecedor.dto';

@Injectable()
export class FornecedoresService {
  private readonly fieldMapping = {
    IDCadastro: '[ID Cadastro]',
    IDTipo: '[ID Tipo]',
    Nome: 'nome',
    UF: 'uf',
  };


  constructor(private readonly accessRepository: AccessRepository) { }

  async create(data: CreateFornecedorDto) {
    // return await this.accessRepository.insert('Cadastros', this.fieldMapping);
  }

  async findAll(filters: Record<string, any>) {
    const dtoFields = ['IDCadastro', 'IDTipo', 'Nome', 'UF'] as (keyof FornecedorDto)[];
    
    

    return await this.accessRepository.find('Cadastros', dtoFields, filters, this.fieldMapping);
  }

  async findOne() {

  }

  async update() {

  }

  async remove() {

  }
}