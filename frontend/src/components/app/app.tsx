import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from '#components/main/main';
import HeaderWrapper from '#reusable/ui/header/header-wrapper';
import Login from '#components/login/login';
import Logout from '#components/login/logout/logout';
import Registration from '#components/registration/registration';
import { Profile } from '#components/profile/profile';
import { ItemPage } from '#components/item-page/item-page';

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
