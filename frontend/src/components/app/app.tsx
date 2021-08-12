import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HeaderWrapper from '#components/header-wrapper/header-wrapper';
import { AdminRoute } from '#components/app/components/role-routes/admin-route';
import { UserRoute } from '#components/app/components/role-routes/user-route';
import { ShowItem } from '#domains/items/components/show-item/show-item';
import { ItemsPage } from '#domains/items/components/items-page/items-page';
import Login from '#domains/login/components/login/login';
import { UnauthorizedRoute } from '#components/app/components/role-routes/unauthorized-route';
import Logout from '#domains/logout/components/logout/logout';
import { AuthorizedRoute } from '#components/app/components/role-routes/authorized-route';
import MainPage from '#domains/main/components/main-page/main-page';
import { ProfilePage } from '#domains/profile/components/profile-page/profile-page';
import RegistrationPage from '#domains/registration/components/registration-page/registration-page';
import { AddItemPage } from '#domains/items/components/add-item-page/add-item-page';

const App: FC = () => {
  return (
    <Switch>
      {/* AdminRoutes */}

      <AdminRoute exact path={`/admin`}>
        <HeaderWrapper>
          <div className={`uk-flex uk-flex-center uk-flex-middle uk-height-1-1`}>
            Вы админ, но вы ничего не можете :c
          </div>
        </HeaderWrapper>
      </AdminRoute>

      {/* ItemsRoutes */}

      <UserRoute path={`/items/add`}>
        <HeaderWrapper>
          <AddItemPage />
        </HeaderWrapper>
      </UserRoute>

      <UserRoute path={`/items/:itemId`}>
        <HeaderWrapper>
          {/* itemId будет получен через хук */}
          <ShowItem />
        </HeaderWrapper>
      </UserRoute>

      <UserRoute path={`/items`}>
        <HeaderWrapper>
          <ItemsPage />
        </HeaderWrapper>
      </UserRoute>

      {/* ProfileRoutes */}

      <AuthorizedRoute path={`/profile`}>
        <HeaderWrapper>
          <ProfilePage />
        </HeaderWrapper>
      </AuthorizedRoute>

      {/* RegistrationRoutes */}

      <UnauthorizedRoute path={`/registration`}>
        <HeaderWrapper>
          <RegistrationPage />
        </HeaderWrapper>
      </UnauthorizedRoute>

      {/* LogoutRoutes */}

      <AuthorizedRoute path={`/logout`}>
        <Logout />
      </AuthorizedRoute>

      {/* LoginRoutes */}

      <UnauthorizedRoute path={`/login`}>
        <HeaderWrapper>
          <Login />
        </HeaderWrapper>
      </UnauthorizedRoute>

      {/* MainRoutes */}

      <Route exact path={`/`}>
        <HeaderWrapper>
          <MainPage />
        </HeaderWrapper>
      </Route>

      <Route>
        <Redirect to={`/`} />
      </Route>
    </Switch>
  );
};

export default App;
