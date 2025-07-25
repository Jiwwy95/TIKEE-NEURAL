import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatSchema } from '../database/schemas/chat.schema';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { ChatRepositoryImpl } from '../database/repositories/chat.repository.impl';
import { SaveChatUseCase } from 'src/application/use-cases/chat/use-save-chat';
import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema }
    ]),
  ],
  providers: [
    SaveChatUseCase,
    GetChatsUseCase,
    { provide: ChatRepository, useClass: ChatRepositoryImpl },
  ],
  exports: [
    ChatRepository,
    SaveChatUseCase,
    GetChatsUseCase,
  ],
})
export class ChatModule {}