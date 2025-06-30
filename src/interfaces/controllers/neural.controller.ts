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
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/infraestructure/auth/jwt.guard';
import { NeuralRespondUseCase } from 'src/application/use-cases/neural/use-respond-neural';
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
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('respond')
  @ApiBearerAuth()
  @ApiBody({ type: RespondDto })
  @ApiResponse({ status: 200, description: 'Respuesta exitosa de la IA' })
  @ApiResponse({ status: 400, description: 'Pregunta inválida' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido o ausente' })
  @ApiResponse({ status: 500, description: 'Error interno del  0mservidor o IA' })
  async respond(@Req() req: AuthRequest, @Body() body: RespondDto) {
    const question = body.question?.trim();
    const module = body.module?.trim();

    if (!question) {
      throw new BadRequestException('La pregunta es obligatoria');
    }

    if (!req.user?.userId) {
      throw new UnauthorizedException('Usuario no autenticado o token inválido');
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

  @Get('test-env')
  getEnvTest() {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    return {
      message: '🔐 Variable de entorno cargada correctamente',
      OPENROUTER_API_KEY: apiKey ?? '❌ No definida',
    };
  }
}