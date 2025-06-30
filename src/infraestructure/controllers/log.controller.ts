import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt.guard';
import { GetLogsUseCase } from 'src/application/use-cases/log/use-get-logs';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Logs')
@ApiBearerAuth()
@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(
    private readonly getLogsUseCase: GetLogsUseCase,
  ) {}

  @Get()
  @ApiQuery({ name: 'from', required: false, type: String, description: 'Fecha desde (formato ISO 8601)' })
  @ApiQuery({ name: 'to', required: false, type: String, description: 'Fecha hasta (formato ISO 8601)' })
  @ApiQuery({ name: 'module', required: false, type: String, description: 'Nombre del modulo' })
  async getLogs(
    @Req() req,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('module') module?: string,
  ) {
    const userId = req.user.userId;

    const logs = await this.getLogsUseCase.execute({
      userId,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
      module,
    });

    return { success: true, data: logs };
  }
}
