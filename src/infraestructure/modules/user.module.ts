import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../database/schemas/user.schema';

import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserRepositoryImpl } from '../database/repositories/user.repository.impl';

import { GetModulesUseCase } from 'src/application/use-cases/user/use-get-modules';
import { UpdateModulesUseCase } from 'src/application/use-cases/user/use-update-modules';
import { UpdateUserRoleUseCase } from 'src/application/use-cases/user/use-update-role';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
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
