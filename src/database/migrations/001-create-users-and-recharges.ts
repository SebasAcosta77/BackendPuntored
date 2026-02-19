import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndRecharges1708263000000
  implements MigrationInterface {

  name = 'CreateUsersAndRecharges1708263000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true
      );
    `);

    await queryRunner.query(`
      CREATE TABLE recharge_transactions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        phone_number VARCHAR(10) NOT NULL,
        amount INTEGER NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id UUID,
        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE SET NULL
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE recharge_transactions');
    await queryRunner.query('DROP TABLE users');
  }
}
