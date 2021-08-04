import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from '#components/main/main';
import HeaderWrapper from '#components/header/header-wrapper';
import Login from '#components/login/login';
import Logout from '#components/logout/logout';
import Registration from '#components/registration/registration';

const App: FC = () => {
  return (
    <Switch>
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
