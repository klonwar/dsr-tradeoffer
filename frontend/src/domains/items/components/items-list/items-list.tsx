import React, { FC } from 'react';
import { ItemCard } from '#domains/items/components/item-card/item-card';
import { useSelector } from 'react-redux';
import { itemsListSelector } from '#redux/selectors';
import { useShowItemsRequestError } from '#src/js/hooks/use-show-items-request-error';
import { useLoadItemsList } from '#src/js/hooks/use-load-items-list';

export const ItemsList: FC = () => {
  const itemsList = useSelector(itemsListSelector);

  useLoadItemsList();
  useShowItemsRequestError(true);

  if (!itemsList)
    return null;

  if (itemsList?.length === 0) {
    return (
      <div className={`uk-width-1-1 uk-flex uk-flex-center uk-flex-middle uk-text-center uk-padding-small`}>
        <h2 className={`uk-text-muted`}>Здесь будет список ваших вещей</h2>
      </div>
    );
  }

  return (
    <div className={`uk-flex uk-flex-center uk-width-1-1 uk-flex-wrap`}>
      {itemsList?.map((item) => (
        <div key={item.id} className={`uk-width-1-1 uk-width-1-2@m uk-padding-small`}>
          <ItemCard {...item} />
        </div>
      )) ?? null}
    </div>
  );
};