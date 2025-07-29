"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntry = void 0;
class LogEntry {
    constructor(id, userId, question, timestamp, answer = '', module = 'general') {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.timestamp = timestamp;
        this.answer = answer;
        this.module = module;
    }
}
exports.LogEntry = LogEntry;
//# sourceMappingURL=log-entry.entity.js.map