import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { DynamooseConfig } from './infrastructure/config/dynamoose.config';
import { SwapiService } from './infrastructure/adapters/external/swapi/swapi.service';
import { DynamooseRepository } from './infrastructure/adapters/persistence/dynamoose/dynamoose.repository';
import { StarwarsController } from './infrastructure/adapters/http/controllers/starwars.controller';
import { CreateFavoriteCharacterUseCase } from './application/use-cases/create-favorite-character.use-case';
import { GetFavoriteCharactersUseCase } from './application/use-cases/obtener-favorite-characters.use-case';
import { GetSwapyCharacterUseCase } from './application/use-cases/obtener-personaje-swapy.use-case';
import { FavoritesUseCasesImpl } from './application/ports/input/favorites-use-cases-impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [StarwarsController],
  providers: [
    {
      provide: 'FavoriteCharacterRepository',
      useClass: DynamooseRepository,
    },
    {
      provide: 'SwapiInterface',
      useClass: SwapiService,
    },
    {
      provide: CreateFavoriteCharacterUseCase,
      useFactory: (repo: DynamooseRepository) => new CreateFavoriteCharacterUseCase(repo),
      inject: ['FavoriteCharacterRepository'],
    },
    {
      provide: GetFavoriteCharactersUseCase,
      useFactory: (repo: DynamooseRepository) => new GetFavoriteCharactersUseCase(repo),
      inject: ['FavoriteCharacterRepository'],
    },
    {
      provide: GetSwapyCharacterUseCase,
      useFactory: (service: SwapiService) => new GetSwapyCharacterUseCase(service),
      inject: ['SwapiInterface'],
    },
    {
      provide: 'FavoritesUseCases',
      useClass: FavoritesUseCasesImpl,
    },
  ],
  exports: ['FavoritesUseCases'],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    DynamooseConfig(this.configService);
  }
}
