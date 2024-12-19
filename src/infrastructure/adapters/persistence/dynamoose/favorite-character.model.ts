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
      index: { // Índice Secundario Global (GSI)
        name: 'nombre-index', // Nombre del índice
        project: true, // Proyecta todos los atributos; ajusta según necesidad
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
