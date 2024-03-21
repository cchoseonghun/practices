import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type EnvConfig = {
  project: {
    name: string;
  };
  server: {
    host: string;
    port: string;
  };
  system: {
    isLocal: boolean;
    isDevelopment: boolean;
    isStaging: boolean;
    isProduction: boolean;
  };
  mysql: {
    host: string;
    type: TypeOrmModuleOptions['type'];
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    access: {
      secret: string;
      expirationTime: string;
    };
  };
};

export default () =>
  ({
    project: {
      name: process.env.PROJECT_NAME || 'test-project',
    },
    server: {
      host: process.env.SERVER_HOST || 'localhost',
      port: process.env.SERVER_PORT || '3000',
    },
    system: {
      isLocal: process.env.SERVER_HOST === 'localhost',
      isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      isStaging: process.env.NODE_ENV === 'staging',
      isProduction: process.env.NODE_ENV === 'production',
    },
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USERNAME || 'username',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'database',
    },
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET || 'accesssecretkey',
        expirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME || '7d',
      },
    },
  } as EnvConfig);
