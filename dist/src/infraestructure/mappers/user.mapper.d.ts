import { User } from "src/domain/entities/user.entity";
export declare class UserMapper {
    static toDomain(doc: any): User;
    static toPersistence(user: User): any;
}
