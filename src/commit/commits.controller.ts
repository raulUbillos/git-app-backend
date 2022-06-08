import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CommitsService } from './commits.service';

@Controller('/git/commits/')
export class CommitsController {
  constructor(private commitsService: CommitsService) {}

  @Get()
  commitHistory(): string {
    return this.commitsService.commitHistory();
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
