import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ItemsList } from '../../components/items-list/items-list';

export const ItemsPage: FC = () => {
  return (
    <div className={`ItemsContainer`}>
      <div className={`ItemsContainer-content`}>
        <div className={`ItemsContainer-actions`}>
          <Link to={`/items/add`} className={`uk-button uk-button-default uk-flex uk-flex-middle`}>
            <span className={`ItemsContainer-actionIcon`} uk-icon={`icon: plus`} />
            <span className={`uk-margin-small-left uk-visible@s`}>Вещь</span>
          </Link>
        </div>

        <ItemsList />
      </div>
    </div>
  );
};