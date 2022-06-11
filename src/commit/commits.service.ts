import { Injectable } from '@nestjs/common';
import { ApiService } from '../api-lib/api.service';
import { ICommitResponse } from './models/ICommitResponse';
import { mapIGitCommitResponseToICommitResponse } from '../utils/mappers';

@Injectable()
export class CommitsService {
  constructor(private apiService: ApiService) {}

  async commitHistory(
    owner: string,
    repo: string,
    branch: string,
  ): Promise<ICommitResponse[]> {
    const responses = await this.apiService.gitCommitHistory(
      owner,
      repo,
      branch,
    );
    return responses.map<ICommitResponse>((response) => {
      return mapIGitCommitResponseToICommitResponse(response);
    });
  }

  commit(commit: string) {
    return this.apiService.gitCommit(commit);
  }

  commitByDateRange(dateRange: Record<string, string>) {
    return dateRange;
  }
}
