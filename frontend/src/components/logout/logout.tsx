import React, { useEffect } from 'react';
import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '#src/js/redux/store';
import { UserActions } from '#src/js/redux/reducers/slices/login-slice';

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