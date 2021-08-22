import { useAppDispatch } from '#redux/store';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector, itemsListSelector } from '#redux/selectors';
import { useEffect } from 'react';
import { Operations } from '#redux/operations/operations';

export const useLoadItemsList = (): void => {
  const dispatch = useAppDispatch();
  const itemsList = useSelector(itemsListSelector);
  const isPending = useSelector(isItemsRequestPendingSelector);

  useEffect(() => {
    if (!isPending && !itemsList)
      dispatch(Operations.getUserItemsList());
  }, [isPending, itemsList, dispatch]);
};