import React, { FC } from 'react';
import trade from '#src/icons/trade.svg';
import { ItemsList } from '#components/item/items-list';
import { useSelector } from 'react-redux';
import { userDataSelector } from '#src/js/redux/selectors';

export const MainUser: FC = () => {
  const userData = useSelector(userDataSelector);

  const addItem = () => {
    console.log(`Not implemented`);
  };

  const openTrade = () => {
    console.log(`Not implemented`);
  };

  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content MainWrapper-content--noPadding`}>
        <div className={`MainWrapper-actions uk-flex uk-width-1-1 uk-flex-center uk-padding-small`}>
          <button className={`uk-button uk-button-default uk-flex uk-flex-middle`}
                  onClick={addItem}>
            <span uk-icon={`icon: plus`} />
            <span className={`uk-margin-small-left uk-visible@s`}>Вещь</span>
          </button>
          <button className={`uk-button uk-button-default uk-flex uk-flex-middle`}
                  onClick={openTrade}>
              <span className={`uk-icon uk-icon-image`}>
                <img alt={`Обмен`} src={trade} uk-svg={``} />
              </span>
            <span className={`uk-margin-small-left uk-visible@s`}>Обмен</span>
          </button>
        </div>

        <ItemsList />
      </div>
    </div>
  );
};