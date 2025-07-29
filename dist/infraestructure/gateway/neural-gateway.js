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
exports.NeuralGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const jwt_socket_guard_1 = require("src/infraestructure/guards/jwt-socket.guard");
const use_respond_neural_stream_1 = require("src/application/use-cases/neural/use-respond-neural-stream");
let NeuralGateway = class NeuralGateway {
    constructor(neuralRespondStreamUseCase) {
        this.neuralRespondStreamUseCase = neuralRespondStreamUseCase;
    }
    handleConnection(socket) {
        const user = socket.data.user;
        console.log(`✅ Usuario conectado: ${user?.email || socket.id}`);
    }
    async handleAskIA(data, client) {
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
};
exports.NeuralGateway = NeuralGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NeuralGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwt_socket_guard_1.JwtSocketGuard),
    (0, websockets_1.SubscribeMessage)('ask-ia'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NeuralGateway.prototype, "handleAskIA", null);
exports.NeuralGateway = NeuralGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [use_respond_neural_stream_1.NeuralRespondStreamUseCase])
], NeuralGateway);
//# sourceMappingURL=neural-gateway.js.map