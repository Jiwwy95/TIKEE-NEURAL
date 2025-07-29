import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { NeuralService } from 'src/application/services/neural.service';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
import { randomUUID } from 'crypto';
import { Chat } from 'src/domain/entities/chat.entity';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

interface Request {
  userId: string;
  question: string;
  module?: string;
}

@Injectable()
export class NeuralRespondUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly neuralService: NeuralService,
    private readonly chatRepository: ChatRepository,
  ) {}

  async execute(input: Request): Promise<{ answer: string }> {
    const { userId, question, module } = input;

    if (!question || typeof question !== 'string' || question.trim() === '') {
      throw new InternalServerErrorException('Pregunta inválida');
    }

    try {
      const answer = await this.neuralService.getAnswer(question);

      if (!answer || typeof answer !== 'string') {
        throw new InternalServerErrorException('La IA no generó una respuesta válida');
      }

      // Guardar log
      const log = new LogEntry( 
        randomUUID(),
        userId,
        question,
        new Date(), 
        module ?? 'general', 
        answer,
      );
      await this.logRepository.save(log);

      // Guardar chat
      const chat: Chat = {
        id: randomUUID(),
        userId,
        createdAt: new Date(),
        module: module ?? 'general',
        messages: [
          {
            question,
            answer,
            timestamp: new Date(),
          },
        ],
      };

      await this.chatRepository.createChat(chat);

      return { answer };
    } catch (error) {
      console.error('Error al procesar la respuesta de la IA:', error);
      throw new InternalServerErrorException('No se pudo obtener respuesta de la IA');
    }
  }
}
