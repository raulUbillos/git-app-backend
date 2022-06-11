import { Controller, Get, Query, Post, Param, Body } from '@nestjs/common';
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
  commit(@Param('commit') commit: string): string {
    return this.commitsService.commit(commit);
  }

  @Post()
  commitByDateRange(
    @Body() dateRange: Record<string, string>,
  ): Record<string, string> {
    return this.commitByDateRange(dateRange);
  }
}
