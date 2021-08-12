import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ItemsList } from '../items-list/items-list';

export const ItemsPage: FC = () => {
  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content MainWrapper-content--noPadding`}>
        <div className={`MainWrapper-actions uk-flex uk-width-1-1 uk-flex-center uk-padding-small`}>
          <Link to={`/items/add`} className={`uk-button uk-button-default uk-flex uk-flex-middle`}>
            <span uk-icon={`icon: plus`} style={{ lineHeight: `inherit` }} />
            <span className={`uk-margin-small-left uk-visible@s`}>Вещь</span>
          </Link>
        </div>

        <ItemsList />
      </div>
    </div>
  );
};