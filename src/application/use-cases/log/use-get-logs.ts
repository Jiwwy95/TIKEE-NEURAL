import { Injectable } from '@nestjs/common';
import { LogRepository } from 'src/domain/repositories/log.repository';

@Injectable()
export class GetLogsUseCase {
  constructor(private readonly logRepo: LogRepository) {}

  async execute(filters: { userId?: string; from?: Date; to?: Date; module?: string }) {
    return this.logRepo.findFiltered(filters);
  }
}
