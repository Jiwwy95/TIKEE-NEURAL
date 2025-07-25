import { Injectable } from '@nestjs/common';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { NeuralService } from 'src/application/services/neural.service';
import { LogEntry } from 'src/domain/entities/log-entry.entity';
import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { Chat } from 'src/domain/entities/chat.entity'; 

interface Request {
  userId: string;
  question: string;
  socket: Socket;
  module?: string;
  chatId?: string;
}

@Injectable()
export class NeuralRespondStreamUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly neuralService: NeuralService,
    private readonly chatRepository: ChatRepository,
  ) {}

  async execute(input: Request): Promise<void> {
    const { userId, question, socket, module = 'general', chatId } = input;
    let fullAnswer = '';

    try {
      await this.neuralService.getAnswerStream(
        question,
        async (chunk: string, isEnd: boolean) => {
          if (chunk) {
            console.log('[EMIT] ia-response-chunk');
            fullAnswer += chunk;
            socket.emit('ia-response-chunk', { chunk });
          }

          if (isEnd) {
            console.log('[EMIT] ia-response-end');
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

            if (chatId) {
              await this.chatRepository.addMessageToChat(chatId, question, fullAnswer);
            } else {
              const newChatId = randomUUID();
              const newChat: Chat = {
                id: newChatId,
                userId,
                createdAt: new Date(),
                module,
                messages: [
                  {
                    question,
                    answer: fullAnswer,
                    timestamp: new Date(),
                  },
                ],
              };
              await this.chatRepository.createChat(newChat);
              socket.emit('chat-created', { chatId: newChatId });
            }
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
