"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
exports.DatabaseModule = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        uri: configService.get('MONGODB_URI'),
    }),
});
//# sourceMappingURL=database.config.js.map