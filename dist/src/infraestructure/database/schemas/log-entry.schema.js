"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntrySchema = void 0;
const mongoose_1 = require("mongoose");
exports.LogEntrySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date() },
    module: { type: String, default: 'general' },
}, {
    versionKey: false,
});
//# sourceMappingURL=log-entry.schema.js.map