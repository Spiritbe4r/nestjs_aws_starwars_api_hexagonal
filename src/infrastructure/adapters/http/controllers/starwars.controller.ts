import { FavoritesUseCases } from './../../../../application/ports/input/favorites.use-cases';
import { FAVORITES_CHARACTER_USE_CASES_KEY, STARWARS_API_FAVORITES_ROUTE, STARWARS_API_PATH, STARWARS_API_PERSONAJE_ROUTE, STARWARS_SWAGGER_API_TAG } from './../../../../common/constants/constants';
import { FavoriteCharacterResponseDto } from '../../../../application/dto/favorite-character-response.dto';
import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CrearFavoritoDto } from '../../../../application/dto/crear-favorito.dto';
import { ISwapiResponse } from '../../external/swapi/swapi.types';

@ApiTags(STARWARS_SWAGGER_API_TAG)
@Controller(STARWARS_API_PATH)
export class StarwarsController {
  constructor(
    @Inject(FAVORITES_CHARACTER_USE_CASES_KEY)
    private readonly favoriteCharacterUseCases: FavoritesUseCases,
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
    return this.favoriteCharacterUseCases.createFavorite(crearFavoritoDto);
  }

  @ApiOperation({ summary: 'Obtener todos los personajes favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personajes favoritos obtenida exitosamente.',
    type: [FavoriteCharacterResponseDto],
  })
  @Get(STARWARS_API_FAVORITES_ROUTE)
  async obtenerFavoritos(): Promise<FavoriteCharacterResponseDto[]> {
    return this.favoriteCharacterUseCases.getFavorites();
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
    return this.favoriteCharacterUseCases.getSwapyCharacter(id);
  }
}
