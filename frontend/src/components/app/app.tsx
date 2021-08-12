import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from '#domains/main/main';
import HeaderWrapper from '#components/header-wrapper/header-wrapper';
import Login from '#domains/login/login';
import Logout from '#domains/logout/logout';
import Registration from '#domains/registration/registration';
import { Profile } from '#domains/profile/profile';
import { ItemPage } from '#domains/item/item-page';

const App: FC = () => {
  return (
    <Switch>
      <Route path={`/item/:itemId`}>
        <HeaderWrapper>
          <ItemPage />
        </HeaderWrapper>
      </Route>

      <Route path={`/profile`}>
        <HeaderWrapper>
          <Profile />
        </HeaderWrapper>
      </Route>

      <Route path={`/registration`}>
        <HeaderWrapper>
          <Registration />
        </HeaderWrapper>
      </Route>

      <Route path={`/login`}>
        <HeaderWrapper>
          <Login />
        </HeaderWrapper>
      </Route>

      <Route path={`/logout`}>
        <Logout />
      </Route>

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
