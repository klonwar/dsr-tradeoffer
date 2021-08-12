import React, { FC } from 'react';
import { ItemsList } from '#reusable/subcomponents/items-list/items-list';
import { MainAddItemForm } from '#components/main/main-add-item/main-add-item-form';

export const MainUser: FC = () => {
  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content MainWrapper-content--noPadding`}>
        <MainAddItemForm />
        <ItemsList />
      </div>
    </div>
  );
};