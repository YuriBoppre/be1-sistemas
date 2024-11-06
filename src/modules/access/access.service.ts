import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConnectionService } from '../../services/database-conection.service';

@Injectable()
export class AccessService {
    constructor(
        private readonly dbConnectionService: DatabaseConnectionService,
        private readonly configService: ConfigService
    ) { }

    private getDatabasePath(module: string, dbName: string): string {
        const dbPaths = {
            pedidos: {
                nv01: this.configService.get<string>('PEDIDOS'),
            },
            financeiro: {
                nv02_01: this.configService.get<string>('FINANCEIRO_01'),
                nv02_05: this.configService.get<string>('FINANCEIRO_02'),
                nv02_06: this.configService.get<string>('FINANCEIRO_03'),
            },
            suprimentos: {
                nv03: this.configService.get<string>('SUPRIMENTOS'),
            },
            cadastro: {
                nv05: this.configService.get<string>('CADASTROS'),
            }
        };

        if (dbPaths[module] && dbPaths[module][dbName]) {
            return dbPaths[module][dbName];
        }

        throw new Error(`Módulo não encontrado: ${module}`);
    }

    async getData(query: string, module: string, dbName: string) {
        const dbPath = this.getDatabasePath(module, dbName);

        try {
            const connection = await this.dbConnectionService.connectToDatabase(dbPath);
            const result = await connection.query(query);
            return result;
        } catch (e) {
            console.error(`Erro ao executar consulta no módulo ${module}:`, e);
            throw new Error('Erro ao executar consulta');
        }
    }
}
