import { IFavoriteCharacterRepository } from '../../../application/ports/repository.interface';
import { FavoriteCharacter } from '../../../domain/entities/favorite-character.entity';
import { Injectable } from '@nestjs/common';
import { FavoriteCharacterModel } from './favorite-character.model';

@Injectable()
export class DynamooseRepository implements IFavoriteCharacterRepository {

  /**
 * Crea un personaje favorito en la base de datos dynamo db mediante dynamoose.
 * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
 * @param favoriteCharacter entidad de Dominio.
 * @returns FavoriteCharacter dentidad de dominio
 */
  async crear(
    favoriteCharacter: FavoriteCharacter,
  ): Promise<FavoriteCharacter> {
    try {
      const creado = await FavoriteCharacterModel.create({
        nombre: favoriteCharacter.nombre,
        planeta: favoriteCharacter.planeta,
      });
      return new FavoriteCharacter(
        creado.id,
        creado.nombre,
        creado.planeta,
        creado.createdAt,
        creado.updatedAt,
      );
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear Favorito');
    }
  }
  /**
   * Lista todos los personajes favoritos de la base de datos dynamo db mediante dynamoose.
   * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
   * @returns List de FavoriteCharacter entidad de dominio
   */
  async obtenerTodos(): Promise<FavoriteCharacter[]> {
    const items = await FavoriteCharacterModel.scan().exec();
    return items.map(
      (item) =>
        new FavoriteCharacter(
          item.id,
          item.nombre,
          item.planeta,
          item.createdAt,
          item.updatedAt,
        ),
    );
  }
}
