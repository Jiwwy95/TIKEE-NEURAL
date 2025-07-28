import { UserModel } from "../database/schemas/user.schema";
import { User } from "src/domain/entities/user.entity";

export class UserMapper {
  static toDomain(doc: any): User {
    return new User(
      doc._id.toString(),
      doc.email,
      doc.password,
      doc.role,
      doc.roles,
      doc.activeModules,
      doc.name, 
    );
  }

  static toPersistence(user: User): any {
  const doc: any = {
    email: user.email,
    password: user.password,
    role: user.role,
    roles: user.roles,
    activeModules: user.activeModules,
    name: user.name,
  };
    if (user.id) {
      doc._id = user.id;
    }
    return doc;
  }
}