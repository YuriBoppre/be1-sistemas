import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateFornecedorDto {
  @IsNotEmpty()
  @IsInt()
  IDTipo: number;
  
  @IsNotEmpty()
  @IsString()
  Nome: string;

  @IsOptional()
  @IsString()
  UF?: string;
}