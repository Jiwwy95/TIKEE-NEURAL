import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth.module';
import { ChatModule } from './chat.module';
import { ChatSchema } from '../database/schemas/chat.schema';
import { MongoChatRepository } from '../database/repositories/mongo-chat.repository';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

import { NeuralService } from 'src/application/services/neural.service';
import { NeuralRespondUseCase } from 'src/application/use-cases/neural/use-respond-neural';
import { NeuralRespondStreamUseCase } from 'src/application/use-cases/neural/use-respond-neural-stream';

import { NeuralController } from 'src/interfaces/controllers/neural.controller';
import { NeuralGateway } from '../gateway/neural-gateway';

import { LogRepository } from 'src/domain/repositories/log.repository';
import { LogRepositoryImpl } from '../database/repositories/log.repository.impl';
import { LogEntrySchema } from '../database/schemas/log-entry.schema';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    ChatModule,
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    MongooseModule.forFeature([
      { name: 'LogEntry', schema: LogEntrySchema },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NeuralController],
  providers: [
    NeuralService,
    NeuralRespondUseCase,
    NeuralRespondStreamUseCase,
    NeuralGateway,
    {provide: ChatRepository,useClass: MongoChatRepository,},
    {provide: LogRepository, useClass: LogRepositoryImpl },
  ],
  exports: [
    NeuralRespondUseCase,
    ChatRepository,
  ],
})
export class NeuralModule {}
