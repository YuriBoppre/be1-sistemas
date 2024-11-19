import { Injectable } from '@nestjs/common';
import { DatabaseConnectionService } from '../../modules/shared/services/database-conection.service';
import { FilterDto } from './dto/filter.dto';
import { CreateGenericDto } from './dto/create-generic.dto';

@Injectable()
export class AccessRepository {
  constructor(private readonly dbConnectionService: DatabaseConnectionService) { }

  async find<T>(module: string, dto: (keyof T)[], filters: FilterDto, fieldMapping: Record<string, string>) {
    const dbConnection = await this.dbConnectionService.connectToDatabase(module);

    const query = this.buildQuery(module, filters, dto, fieldMapping);

    const result = await dbConnection.query(query);

    return result;
  }

  async insert(module: string, data: CreateGenericDto) {
    const dbConnection = await this.dbConnectionService.connectToDatabase(module);

    const query = `INSERT INTO ${module} (${Object.keys(data).join(', ')})
                   VALUES (${Object.values(data).map(() => '?').join(', ')})`;

    await dbConnection.execute(query, Object.values(data));
    return { message: 'Registro inserido com sucesso!' };
  }

  // private buildQuery<T>(entity: string, filters: FilterDto, dtoFields: (keyof T)[], fieldMapping: Record<string, string>): string {
  //   const dbFields = dtoFields.map(field => fieldMapping[field as string]);
    
  //   let query = `SELECT ${dbFields.join(', ')} FROM ${entity}`;

  //   if (filters && Object.keys(filters).length > 0) {
  //     const conditions = Object.entries(filters)
  //       .map(([key, value]) => `[${key}] = ${value}`)
  //       .join(' AND ');

  //     query += ` WHERE ${conditions}`;
  //   }

  //   return query;
  // }

  private buildQuery<T>(entity: string, filters: FilterDto, dtoFields: (keyof T)[], fieldMapping: Record<string, string>): string {
    const dbFields = dtoFields.map(field => fieldMapping[field as string]);
    
    let query = `SELECT ${dbFields.join(', ')} FROM ${entity}`;

    if (filters && Object.keys(filters).length > 0) {
      const conditions = Object.entries(filters)
        .map(([key, value]) => {
          const mappedfield = fieldMapping[key]
          
          if (!mappedfield)
            throw new Error(`Field ${key} não está mapeado.`)
          
          return this.buildCondition(mappedfield, value);   
        })
        .join(' AND ');

        console.log(conditions)

      query += ` WHERE ${conditions}`;
    }

    return query;
  }

  private buildCondition(field: string, value: string): string {
    const formattedFiel = field.includes(' ') ? `[${field}]` : field;

    if (!isNaN(Number(value)))
      return `${formattedFiel} = ${value}`;
  
    if (!isNaN(Date.parse(value)))
      return `${formattedFiel} = '#${value}#'`;
  
    return `(${formattedFiel} = '${value}' OR ${formattedFiel} LIKE '*${value}*')`;
  }
}
