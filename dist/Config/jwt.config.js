"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const jwt_1 = require("@nestjs/jwt");
exports.JwtProvider = jwt_1.JwtModule.register({
    secret: process.env.JWT_SECRET || 'default_secret',
    signOptions: { expiresIn: '1h' },
});
//# sourceMappingURL=jwt.config.js.map