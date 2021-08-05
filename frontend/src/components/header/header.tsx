import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '#components/logo/logo';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector, userDataSelector } from '#src/js/redux/selectors';

const Header: React.FC = () => {
  const activeClassName = `active uk-card-default`;
  const isAuthorized = useSelector(isAuthorizedSelector);
  const userData = useSelector(userDataSelector);

  return (
    <div className={`uk-width-auto uk-flex uk-flex-center uk-padding-small`}>
      {/* Левая часть хедера */}
      <div className={`uk-width-1-5 uk-width-1-4@m uk-flex uk-flex-left`}>
        <Logo />
      </div>

      {/* Середина */}
      <div className={`uk-width-expand uk-flex uk-flex-center`}>
        <NavLink activeClassName={activeClassName} exact to={`/`} className={`Header-link`}
                 uk-icon={`icon: home`} />
      </div>

      {/* Правая часть хедера */}
      <div className={`uk-width-1-5 uk-width-1-4@m uk-flex uk-flex-right`}>
        {(isAuthorized) ? (
          <>

            <NavLink activeClassName={activeClassName} exact to={`/profile`}
                     className={`Header-link${(userData.photoPath) ? ` Header-link--withImage` : ``}`}
                     style={{
                       backgroundImage: (userData.photoPath)
                         ? `url(${process.env[`SERVER_ORIGIN`]}/${userData.photoPath.replace(/\\/, `/`)})`
                         : ``,
                     }} uk-icon={`icon: user`} />
            <NavLink activeClassName={activeClassName} exact to={`/logout`} className={`Header-link`}
                     uk-icon={`icon: sign-out`} />
          </>
        ) : (
          <NavLink activeClassName={activeClassName} exact to={`/login`} className={`Header-link`}
                   uk-icon={`icon: sign-in`}
                   isActive={
                     (match, location) =>
                       location.pathname.includes(`login`) ||
                       location.pathname.includes(`registration`)
                   }
          />
        )}

      </div>

    </div>
  );
};

export default Header;
