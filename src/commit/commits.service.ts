import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api-lib/api.service';

@Injectable()
export class CommitsService {
  constructor(private apiService: ApiService) {}

  commitHistory() {
    return this.apiService.gitCommitHistory();
  }

  commit(commit: string) {
    console.log(commit);
    return this.apiService.gitCommit(commit);
  }

  commitByDateRange(dateRange: Record<string, string>) {
    return dateRange;
  }
}
