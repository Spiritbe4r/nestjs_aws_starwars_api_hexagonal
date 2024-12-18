// src/domain/use-cases/create-favorite-character.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { FavoriteCharacter } from 'src/domain/entities/favorite-character.entity';
import { CrearFavoritoDto } from 'src/application/dto/crear-favorito.dto';
import { FavoriteCharacterMapper } from '../mappers/favorite-character.mapper';
import { FAVORITES_CHARACTER_REPO_KEY } from 'src/common/constants/constants';
import { IFavoriteCharacterRepository } from '../ports/output/repository.interface';

@Injectable()
export class CreateFavoriteCharacterUseCase {
  constructor(
    @Inject(FAVORITES_CHARACTER_REPO_KEY)
    private readonly repository: IFavoriteCharacterRepository,
  ) {}

  async execute(dto: CrearFavoritoDto): Promise<FavoriteCharacter> {
    const character = FavoriteCharacterMapper.toDomainEntity(dto);
    await this.repository.crear(character);
    return character;
  }
}
