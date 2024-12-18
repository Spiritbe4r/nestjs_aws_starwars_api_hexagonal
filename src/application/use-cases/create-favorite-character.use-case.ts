// src/domain/use-cases/create-favorite-character.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { FavoriteCharacter } from '../../domain/entities/favorite-character.entity';
import { CrearFavoritoDto } from '../../application/dto/crear-favorito.dto';
import { FavoriteCharacterMapper } from '../mappers/favorite-character.mapper';
import { FAVORITES_CHARACTER_REPO_KEY } from '../../common/constants/constants';
import { IFavoriteCharacterRepository } from '../ports/output/repository.interface';
import { FavoriteCharacterResponseDto } from '../dto/favorite-character-response.dto';

@Injectable()
export class CreateFavoriteCharacterUseCase {
  constructor(
    @Inject(FAVORITES_CHARACTER_REPO_KEY)
    private readonly repository: IFavoriteCharacterRepository,
  ) {}

  async execute(dto: CrearFavoritoDto): Promise<FavoriteCharacterResponseDto> {
    const characterData = FavoriteCharacterMapper.toDomainEntity(dto);
    const character = await this.repository.crear(characterData);

    return FavoriteCharacterMapper.toResponseDto(character);
  }
}
