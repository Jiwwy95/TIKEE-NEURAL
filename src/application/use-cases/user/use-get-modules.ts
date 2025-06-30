import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class GetModulesUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId); 
    return user?.activeModules || [];
  }
}
