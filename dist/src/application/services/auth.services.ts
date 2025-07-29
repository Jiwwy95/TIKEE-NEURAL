import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roles: user.roles,
    };
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roles: user.roles,
      },
    };
  }

  async register(body: {
    email: string;
    password: string;
    name: string;
    role?: string;
    roles?: string[];
    activeModules?: string[];
  }) {
    const existingUser = await this.userRepo.findByEmail(body.email);
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const validRoles = ['admin', 'analista', 'lector'];
    const role = validRoles.includes(body.role ?? '') ? body.role! : 'lector';

    const roles = Array.isArray(body.roles)
      ? body.roles.filter(r => validRoles.includes(r))
      : [role];

    const activeModules = body.activeModules ?? [];

    const newUser = new User(
      undefined,           // ID generado por Mongo
      body.email,
      hashedPassword,
      role as 'admin' | 'analista' | 'lector',
      roles,
      activeModules,
      body.name,
    );

    const savedUser = await this.userRepo.create(newUser);

    return {
      message: 'Usuario registrado exitosamente',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        roles: savedUser.roles,
        activeModules: savedUser.activeModules,
      },
    };
  }
}
