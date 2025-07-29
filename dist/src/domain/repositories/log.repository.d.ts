import { LogEntry } from 'src/domain/entities/log-entry.entity';
export declare abstract class LogRepository {
    abstract save(entry: LogEntry): Promise<LogEntry>;
    abstract findFiltered(filters: {
        userId?: string;
        from?: Date;
        to?: Date;
        module?: string;
    }): Promise<LogEntry[]>;
}
