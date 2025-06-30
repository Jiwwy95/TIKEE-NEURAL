import { ApiProperty } from '@nestjs/swagger';

export class RespondDto {
  @ApiProperty({
    description: 'Pregunta que el usuario quiere hacerle a la IA',
    example: '¿Cuál es el proceso para abrir una cuenta bancaria?',
  })
  question: string;

  @ApiProperty({
    description: 'Nombre del módulo desde donde se hace la consulta (opcional)',
    example: 'consultas',
    required: false,
  })
  module?: string;
}
