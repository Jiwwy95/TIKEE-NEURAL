import { LogRepository } from 'src/domain/repositories/log.repository';
export declare class GetLogsUseCase {
    private readonly logRepo;
    constructor(logRepo: LogRepository);
    execute(filters: {
        userId?: string;
        from?: Date;
        to?: Date;
        module?: string;
    }): Promise<import("../../../domain/entities/log-entry.entity").LogEntry[]>;
}
