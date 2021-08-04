import { MigrationInterface, QueryRunner } from 'typeorm';
import { User, UserRole } from '../../user/entity/user.entity';
import * as bcrypt from 'bcrypt';

export class FillUserTableWithAdmins1627571530665 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(`user`)
      .values({
        login: `admin`,
        password: await bcrypt.hash(`admin_password`, 10),
        role: UserRole.ADMIN,
      } as User).execute();

    queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(`user`)
      .values({
        login: `moderator`,
        password: await bcrypt.hash(`moderator_password`, 10),
        role: UserRole.ADMIN,
      } as User).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner
      .manager
      .createQueryBuilder()
      .delete().from(`user`)
      .where(`login = :login1`)
      .orWhere(`login = :login2`)
      .setParameters({ login1: `admin`, login2: `moderator` })
      .execute();
  }

}
