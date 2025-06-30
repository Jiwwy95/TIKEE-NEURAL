import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth.module';                      
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
    ConfigModule,                               // para que ConfigService funcione
    AuthModule,                                 // ← trae JwtModule ya configurado
    MongooseModule.forFeature([
      { name: 'LogEntry', schema: LogEntrySchema },
    ]),
    // si realmente quieres un JwtModule aquí, usa la misma clave:
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
    { provide: LogRepository, useClass: LogRepositoryImpl },
  ],
  exports: [NeuralRespondUseCase],
})
export class NeuralModule {}
