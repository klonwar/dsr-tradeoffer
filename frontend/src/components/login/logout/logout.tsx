import React, { useEffect } from 'react';
import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '#redux/store';
import { UserActions } from '#redux/reducers/slices/user-slice';

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserActions.logout());
    // eslint-disable-next-line
  }, []);

  return (
    <Redirect to={`/`} />
  );
};

export default Logout;