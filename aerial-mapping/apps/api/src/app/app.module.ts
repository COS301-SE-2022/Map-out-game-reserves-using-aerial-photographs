import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@aerial-mapping/api/shell/feature';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, GraphQLISODateTime } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ApiShellFeatureModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLISODateTime},
      driver: ApolloDriver
    })
  ],
  providers: [],
})
export class AppModule {}
