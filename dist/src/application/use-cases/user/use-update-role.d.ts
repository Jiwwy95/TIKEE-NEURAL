import { UserRepository } from 'src/domain/repositories/user.repository';
export declare class UpdateUserRoleUseCase {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(userId: string, newRole: string): Promise<{
        message: string;
        user: {
            id: string | undefined;
            email: string;
            role: "admin" | "analista" | "lector";
        };
    }>;
}
