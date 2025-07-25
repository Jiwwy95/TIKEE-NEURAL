import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { Chat, ChatMessage } from 'src/domain/entities/chat.entity';
import { ChatDocument } from '../schemas/chat.schema';

@Injectable()
export class ChatRepositoryImpl implements ChatRepository {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<ChatDocument>,
  ) {}

  async createChat(chat: Chat): Promise<void> {
  const created = new this.chatModel({
    _id: chat.id,              // <-- Este será el _id de Mongo
    id: chat.id,               // <-- Este será un campo adicional para tu entidad
    userId: chat.userId,
    module: chat.module,
    createdAt: chat.createdAt,
    messages: chat.messages ?? [],
  });
  await created.save();
}


  async addMessageToChat(chatId: string, question: string, answer: string): Promise<void> {
    await this.chatModel.findByIdAndUpdate(chatId, {
      $push: {
        messages: {
          question,
          answer,
          timestamp: new Date(),
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Chat[]> {
    const chats = await this.chatModel.find({ userId }).sort({ createdAt: -1 }).lean();
    return chats.map(chat => new Chat(
      chat.id, 
      chat.userId,
      undefined, // question
      undefined, // answer
      chat.module,
      chat.createdAt,
      chat.messages?.map(m => new ChatMessage(m.question, m.answer, m.timestamp)) ?? [],
    ));
  }

  async findById(chatId: string): Promise<Chat | null> {
    const chat = await this.chatModel.findById(chatId).lean();
    if (!chat) return null;

    return new Chat(
      chat.id,
      chat.userId,
      undefined, // question
      undefined, // answer
      chat.module,
      chat.createdAt,
      chat.messages?.map(m => new ChatMessage(m.question, m.answer, m.timestamp)) ?? [],
    );
  }
}
