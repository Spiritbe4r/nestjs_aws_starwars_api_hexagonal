import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteCharacterService } from './favorite-character.service';
import { IFavoriteCharacterRepository } from '../ports/repository.interface';
import { FavoriteCharacter } from '../../domain/entities/favorite-character.entity';
import { FavoriteCharacterMapper } from '../mappers/favorite-character.mapper';
import { CrearFavoritoDto } from '../dto/crear-favorito.dto';
import { ISwapiService } from '../ports/swapi.interface';

export const mockSwapiService: Partial<ISwapiService> = {
  obtenerPersonaje: jest.fn().mockResolvedValue({
    id: '2f14bce7-c394-4cbf-8629-6655a9f94021',
    nombre: 'Luke Skywalker',
    planeta: 'Tatooine',
  }),
};

describe('FavoriteCharacterService', () => {
  let service: FavoriteCharacterService;
  let repository: IFavoriteCharacterRepository;

  const mockRepository: Partial<IFavoriteCharacterRepository> = {
    crear: jest.fn(),
    obtenerTodos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteCharacterService,
        {
          provide: 'FavoriteCharacterRepository',
          useValue: mockRepository,
        },
        {
          provide: 'SwapiInterface',
          useValue: mockSwapiService,
        },
      ],
    }).compile();

    service = module.get<FavoriteCharacterService>(FavoriteCharacterService);
    repository = module.get<IFavoriteCharacterRepository>(
      'FavoriteCharacterRepository',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe crear un personaje favorito satisfactoriamente', async () => {
    const createDto: CrearFavoritoDto = {
      nombre: 'Luke Skywalker',
      planeta: 'Tatooine',
    };

    const domainEntity = FavoriteCharacterMapper.toDomainEntity(createDto);

    const createdEntity: FavoriteCharacter = {
      ...domainEntity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (repository.crear as jest.Mock).mockResolvedValue(createdEntity);

    const result = await service.crearFavorito(createDto);

    expect(repository.crear).toHaveBeenCalledWith(domainEntity);
    expect(result).toEqual(createdEntity);
  });

  it('debe retornar un array de personajes favoritos', async () => {
    const favoriteCharacters: FavoriteCharacter[] = [
      new FavoriteCharacter(
        '2f14bce7-c394-4cbf-8629-6655a9f94021',
        'Luke Skywalker',
        'Tatooine',
        new Date(),
        new Date(),
      ),
      new FavoriteCharacter(
        '2f14bce7-c394-4cbf-8629-6655a9f94022',
        'Leia Organa',
        'Alderaan',
        new Date(),
        new Date(),
      ),
    ];

    (repository.obtenerTodos as jest.Mock).mockResolvedValue(
      favoriteCharacters,
    );

    const result = await service.obtenerFavoritos();

    expect(repository.obtenerTodos).toHaveBeenCalled();
    expect(result).toEqual(favoriteCharacters);
  });
});
