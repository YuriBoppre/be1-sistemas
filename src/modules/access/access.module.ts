import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';

import { DatabaseConnectionService } from '../../services/database-conection.service';

@Module({
  controllers: [AccessController],
  providers: [AccessService, DatabaseConnectionService],
})

export class AccessModule { }
