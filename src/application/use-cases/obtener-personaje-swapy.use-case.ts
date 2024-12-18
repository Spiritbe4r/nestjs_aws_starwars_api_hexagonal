import { ISwapiResponse } from './../../infrastructure/adapters/external/swapi/swapi.types';
import { Inject, Injectable } from "@nestjs/common";
import { SWAPI_SERVICE_KEY } from "src/common/constants/constants";
import { ISwapiService } from "../ports/output/swapi.interface";

@Injectable()
export class GetSwapyCharacterUseCase {
    constructor(

        @Inject(SWAPI_SERVICE_KEY) private readonly swapiService: ISwapiService,
    ) { }

    async execute(id: string): Promise<ISwapiResponse> {
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
