import { ChatRepository } from 'src/domain/repositories/chat.repository';
export declare class GetChatsUseCase {
    private readonly chatRepository;
    constructor(chatRepository: ChatRepository);
    execute(userId: string): Promise<any[]>;
}
