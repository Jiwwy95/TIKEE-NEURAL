import { Chat } from 'src/domain/entities/chat.entity';
export declare abstract class ChatRepository {
    abstract createChat(chat: Chat): Promise<void>;
    abstract addMessageToChat(chatId: string, question: string, answer: string): Promise<void>;
    abstract findByUserId(userId: string): Promise<any[]>;
    abstract findById(chatId: string): Promise<Chat | null>;
    abstract deleteByUserId(userId: string): Promise<void>;
}
