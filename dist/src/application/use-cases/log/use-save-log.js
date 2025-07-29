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
exports.SaveLogUseCase = void 0;
const common_1 = require("@nestjs/common");
const log_repository_1 = require("src/domain/repositories/log.repository");
const log_entry_entity_1 = require("src/domain/entities/log-entry.entity");
let SaveLogUseCase = class SaveLogUseCase {
    constructor(logRepo) {
        this.logRepo = logRepo;
    }
    async execute(data) {
        const log = new log_entry_entity_1.LogEntry('', data.userId, data.question, new Date(), data.module);
        return this.logRepo.save(log);
    }
};
exports.SaveLogUseCase = SaveLogUseCase;
exports.SaveLogUseCase = SaveLogUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_repository_1.LogRepository])
], SaveLogUseCase);
//# sourceMappingURL=use-save-log.js.map