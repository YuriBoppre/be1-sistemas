import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class FornecedorDto {
  @IsNotEmpty()
  @IsInt()
  idTipo: number;
  
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  uf?: string;
}