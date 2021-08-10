import React, { FC, useEffect } from 'react';
import { Item } from '#reusable/subcomponents/items-list/item/item';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector, itemsListSelector } from '#redux/selectors';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { useShowItemsRequestError } from '#src/js/hooks/use-show-items-request-error';

export const ItemsList: FC = () => {
  const dispatch = useAppDispatch();
  const itemsList = useSelector(itemsListSelector);
  const isPending = useSelector(isItemsRequestPendingSelector);

  useEffect(() => {
    dispatch(Operations.getItemsList());
    // eslint-disable-next-line
  }, []);

  useShowItemsRequestError(true);

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
          <Item {...item} />
        </div>
      )) ?? null }
    </div>
  );
};