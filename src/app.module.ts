import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StarwarsController } from './adapters/external/swapi/starwars.controller';
import { DynamooseRepository } from './adapters/persistence/dynamoose/dynamoose.repository';
import { FavoriteCharacterService } from './application/services/favorite-character.service';
import { SwapiService } from './adapters/external/swapi/swapi.service';
import { DynamooseConfig } from './infrastructure/config/dynamoose.config';

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
