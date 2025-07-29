import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { Chat } from 'src/domain/entities/chat.entity';
import { randomUUID } from 'crypto';
import { ChatMessage } from 'src/domain/entities/chat.entity';

@Injectable()
export class SaveChatUseCase {
  constructor(private readonly chatRepo: ChatRepository) {}

  async execute(data: {
    userId: string;
    question: string;
    answer: string;
    module?: string;
  }) {
    const chat = new Chat(
      randomUUID(),              // id
      data.userId,                // userId
      data.question,              // question
      data.answer,                // answer
      data.module,                // module
      new Date(),                 // createdAt
      [                           // messages
        new ChatMessage(data.question, data.answer, new Date()),
      ],
    );

    await this.chatRepo.createChat(chat);
  }
}
