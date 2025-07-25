import { Chat, ChatMessage } from '../entities/chat.entity';

export abstract class ChatRepository {
  abstract createChat(chat: Chat): Promise<void>;
  abstract addMessageToChat(chatId: string, question: string, answer: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<Chat[]>;
  abstract findById(chatId: string): Promise<Chat | null>;
}
