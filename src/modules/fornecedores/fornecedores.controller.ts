import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Post()
  async create(@Body() data: CreateFornecedorDto) {
    return await this.fornecedoresService.create(data);
  }

  @Get()
  async findAll(@Query() filters: Record<string, any>) {
    return await this.fornecedoresService.findAll(filters);
  }

  // @Get(':id')
  // async findOne(@Query() filters: Record<string, any>) {
  //   return
  // }

  // @Put(':id')
  // async delete(@Param('id') id: number) {
  //   return
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param('id') id: number) {
  //   return
  // }

}
