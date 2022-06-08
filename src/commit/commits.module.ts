import { Module } from '@nestjs/common';
import { CommitsController } from './commits.controller';

@Module({
  imports: [],
  controllers: [CommitsController],
})
export class CommitsModule {}
