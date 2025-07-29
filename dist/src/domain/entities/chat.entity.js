"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.ChatMessage = void 0;
class ChatMessage {
    constructor(question, answer, timestamp = new Date()) {
        this.question = question;
        this.answer = answer;
        this.timestamp = timestamp;
    }
}
exports.ChatMessage = ChatMessage;
class Chat {
    constructor(id, userId, question, answer, module, createdAt = new Date(), messages) {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.answer = answer;
        this.module = module;
        this.createdAt = createdAt;
        this.messages = messages;
    }
}
exports.Chat = Chat;
//# sourceMappingURL=chat.entity.js.map