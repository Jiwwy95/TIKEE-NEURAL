import { UserRepository } from 'src/domain/repositories/user.repository';
export declare class UpdateModulesUseCase {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(userId: string, modules: string[]): Promise<string[]>;
}
