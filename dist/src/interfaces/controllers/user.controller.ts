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
import { UpdatePermissionsDto } from 'src/interfaces/dto/update-permissions.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly getModulesUseCase: GetModulesUseCase,
    private readonly updateModulesUseCase: UpdateModulesUseCase,
    private readonly userRepository: UserRepository,
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCase,
  ) {}

  @ApiBearerAuth('access-token') 
  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil retornado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getProfile(@Request() req) {
    return {
      message: 'Bienvenido al perfil',
      user: req.user,
    };
  }

  @ApiBearerAuth('access-token')
  @Get('modules')
  async getModules(@Req() req) {
    const userId = req.user.userId;
    return this.getModulesUseCase.execute(userId);
  }

  @ApiBearerAuth('access-token')
  @Put('modules')
  async updateModules(@Req() req, @Body() body: { modules: string[] }) {
    const userId = req.user.userId;
    return this.updateModulesUseCase.execute(userId, body.modules);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @Put(':id/role')
  async updateUserRole(
    @Param('id') userId: string,
    @Body() body: { role: string },
  ) {
    return this.updateUserRoleUseCase.execute(userId, body.role);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
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
  @ApiBearerAuth('access-token')
  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadisticas de usuarios por rol' })
  @ApiResponse({
    status: 200,
    description: 'Estadisticas obtenidas correctamente',
    schema: {
      example: {
        message: 'Estadisticas de usuarios por rol',
        stats: {
          admin: 2,
          analista: 5,
          lector: 10,
        },
      },
    },
  })
  async getUserStats() {
    const users = await this.userRepository.findAll();
    const stats = {
      admin: users.filter((u) => u.role === 'admin').length,
      analista: users.filter((u) => u.role === 'analista').length,
      lector: users.filter((u) => u.role === 'lector').length,
    };
    return { message: 'Estadisticas de usuarios por rol', stats };
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const deleted = await this.userRepository.deleteById(userId);
    if (!deleted) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return { message: 'Usuario eliminado exitosamente' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @Patch(':id/permissions')
  @ApiOperation({ summary: 'Actualizar rol y módulos de un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a modificar' })
  @ApiBody({ type: UpdatePermissionsDto })
  @ApiResponse({ status: 200, description: 'Permisos actualizados correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updatePermissions(
    @Param('id') userId: string,
    @Body() body: UpdatePermissionsDto,
  ) {
    const updatedUser = await this.userRepository.findById(userId);
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    if (body.role) {
      await this.updateUserRoleUseCase.execute(userId, body.role);
    }

    if (body.modules) {
      await this.updateModulesUseCase.execute(userId, body.modules);
    }

    const user = await this.userRepository.findById(userId);
    return { message: 'Permisos actualizados correctamente', user };
  }
}
