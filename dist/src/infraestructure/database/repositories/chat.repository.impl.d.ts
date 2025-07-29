import { Model } from 'mongoose';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { Chat } from 'src/domain/entities/chat.entity';
import { ChatDocument } from 'src/infraestructure/database/schemas/chat.schema';
export declare class ChatRepositoryImpl implements ChatRepository {
    private readonly chatModel;
    constructor(chatModel: Model<ChatDocument>);
    createChat(chat: Chat): Promise<void>;
    addMessageToChat(chatId: string, question: string, answer: string): Promise<void>;
    findByUserId(userId: string): Promise<Chat[]>;
    findById(chatId: string): Promise<Chat | null>;
    deleteByUserId(userId: string): Promise<void>;
}
