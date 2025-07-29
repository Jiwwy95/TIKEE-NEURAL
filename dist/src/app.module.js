"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("src/interfaces/controllers/app.controller");
const app_service_1 = require("src/application/services/app.service");
const user_module_1 = require("src/infraestructure/modules/user.module");
const auth_module_1 = require("src/infraestructure/modules/auth.module");
const neural_module_1 = require("src/infraestructure/modules/neural.module");
const chat_module_1 = require("src/infraestructure/modules/chat.module");
const neural_controller_1 = require("src/interfaces/controllers/neural.controller");
const neural_service_1 = require("src/application/services/neural.service");
const use_respond_neural_1 = require("src/application/use-cases/neural/use-respond-neural");
const use_save_chat_1 = require("src/application/use-cases/chat/use-save-chat");
const log_repository_impl_1 = require("src/infraestructure/database/repositories/log.repository.impl");
const log_repository_1 = require("src/domain/repositories/log.repository");
const log_entry_schema_1 = require("src/infraestructure/database/schemas/log-entry.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    uri: config.get('MONGODB_URI'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'LogEntry', schema: log_entry_schema_1.LogEntrySchema },
            ]),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            neural_module_1.NeuralModule,
            chat_module_1.ChatModule,
        ],
        controllers: [app_controller_1.AppController, neural_controller_1.NeuralController],
        providers: [
            app_service_1.AppService,
            neural_service_1.NeuralService,
            use_respond_neural_1.NeuralRespondUseCase,
            use_save_chat_1.SaveChatUseCase,
            { provide: log_repository_1.LogRepository, useClass: log_repository_impl_1.LogRepositoryImpl },
            { provide: core_1.APP_PIPE, useClass: common_1.ValidationPipe },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map