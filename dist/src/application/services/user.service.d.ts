import { UserRepository } from 'src/domain/repositories/user.repository';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    findAll(): Promise<import("../../domain/entities/user.entity").User[]>;
    updatePermissions(userId: string, updates: {
        role?: string;
        modules?: string[];
    }): Promise<import("../../domain/entities/user.entity").User | null>;
}
