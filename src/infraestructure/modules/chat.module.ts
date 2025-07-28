import { Delete, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatSchema } from '../database/schemas/chat.schema';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { ChatRepositoryImpl } from '../database/repositories/chat.repository.impl';
import { SaveChatUseCase } from 'src/application/use-cases/chat/use-save-chat';
import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';
import { DeleteChatsByUserUseCase } from 'src/application/use-cases/chat/use.delete.chats';
import { Chat } from 'openai/resources/index';
import { ChatController } from '../controllers/chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema }
    ]),
  ],
  controllers: [ChatController],
  providers: [
    SaveChatUseCase,
    GetChatsUseCase,
    DeleteChatsByUserUseCase,
    { provide: ChatRepository, useClass: ChatRepositoryImpl },
  ],
  exports: [
    ChatRepository,
    SaveChatUseCase,
    GetChatsUseCase,
  ],
})
export class ChatModule {}