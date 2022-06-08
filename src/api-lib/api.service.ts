import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  gitCommitHistory(): string {
    return process.env.GITHUBAPIHOST + 'raulubillos-santex/pokemon-api/commits';
  }

  gitCommit(shaCommit: string): string {
    return (
      process.env.GITHUBAPIHOST +
      'raulubillos-santex/pokemon-api/commits/' +
      shaCommit
    );
  }
}
