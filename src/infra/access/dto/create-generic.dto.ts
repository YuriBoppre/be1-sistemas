import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateGenericDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  uf?: string;

  @IsOptional()
  @IsString()
  tipo?: string;
}
