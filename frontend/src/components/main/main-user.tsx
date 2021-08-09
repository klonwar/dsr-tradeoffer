import React, { FC } from 'react';
import { ItemsList } from '#reusable/subcomponents/items-list/items-list';
import { MainAddItemButton } from '#components/main/main-add-item/main-add-item-button';

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