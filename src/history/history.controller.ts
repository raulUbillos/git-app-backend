import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller()
export class HistoryController {
  @Get()
  commitHistory(): string {
    return 'asd';
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
