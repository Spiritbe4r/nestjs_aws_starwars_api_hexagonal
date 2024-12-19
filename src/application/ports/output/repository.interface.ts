import { FavoriteCharacter } from '../../../domain/entities/favorite-character.entity';

export interface IFavoriteCharacterRepository {
  crear(favoriteCharacter: FavoriteCharacter): Promise<FavoriteCharacter>;
  obtenerTodos(): Promise<FavoriteCharacter[]>;
  obtenerPersonajePorName(nombre: string): Promise<FavoriteCharacter>;
}
