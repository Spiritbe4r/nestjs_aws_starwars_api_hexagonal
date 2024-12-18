import { FavoriteCharacterResponseDto } from '../dto/favorite-character-response.dto';
import { FavoriteCharacterMapper } from "../mappers/favorite-character.mapper";
import { Inject, Injectable } from '@nestjs/common';
import { FAVORITES_CHARACTER_REPO_KEY } from '../../common/constants/constants';
import { IFavoriteCharacterRepository } from '../ports/output/repository.interface';

@Injectable()
export class GetFavoriteCharactersUseCase {
  constructor(
    @Inject(FAVORITES_CHARACTER_REPO_KEY)
    private readonly repository: IFavoriteCharacterRepository,
  ) {}

  async execute(): Promise<FavoriteCharacterResponseDto[]> {
   
    const characters =await this.repository.obtenerTodos();
    return characters.map(x=> FavoriteCharacterMapper.toResponseDto(x));
  }
}
