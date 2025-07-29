import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UpdateUserRoleUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string, newRole: string) {
    
    const updated = await this.userRepo.updateUserRole(userId, newRole);  
    if (!updated) throw new NotFoundException('Usuario no encontrado');
    return {
      message: 'Rol actualizado correctamente',
      user: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
      },
    };
  }
}


