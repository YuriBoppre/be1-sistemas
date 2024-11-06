import { Injectable } from '@nestjs/common';
import * as ADODB from 'node-adodb';

@Injectable()
export class DatabaseConnectionService {
  private connection;

  async connectToDatabase(dbPath: string): Promise<any> {

    const connectionString = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source="${dbPath}";`;

    try {
      this.connection = ADODB.open(connectionString);
      console.log(`Conectado ao banco de dados Access em: ${dbPath}`);
      return this.connection;
    } catch (error) {
      console.error('Erro ao conectar ao banco Access:', error);
      throw new Error(`Erro ao conectar ao banco Access: ${error.message}`);
    }
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.close();
      console.log('Conexão com o banco de dados Access encerrada.');
    }
  }
}