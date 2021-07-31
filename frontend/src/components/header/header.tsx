import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '#components/logo/logo';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from '#src/js/redux/selectors';

const Header: React.FC = () => {
  const activeClassName = `active uk-card-default`;
  const isAuthorized = useSelector(isAuthorizedSelector);

  return (
    <div className={`uk-width-auto uk-flex uk-flex-center uk-padding-small`}>
      {/* Левая часть хедера */}
      <div className={`uk-width-1-5 uk-width-1-4@m uk-flex uk-flex-left`}>
        <Logo />
      </div>

      {/* Середина */}
      <div className={`uk-width-expand uk-flex uk-flex-center`}>
        <NavLink activeClassName={activeClassName} exact to={`/`} className={`uk-padding-small`}
                 uk-icon={`icon: home`} />
      </div>

      {/* Правая часть хедера */}
      <div className={`uk-width-1-5 uk-width-1-4@m uk-flex uk-flex-right`}>
        {(isAuthorized) ? (
          <NavLink activeClassName={activeClassName} exact to={`/logout`} className={`uk-padding-small`}
                   uk-icon={`icon: sign-out`} />
        ) : (
          <NavLink activeClassName={activeClassName} exact to={`/login`} className={`uk-padding-small`}
                   uk-icon={`icon: user`} />
        )}

      </div>

    </div>
  );
};

export default Header;
