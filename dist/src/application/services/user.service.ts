import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll() {
    return this.userRepo.findAll();
  }
   async updatePermissions(userId: string, updates: { role?: string; modules?: string[] }) {
    return this.userRepo.updateUser(userId, updates);
  }

}
