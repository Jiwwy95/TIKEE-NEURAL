import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { LogEntryDocument } from '../schemas/log-entry.schema';

@Injectable()
export class LogRepositoryImpl extends LogRepository {
  constructor(
    @InjectModel('LogEntry') private readonly logModel: Model<LogEntryDocument & { _id: Types.ObjectId }>
  ) {
    super();
  }

  async save(entry: LogEntry): Promise<LogEntry> {
    const created = new this.logModel(entry);
    const saved = await created.save();
    return new LogEntry(
      saved._id.toString(),
      saved.userId,
      saved.question,
      saved.timestamp,
      saved.module,
      saved.answer 
    );
  }

  async findFiltered(filters: {
    userId?: string;
    from?: Date;
    to?: Date;
    module?: string;
  }): Promise<LogEntry[]> {
    const query: any = {};
    if (filters.userId) query.userId = filters.userId;
    if (filters.module) query.module = filters.module;
    if (filters.from || filters.to) {
      query.timestamp = {};
      if (filters.from) query.timestamp.$gte = filters.from;
      if (filters.to) query.timestamp.$lte = filters.to;
    }

    const results = await this.logModel.find(query).sort({ timestamp: -1 });
    return results.map(log => new LogEntry(
      log._id.toString(),
      log.userId,
      log.question,
      log.timestamp,
      log.module,
      log.answer 
    ));
  }
}
