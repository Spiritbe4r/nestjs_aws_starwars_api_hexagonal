import { CrearFavoritoDto } from './../dto/crear-favorito.dto';
import { Injectable, Inject } from '@nestjs/common';
import { IFavoriteCharacterRepository } from '../ports/repository.interface';
import { ISwapiService } from '../ports/swapi.interface';
import { FavoriteCharacterResponseDto } from '../dto/favorite-character-response.dto';
import { FavoriteCharacterMapper } from '../mappers/favorite-character.mapper';
import { ISwapiResponse } from '../../adapters/external/swapi/swapi.types';
import { FAVORITES_CHARACTER_REPO_KEY, SWAPI_SERVICE_KEY } from '../../common/constants/constants';

@Injectable()
export class FavoriteCharacterService {
  constructor(
    @Inject(FAVORITES_CHARACTER_REPO_KEY)
    private readonly repository: IFavoriteCharacterRepository,
    @Inject(SWAPI_SERVICE_KEY) private readonly swapiService: ISwapiService,
  ) { }

  /**
   * Crea un personaje favorito en la base de datos dynamo db.
   * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
   * @param crearFavoritoDto DTO de creación.
   * @returns FavoriteCharacterResponseDto DTO de respuesta
   */
  public async crearFavorito(
    crearFavoritoDto: CrearFavoritoDto,
  ): Promise<FavoriteCharacterResponseDto> {
    const nuevoFavorito =
      FavoriteCharacterMapper.toDomainEntity(crearFavoritoDto);

    const favoritoCreado = await this.repository.crear(nuevoFavorito);
    return FavoriteCharacterMapper.toResponseDto(favoritoCreado);
  }


  /**
    * Consulta a la api de SWAPI para obtener el personaje y la planeta.
    * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
    * @returns FavoriteCharacterResponseDto[] DTO de respuesta es la lista de personajes favoritos que viene desde Dynamo Db. 
    */
  async obtenerFavoritos(): Promise<FavoriteCharacterResponseDto[]> {
    return (await this.repository.obtenerTodos()).map((item) =>
      FavoriteCharacterMapper.toResponseDto(item),
    );
  }

  /**
   * Consulta a la api de SWAPI para obtener el personaje y la planeta.
   * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
   * @param id Entidad de dominio.
   * @returns ISwapiResponse DTO de respuesta es una combinacion del response de la api de  
   * Personajes de SWAPI y la informacion de la planeta de SWAPI.
   */
  async obtenerPersonajeSWAPI(id: string): Promise<ISwapiResponse> {
    const personaje = await this.swapiService.obtenerPersonaje(id);

    const planeta = await this.swapiService.obtenerPlaneta(
      personaje?.mundo_natal,
    );

    return {
      ...personaje,
      planeta,
    } as unknown as ISwapiResponse;
  }
}
