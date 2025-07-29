import { User } from 'src/domain/entities/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract updateModules(userId: string, modules: string[]): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract updateUserRole(userId: string, newRole: string): Promise<User | null>;
  abstract deleteById(id: string): Promise<boolean>;
  abstract updateUser(id: string, data: Partial<{ name: string; email: string; role: string }>): Promise<User | null>;
}
