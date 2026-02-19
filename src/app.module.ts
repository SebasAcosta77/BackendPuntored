import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { RechargesModule } from './modules/recharges/recharges.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath:".env"}), DatabaseModule, AuthModule, RechargesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
