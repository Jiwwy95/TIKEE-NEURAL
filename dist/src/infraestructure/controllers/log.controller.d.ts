import { GetLogsUseCase } from 'src/application/use-cases/log/use-get-logs';
export declare class LogController {
    private readonly getLogsUseCase;
    constructor(getLogsUseCase: GetLogsUseCase);
    getLogs(req: any, from?: string, to?: string, module?: string): Promise<{
        success: boolean;
        data: import("../../domain/entities/log-entry.entity").LogEntry[];
    }>;
}
