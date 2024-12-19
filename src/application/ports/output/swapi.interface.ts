import { ISwapiPersonaje, ISwapiPlanet } from "../../../infrastructure/adapters/external/swapi/swapi.types";

export interface ISwapiService {
  obtenerPersonaje(id: string): Promise<ISwapiPersonaje>;
  obtenerPlaneta(planetId: string): Promise<ISwapiPlanet>;
}
