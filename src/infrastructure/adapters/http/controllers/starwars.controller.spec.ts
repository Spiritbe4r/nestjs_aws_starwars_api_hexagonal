/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { StarwarsController } from './starwars.controller';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IFavoriteCharacterRepository } from 'src/application/ports/repository.interface';
import { ISwapiService } from 'src/application/ports/swapi.interface';
import { FavoriteCharacterService } from 'src/application/services/favorite-character.service';

import { FavoriteCharacter } from 'src/domain/entities/favorite-character.entity';
import { FavoriteCharacterMapper } from 'src/application/mappers/favorite-character.mapper';
import { CrearFavoritoDto } from '../dto/crear-favorito.dto';
import { FavoriteCharacterResponseDto } from '../dto/favorite-character-response.dto';

export const mockRepository: Partial<IFavoriteCharacterRepository> = {
  crear: jest.fn(),
  obtenerTodos: jest.fn(),
};

export const mockSwapiService: Partial<ISwapiService> = {
  obtenerPersonaje: jest.fn().mockResolvedValue({
    id: '2f14bce7-c394-4cbf-8629-6655a9f94021',
    nombre: 'Luke Skywalker',
    planeta: 'Tatooine',
  }),
};

export const mockFavoriteCharacterService: Partial<FavoriteCharacterService> = {
  crearFavorito: jest.fn(),
  obtenerFavoritos: jest.fn(),
  obtenerPersonajeSWAPI: jest.fn(),
};

describe('StarwarsController', () => {
  let controller: StarwarsController;
  let service: FavoriteCharacterService;
  let swapiService: ISwapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarwarsController],
      providers: [
        {
          provide: FavoriteCharacterService,
          useValue: mockFavoriteCharacterService,
        },
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

    controller = module.get<StarwarsController>(StarwarsController);
    service = module.get<FavoriteCharacterService>(FavoriteCharacterService);
    swapiService = module.get<ISwapiService>('SwapiInterface');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Debe crear un personaje favorito y retornar el DTO de respuesta', async () => {
    const createDto: CrearFavoritoDto = {
      nombre: 'Luke Skywalker',
      planeta: 'Tatooine',
    };

    const createdEntity: FavoriteCharacter = new FavoriteCharacter(
      '2f14bce7-c394-4cbf-8629-6655a9f94021',
      'Luke Skywalker',
      'Tatooine',
      new Date(),
      new Date(),
    );

    const responseDto = FavoriteCharacterMapper.toResponseDto(createdEntity);

    (service.crearFavorito as jest.Mock).mockResolvedValue(createdEntity);

    const result = await controller.crearFavorito(createDto);

    expect(service.crearFavorito).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(responseDto);
  });

  describe('obtenerTodosFavoritos', () => {
    it('Debe retornar un array de DTO de personajes favoritos ', async () => {
      const favoriteCharacters: FavoriteCharacter[] = [
        new FavoriteCharacter(
          '2f14bce7-c394-4cbf-8629-6655a9f94021',
          'Luke Skywalker',
          'Tatooine',
          new Date(),
          new Date(),
        ),
        new FavoriteCharacter(
          '2f14bce7-c394-4cbf-8629-6655a9f940212',
          'Leia Organa',
          'Alderaan',
          new Date(),
          new Date(),
        ),
      ];

      const responseDtos: FavoriteCharacterResponseDto[] =
        favoriteCharacters.map((entity) =>
          FavoriteCharacterMapper.toResponseDto(entity),
        );

      (service.obtenerFavoritos as jest.Mock).mockResolvedValue(responseDtos);

      const result = await controller.obtenerFavoritos();

      expect(service.obtenerFavoritos).toHaveBeenCalled();
      expect(result).toEqual(responseDtos);
    });

    it('debe lanzasr un InternalServerErrorException cuando el servicio obtenerTodosFavoritos lanza una excepción', async () => {
      (service.obtenerFavoritos as jest.Mock).mockRejectedValue(
        new BadRequestException('Error al obtener todos'),
      );

      await expect(controller.obtenerFavoritos()).rejects.toThrow(
        BadRequestException,
      );

      expect(service.obtenerFavoritos).toHaveBeenCalled();
    });
  });

  describe('obtenerFavoritoPorId', () => {
    it('debe retornar un personaje favorito DTO cuando se encuentre', async () => {
      const favorito: FavoriteCharacterResponseDto = {
        id: '1',
        nombre: 'Luke Skywalker',
        planeta: 'Tatooine',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (service.obtenerPersonajeSWAPI as jest.Mock).mockResolvedValue(favorito);

      const result = await controller.obtenerPersonaje('1');

      expect(service.obtenerPersonajeSWAPI).toHaveBeenCalledWith('1');
      expect(result).toEqual(favorito);
    });

    it('debe lanzar NotFoundException cuando el personaje favorito no se encuentra', async () => {
      (service.obtenerPersonajeSWAPI as jest.Mock).mockRejectedValue(
        new NotFoundException('Error al obtener todos'),
      );

      await expect(
        controller.obtenerPersonaje('non-existing-id'),
      ).rejects.toThrow(NotFoundException);

      expect(service.obtenerPersonajeSWAPI).toHaveBeenCalledWith(
        'non-existing-id',
      );
    });
  });
});
