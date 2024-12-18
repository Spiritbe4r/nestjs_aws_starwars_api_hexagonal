import { ApiProperty } from '@nestjs/swagger';

export class FavoriteCharacterResponseDto {
  @ApiProperty({
    description: 'ID único del personaje favorito.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del personaje favorito.',
    example: 'Luke Skywalker',
  })
  nombre: string;

  @ApiProperty({
    description: 'Planeta de origen del personaje favorito.',
    example: 'Tatooine',
  })
  planeta: string;

  @ApiProperty({
    description: 'Fecha de creación del registro.',
    example: '2024-04-27T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de la última actualización del registro.',
    example: '2024-04-27T12:34:56.789Z',
  })
  updatedAt: Date;
}
