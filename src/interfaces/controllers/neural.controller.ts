import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  UnauthorizedException,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/infraestructure/auth/jwt.guard';
import { NeuralRespondUseCase } from 'src/application/use-cases/neural/use-respond-neural';
import { GetChatsUseCase } from 'src/application/use-cases/chat/use.get.chats';
import { RespondDto } from 'src/interfaces/dto/respond.dto';

interface AuthRequest extends Request {
  user: {
    userId: string;
    email?: string;
  };
}


@ApiTags('Neural')
@Controller('neural')
export class NeuralController {
  constructor(
    private readonly respondUseCase: NeuralRespondUseCase,
    private readonly configService: ConfigService,
    private readonly getChatsUseCase: GetChatsUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('respond')
  @ApiBearerAuth('access-token')
  @ApiBody({ type: RespondDto })
  @ApiOperation({ summary: 'Enviar pregunta a la IA y guardar la conversación' })
  @ApiResponse({ status: 200, description: 'Respuesta exitosa de la IA' })
  @ApiResponse({ status: 400, description: 'Pregunta invalida' })
  @ApiResponse({ status: 401, description: 'Token JWT invalido o ausente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor o IA' })
  async respond(@Req() req: AuthRequest, @Body() body: RespondDto) {
    const question = body.question?.trim();
    const module = body.module?.trim();

    if (!question) {
      throw new BadRequestException('La pregunta es obligatoria');
    }

    if (!req.user?.userId) {
      throw new UnauthorizedException('Usuario no autenticado o token invalido');
    }

    try {
      const response = await this.respondUseCase.execute({
        userId: req.user.userId,
        question,
        module,
      });

      return { success: true, data: response };
    } catch (error) {
      console.error('❌ Error en el controlador Neural:', error);
      throw new InternalServerErrorException('No se pudo obtener respuesta de la IA');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('chats')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener historial de chats del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Historial de chats recuperado con exito' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getUserChats(@Req() req: AuthRequest) {
    const userId = req.user.userId;
    const chats = await this.getChatsUseCase.execute(req.user.userId);
    return {
      message: 'Historial de chats cargado exitosamente',
      chats,
    };
  }

  @Get('test-env')
  @ApiOperation({ summary: 'Verificar si la variable de entorno se carga correctamente' })
  getEnvTest() {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    return {
      message: '🔐 Variable de entorno cargada correctamente',
      OPENROUTER_API_KEY: apiKey ?? '❌ No definida',
    };
  }
}
