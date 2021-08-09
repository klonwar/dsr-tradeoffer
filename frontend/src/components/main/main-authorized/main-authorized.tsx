import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userDataSelector } from '#src/js/redux/selectors';
import { UserRole } from '#server/common/enums/user-role.enum';
import { MainUser } from '#components/main/main-user';

export const MainAuthorized: FC = () => {
  const userData = useSelector(userDataSelector);

  return (userData.role === UserRole.USER) ? (
    <MainUser />
  ) : (
    <div className={`uk-flex uk-flex-center uk-flex-middle`}>
      Вы админ. Но вы ничего не можете :c
    </div>
  );
};