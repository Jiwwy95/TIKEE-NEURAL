import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales invaldias');
    }

    return {
      id: user.id,
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
        email: user.email,
        role: user.role,
        roles: user.roles,
      }
  
    };
  }

  async register(body: {
    email: string;
    password: string;
    role?: string;
    roles?: string[];
    activeModules?: string[];
  }) {
    const existingUser = await this.userRepo.findByEmail(body.email);
    if (existingUser) {
      throw new ConflictException('El correo ya esta registrado');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const role = body.role ?? 'lector';
    const roles = body.roles ?? [role];
    const activeModules = body.activeModules ?? [];

    const newUser = new User(
      '', 
      body.email,
      hashedPassword,
      role,
      roles,
      activeModules
    );

    const savedUser = await this.userRepo.create(newUser);

    return {
      message: 'Usuario registrado exitosamente',
      user: {
        id: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
        roles: savedUser.roles,
        activeModules: savedUser.activeModules,
      },
    };
  }
}
