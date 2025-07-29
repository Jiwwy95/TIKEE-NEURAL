import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: UserRepository, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
            roles: any;
        };
    }>;
    register(body: {
        email: string;
        password: string;
        name: string;
        role?: string;
        roles?: string[];
        activeModules?: string[];
    }): Promise<{
        message: string;
        user: {
            id: string | undefined;
            name: string;
            email: string;
            role: "admin" | "analista" | "lector";
            roles: string[];
            activeModules: string[];
        };
    }>;
}
