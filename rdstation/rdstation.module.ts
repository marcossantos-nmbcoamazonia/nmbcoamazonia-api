import { Module } from '@nestjs/common';
import { RdStationController } from './rdstation.controller';
import { RdStationService } from './rdstation.service';

@Module({
  controllers: [RdStationController],
  providers: [RdStationService],
  exports: [RdStationService],
})
export class RdStationModule {}
