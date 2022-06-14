import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ApiService } from '../api-lib/api.service';
import { ICommitResponse } from './models/ICommitResponse';
import { mapIGitCommitResponseToICommitResponse } from '../utils/mappers';
import { AxiosError } from 'axios';
import IErrorResponse from './models/IErrorResponse';

@Injectable()
export class CommitsService {
  constructor(private apiService: ApiService) {}

  async commitHistory(
    owner: string,
    repo: string,
    branch: string,
  ): Promise<ICommitResponse[]> {
    try {
      const responses = await this.apiService.gitCommitHistory(
        owner,
        repo,
        branch,
      );
      return responses.map<ICommitResponse>((response) => {
        return mapIGitCommitResponseToICommitResponse(response);
      });
    } catch (err) {
      const axiosError = err as AxiosError<IErrorResponse>;
      throw new HttpException(
        {
          status: axiosError.response?.status,
          error: axiosError.response?.data.message,
        },
        axiosError.response.status,
      );
    }
  }

  async commit(
    owner: string,
    repo: string,
    branch: string,
    commit: string,
  ): Promise<ICommitResponse> {
    try {
      const response = await this.apiService.gitCommit(
        owner,
        repo,
        branch,
        commit,
      );
      return mapIGitCommitResponseToICommitResponse(response);
    } catch (err) {
      const axiosError = err as AxiosError<IErrorResponse>;
      throw new HttpException(
        {
          status: axiosError.response.status,
          error: axiosError.response.data.message,
        },
        axiosError.response.status,
      );
    }
  }
}
