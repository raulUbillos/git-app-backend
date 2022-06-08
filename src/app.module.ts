import { Module } from '@nestjs/common';
import { CommitsModule } from './commit/commits.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CommitsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
  ],
})
export class AppModule {}
