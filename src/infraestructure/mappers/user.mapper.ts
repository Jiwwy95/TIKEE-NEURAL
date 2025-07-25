import { UserModel } from "../database/schemas/user.schema";
import { User } from "src/domain/entities/user.entity";

export class UserMapper {
  static toDomain(user: UserModel & { id?: any }): User {
    return new User(
      user?.id?.toString() ?? '',
      user?.email ?? '',
      user?.password ?? '',
      user?.role ?? 'lector',
      [user?.role ?? 'lector'],
      user?.activeModules ?? [],
      user?.name ?? '' 
    );
  }

  static toPersistence(user: User): Partial<UserModel> {
    return {
      email: user.email,
      password: user.password,
      role: user.role ?? 'lector',
      activeModules: user.activeModules ?? [],
      name: user.name ?? '',
    };
  }
}