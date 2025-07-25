import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly getChatsUseCase: GetChatsUseCase) {}

  @Get()
  async getChats(@Request() req) {
    const userId = req.user.userId;
    const chats = await this.getChatsUseCase.execute(userId);
    return { message: 'Historial de chats', chats };
  }
}