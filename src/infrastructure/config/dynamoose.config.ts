import * as dynamoose from 'dynamoose';
import { ConfigService } from '@nestjs/config';

export const DynamooseConfig = (configService: ConfigService) => {
  const region = configService.get<string>('AWS_RGN') || 'us-east-2';

  const ddb = new dynamoose.aws.ddb.DynamoDB({
    region,
    //endpoint,
    credentials: {
      accessKeyId:
        configService.get<string>('AWS_ACS_KEY_ID') || 'fakeAccessKeyId',
      secretAccessKey:
        configService.get<string>('AWS_SECRET_ACS_KEY') ||
        'fakeSecretAccessKey',
    },
  });

  dynamoose.aws.ddb.set(ddb);
};
