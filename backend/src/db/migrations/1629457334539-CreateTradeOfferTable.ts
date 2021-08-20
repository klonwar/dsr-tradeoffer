import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTradeOfferTable1629457334539 implements MigrationInterface {
    name = 'CreateTradeOfferTable1629457334539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `trade-offer` (`id` int NOT NULL AUTO_INCREMENT, `offered_item_id` int NOT NULL, `desired_item_id` int NOT NULL, UNIQUE INDEX `REL_7bd108ee0a9dc4157c51c1a7a8` (`offered_item_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `trade-offer` ADD CONSTRAINT `FK_7bd108ee0a9dc4157c51c1a7a8f` FOREIGN KEY (`offered_item_id`) REFERENCES `item`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `trade-offer` ADD CONSTRAINT `FK_3cbc46a846ccc7fb4849e72cf90` FOREIGN KEY (`desired_item_id`) REFERENCES `item`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `trade-offer` DROP FOREIGN KEY `FK_3cbc46a846ccc7fb4849e72cf90`");
        await queryRunner.query("ALTER TABLE `trade-offer` DROP FOREIGN KEY `FK_7bd108ee0a9dc4157c51c1a7a8f`");
        await queryRunner.query("DROP INDEX `REL_7bd108ee0a9dc4157c51c1a7a8` ON `trade-offer`");
        await queryRunner.query("DROP TABLE `trade-offer`");
    }

}
