import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from '#redux/selectors';
import { MainUnauthorized } from './main-unauthorized/main-unauthorized';
import { MainAuthorized } from './main-authorized/main-authorized';

const Main: FC = () => {
  const isAuthorized = useSelector(isAuthorizedSelector);

  if (!isAuthorized)
    return <MainUnauthorized />;

  return <MainAuthorized />;

};

export default Main;
