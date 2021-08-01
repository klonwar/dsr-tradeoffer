import { UserDto } from '#src/user/dto/user.dto';
import { Profile } from '#src/user/entity/profile.entity';
import { User } from '#src/user/entity/user.entity';

export const toUserDTO = (user: User, profile?: Profile): UserDto => {
  const { id, login: username, role } = user;
  const { email, phone, birthday, photo, firstName } = profile ?? {};

  return {
    id,
    username,
    role,

    email,
    firstName,
    phone,
    birthday,
    photo,
  };
};
