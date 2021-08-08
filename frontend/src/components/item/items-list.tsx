import React, { FC, useEffect } from 'react';
import { Item } from '#components/item/item';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector, itemsErrorSelector, itemsListSelector } from '#src/js/redux/selectors';
import { useAppDispatch } from '#src/js/redux/store';
import { Operations } from '#src/js/redux/operations/operations';

export const ItemsList: FC = () => {
  const dispatch = useAppDispatch();
  const itemsList = useSelector(itemsListSelector);
  const itemsError = useSelector(itemsErrorSelector);
  const isPending = useSelector(isItemsRequestPendingSelector);

  useEffect(() => {
    dispatch(Operations.getItemsList());
    // eslint-disable-next-line
  }, []);

  if (isPending)
    return (
      <span uk-spinner={``} />
    );

  return (
    <div className={`uk-flex uk-flex-between uk-width-1-1 uk-flex-wrap`} uk-margin={``} >
      {itemsList?.map((item) => (
        <div key={item.id}>
          <Item {...item} />
        </div>
      )) ?? null}
    </div>
  );
};