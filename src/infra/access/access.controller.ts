import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AccessService } from './access.service';
import { FilterDto } from './dto/filter.dto';
import { CreateGenericDto } from './dto/create-generic.dto';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  // @Get(':entity')
  // async findAll(
  //   @Param('entity') entity: string,
  //   @Query() filters: FilterDto,
  // ) {
  //   return await this.accessService.findAll(entity, filters);
  // }

  // @Post(':entity')
  // async create(
  //   @Param('entity') entity: string,
  //   @Body() createDto: CreateGenericDto,
  // ) {
  //   return await this.accessService.create(entity, createDto);
  // }
}
