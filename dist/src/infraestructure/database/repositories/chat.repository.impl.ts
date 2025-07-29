import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { Chat, ChatMessage } from 'src/domain/entities/chat.entity';
import { ChatDocument } from 'src/infraestructure/database/schemas/chat.schema';

@Injectable()
export class ChatRepositoryImpl implements ChatRepository {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<ChatDocument>,
  ) {}

  async createChat(chat: Chat): Promise<void> {
    const created = new this.chatModel({
      _id: chat.id, // puedes quitar esto si dejas que Mongo genere el _id
      id: chat.id,  // este `id` es útil si quieres trabajar con un identificador propio
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
    }).exec(); // ejecuta la consulta explicitamente
  }

  async findByUserId(userId: string): Promise<Chat[]> {
    const chats = await this.chatModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return chats.map(chat => new Chat(
      chat.id,
      chat.userId,
      undefined,
      undefined,
      chat.module,
      chat.createdAt,
      chat.messages?.map(m => new ChatMessage(m.question, m.answer, m.timestamp)) ?? [],
    ));
  }

  async findById(chatId: string): Promise<Chat | null> {
    const chat = await this.chatModel.findById(chatId).lean().exec();
    if (!chat) return null;

    return new Chat(
      chat.id,
      chat.userId,
      undefined,
      undefined,
      chat.module,
      chat.createdAt,
      chat.messages?.map(m => new ChatMessage(m.question, m.answer, m.timestamp)) ?? [],
    );
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.chatModel.deleteMany({ userId }).exec();
  }
}
