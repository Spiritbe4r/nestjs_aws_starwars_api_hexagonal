//import { ISwapiPersonaje, ISwapiPlanet } from "src/adapters/external/swapi/swapi.types";

import { ISwapiPersonaje, ISwapiPlanet } from "src/infrastructure/adapters/external/swapi/swapi.types";

export interface ISwapiService {
  obtenerPersonaje(id: string): Promise<ISwapiPersonaje>;
  obtenerPlaneta(planetId: string): Promise<ISwapiPlanet>;
}
