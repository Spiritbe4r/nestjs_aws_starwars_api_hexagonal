/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateFavoriteCharacterUseCase } from './../../use-cases/create-favorite-character.use-case';
import { Injectable } from '@nestjs/common';
import { FavoritesUseCases } from './favorites.use-cases';
import { GetFavoriteCharactersUseCase } from '../../../application/use-cases/obtener-favorite-characters.use-case';
import { GetSwapyCharacterUseCase } from '../../../application/use-cases/obtener-personaje-swapy.use-case';
import { FavoriteCharacterResponseDto } from '../../../application/dto/favorite-character-response.dto';
import { CrearFavoritoDto } from '../../../application/dto/crear-favorito.dto';
import { ISwapiResponse } from '../../../infrastructure/adapters/external/swapi/swapi.types';


@Injectable()
export class FavoritesUseCasesImpl implements FavoritesUseCases {
  constructor(
    private readonly createFavoriteCharacterUseCase: CreateFavoriteCharacterUseCase,
    private readonly getFavoriteCharactersUseCase: GetFavoriteCharactersUseCase,
    private readonly getSwapyCharacterUseCase: GetSwapyCharacterUseCase
  ) { }
  async createFavorite(data: CrearFavoritoDto): Promise<FavoriteCharacterResponseDto> {
    
    return await this.createFavoriteCharacterUseCase.execute(data);
  }
  async getFavorites(): Promise<FavoriteCharacterResponseDto[]> {
    return await this.getFavoriteCharactersUseCase.execute();
  }
  async getSwapyCharacter(id: string): Promise<ISwapiResponse> {
    return await this.getSwapyCharacterUseCase.execute(id);
  }

}
