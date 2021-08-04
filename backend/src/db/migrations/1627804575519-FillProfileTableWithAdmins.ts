import { Profile } from '../../user/entity/profile.entity';
import { User, UserRole } from '../../user/entity/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

interface UserTextRow {
    user_id: number,
    user_login: string,
    user_password: string,
    user_role: UserRole
}

const getAdmins = async (queryRunner: QueryRunner): Promise<UserTextRow[]> => {
    return await queryRunner
      .manager
      .createQueryBuilder()
      .select(`user`)
      .from(User, `user`)
      .where(`role = :role`, { role: UserRole.ADMIN })
      .execute();
};

export class FillProfileTableWithAdmins1627804575519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const admins = await getAdmins(queryRunner);

        await queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into(Profile)
          .values({
              user_id: admins[0][`user_id`],
              email: `admin1@tradeoffer.ru`,
              firstName: `Admin 1`,
              phone: `8005553535`,
              birthday: new Date(`01.01.1990`),
          }).execute();

        await queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into(Profile)
          .values({
              user_id: admins[1][`user_id`],
              email: `admin2@tradeoffer.ru`,
              firstName: `Admin 2`,
              phone: `8005553535`,
              birthday: new Date(`01.01.1990`),
          }).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const admins = await getAdmins(queryRunner);

        await queryRunner
          .manager
          .createQueryBuilder()
          .delete().from(Profile)
          .where(`user_id = :id1`)
          .orWhere(`user_id = :id2`)
          .setParameters({ id1: admins[0][`user_id`], id2: admins[1][`user_id`] })
          .execute();
    }

}
