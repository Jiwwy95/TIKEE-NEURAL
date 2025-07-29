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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("src/infraestructure/auth/jwt.guard");
const roles_guard_1 = require("src/infraestructure/guards/roles.guard");
const roles_decorator_1 = require("src/infraestructure/decorators/roles.decorator");
const use_get_modules_1 = require("src/application/use-cases/user/use-get-modules");
const use_update_modules_1 = require("src/application/use-cases/user/use-update-modules");
const user_repository_1 = require("src/domain/repositories/user.repository");
const use_update_role_1 = require("src/application/use-cases/user/use-update-role");
const update_permissions_dto_1 = require("src/interfaces/dto/update-permissions.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(getModulesUseCase, updateModulesUseCase, userRepository, updateUserRoleUseCase) {
        this.getModulesUseCase = getModulesUseCase;
        this.updateModulesUseCase = updateModulesUseCase;
        this.userRepository = userRepository;
        this.updateUserRoleUseCase = updateUserRoleUseCase;
    }
    getProfile(req) {
        return {
            message: 'Bienvenido al perfil',
            user: req.user,
        };
    }
    async getModules(req) {
        const userId = req.user.userId;
        return this.getModulesUseCase.execute(userId);
    }
    async updateModules(req, body) {
        const userId = req.user.userId;
        return this.updateModulesUseCase.execute(userId, body.modules);
    }
    async updateUserRole(userId, body) {
        return this.updateUserRoleUseCase.execute(userId, body.role);
    }
    async findAll() {
        const users = await this.userRepository.findAll();
        return {
            message: 'Lista de usuarios',
            users,
        };
    }
    async getUserStats() {
        const users = await this.userRepository.findAll();
        const stats = {
            admin: users.filter((u) => u.role === 'admin').length,
            analista: users.filter((u) => u.role === 'analista').length,
            lector: users.filter((u) => u.role === 'lector').length,
        };
        return { message: 'Estadisticas de usuarios por rol', stats };
    }
    async deleteUser(userId) {
        const deleted = await this.userRepository.deleteById(userId);
        if (!deleted) {
            throw new common_1.NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }
        return { message: 'Usuario eliminado exitosamente' };
    }
    async updatePermissions(userId, body) {
        const updatedUser = await this.userRepository.findById(userId);
        if (!updatedUser) {
            throw new common_1.NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }
        if (body.role) {
            await this.updateUserRoleUseCase.execute(userId, body.role);
        }
        if (body.modules) {
            await this.updateModulesUseCase.execute(userId, body.modules);
        }
        const user = await this.userRepository.findById(userId);
        return { message: 'Permisos actualizados correctamente', user };
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener perfil del usuario autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Perfil retornado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)('modules'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getModules", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)('modules'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateModules", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)(':id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estadisticas de usuarios por rol' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Estadisticas obtenidas correctamente',
        schema: {
            example: {
                message: 'Estadisticas de usuarios por rol',
                stats: {
                    admin: 2,
                    analista: 5,
                    lector: 10,
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(':id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar rol y módulos de un usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del usuario a modificar' }),
    (0, swagger_1.ApiBody)({ type: update_permissions_dto_1.UpdatePermissionsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permisos actualizados correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permissions_dto_1.UpdatePermissionsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePermissions", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [use_get_modules_1.GetModulesUseCase,
        use_update_modules_1.UpdateModulesUseCase,
        user_repository_1.UserRepository,
        use_update_role_1.UpdateUserRoleUseCase])
], UserController);
//# sourceMappingURL=user.controller.js.map