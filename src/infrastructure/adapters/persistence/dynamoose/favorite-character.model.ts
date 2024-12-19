import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
const FavoriteCharacterSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    nombre: {
      type: String,
      index: { 
        name: 'nombre-index',
        project: true,
    },
      required: true,
    },
    planeta: {
      type: String,
      required: true,
    },
    tipo: {
      type: dynamoose.type.CONSTANT('user'),
    },
  },
  {
    timestamps: true,
  },
);

export const FavoriteCharacterModel = dynamoose.model(
  'Character',
  FavoriteCharacterSchema,
);
