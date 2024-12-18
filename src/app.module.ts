import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FavoriteCharacterService } from './application/services/favorite-character.service';

import { DynamooseConfig } from './infrastructure/config/dynamoose.config';
import { SwapiService } from './infrastructure/adapters/external/swapi/swapi.service';
import { DynamooseRepository } from './infrastructure/adapters/persistence/dynamoose/dynamoose.repository';
import { StarwarsController } from './infrastructure/adapters/http/controllers/starwars.controller';

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
    FavoriteCharacterService,
    SwapiService,
    {
      provide: 'SwapiInterface',
      useClass: SwapiService,
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    DynamooseConfig(this.configService);
  }
}
