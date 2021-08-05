import { Profile } from '#src/user/entity/profile.entity';
import { User } from '#src/user/entity/user.entity';
import * as moment from 'moment';
import { UserDto } from '#server/common/dto/user.dto';

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
    birthday: moment(birthday).format(`YYYY-MM-DD`),
    photoPath: photo,
  };
};
