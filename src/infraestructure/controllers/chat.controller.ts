import { Controller, Get, Param, UseGuards, Request, ForbiddenException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt.guard';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';
import { DeleteChatsByUserUseCase } from 'src/application/use-cases/chat/use.delete.chats';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Chats')
@ApiBearerAuth('access-token')
@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly getChatsUseCase: GetChatsUseCase,
    private readonly deleteChatsByUserUseCase: DeleteChatsByUserUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Ver mis chats' })
  async getChats(@Request() req) {
    const userId = req.user.userId;
    const chats = await this.getChatsUseCase.execute(userId);
    return { message: 'Historial de chats del usuario actual', chats };
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'analista')
  @Get(':userId')
  @ApiOperation({ summary: 'Ver chats de otro usuario (admin o analista)' })
  async getUserChats(@Param('userId') userId: string, @Request() req) {
    const currentUser = req.user;
    const isAdmin = currentUser.role === 'admin';
    const isAnalyst = currentUser.role === 'analista';

    if (isAdmin || isAnalyst) {
      const chats = await this.getChatsUseCase.execute(userId);
      return { message: `Historial de chats del usuario ${userId}`, chats };
    } else {
      throw new ForbiddenException('No tienes permisos para ver estos chats.');
    }
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':userId')
  @ApiOperation({ summary: 'Borrar chats de un usuario (solo admin)' })
  async deleteUserChats(@Param('userId') userId: string) {
    await this.deleteChatsByUserUseCase.execute(userId);
    return { message: `Chats del usuario ${userId} eliminados correctamente` };
  }
}