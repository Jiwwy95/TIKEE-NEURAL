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
exports.LogController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("src/infraestructure/auth/jwt.guard");
const use_get_logs_1 = require("src/application/use-cases/log/use-get-logs");
const swagger_1 = require("@nestjs/swagger");
let LogController = class LogController {
    constructor(getLogsUseCase) {
        this.getLogsUseCase = getLogsUseCase;
    }
    async getLogs(req, from, to, module) {
        const userId = req.user.userId;
        const logs = await this.getLogsUseCase.execute({
            userId,
            from: from ? new Date(from) : undefined,
            to: to ? new Date(to) : undefined,
            module,
        });
        return { success: true, data: logs };
    }
};
exports.LogController = LogController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'from', required: false, type: String, description: 'Fecha desde (formato ISO 8601)' }),
    (0, swagger_1.ApiQuery)({ name: 'to', required: false, type: String, description: 'Fecha hasta (formato ISO 8601)' }),
    (0, swagger_1.ApiQuery)({ name: 'module', required: false, type: String, description: 'Nombre del modulo' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Query)('module')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getLogs", null);
exports.LogController = LogController = __decorate([
    (0, swagger_1.ApiTags)('Logs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('logs'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [use_get_logs_1.GetLogsUseCase])
], LogController);
//# sourceMappingURL=log.controller.js.map