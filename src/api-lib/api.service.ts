import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { IGitCommitResponses } from './models/IGitCommitResponse';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async gitCommitHistory(
    owner: string,
    repo: string,
    branch: string,
  ): Promise<IGitCommitResponses[]> {
    const GITHUB_COMMIT_HISTORY = `${
      process.env.GITHUBAPIHOST
    }repos/${owner}/${repo}/commits${branch ? `?sha=${branch}` : ''}`;
    const response = await lastValueFrom(
      this.httpService.get<IGitCommitResponses[]>(GITHUB_COMMIT_HISTORY),
    );
    return response.data;
  }

  async gitCommit(
    owner: string,
    repo: string,
    branch?: string,
    shaCommit?: string,
  ): Promise<IGitCommitResponses> {
    const GITHUB_COMMIT_HISTORY = `${
      process.env.GITHUBAPIHOST
    }repos/${owner}/${repo}/commits${shaCommit ? `/${shaCommit}` : ''}${
      branch ? `?sha=${branch}` : ''
    }`;
    const response = await lastValueFrom(
      this.httpService.get<IGitCommitResponses>(GITHUB_COMMIT_HISTORY),
    );
    return response.data;
  }
}
