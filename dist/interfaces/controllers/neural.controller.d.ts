import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { NeuralRespondUseCase } from 'src/application/use-cases/neural/use-respond-neural';
import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';
import { RespondDto } from 'src/interfaces/dto/respond.dto';
interface AuthRequest extends Request {
    user: {
        userId: string;
        email?: string;
    };
}
export declare class NeuralController {
    private readonly respondUseCase;
    private readonly configService;
    private readonly getChatsUseCase;
    constructor(respondUseCase: NeuralRespondUseCase, configService: ConfigService, getChatsUseCase: GetChatsUseCase);
    respond(req: AuthRequest, body: RespondDto): Promise<{
        success: boolean;
        data: {
            answer: string;
        };
    }>;
    getUserChats(req: AuthRequest): Promise<{
        message: string;
        chats: any[];
    }>;
    getEnvTest(): {
        message: string;
        OPENROUTER_API_KEY: string;
    };
}
export {};
