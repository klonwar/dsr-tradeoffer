import React, { FC, useEffect } from 'react';
import { Item } from '#components/_reusable/subcomponents/items-list/item/item';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector, itemsListSelector } from '#src/js/redux/selectors';
import { useAppDispatch } from '#src/js/redux/store';
import { Operations } from '#src/js/redux/operations/operations';
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

  return (
    <div className={`uk-flex uk-flex-between uk-width-1-1 uk-flex-wrap`} uk-margin={``}>
      {itemsList?.map((item) => (
        <div key={item.id}>
          <Item {...item} />
        </div>
      )) ?? null}
    </div>
  );
};