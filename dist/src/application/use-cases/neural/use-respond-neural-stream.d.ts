import { LogRepository } from 'src/domain/repositories/log.repository';
import { NeuralService } from 'src/application/services/neural.service';
import { Socket } from 'socket.io';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
interface Request {
    userId: string;
    question: string;
    socket: Socket;
    module?: string;
    chatId?: string;
}
export declare class NeuralRespondStreamUseCase {
    private readonly logRepository;
    private readonly neuralService;
    private readonly chatRepository;
    constructor(logRepository: LogRepository, neuralService: NeuralService, chatRepository: ChatRepository);
    execute(input: Request): Promise<void>;
}
export {};
