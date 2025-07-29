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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("src/infraestructure/auth/jwt.guard");
const use_respond_neural_1 = require("src/application/use-cases/neural/use-respond-neural");
const use_get_chats_1 = require("src/application/use-cases/chat/use.get.chats");
const respond_dto_1 = require("src/interfaces/dto/respond.dto");
let NeuralController = class NeuralController {
    constructor(respondUseCase, configService, getChatsUseCase) {
        this.respondUseCase = respondUseCase;
        this.configService = configService;
        this.getChatsUseCase = getChatsUseCase;
    }
    async respond(req, body) {
        const question = body.question?.trim();
        const module = body.module?.trim();
        if (!question) {
            throw new common_1.BadRequestException('La pregunta es obligatoria');
        }
        if (!req.user?.userId) {
            throw new common_1.UnauthorizedException('Usuario no autenticado o token invalido');
        }
        try {
            const response = await this.respondUseCase.execute({
                userId: req.user.userId,
                question,
                module,
            });
            return { success: true, data: response };
        }
        catch (error) {
            console.error('❌ Error en el controlador Neural:', error);
            throw new common_1.InternalServerErrorException('No se pudo obtener respuesta de la IA');
        }
    }
    async getUserChats(req) {
        const userId = req.user.userId;
        const chats = await this.getChatsUseCase.execute(req.user.userId);
        return {
            message: 'Historial de chats cargado exitosamente',
            chats,
        };
    }
    getEnvTest() {
        const apiKey = this.configService.get('OPENROUTER_API_KEY');
        return {
            message: '🔐 Variable de entorno cargada correctamente',
            OPENROUTER_API_KEY: apiKey ?? '❌ No definida',
        };
    }
};
exports.NeuralController = NeuralController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('respond'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiBody)({ type: respond_dto_1.RespondDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Enviar pregunta a la IA y guardar la conversación' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Respuesta exitosa de la IA' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Pregunta invalida' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token JWT invalido o ausente' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error interno del servidor o IA' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, respond_dto_1.RespondDto]),
    __metadata("design:returntype", Promise)
], NeuralController.prototype, "respond", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('chats'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener historial de chats del usuario autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial de chats recuperado con exito' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NeuralController.prototype, "getUserChats", null);
__decorate([
    (0, common_1.Get)('test-env'),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar si la variable de entorno se carga correctamente' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NeuralController.prototype, "getEnvTest", null);
exports.NeuralController = NeuralController = __decorate([
    (0, swagger_1.ApiTags)('Neural'),
    (0, common_1.Controller)('neural'),
    __metadata("design:paramtypes", [use_respond_neural_1.NeuralRespondUseCase,
        config_1.ConfigService,
        use_get_chats_1.GetChatsUseCase])
], NeuralController);
//# sourceMappingURL=neural.controller.js.map