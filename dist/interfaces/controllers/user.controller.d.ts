import { GetModulesUseCase } from 'src/application/use-cases/user/use-get-modules';
import { UpdateModulesUseCase } from 'src/application/use-cases/user/use-update-modules';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UpdateUserRoleUseCase } from 'src/application/use-cases/user/use-update-role';
import { UpdatePermissionsDto } from 'src/interfaces/dto/update-permissions.dto';
export declare class UserController {
    private readonly getModulesUseCase;
    private readonly updateModulesUseCase;
    private readonly userRepository;
    private readonly updateUserRoleUseCase;
    constructor(getModulesUseCase: GetModulesUseCase, updateModulesUseCase: UpdateModulesUseCase, userRepository: UserRepository, updateUserRoleUseCase: UpdateUserRoleUseCase);
    getProfile(req: any): {
        message: string;
        user: any;
    };
    getModules(req: any): Promise<string[]>;
    updateModules(req: any, body: {
        modules: string[];
    }): Promise<string[]>;
    updateUserRole(userId: string, body: {
        role: string;
    }): Promise<{
        message: string;
        user: {
            id: string | undefined;
            email: string;
            role: "admin" | "analista" | "lector";
        };
    }>;
    findAll(): Promise<{
        message: string;
        users: import("../../domain/entities/user.entity").User[];
    }>;
    getUserStats(): Promise<{
        message: string;
        stats: {
            admin: number;
            analista: number;
            lector: number;
        };
    }>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    updatePermissions(userId: string, body: UpdatePermissionsDto): Promise<{
        message: string;
        user: import("../../domain/entities/user.entity").User | null;
    }>;
}
