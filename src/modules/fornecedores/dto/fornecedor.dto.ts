import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class FornecedorDto {
  @IsNotEmpty()
  @IsInt()
  IDCadastro: number;

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