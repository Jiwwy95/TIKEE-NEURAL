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
exports.LogRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const log_entry_entity_1 = require("src/domain/entities/log-entry.entity");
const log_repository_1 = require("src/domain/repositories/log.repository");
let LogRepositoryImpl = class LogRepositoryImpl extends log_repository_1.LogRepository {
    constructor(logModel) {
        super();
        this.logModel = logModel;
    }
    async save(entry) {
        const created = new this.logModel(entry);
        const saved = await created.save();
        return new log_entry_entity_1.LogEntry(saved.id.toString(), saved.userId, saved.question, saved.timestamp, saved.module, saved.answer);
    }
    async findFiltered(filters) {
        const query = {};
        if (filters.userId)
            query.userId = filters.userId;
        if (filters.module)
            query.module = filters.module;
        if (filters.from || filters.to) {
            query.timestamp = {};
            if (filters.from)
                query.timestamp.$gte = filters.from;
            if (filters.to)
                query.timestamp.$lte = filters.to;
        }
        const results = await this.logModel.find(query).sort({ timestamp: -1 });
        return results.map(log => new log_entry_entity_1.LogEntry(log.id.toString(), log.userId, log.question, log.timestamp, log.module, log.answer));
    }
};
exports.LogRepositoryImpl = LogRepositoryImpl;
exports.LogRepositoryImpl = LogRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('LogEntry')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LogRepositoryImpl);
//# sourceMappingURL=log.repository.impl.js.map