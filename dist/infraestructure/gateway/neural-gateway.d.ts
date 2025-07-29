import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NeuralRespondStreamUseCase } from 'src/application/use-cases/neural/use-respond-neural-stream';
export declare class NeuralGateway implements OnGatewayConnection {
    private readonly neuralRespondStreamUseCase;
    server: Server;
    constructor(neuralRespondStreamUseCase: NeuralRespondStreamUseCase);
    handleConnection(socket: Socket): void;
    handleAskIA(data: {
        question: string;
        module?: string;
    }, client: Socket): Promise<void>;
}
