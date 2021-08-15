import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HeaderWrapper from '#components/header-wrapper/header-wrapper';
import { AdminRoute } from '#components/app/components/role-routes/admin-route';
import { UserRoute } from '#components/app/components/role-routes/user-route';
import { ShowItemPage } from '#domains/items/pages/show-item-page/show-item-page';
import { ItemsPage } from '#domains/items/pages/items-page/items-page';
import Login from '#domains/login/pages/login/login';
import { UnauthorizedRoute } from '#components/app/components/role-routes/unauthorized-route';
import Logout from '#domains/logout/pages/logout/logout';
import { AuthorizedRoute } from '#components/app/components/role-routes/authorized-route';
import MainPage from '#domains/main/pages/main-page/main-page';
import { ProfilePage } from '#domains/profile/pages/profile-page/profile-page';
import RegistrationPage from '#domains/registration/pages/registration-page/registration-page';
import { AddItemPage } from '#domains/items/pages/add-item-page/add-item-page';
import { EditItemPage } from '#domains/items/pages/edit-item-page/edit-item-page';
import { AdminPage } from '#domains/admin/pages/admin-page/admin-page';
import { AccountsListPage } from '#domains/admin/pages/accounts-list-page/accounts-list-page';

const App: FC = () => {
  return (
    <Switch>
      {/* AdminRoutes */}

      <AdminRoute path={`/admin/users`}>
        <HeaderWrapper>
          <AccountsListPage />
        </HeaderWrapper>
      </AdminRoute>

      <AdminRoute exact path={`/admin`}>
        <HeaderWrapper>
          <AdminPage />
        </HeaderWrapper>
      </AdminRoute>

      {/* ItemsRoutes */}

      <UserRoute path={`/items/add`}>
        <HeaderWrapper>
          <AddItemPage />
        </HeaderWrapper>
      </UserRoute>

      <UserRoute path={`/items/:itemId/edit`}>
        <HeaderWrapper>
          <EditItemPage />
        </HeaderWrapper>
      </UserRoute>

      <UserRoute exact path={`/items/:itemId`}>
        <HeaderWrapper>
          {/* itemId будет получен через хук */}
          <ShowItemPage />
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
