import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userDataSelector } from '#src/js/redux/selectors';

export const MainAuthorized: FC = () => {
  const userData = useSelector(userDataSelector);

  return (
    <div className={`uk-padding-small`}>
      <div className={`MainWrapper`}>
        <div className={`MainWrapper-content`}>
          <div>
            <h1>Поздравляю!</h1>
            <h4>Вы успешно вошли в свой аккаунт</h4>
            <pre>
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
          <div className={`MainWrapper-buttons`} uk-margin={``}>
            <Link to={`/logout`} className={`uk-button uk-button-default`}>Выйти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};