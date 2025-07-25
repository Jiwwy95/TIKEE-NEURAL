import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chat, ChatMessage } from 'src/domain/entities/chat.entity';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class MongoChatRepository implements ChatRepository {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<any>) {}

  async createChat(chat: Chat): Promise<void> {
  await this.chatModel.create({
    _id: chat.id,             // <-- Este será el _id de Mongo
    id: chat.id,              // <-- Este será un campo adicional para tu lógica de dominio
    userId: chat.userId,
    module: chat.module,
    createdAt: chat.createdAt,
    messages: chat.messages ?? [],
  });
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
    const docs = await this.chatModel.find({ userId }).sort({ createdAt: -1 });
    return docs.map((doc) => new Chat(
      doc.id,
      doc.userId,
      undefined,
      undefined,
      doc.module,
      doc.createdAt,
      doc.messages?.map(m => new ChatMessage(m.question, m.answer, m.timestamp)) ?? [],
    ));
  }

  async findById(chatId: string): Promise<Chat | null> {
    const doc = await this.chatModel.findById(chatId);
    if (!doc) return null;
    return new Chat(
      doc.id,
      doc.userId,
      undefined,
      undefined,
      doc.module,
      doc.createdAt,
      doc.messages?.map(m => new ChatMessage(m.question, m.answer, m.timestamp)) ?? [],
    );
  }
}
