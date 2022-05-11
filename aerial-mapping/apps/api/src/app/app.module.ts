import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@aerial-mapping/api/shell/feature';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApiShellFeatureModule, ConfigModule.forRoot()]
})
export class AppModule {}
