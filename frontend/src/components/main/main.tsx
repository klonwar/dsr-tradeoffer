import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector, userDataSelector } from '#src/js/redux/selectors';
import jwt from 'jsonwebtoken';

const MainUnauthorized: FC = () => {
  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content`}>
        <div>
          <h1>⚠️TradeOffer⚠️</h1>
          <h4>Сервис для обмена вещами. Обменяйте старую куртку на новый утюг!</h4>
        </div>
        <div className={`MainWrapper-buttons`} uk-margin={``}>
          <Link to={`/login`} className={`uk-button uk-button-primary`}>Войти</Link>
          <Link to={`/registration`} className={`uk-button uk-button-default`}>Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

const MainAuthorized: FC = () => {
  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content`}>
        <div>
          <h1>Поздравляю!</h1>
          <h4>Вы успешно вошли в свой аккаунт. Здесь когда-то будет полезная информация, но пока ее нет</h4>
        </div>
        <div className={`MainWrapper-buttons`} uk-margin={``}>
          <Link to={`/logout`} className={`uk-button uk-button-default`}>Выйти</Link>
        </div>
      </div>
    </div>
  );
};

const Main: FC = () => {
  const isAuthorized = useSelector(isAuthorizedSelector);

  if (!isAuthorized)
    return (
      <div className={`uk-padding-small`}>
        <MainUnauthorized />
      </div>
    );

  return (
    <div className={`uk-padding-small`}>
      <MainAuthorized />
    </div>
  );

};

export default Main;
