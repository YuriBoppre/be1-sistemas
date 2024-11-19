import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  uf?: string;

  @IsOptional()
  @IsString()
  tipo?: string;
}