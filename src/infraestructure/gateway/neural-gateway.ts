import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common'; 
import { Server, Socket } from 'socket.io';

import { JwtSocketGuard } from '../guards/jwt-socket.guard';
import { NeuralRespondStreamUseCase } from 'src/application/use-cases/neural/use-respond-neural-stream';

@WebSocketGateway({ cors: true })
export class NeuralGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly neuralRespondStreamUseCase: NeuralRespondStreamUseCase,
  ) {}

  handleConnection(socket: Socket) {
    const user = socket.data.user;
    console.log(`✅ Usuario conectado: ${user?.email || socket.id}`);
  }

  @UseGuards(JwtSocketGuard)
  @SubscribeMessage('ask-ia')
  async handleAskIA(
    @MessageBody() data: { question: string; module?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;

    if (!user || !user.sub) {
      console.warn('⚠️ Usuario no autenticado en socket');
      client.emit('ia-response-error', {
        message: 'Usuario no autenticado',
      });
      return;
    }

    await this.neuralRespondStreamUseCase.execute({
      userId: user.sub,
      question: data.question,
      module: data.module ?? 'general',
      socket: client,
    });
  }
}
