import { ISwapiService } from '../../../application/ports/swapi.interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { ISwapiCharacter, ISwapiPersonaje, ISwapiPlanet } from './swapi.types';

@Injectable()
export class SwapiService implements ISwapiService {
  private logger = new Logger('SwapiService');
  private readonly swapiUrl = process.env.SWAPI_ENDPOINT;

  
  /**
 * Obtiene la informacion de un personaje de SWAPI y mapea los datos de SWAPI a una interfaz con campos en español.
 * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
 * @param id id de personaje de SWAPI.
 * @returns ISwapiPersonaje interfaz para mapear la Respuesta de SWAPI.
 * @throws NotFoundException cuando no se encuentra la informacion de personaje , swapi tambien lanza un codigo 404.
 */
  async obtenerPersonaje(id: string): Promise<ISwapiPersonaje> {
    try {
      const response = await axios.get(`${this.swapiUrl}/people/${id}/`);
      const data = response.data as ISwapiCharacter;

      const mapeo: { [key: string]: string } = {
        name: 'nombre',
        height: 'altura',
        mass: 'masa',
        hair_color: 'color_de_cabello',
        skin_color: 'color_de_piel',
        eye_color: 'color_de_ojos',
        birth_year: 'anio_de_nacimiento',
        gender: 'genero',
        homeworld: 'mundo_natal',
        films: 'peliculas',
        species: 'especies',
        vehicles: 'vehiculos',
        starships: 'naves_espaciales',
        created: 'creado',
        edited: 'editado',
      };

      const dataMapeada = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [mapeo[key] || key, value])
      ) as unknown as ISwapiPersonaje;

      return dataMapeada;
    } catch (error) {
      this.logger.error('Error al obtener personaje de SWAPI', error.message);
      throw new NotFoundException('Error al obtener personaje de SWAPI');
    }
  }

  
  /**
 * Obtiene la informacion de la planeta de SWAPI.
 * @autor Elvin ronal Cardenas Calcina <cardenascode7@gmail.com>
 * @param planetRoute ruta de SWAPI para obtener la informacion de la planeta, viene 
 * de la respuesta de la Api de consultar Personaje campo mundo_natal.
 * @returns ISwapiPlanet interfaz para la Respuesta de SWAPI o null si no se encuentra la informacion de la planeta.
 */
  async obtenerPlaneta(planetRoute: string): Promise<ISwapiPlanet> {
    try {
      const response = await axios.get(planetRoute);
      return response.data as ISwapiPlanet;
    } catch (error) {
      this.logger.error('Error al obtener planeta de SWAPI', error.message);
      return null;
    }
  }
}
