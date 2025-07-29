import { ChatRepository } from 'src/domain/repositories/chat.repository';
export declare class SaveChatUseCase {
    private readonly chatRepo;
    constructor(chatRepo: ChatRepository);
    execute(data: {
        userId: string;
        question: string;
        answer: string;
        module?: string;
    }): Promise<void>;
}
