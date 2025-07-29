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
exports.UserRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_repository_1 = require("src/domain/repositories/user.repository");
const user_mapper_1 = require("src/infraestructure/mappers/user.mapper");
let UserRepositoryImpl = class UserRepositoryImpl extends user_repository_1.UserRepository {
    constructor(userModel) {
        super();
        this.userModel = userModel;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async findById(id) {
        const user = await this.userModel.findById(id);
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async create(user) {
        const created = new this.userModel(user_mapper_1.UserMapper.toPersistence(user));
        const saved = await created.save();
        return user_mapper_1.UserMapper.toDomain(saved);
    }
    async updateModules(userId, modules) {
        const user = await this.userModel.findByIdAndUpdate(userId, { activeModules: modules }, { new: true });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async findAll() {
        const users = await this.userModel.find().select('-password');
        return users.map(user_mapper_1.UserMapper.toDomain);
    }
    async updateUserRole(userId, newRole) {
        const user = await this.userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async updateUser(userId, data) {
        const user = await this.userModel.findByIdAndUpdate(userId, data, { new: true });
        return user ? user_mapper_1.UserMapper.toDomain(user) : null;
    }
    async deleteById(userId) {
        const result = await this.userModel.findByIdAndDelete(userId);
        return !!result;
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepositoryImpl);
//# sourceMappingURL=user.repository.impl.js.map