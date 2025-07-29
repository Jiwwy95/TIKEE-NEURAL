export declare class LogEntry {
    id: string;
    userId: string;
    question: string;
    timestamp: Date;
    answer: string;
    module: string;
    constructor(id: string, userId: string, question: string, timestamp: Date, answer?: string, module?: string);
}
