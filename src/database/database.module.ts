import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from './entities/user.orm-entity';
import { RechargeTransactionOrmEntity } from './entities/recharge-transaction.orm-entity';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        entities: [
          UserOrmEntity,
          RechargeTransactionOrmEntity,
        ],

        synchronize: false,
        logging: true,
        migrationsRun: true,

        migrations: [
          path.join(__dirname, 'migrations', '*{.ts,.js}'),
        ],
      }),
    }),
  ],
})
export class DatabaseModule {}
