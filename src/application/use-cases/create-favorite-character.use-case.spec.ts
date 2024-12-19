import { FavoriteCharacter } from './../../domain/entities/favorite-character.entity';
import { FAVORITES_CHARACTER_REPO_KEY } from './../../common/constants/constants';

import { Test, TestingModule } from '@nestjs/testing';
import { CreateFavoriteCharacterUseCase } from './create-favorite-character.use-case';

import { CrearFavoritoDto } from '../../application/dto/crear-favorito.dto';
import { FavoriteCharacterResponseDto } from '../../application/dto/favorite-character-response.dto';
import { IFavoriteCharacterRepository } from '../ports/output/repository.interface';

describe('CreateFavoriteCharacterUseCase', () => {
  let useCase: CreateFavoriteCharacterUseCase;
  let repository: IFavoriteCharacterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFavoriteCharacterUseCase,
        {
          provide: FAVORITES_CHARACTER_REPO_KEY,
          useValue: {
            crear: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateFavoriteCharacterUseCase>(CreateFavoriteCharacterUseCase);
    repository = module.get<IFavoriteCharacterRepository>(FAVORITES_CHARACTER_REPO_KEY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a favorite character', async () => {
    const dto: CrearFavoritoDto = {
      nombre: 'Luke Skywalker',
      planeta: 'Tatooine',
    };

    const expectedResponse: FavoriteCharacterResponseDto = {
      id: '1',
      nombre: 'Luke Skywalker',
      planeta: 'Tatooine',
    };

    const favoriteCharacter = new FavoriteCharacter(
      '1',
      'Luke Skywalker',
      'Tatooine',
    );

    (repository.crear as jest.Mock).mockResolvedValue(favoriteCharacter);

    const result = await useCase.execute(dto);

    expect(repository.crear).toHaveBeenCalledWith(expect.any(FavoriteCharacter));
    expect(result).toEqual(expectedResponse);
  });
});
