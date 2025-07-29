"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chat_schema_1 = require("src/infraestructure/database/schemas/chat.schema");
const chat_repository_1 = require("src/domain/repositories/chat.repository");
const chat_repository_impl_1 = require("src/infraestructure/database/repositories/chat.repository.impl");
const use_save_chat_1 = require("src/application/use-cases/chat/use-save-chat");
const use_get_chats_1 = require("src/application/use-cases/chat/use.get.chats");
const use_delete_chats_1 = require("src/application/use-cases/chat/use.delete.chats");
const chat_controller_1 = require("src/infraestructure/controllers/chat.controller");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Chat', schema: chat_schema_1.ChatSchema }
            ]),
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [
            use_save_chat_1.SaveChatUseCase,
            use_get_chats_1.GetChatsUseCase,
            use_delete_chats_1.DeleteChatsByUserUseCase,
            { provide: chat_repository_1.ChatRepository, useClass: chat_repository_impl_1.ChatRepositoryImpl },
        ],
        exports: [
            chat_repository_1.ChatRepository,
            use_save_chat_1.SaveChatUseCase,
            use_get_chats_1.GetChatsUseCase,
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map