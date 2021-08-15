import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '#src/modules/user/entity/user.entity';
import { Profile } from '#src/modules/user/entity/profile.entity';
import { ItemEntity } from '#src/modules/items/entity/item.entity';
import { CategoryEntity } from '#src/categories/entity/category.entity';
import { MOCK_USERS_COUNT } from '#src/constants/backend-constants';
import * as crypto from 'crypto';

@Injectable()
export class MockService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(ItemEntity)
    private itemsRepository: Repository<ItemEntity>,
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async generate() {
    const getRandom = (n: number): string =>
      crypto.randomBytes(n).toString(`hex`);

    const testUser = await this.userRepository.findOne({
      where: { login: `test_user` },
    });

    if (testUser) throw new BadRequestException(`Уже сгенерировано`);

    const testUserProfile = this.profileRepository.create({
      firstName: `Test User`,
      phone: `9081111111`,
      email: `test_user@gmail.com`,
      birthday: `1990-11-11`,
    });

    const testUserNew = this.userRepository.create({
      login: `test_user`,
      password: `test_user`,
      profile: testUserProfile,
    });

    // Сгенерируем пользователей

    const randomUsers = [];
    for (let i = 0; i < MOCK_USERS_COUNT; i++) {
      const name1 = getRandom(5);
      const name2 = getRandom(5);
      const login = `${name1}_${name2}`;

      const randomProfile = this.profileRepository.create({
        firstName: `${name1} ${name2}`,
        phone: `9089999999`,
        email: `${login}@gmail.com`,
        birthday: `1999-01-01`,
      });

      const randomUser = this.userRepository.create({
        login,
        password: login,
        profile: randomProfile,
      });

      randomUsers.push(randomUser);
    }

    await this.userRepository.save(randomUsers);

    // Создадим каждому несколько вещей

    const categories = await this.categoriesRepository.find();
    const newItems = [];
    for (const user of randomUsers) {
      for (let i = 0; i < ~~(Math.random() * 4) + 1; i++) {
        const newItem = this.itemsRepository.create({
          name: crypto.randomBytes(5).toString(`hex`),
          description: `${getRandom(10)}. ${getRandom(5)}, ${getRandom(5)}.`,
          geo: getRandom(6),
          item_category: categories[~~(Math.random() * categories.length)],
          trade_category: categories[~~(Math.random() * categories.length)],
          user,
        });
        newItems.push(newItem);
      }
    }
    await this.itemsRepository.save(newItems);
    await this.userRepository.save(testUserNew);
  }
}
