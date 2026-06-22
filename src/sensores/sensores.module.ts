import { Module } from '@nestjs/common';
import { MongodbModule } from '../mongodb/mongodb.module';
import { SensoresController } from './sensores.controller';
import { SensoresService } from './sensores.service';

@Module({
  imports: [MongodbModule],
  controllers: [SensoresController],
  providers: [SensoresService],
  exports: [SensoresService],
})
export class SensoresModule {}
