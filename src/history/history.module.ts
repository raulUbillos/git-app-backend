import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';

@Module({
  imports: [],
  controllers: [HistoryController],
})
export class HistoryModule {}
