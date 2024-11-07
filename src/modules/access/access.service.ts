import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConnectionService } from '../../services/database-conection.service';

@Injectable()
export class AccessService {
    private readonly logger = new Logger(AccessService.name);

    constructor(
        private readonly dbConnectionService: DatabaseConnectionService,
        private readonly configService: ConfigService
    ) { }

    private getDatabasePath(module: string): string {
        const dbPath = this.configService.get<string>(module.toUpperCase());

        if (!dbPath)
            throw new Error(`Módulo não encontrado: ${module}`);

        return dbPath;
    }

    // async getData(query: string, module: string) {
    //     const dbPath = this.getDatabasePath(module);

    //     try {
    //         const connection = await this.dbConnectionService.connectToDatabase(dbPath);
    //         const result = await connection.query(query);
    //         return result;
    //     } catch (e) {
    //         this.logger.error(`Erro ao executar consulta no módulo ${module}: ${e.message}`);
    //         throw new InternalServerErrorException('Erro ao executar consulta');
    //     }
    // }

    async getDataWithFilters(baseQuery: string, module: string, filters: Record<string, any>) {
        const dbPath = this.getDatabasePath(module);
        let query = baseQuery;

        const filterConditions = Object.entries(filters).map(([key, value]) => {
            return `[${key}] = '${value}'`;
        });

        if (filterConditions.length > 0) {
            query += ' AND ' + filterConditions.join(' AND ');
        }

        try {
            const connection = await this.dbConnectionService.connectToDatabase(dbPath);
            const result = await connection.query(query);
            return result;
        } catch (e) {
            this.logger.error(`Erro ao executar consulta no módulo ${module}: ${e.message}`);
            throw new InternalServerErrorException('Erro ao executar consulta');
        } finally {
            await this.dbConnectionService.closeConnection();
        }
    }
}
