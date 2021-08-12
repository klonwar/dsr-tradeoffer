import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from '#domains/main/main';
import HeaderWrapper from '#components/header-wrapper/header-wrapper';
import Login from '#domains/login/login';
import Logout from '#domains/logout/logout';
import Registration from '#domains/registration/registration';
import { Profile } from '#domains/profile/profile';
import { ItemPage } from '#domains/item/item-page';
import { UnauthorizedRoute } from '#components/app/components/role-routes/unauthorized-route';
import { AuthorizedRoute } from '#components/app/components/role-routes/authorized-route';
import { UserRoute } from '#components/app/components/role-routes/user-route';

const App: FC = () => {
  return (
    <Switch>
      <UserRoute path={`/item/:itemId`}>
        <HeaderWrapper>
          <ItemPage />
        </HeaderWrapper>
      </UserRoute>

      <AuthorizedRoute path={`/profile`}>
        <HeaderWrapper>
          <Profile />
        </HeaderWrapper>
      </AuthorizedRoute>

      <AuthorizedRoute path={`/logout`}>
        <Logout />
      </AuthorizedRoute>

      <UnauthorizedRoute path={`/registration`}>
        <HeaderWrapper>
          <Registration />
        </HeaderWrapper>
      </UnauthorizedRoute>

      <UnauthorizedRoute path={`/login`}>
        <HeaderWrapper>
          <Login />
        </HeaderWrapper>
      </UnauthorizedRoute>

      <Route exact path={`/`}>
        <HeaderWrapper>
          <Main />
        </HeaderWrapper>
      </Route>

      <Route>
        <Redirect to={`/`} />
      </Route>
    </Switch>
  );
};

export default App;
