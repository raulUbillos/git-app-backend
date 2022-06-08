import { Module } from '@nestjs/common';
import { CommitsModule } from './commit/commits.module';

@Module({
  imports: [CommitsModule],
})
export class AppModule {}
