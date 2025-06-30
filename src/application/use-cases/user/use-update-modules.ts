import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class UpdateModulesUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string, modules: string[]) {
    const updated = await this.userRepo.updateModules(userId, modules);
    
    if (!updated) {
      throw new Error('Ususario no encontrado o actualizacion de usuario fallida');
    }

    return updated.activeModules;
  }
}
