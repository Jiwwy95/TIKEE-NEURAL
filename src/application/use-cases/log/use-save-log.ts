import { Injectable } from '@nestjs/common';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { LogEntry } from 'src/domain/entities/log-entry.entity';

@Injectable()
export class SaveLogUseCase {
  constructor(private readonly logRepo: LogRepository) {}

  async execute(data: { userId: string; question: string; module?: string }) {
    const log = new LogEntry('', data.userId, data.question, new Date(), data.module);
    return this.logRepo.save(log);
  }
}
