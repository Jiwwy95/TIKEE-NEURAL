import { ConfigService } from '@nestjs/config';
export declare class NeuralService {
    private configService;
    constructor(configService: ConfigService);
    getAnswerStream(prompt: string, onChunk: (chunk: string, isEnd: boolean) => Promise<void> | void): Promise<void>;
    getAnswer(prompt: string): Promise<string>;
}
