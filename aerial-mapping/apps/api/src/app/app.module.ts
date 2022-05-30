import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@aerial-mapping/api/shell/feature';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, GraphQLISODateTime } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { LoginRepositoryModule } from '@aerial-mapping/api/login/repository/data-access';

@Module({
  imports: [
    ApiShellFeatureModule,
    LoginRepositoryModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLISODateTime},
      context: ({ req, res }) => ({ headers: req.headers, res }),
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: 'http://localhost:4200'
      },
      playground: {
        settings: {
          'request.credentials': 'same-origin',
        },
      }
    })
  ],
  providers: [],
})
export class AppModule {}
