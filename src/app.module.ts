import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './interfaces/controllers/app.controller';
import { AppService } from './application/services/app.service';

import { UserModule } from './infraestructure/modules/user.module';
import { AuthModule } from './infraestructure/modules/auth.module';
import { NeuralModule } from './infraestructure/modules/neural.module';
import { ChatModule } from './infraestructure/modules/chat.module';

import { NeuralController } from './interfaces/controllers/neural.controller';
import { NeuralService } from './application/services/neural.service';
import { NeuralRespondUseCase } from './application/use-cases/neural/use-respond-neural';
import { SaveChatUseCase } from './application/use-cases/chat/use-save-chat';

import { LogRepositoryImpl } from './infraestructure/database/repositories/log.repository.impl';
import { LogRepository } from './domain/repositories/log.repository';
import { LogEntrySchema } from './infraestructure/database/schemas/log-entry.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'LogEntry', schema: LogEntrySchema },
    ]),
    UserModule,
    AuthModule,
    NeuralModule,
    ChatModule,
  ],
  controllers: [AppController, NeuralController],
  providers: [
    AppService,
    NeuralService,
    NeuralRespondUseCase,
    SaveChatUseCase,
    { provide: LogRepository, useClass: LogRepositoryImpl },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
