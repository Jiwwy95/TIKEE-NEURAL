import { Model, Types } from 'mongoose';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { LogEntryDocument } from 'src/infraestructure/database/schemas/log-entry.schema';
export declare class LogRepositoryImpl extends LogRepository {
    private readonly logModel;
    constructor(logModel: Model<LogEntryDocument & {
        _id: Types.ObjectId;
    }>);
    save(entry: LogEntry): Promise<LogEntry>;
    findFiltered(filters: {
        userId?: string;
        from?: Date;
        to?: Date;
        module?: string;
    }): Promise<LogEntry[]>;
}
