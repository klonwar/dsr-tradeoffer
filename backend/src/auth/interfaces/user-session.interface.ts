import { User } from '#src/user/user.entity';

export interface UserSessionState extends Omit<User, `password`> {}
