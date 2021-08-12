import React, { FC } from 'react';
import { userDataSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';

export const MainUser: FC = () => {
  const userData = useSelector(userDataSelector);

  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content`}>
        <div>
          <h1>Здравствуйте, {userData.firstName}</h1>
          <h4>Вы успешно вошли в свой аккаунт и можете пользоваться сайтом! Вот, что вы можете сделать:</h4>
          <ul>
            <li>Добавить новую вещь для обмена</li>
            <li>Посмотреть на свои выложенные вещи</li>
            <li>Обменяться с другим пользователем <span className={`uk-text-muted`}>(Пока в разработке)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};