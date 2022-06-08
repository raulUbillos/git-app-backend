import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('/git/commits/')
export class CommitsController {
  @Get()
  commitHistory(): string {
    return 'Commit List';
  }

  @Get(':commit')
  commit(@Param() commit: string): string {
    return commit;
  }

  @Post()
  commitByDateRange(
    @Body() dateRange: Record<string, string>,
  ): Record<string, string> {
    return dateRange;
  }
}
