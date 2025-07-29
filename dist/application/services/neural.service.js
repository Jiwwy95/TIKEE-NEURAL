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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const readline_1 = require("readline");
let NeuralService = class NeuralService {
    constructor(configService) {
        this.configService = configService;
    }
    async getAnswerStream(prompt, onChunk) {
        const apiKey = this.configService.get('OPENROUTER_API_KEY');
        const model = this.configService.get('OPENAI_MODEL') ?? 'openai/gpt-4.o';
        const maxTokens = parseInt(this.configService.get('MAX_TOKENS') || '500');
        const referer = 'http://localhost:3000';
        const response = await (0, node_fetch_1.default)('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': referer,
                'X-Title': 'TIKEE Neural',
            },
            body: JSON.stringify({
                model,
                stream: true,
                max_tokens: maxTokens,
                messages: [
                    { role: 'system', content: 'Eres un asistente util' },
                    { role: 'user', content: prompt },
                ],
            }),
        });
        if (!response.ok || !response.body) {
            const errorText = await response.text();
            console.error('❌ Error en respuesta streaming:', errorText);
            throw new common_1.InternalServerErrorException('Error en stream IA');
        }
        const rl = (0, readline_1.createInterface)({
            input: response.body,
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            const trimmed = line.trim();
            if (trimmed === '' || trimmed === 'data: [DONE]') {
                await onChunk('', true);
                break;
            }
            if (!trimmed.startsWith('data: '))
                continue;
            const json = trimmed.replace(/^data: /, '');
            try {
                const parsed = JSON.parse(json);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                    console.log('[STREAM-CHUNK]', content);
                    await onChunk(content, false);
                }
            }
            catch (err) {
                console.error('❌ Error parseando chunk:', err);
            }
        }
    }
    async getAnswer(prompt) {
        const apiKey = this.configService.get('OPENROUTER_API_KEY');
        const model = this.configService.get('OPENAI_MODEL') ?? 'openai/gpt 0';
        const maxTokens = parseInt(this.configService.get('MAX_TOKENS') || '500');
        const referer = 'http://localhost:3000';
        const response = await (0, node_fetch_1.default)('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': referer,
                'X-Title': 'TIKEE Neural',
            },
            body: JSON.stringify({
                model,
                stream: false,
                max_tokens: maxTokens,
                messages: [
                    { role: 'system', content: 'Eres un asistente util' },
                    { role: 'user', content: prompt },
                ],
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error en respuesta directa:', errorText);
            throw new common_1.InternalServerErrorException('Error al obtener respuesta de la IA');
        }
        const data = await response.json();
        const answer = data.choices?.[0]?.message?.content;
        return answer?.trim() ?? '❌ No se obtuvo respuesta';
    }
};
exports.NeuralService = NeuralService;
exports.NeuralService = NeuralService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NeuralService);
//# sourceMappingURL=neural.service.js.map