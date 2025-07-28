import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class DeleteChatsByUserUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(userId: string): Promise<void> {
    await this.chatRepository.deleteByUserId(userId);
  }
}
