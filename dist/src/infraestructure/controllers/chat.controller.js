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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("src/infraestructure/auth/jwt.guard");
const roles_guard_1 = require("src/infraestructure/guards/roles.guard");
const roles_decorator_1 = require("src/infraestructure/decorators/roles.decorator");
const use_get_chats_1 = require("src/application/use-cases/chat/use.get.chats");
const use_delete_chats_1 = require("src/application/use-cases/chat/use.delete.chats");
const swagger_1 = require("@nestjs/swagger");
let ChatController = class ChatController {
    constructor(getChatsUseCase, deleteChatsByUserUseCase) {
        this.getChatsUseCase = getChatsUseCase;
        this.deleteChatsByUserUseCase = deleteChatsByUserUseCase;
    }
    async getChats(req) {
        const userId = req.user.userId;
        const chats = await this.getChatsUseCase.execute(userId);
        return { message: 'Historial de chats del usuario actual', chats };
    }
    async getUserChats(userId, req) {
        const currentUser = req.user;
        const isAdmin = currentUser.role === 'admin';
        const isAnalyst = currentUser.role === 'analista';
        if (isAdmin || isAnalyst) {
            const chats = await this.getChatsUseCase.execute(userId);
            return { message: `Historial de chats del usuario ${userId}`, chats };
        }
        else {
            throw new common_1.ForbiddenException('No tienes permisos para ver estos chats.');
        }
    }
    async deleteUserChats(userId) {
        await this.deleteChatsByUserUseCase.execute(userId);
        return { message: `Chats del usuario ${userId} eliminados correctamente` };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ver mis chats' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChats", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'analista'),
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Ver chats de otro usuario (admin o analista)' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUserChats", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Borrar chats de un usuario (solo admin)' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteUserChats", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chats'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('chats'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [use_get_chats_1.GetChatsUseCase,
        use_delete_chats_1.DeleteChatsByUserUseCase])
], ChatController);
//# sourceMappingURL=chat.controller.js.map