import { useEffect } from 'react';
import UIkit from 'uikit';
import { useSelector } from 'react-redux';
import { itemsErrorSelector, userRequestErrorSelector } from '#src/js/redux/selectors';

export const useShowItemsRequestError = (isSubmitSuccessful: boolean): void => {
  const itemsRequestError = useSelector(itemsErrorSelector);

  useEffect(() => {
    if (isSubmitSuccessful && itemsRequestError)
      UIkit.notification({
        message: itemsRequestError.message,
        pos: `bottom-right`,
      });

  }, [itemsRequestError, isSubmitSuccessful]);
};