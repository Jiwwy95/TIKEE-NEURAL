import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'admin@empresa.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: 'admin', required: false })
  role?: string;

  @ApiProperty({ example: ['admin', 'lector'], required: false, isArray: true })
  roles?: string[];

  @ApiProperty({ example: ['informacion', 'estadisticas'], required: false, isArray: true })
  activeModules?: string[];
}
