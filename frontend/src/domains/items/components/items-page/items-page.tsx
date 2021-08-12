import { MainAddItemForm } from '#domains/main/components/main-add-item/main-add-item-form';
import React, { FC } from 'react';
import { ItemsList } from '../items-list/items-list';

export const ItemsPage: FC = () => {
  return (
    <div className={`MainWrapper`}>
      <div className={`MainWrapper-content MainWrapper-content--noPadding`}>
        <MainAddItemForm />
        <ItemsList />
      </div>
    </div>
  );
};