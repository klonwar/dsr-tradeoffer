import React, { useEffect } from 'react';
import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '#redux/store';
import { UserActions } from '#redux/reducers/slices/user-slice';
import { ItemsActions } from '#redux/reducers/slices/items-slice';
import { CategoriesActions } from '#redux/reducers/slices/categories-slice';
import { AccountsActions } from '#redux/reducers/slices/accounts-slice';

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserActions.logout());
    dispatch(ItemsActions.reset());
    dispatch(CategoriesActions.reset());
    dispatch(AccountsActions.reset());
    // eslint-disable-next-line
  }, []);

  return (
    <Redirect to={`/`} />
  );
};

export default Logout;