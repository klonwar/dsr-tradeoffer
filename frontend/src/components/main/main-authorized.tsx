import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const MainAuthorized: FC = () => {
  return (
    <div className={`uk-padding-small`}>
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
    </div>
  );
};