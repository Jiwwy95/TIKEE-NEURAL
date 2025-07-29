"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralRespondStreamUseCase = void 0;
const common_1 = require("@nestjs/common");
const log_repository_1 = require("src/domain/repositories/log.repository");
const neural_service_1 = require("src/application/services/neural.service");
const log_entry_entity_1 = require("src/domain/entities/log-entry.entity");
const crypto_1 = require("crypto");
const chat_repository_1 = require("src/domain/repositories/chat.repository");
let NeuralRespondStreamUseCase = class NeuralRespondStreamUseCase {
    constructor(logRepository, neuralService, chatRepository) {
        this.logRepository = logRepository;
        this.neuralService = neuralService;
        this.chatRepository = chatRepository;
    }
    async execute(input) {
        const { userId, question, socket, module = 'general', chatId } = input;
        let fullAnswer = '';
        try {
            await this.neuralService.getAnswerStream(question, async (chunk, isEnd) => {
                if (chunk) {
                    console.log('[EMIT] ia-response-chunk');
                    fullAnswer += chunk;
                    socket.emit('ia-response-chunk', { chunk });
                }
                if (isEnd) {
                    console.log('[EMIT] ia-response-end');
                    socket.emit('ia-response-end');
                    const log = new log_entry_entity_1.LogEntry((0, crypto_1.randomUUID)(), userId, question, new Date(), module ?? 'general', fullAnswer);
                    await this.logRepository.save(log);
                    if (chatId) {
                        await this.chatRepository.addMessageToChat(chatId, question, fullAnswer);
                    }
                    else {
                        const newChatId = (0, crypto_1.randomUUID)();
                        const newChat = {
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
            });
        }
        catch (error) {
            console.error('Error al procesar respuesta IA con streaming:', error);
            socket.emit('ia-response-error', {
                message: 'Error interno al obtener respuesta de la IA',
            });
        }
    }
};
exports.NeuralRespondStreamUseCase = NeuralRespondStreamUseCase;
exports.NeuralRespondStreamUseCase = NeuralRespondStreamUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_repository_1.LogRepository,
        neural_service_1.NeuralService,
        chat_repository_1.ChatRepository])
], NeuralRespondStreamUseCase);
//# sourceMappingURL=use-respond-neural-stream.js.map