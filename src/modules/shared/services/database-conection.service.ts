import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ADODB from 'node-adodb';

@Injectable()
export class DatabaseConnectionService {
  private connection;
  private readonly logger = new Logger(DatabaseConnectionService.name);

  constructor(private readonly configService: ConfigService) { }

  async connectToDatabase(module: string): Promise<any> {
    const provider = this.configService.get<string>('ACCESS_PROVIDER'),
      dbPath = this.configService.get<string>(module.toUpperCase());

    if (!provider) {
      this.logger.error('Provider para conexão com Access não configurado');
      throw new InternalServerErrorException('Provider não configurado');
    }

    const connectionString = `Provider=${provider};Data Source="${dbPath}";`;

    if (!this.connection) {
      try {
        this.connection = ADODB.open(connectionString);
        this.logger.log(`Conectado ao banco de dados Access em: ${dbPath}`);
      } catch (er) {
        this.logger.error('Erro ao conectar ao banco Access:', er.message);
        throw new InternalServerErrorException(`Erro ao conectar ao banco Access: ${er.message}`);
      }
    }

    return this.connection;
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      try {
        this.connection = null;
        this.logger.log('Conexão com o banco de dados Access encerrada.');
      } catch (er) {
        this.logger.error('Erro ao fechar a conexão:', er.message);
        throw new InternalServerErrorException('Erro ao fechar a conexão');
      }
    }
  }
}