import React, { useEffect } from 'react';
import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '#redux/store';
import { UserActions } from '#redux/reducers/slices/user-slice';
import { UserItemsActions } from '#redux/reducers/slices/user-items-slice';
import { CategoriesActions } from '#redux/reducers/slices/categories-slice';
import { AccountsActions } from '#redux/reducers/slices/accounts-slice';
import { CatalogueActions } from '#redux/reducers/slices/catalogue-slice';

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserActions.logout());
    dispatch(UserItemsActions.reset());
    dispatch(CategoriesActions.reset());
    dispatch(AccountsActions.reset());
    dispatch(CatalogueActions.reset());
    // eslint-disable-next-line
  }, []);

  return (
    <Redirect to={`/`} />
  );
};

export default Logout;