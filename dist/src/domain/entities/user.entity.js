"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, password, role, roles, activeModules, name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.roles = roles;
        this.activeModules = activeModules;
        this.name = name;
        this.role = role ?? 'lector';
        this.roles = roles && roles.length > 0 ? roles : [this.role];
        this.activeModules = activeModules ?? [];
        this.name = name ?? '';
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map