import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@aerial-mapping/api/shell/feature';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ApiShellFeatureModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver
    })
  ],
  providers: [],
})
export class AppModule {}
