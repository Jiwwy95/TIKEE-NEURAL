import { Injectable } from '@nestjs/common';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { NeuralService } from 'src/application/services/neural.service';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';

interface Request {
  userId: string;
  question: string;
  socket: Socket;
  module?: string;
}

@Injectable()
export class NeuralRespondStreamUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly neuralService: NeuralService,
  ) {}

  async execute(input: Request): Promise<void> {
    const { userId, question, socket, module } = input;

    try {
      let fullAnswer = '';

      await this.neuralService.getAnswerStream(
        question,
        async (chunk: string, isEnd: boolean) => {
          if (chunk) {
            console.log('[EMIT] ia-response-chunk'); //prueba
            fullAnswer += chunk;
            socket.emit('ia-response-chunk', { chunk });
          }

          if (isEnd) {
            console.log('[EMIT] ia-response-end');      //prueba
            socket.emit('ia-response-end');

            const log = new LogEntry(
              randomUUID(),
              userId,
              question,
              new Date(),
              module ?? 'general',
              fullAnswer,
            );
            await this.logRepository.save(log);
          }
        }
      );
    } catch (error) {
      console.error('Error al procesar respuesta IA con streaming:', error);
      socket.emit('ia-response-error', {
        message: 'Error interno al obtener respuesta de la IA',
      });
    }
  }
}