import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from 'src/interfaces/controllers/app.controller';
import { AppService } from 'src/application/services/app.service';

import { UserModule } from 'src/infraestructure/modules/user.module';
import { AuthModule } from 'src/infraestructure/modules/auth.module';
import { NeuralModule } from 'src/infraestructure/modules/neural.module';
import { ChatModule } from 'src/infraestructure/modules/chat.module';

import { NeuralController } from 'src/interfaces/controllers/neural.controller';
import { NeuralService } from 'src/application/services/neural.service';
import { NeuralRespondUseCase } from 'src/application/use-cases/neural/use-respond-neural';
import { SaveChatUseCase } from 'src/application/use-cases/chat/use-save-chat';

import { LogRepositoryImpl } from 'src/infraestructure/database/repositories/log.repository.impl';
import { LogRepository } from 'src/domain/repositories/log.repository';
import { LogEntrySchema } from 'src/infraestructure/database/schemas/log-entry.schema';

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
