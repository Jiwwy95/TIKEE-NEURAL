import { Model } from 'mongoose';
import { UserDocument } from 'src/infraestructure/database/schemas/user.schema';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';
export declare class UserRepositoryImpl extends UserRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
    updateModules(userId: string, modules: string[]): Promise<User | null>;
    findAll(): Promise<User[]>;
    updateUserRole(userId: string, newRole: string): Promise<User | null>;
    updateUser(userId: string, data: Partial<{
        name: string;
        email: string;
        role: string;
    }>): Promise<User | null>;
    deleteById(userId: string): Promise<boolean>;
}
