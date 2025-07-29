import { ChatRepository } from 'src/domain/repositories/chat.repository';
export declare class DeleteChatsByUserUseCase {
    private readonly chatRepository;
    constructor(chatRepository: ChatRepository);
    execute(userId: string): Promise<void>;
}
