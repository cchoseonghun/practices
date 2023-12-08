import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './users/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,     //스키마를 메모리에서 즉시 생성
      sortSchema: true,         //스키마를 사전 순으로 정렬
      debug: true,              //디버그 모드 끄고싶을때 false
      playground: true,         //playground 끄고싶을때 false
      driver: ApolloDriver,
      // autoSchemaFile: 'src/common/graphql/schema.gql', 
    }),
    // UsersModule,
    // TypeOrmModule.forRoot({
		// 	type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '3999',
    //   database: 'graphqltest',
    //   synchronize: true,
		// 	entities: [],
    // })
  ],
  providers: [UsersResolver],
})
export class AppModule {}