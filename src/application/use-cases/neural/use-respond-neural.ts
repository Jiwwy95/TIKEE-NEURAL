import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { NeuralService } from 'src/application/services/neural.service';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
import { randomUUID } from 'crypto';

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
  ) {}

  async execute(input: Request): Promise<{ answer: string }> {
    const { userId, question, module } = input;

    try {
      const answer = await this.neuralService.getAnswer(question);

      const log = new LogEntry(
        randomUUID(),
        userId,
        question,
        new Date(),
        module ?? 'general',
        answer,
      );

      await this.logRepository.save(log);

      return { answer };
    } catch (error) {
      console.error('Error al procesar respuesta de la IA:', error);
      throw new InternalServerErrorException('No se pudo obtener respuesta de la IA');
    }
  }
}