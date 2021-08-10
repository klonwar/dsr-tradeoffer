import {MigrationInterface, QueryRunner} from "typeorm";

export class SetOnDeleteScenariosForItem1628603298505 implements MigrationInterface {
    name = 'SetOnDeleteScenariosForItem1628603298505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `items_to_photos` DROP FOREIGN KEY `FK_b0e731fd58e19cf8b1b7aba4098`");
        await queryRunner.query("ALTER TABLE `items_to_photos` ADD CONSTRAINT `FK_b3eb27f1bbc387b4c50ca06bb7a` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `items_to_photos` ADD CONSTRAINT `FK_b0e731fd58e19cf8b1b7aba4098` FOREIGN KEY (`photo_id`) REFERENCES `photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `items_to_photos` DROP FOREIGN KEY `FK_b0e731fd58e19cf8b1b7aba4098`");
        await queryRunner.query("ALTER TABLE `items_to_photos` DROP FOREIGN KEY `FK_b3eb27f1bbc387b4c50ca06bb7a`");
        await queryRunner.query("ALTER TABLE `items_to_photos` ADD CONSTRAINT `FK_b0e731fd58e19cf8b1b7aba4098` FOREIGN KEY (`photo_id`) REFERENCES `photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

}
