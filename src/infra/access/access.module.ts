import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { DatabaseConnectionService } from '../../modules/shared/services/database-conection.service';
import { AccessRepository } from './access.repository';

@Module({
  controllers: [AccessController],
  providers: [AccessService, AccessRepository, DatabaseConnectionService],
  exports: [AccessService, AccessRepository]
})

export class AccessModule { }
