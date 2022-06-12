import { Controller, Get, Query, Param } from '@nestjs/common';
import { ICommitResponse } from './models/ICommitResponse';
import { CommitsService } from './commits.service';

@Controller('/git/commits/')
export class CommitsController {
  constructor(private commitsService: CommitsService) {}

  @Get()
  async commitHistory(
    @Query('owner') owner: string,
    @Query('repository') repository: string,
    @Query('branch') branch: string,
  ): Promise<ICommitResponse[]> {
    return await this.commitsService.commitHistory(owner, repository, branch);
  }

  @Get(':commit')
  async commit(
    @Param('commit') commit: string,
    @Query('owner') owner: string,
    @Query('repository') repository: string,
    @Query('branch') branch: string,
  ): Promise<ICommitResponse> {
    return await this.commitsService.commit(owner, repository, branch, commit);
  }
}
