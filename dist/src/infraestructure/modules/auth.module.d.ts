import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/application/services/auth.services';
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt.guard';
export declare class AuthModule {
    exports: [AuthService, JwtModule, JwtAuthGuard, JwtStrategy];
}
