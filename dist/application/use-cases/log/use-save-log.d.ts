import { LogRepository } from 'src/domain/repositories/log.repository';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
export declare class SaveLogUseCase {
    private readonly logRepo;
    constructor(logRepo: LogRepository);
    execute(data: {
        userId: string;
        question: string;
        module?: string;
    }): Promise<LogEntry>;
}
