/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { CrearFavoritoDto } from 'src/infrastructure/http/dto/crear-favorito.dto';
import { DynamooseRepository } from './dynamoose.repository';
import { FavoriteCharacter } from '../../../domain/entities/favorite-character.entity';

jest.mock('./favorite-character.model', () => ({
  FavoriteCharacterModel: {
    create: jest.fn(),
    scan: jest.fn(() => ({
      exec: jest.fn(),
    })),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('DynamooseRepository', () => {
  let repository: DynamooseRepository;
  let modelMock: any;

  beforeEach(() => {
    modelMock = require('./favorite-character.model').FavoriteCharacterModel;

    repository = new DynamooseRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('crear', () => {
    it('deber crear un personaje favorito satisfactoriamente', async () => {
      const crearFavoritoDto: CrearFavoritoDto = {
        nombre: 'Luke Skywalker',
        planeta: 'Tatooine',
      };

      const favoriteCharacter: FavoriteCharacter = {
        id: '2f14bce7-c394-4cbf-8629-6655a9f94021',
        nombre: crearFavoritoDto.nombre,
        planeta: crearFavoritoDto.planeta,
      };

      const createdCharacter: FavoriteCharacter = {
        ...favoriteCharacter,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      modelMock.create.mockResolvedValue(createdCharacter);

      const result = await repository.crear(favoriteCharacter);

      expect(modelMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: favoriteCharacter.id,
          nombre: favoriteCharacter.nombre,
          planeta: favoriteCharacter.planeta,
        }),
      );
      expect(result).toEqual(createdCharacter);
    });

    it('debe lanzar  InternalServerErrorException cuando crear falla', async () => {
      const favoriteCharacter: FavoriteCharacter = {
        id: '2f14bce7-c394-4cbf-8629-6655a9f94021',
        nombre: 'Luke Skywalker',
        planeta: 'Tatooine',
      };

      modelMock.create.mockRejectedValue(new Error('Database error'));

      await expect(repository.crear(favoriteCharacter)).rejects.toThrow(Error);

      expect(modelMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: favoriteCharacter.id,
          nombre: favoriteCharacter.nombre,
          planeta: favoriteCharacter.planeta,
        }),
      );
    });
  });

  describe('obtenerTodos', () => {
    it('debe retornar todos personajes favoritos satisfactoriamente', async () => {
      const favoriteCharacters: FavoriteCharacter[] = [
        {
          id: '2f14bce7-c394-4cbf-8629-6655a9f94021',
          nombre: 'Luke Skywalker',
          planeta: 'Tatooine',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2f14bce7-c394-4cbf-8629-6655a9f94022',
          nombre: 'Leia Organa',
          planeta: 'Alderaan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const execMock = jest.fn().mockResolvedValue(favoriteCharacters);
      modelMock.scan.mockReturnValue({ exec: execMock });

      const result = await repository.obtenerTodos();

      expect(modelMock.scan).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(favoriteCharacters);
    });

    it('debe retornar InternalServerErrorException cuando obtenerTodos falla', async () => {
      const execMock = jest.fn().mockRejectedValue(new Error('Database error'));
      modelMock.scan.mockReturnValue({ exec: execMock });

      await expect(repository.obtenerTodos()).rejects.toThrow(Error);

      expect(modelMock.scan).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalled();
    });
  });
});
