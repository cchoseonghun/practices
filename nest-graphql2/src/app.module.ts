import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    RestaurantsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true, 
      driver: ApolloDriver,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
