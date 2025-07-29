"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("src/domain/entities/user.entity");
class UserMapper {
    static toDomain(doc) {
        return new user_entity_1.User(doc._id.toString(), doc.email, doc.password, doc.role, doc.roles, doc.activeModules, doc.name);
    }
    static toPersistence(user) {
        const doc = {
            email: user.email,
            password: user.password,
            role: user.role,
            roles: user.roles,
            activeModules: user.activeModules,
            name: user.name,
        };
        if (user.id) {
            doc._id = user.id;
        }
        return doc;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map