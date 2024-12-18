/* eslint-disable @typescript-eslint/no-explicit-any */
import { CrearFavoritoDto } from 'src/application/dto/crear-favorito.dto';
import { FavoriteCharacterResponseDto } from 'src/application/dto/favorite-character-response.dto';

export interface FavoritesUseCases {
  createFavorite(data: CrearFavoritoDto): Promise<FavoriteCharacterResponseDto>;
  getFavorites(): Promise<FavoriteCharacterResponseDto[]>;
  getSwapyCharacter(id: string): Promise<any>;

}
