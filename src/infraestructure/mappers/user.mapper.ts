import { UserModel } from "../database/schemas/user.schema";
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(user: UserModel & { _id?: any }): User {
    return new User(
      user?._id?.toString() ?? '', 
      user?.email ?? '', 
      user?.password ?? '', 
      user?.role ?? 'lector', 
      user?.activeModules ?? [] 
    );
  }

  static toPersistence(user: User): Partial<UserModel> {
    return {
      email: user.email,
      password: user.password,
      role: user.role ?? 'lector', 
      activeModules: user.activeModules ?? [], 
    };
  }
}