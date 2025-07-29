"use strict";
require('module-alias/register');

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("src/app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: ['http://localhost:5173'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    });
    const apiKey = configService.get('OPENROUTER_API_KEY');
    console.log('🔐 API KEY cargada desde ConfigService:', apiKey || 'NO DEFINIDA');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Tikee Neural API')
        .setDescription('Asistente IA para entidades financieras')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map