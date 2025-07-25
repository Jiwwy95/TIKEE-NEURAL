import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class GetChatsUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(userId: string) {
    return this.chatRepository.findByUserId(userId);
  }
}
