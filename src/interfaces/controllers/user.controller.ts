import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Req,
  Param,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt.guard';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { GetModulesUseCase } from 'src/application/use-cases/user/use-get-modules';
import { UpdateModulesUseCase } from 'src/application/use-cases/user/use-update-modules';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UpdateUserRoleUseCase } from 'src/application/use-cases/user/use-update-role';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly getModulesUseCase: GetModulesUseCase,
    private readonly updateModulesUseCase: UpdateModulesUseCase,
    private readonly userRepository: UserRepository,
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCase,
  ) {}

  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'Bienvenido al perfil',
      user: req.user,
    };
  }

  @Get('settings')
  getSettings(@Request() req) {
    return {
      message: 'Ajustes personales del usuario',
      user: req.user,
    };
  }

  @Get('modules')
  async getModules(@Req() req) {
    const userId = req.user.userId;
    return this.getModulesUseCase.execute(userId);
  }

  @Put('modules')
  async updateModules(@Req() req, @Body() body: { modules: string[] }) {
    const userId = req.user.userId;
    return this.updateModulesUseCase.execute(userId, body.modules);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id/role')
  async updateUserRole(
    @Param('id') userId: string,
    @Body() body: { role: string },
  ) {
    return this.updateUserRoleUseCase.execute(userId, body.role);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    const users = await this.userRepository.findAll();
    return {
      message: 'Lista de usuarios',
      users,
    };
  }
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const deleted = await this.userRepository.deleteById(userId);
    if (!deleted) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return { message: 'Usuario eliminado exitosamente' };
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() body: { name?: string; email?: string; role?: string },
  ) {
    const updated = await this.userRepository.updateUser(userId, body);
    if (!updated) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return { message: 'Usuario actualizado exitosamente', user: updated };
  }
}