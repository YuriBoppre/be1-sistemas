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

    if (!result || result.length === 0) {
      return { message: 'Nenhum dado encontrado!' };
    }

    return result;
  }

  async insert<T>(module: string, data: T, fieldMapping: Record<string, string>) {
    const dbConnection = await this.dbConnectionService.connectToDatabase(module);

    console.log(data)

    const query = `INSERT INTO ${module} (${Object.keys(data).join(', ')})
                   VALUES (${Object.values(data).map(() => '?').join(', ')})`;

    try {
      await dbConnection.execute(query, Object.values(data));
      return { message: 'Registro inserido com sucesso!' };
    } catch (e) {
      return { message: `Falha ao inserir registro. Erro: ${e.message}` };
    }
  }

  private buildQuery<T>(entity: string, filters: FilterDto, dtoFields: (keyof T)[], fieldMapping: Record<string, string>): string {
    const dbFields = dtoFields.map(field => fieldMapping[field as string]);

    let query = `SELECT ${dbFields.join(', ')} FROM ${entity}`;

    if (filters && Object.keys(filters).length > 0) {
      const conditions = Object.entries(filters)
        .map(([key, value]) => {
          const mappedfield = (fieldMapping[key.replace(/\s+/g, '')])

          if (!mappedfield)
            throw new Error(`Field ${key} não está mapeado.`)

          return this.buildCondition(mappedfield, value);
        })
        .join(' AND ');

      query += ` WHERE ${conditions}`;
    }

    return query;
  }

  private buildCondition(field: string, value: string): string {
    if (!isNaN(Number(value)))
      return `${field} = ${value}`;

    if (!isNaN(Date.parse(value)))
      return `${field} = '#${value}#'`;

    return `(${field} = '${value}' OR ${field} LIKE '*${value}*')`;
  }
}
