import { LogRepository } from 'src/domain/repositories/log.repository';
import { NeuralService } from 'src/application/services/neural.service';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
interface Request {
    userId: string;
    question: string;
    module?: string;
}
export declare class NeuralRespondUseCase {
    private readonly logRepository;
    private readonly neuralService;
    private readonly chatRepository;
    constructor(logRepository: LogRepository, neuralService: NeuralService, chatRepository: ChatRepository);
    execute(input: Request): Promise<{
        answer: string;
    }>;
}
export {};
