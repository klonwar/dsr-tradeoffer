import React, { FC } from 'react';
import { MainAddItemButton } from '#components/main/main-add-item/main-add-item-button';
import { ItemsList } from '#reusable/subcomponents/items-list/items-list';

export const MainUser: FC = () => {
  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content MainWrapper-content--noPadding`}>
        <MainAddItemButton />
        <ItemsList />
      </div>
    </div>
  );
};