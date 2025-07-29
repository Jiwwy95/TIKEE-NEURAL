import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';
import { DeleteChatsByUserUseCase } from 'src/application/use-cases/chat/use.delete.chats';
export declare class ChatController {
    private readonly getChatsUseCase;
    private readonly deleteChatsByUserUseCase;
    constructor(getChatsUseCase: GetChatsUseCase, deleteChatsByUserUseCase: DeleteChatsByUserUseCase);
    getChats(req: any): Promise<{
        message: string;
        chats: any[];
    }>;
    getUserChats(userId: string, req: any): Promise<{
        message: string;
        chats: any[];
    }>;
    deleteUserChats(userId: string): Promise<{
        message: string;
    }>;
}
