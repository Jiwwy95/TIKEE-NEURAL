"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("src/infraestructure/database/schemas/user.schema");
const user_controller_1 = require("src/interfaces/controllers/user.controller");
const user_repository_1 = require("src/domain/repositories/user.repository");
const user_repository_impl_1 = require("src/infraestructure/database/repositories/user.repository.impl");
const use_get_modules_1 = require("src/application/use-cases/user/use-get-modules");
const use_update_modules_1 = require("src/application/use-cases/user/use-update-modules");
const use_update_role_1 = require("src/application/use-cases/user/use-update-role");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            use_get_modules_1.GetModulesUseCase,
            use_update_modules_1.UpdateModulesUseCase,
            use_update_role_1.UpdateUserRoleUseCase,
            { provide: user_repository_1.UserRepository, useClass: user_repository_impl_1.UserRepositoryImpl },
        ],
        exports: [
            user_repository_1.UserRepository,
            use_get_modules_1.GetModulesUseCase,
            use_update_modules_1.UpdateModulesUseCase,
            use_update_role_1.UpdateUserRoleUseCase,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map