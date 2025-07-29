"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("src/infraestructure/modules/auth.module");
const chat_module_1 = require("src/infraestructure/modules/chat.module");
const chat_schema_1 = require("src/infraestructure/database/schemas/chat.schema");
const mongo_chat_repository_1 = require("src/infraestructure/database/repositories/mongo-chat.repository");
const chat_repository_1 = require("src/domain/repositories/chat.repository");
const neural_service_1 = require("src/application/services/neural.service");
const use_respond_neural_1 = require("src/application/use-cases/neural/use-respond-neural");
const use_respond_neural_stream_1 = require("src/application/use-cases/neural/use-respond-neural-stream");
const neural_controller_1 = require("src/interfaces/controllers/neural.controller");
const neural_gateway_1 = require("src/infraestructure/gateway/neural-gateway");
const log_repository_1 = require("src/domain/repositories/log.repository");
const log_repository_impl_1 = require("src/infraestructure/database/repositories/log.repository.impl");
const log_entry_schema_1 = require("src/infraestructure/database/schemas/log-entry.schema");
let NeuralModule = class NeuralModule {
};
exports.NeuralModule = NeuralModule;
exports.NeuralModule = NeuralModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Chat', schema: chat_schema_1.ChatSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'LogEntry', schema: log_entry_schema_1.LogEntrySchema },
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [neural_controller_1.NeuralController],
        providers: [
            neural_service_1.NeuralService,
            use_respond_neural_1.NeuralRespondUseCase,
            use_respond_neural_stream_1.NeuralRespondStreamUseCase,
            neural_gateway_1.NeuralGateway,
            { provide: chat_repository_1.ChatRepository, useClass: mongo_chat_repository_1.MongoChatRepository, },
            { provide: log_repository_1.LogRepository, useClass: log_repository_impl_1.LogRepositoryImpl },
        ],
        exports: [
            use_respond_neural_1.NeuralRespondUseCase,
            chat_repository_1.ChatRepository,
        ],
    })
], NeuralModule);
//# sourceMappingURL=neural.module.js.map