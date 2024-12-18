import { STARWARS_API_FAVORITES_ROUTE, STARWARS_API_PATH, STARWARS_API_PERSONAJE_ROUTE } from './../../../../common/constants/constants';
import { FavoriteCharacterResponseDto } from '../dto/favorite-character-response.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FavoriteCharacterService } from 'src/application/services/favorite-character.service';
import { CrearFavoritoDto } from '../dto/crear-favorito.dto';
import { ISwapiResponse } from '../../external/swapi/swapi.types';

@ApiTags('StarWars')
@Controller(STARWARS_API_PATH)
export class StarwarsController {
  constructor(
    private readonly favoriteCharacterService: FavoriteCharacterService,
  ) { }

  @ApiOperation({ summary: 'Crear un personaje favorito' })
  @ApiResponse({
    status: 201,
    description: 'Personaje favorito creado exitosamente.',
    type: FavoriteCharacterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos proporcionados.',
  })
  @ApiBody({ type: CrearFavoritoDto })
  @Post(STARWARS_API_FAVORITES_ROUTE)
  async crearFavorito(
    @Body() crearFavoritoDto: CrearFavoritoDto,
  ): Promise<FavoriteCharacterResponseDto> {
    return this.favoriteCharacterService.crearFavorito(crearFavoritoDto);
  }

  @ApiOperation({ summary: 'Obtener todos los personajes favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personajes favoritos obtenida exitosamente.',
    type: [FavoriteCharacterResponseDto],
  })
  @Get(STARWARS_API_FAVORITES_ROUTE)
  async obtenerFavoritos(): Promise<FavoriteCharacterResponseDto[]> {
    return this.favoriteCharacterService.obtenerFavoritos();
  }

  @ApiOperation({ summary: 'Obtener un personaje favorito por ID con su planeta de origen.' })
  @ApiResponse({
    status: 200,
    description: 'Personaje favorito obtenido exitosamente.',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Personaje favorito no encontrado.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID único del personaje favorito.',
    example: '10',
  })
  @Get(`${STARWARS_API_PERSONAJE_ROUTE}/:id`)
  async obtenerPersonaje(@Param('id') id: string): Promise<ISwapiResponse> {
    return this.favoriteCharacterService.obtenerPersonajeSWAPI(id);
  }
}
