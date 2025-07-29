import { UserRepository } from 'src/domain/repositories/user.repository';
export declare class GetModulesUseCase {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(userId: string): Promise<string[]>;
}
