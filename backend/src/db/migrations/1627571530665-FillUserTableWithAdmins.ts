import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../../user/entity/user.entity';
import * as bcrypt from 'bcrypt';

export class FillUserTableWithAdmins1627571530665 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO user (login, password, role)
                             VALUES (?, ?, ?)`, [`admin`, await bcrypt.hash(`admin_password`, 10), UserRole.ADMIN]);

    await queryRunner.query(`INSERT INTO user (login, password, role)
                             VALUES (?, ?, ?)`, [`moderator`, await bcrypt.hash(`admin_password`, 10), UserRole.ADMIN]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user 
                             WHERE login=? or login=?`, [`moderator`, `admin`]);
  }

}
