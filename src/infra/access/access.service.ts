import { Injectable } from '@nestjs/common';
import { AccessRepository } from './access.repository';
import { FilterDto } from './dto/filter.dto';
import { CreateGenericDto } from './dto/create-generic.dto';

@Injectable()
export class AccessService {
  constructor(private readonly accessRepository: AccessRepository) {}

  // async findAll(entity: string, filters: FilterDto) {
  //   return await this.accessRepository.find(entity, filters);
  // }

  // async create(entity: string, createDto: CreateGenericDto) {
  //   return await this.accessRepository.insert(entity, createDto);
  // }
}
