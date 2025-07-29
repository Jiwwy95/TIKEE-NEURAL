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
exports.NeuralRespondUseCase = void 0;
const common_1 = require("@nestjs/common");
const log_repository_1 = require("src/domain/repositories/log.repository");
const neural_service_1 = require("src/application/services/neural.service");
const log_entry_entity_1 = require("src/domain/entities/log-entry.entity");
const crypto_1 = require("crypto");
const chat_repository_1 = require("src/domain/repositories/chat.repository");
let NeuralRespondUseCase = class NeuralRespondUseCase {
    constructor(logRepository, neuralService, chatRepository) {
        this.logRepository = logRepository;
        this.neuralService = neuralService;
        this.chatRepository = chatRepository;
    }
    async execute(input) {
        const { userId, question, module } = input;
        if (!question || typeof question !== 'string' || question.trim() === '') {
            throw new common_1.InternalServerErrorException('Pregunta inválida');
        }
        try {
            const answer = await this.neuralService.getAnswer(question);
            if (!answer || typeof answer !== 'string') {
                throw new common_1.InternalServerErrorException('La IA no generó una respuesta válida');
            }
            const log = new log_entry_entity_1.LogEntry((0, crypto_1.randomUUID)(), userId, question, new Date(), module ?? 'general', answer);
            await this.logRepository.save(log);
            const chat = {
                id: (0, crypto_1.randomUUID)(),
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
        }
        catch (error) {
            console.error('Error al procesar la respuesta de la IA:', error);
            throw new common_1.InternalServerErrorException('No se pudo obtener respuesta de la IA');
        }
    }
};
exports.NeuralRespondUseCase = NeuralRespondUseCase;
exports.NeuralRespondUseCase = NeuralRespondUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_repository_1.LogRepository,
        neural_service_1.NeuralService,
        chat_repository_1.ChatRepository])
], NeuralRespondUseCase);
//# sourceMappingURL=use-respond-neural.js.map