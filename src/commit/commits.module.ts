import { Module } from '@nestjs/common';
import { CommitsController } from './commits.controller';
import { ApiModule } from '../api-lib/api.module';
import { CommitsService } from './commits.service';

@Module({
  imports: [ApiModule],
  controllers: [CommitsController],
  providers: [CommitsService],
})
export class CommitsModule {}
