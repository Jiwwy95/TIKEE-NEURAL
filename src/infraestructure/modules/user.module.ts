import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/infraestructure/database/schemas/user.schema';

import { UserController } from 'src/interfaces/controllers/user.controller';

import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserRepositoryImpl } from 'src/infraestructure/database/repositories/user.repository.impl';

import { GetModulesUseCase } from 'src/application/use-cases/user/use-get-modules';
import { UpdateModulesUseCase } from 'src/application/use-cases/user/use-update-modules';
import { UpdateUserRoleUseCase } from 'src/application/use-cases/user/use-update-role';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    GetModulesUseCase,
    UpdateModulesUseCase,
    UpdateUserRoleUseCase,
    { provide: UserRepository, useClass: UserRepositoryImpl },
  ],
  exports: [
    UserRepository,
    GetModulesUseCase,
    UpdateModulesUseCase,
    UpdateUserRoleUseCase,
  ],
})
export class UserModule {}
