import { CrearFavoritoDto } from './../../infrastructure/adapters/http/dto/crear-favorito.dto';
import { FavoriteCharacterResponseDto } from './../../infrastructure/adapters/http/dto/favorite-character-response.dto';
import { FavoriteCharacter } from '../../domain/entities/favorite-character.entity';

export class FavoriteCharacterMapper {
  /**
   * Convierte una entidad de dominio a un DTO de respuesta.
   * @param entity Entidad de dominio.
   * @returns DTO de respuesta.
   */
  static toResponseDto(
    entity: FavoriteCharacter,
  ): FavoriteCharacterResponseDto {
    const dto = new FavoriteCharacterResponseDto();
    dto.id = entity.id;
    dto.nombre = entity.nombre;
    dto.planeta = entity.planeta;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  /**
   * Convierte un DTO de creación a una entidad de dominio.
   * @param dto DTO de creación.
   * @returns Entidad de dominio.
   */
  static toDomainEntity(dto: CrearFavoritoDto): FavoriteCharacter {
    const entity = new FavoriteCharacter(null, dto.nombre, dto.planeta);

    return entity;
  }
}
