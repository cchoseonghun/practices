import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const systemConfig = configService.get('system');
        const mysqlConfig = configService.get('mysql');
        const entities = [
          Products, 
          Users
        ];

        return {
          type: 'mysql',
          host: mysqlConfig.host,
          port: mysqlConfig.port,
          username: mysqlConfig.username,
          password: mysqlConfig.password,
          database: mysqlConfig.database,
          logging: systemConfig.isLocal,
          synchronize: systemConfig.isLocal,
          namingStrategy: new SnakeNamingStrategy(),
          entities: entities,
          timezone: 'Z',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
