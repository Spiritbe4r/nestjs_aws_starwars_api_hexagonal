import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CrearFavoritoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre del personaje favorito.',
    example: 'Leia Organa',
  })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la planeta del personaje favorito.',
    example: 'Tatooine',
  })
  planeta: string;
}
