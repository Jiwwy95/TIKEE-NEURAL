import { AuthService } from 'src/application/services/auth.services';
import { LoginDto } from 'src/interfaces/dto/login.dto';
import { RegisterDto } from 'src/interfaces/dto/registerdto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
            roles: any;
        };
    }>;
    register(body: RegisterDto): Promise<{
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
