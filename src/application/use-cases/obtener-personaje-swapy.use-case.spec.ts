
import { Test, TestingModule } from '@nestjs/testing';
import { GetSwapyCharacterUseCase } from './obtener-personaje-swapy.use-case';
import { ISwapiService } from '../ports/output/swapi.interface';
import { SwapiService } from '../../infrastructure/adapters/external/swapi/swapi.service';

describe('GetSwapyCharacterUseCase', () => {
    let useCase: GetSwapyCharacterUseCase;
    let swapiService: ISwapiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetSwapyCharacterUseCase,
                {
                    provide: 'SwapiInterface',
                    useValue: {
                        obtenerPersonaje: jest.fn(),
                        obtenerPlaneta: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<GetSwapyCharacterUseCase>(GetSwapyCharacterUseCase);
        swapiService = module.get<SwapiService>('SwapiInterface');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should return a SwapyCharacterDto', async () => {
        const id = '1';
        const swapyCharacter = {

            "nombre": "Luke Skywalker",
            "altura": "172",
            "masa": "77",
            "color_de_cabello": "blond",
            "color_de_piel": "fair",
            "color_de_ojos": "blue",
            "anio_de_nacimiento": "19BBY",
            "genero": "male",
            "mundo_natal": "https://swapi.info/api/planets/1",
        };

        (swapiService.obtenerPersonaje as jest.Mock).mockResolvedValue(swapyCharacter);

        const result = await useCase.execute(id);

        expect(swapiService.obtenerPersonaje).toHaveBeenCalledWith(id);
        expect(result).toEqual(swapyCharacter);
    });
});
