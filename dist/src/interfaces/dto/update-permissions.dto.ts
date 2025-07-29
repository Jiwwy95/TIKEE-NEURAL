import { IsOptional, IsString, IsArray, ArrayNotEmpty, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePermissionsDto {
  @ApiPropertyOptional({ example: 'admin', description: 'Nuevo rol del usuario (admin, analista, lector)' })
  @IsOptional()
  @IsString()
  @IsIn(['admin', 'analista', 'lector'], { message: 'El rol debe ser admin, analista o lector' })
  role?: string;

  @ApiPropertyOptional({
    example: ['neural', 'dashboard'],
    description: 'Lista de modulos activos que el usuario puede usar',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  modules?: string[];
}
