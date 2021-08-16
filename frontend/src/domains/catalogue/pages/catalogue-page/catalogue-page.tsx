import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  catalogueCurrentPageSelector,
  catalogueItemsSelector,
  isCatalogueRequestPendingSelector,
} from '#redux/selectors';
import { ItemCard } from '#domains/items/components/item-card/item-card';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { useShowCatalogueRequestError } from '#src/js/hooks/use-show-catalogue-request-error';
import { PAGE_SIZE } from '#server/common/constants/constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerWrapper from '#components/spinner-wrapper/spinner-wrapper';

export const CataloguePage: FC = () => {
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const catalogueItems = useSelector(catalogueItemsSelector);
  const currentPage = useSelector(catalogueCurrentPageSelector);
  const isPending = useSelector(isCatalogueRequestPendingSelector);

  useEffect(() => {
    if (catalogueItems.length === 0) {
      dispatch(Operations.loadCatalogue({
        page: 1,
      }));
      setIsDispatched(true);
    }
  }, [catalogueItems, setIsDispatched, dispatch]);

  useShowCatalogueRequestError(isDispatched);

  if (catalogueItems?.length === 0) {
    return (
      <div className={`uk-width-1-1 uk-flex uk-flex-center uk-flex-middle uk-text-center uk-padding-small`}>
        <h2 className={`uk-text-muted`}>Здесь будет список ваших вещей</h2>
      </div>
    );
  }

  return (
    <div id={`scrollable-target`}
         className={`WithScrollbar uk-overflow-auto`}>
      <InfiniteScroll
        next={() => {
          dispatch(Operations.loadCatalogue({
            page: currentPage + 1,
          }));
        }}
        hasMore={true}
        loader={null}
        dataLength={PAGE_SIZE}
        scrollableTarget={`scrollable-target`}
      >
        <div className={`uk-flex uk-flex-left uk-width-1-1 uk-flex-wrap`}>
          {catalogueItems?.map((item) => (
            <div key={item.id} className={`uk-width-1-1 uk-width-1-2@m uk-width-1-3@l uk-padding-small`}>
              <ItemCard {...item} linkTo={`catalogue/item`} withActions={false} />
            </div>
          )) ?? null}
          <div className={`uk-position-relative uk-height-small uk-width-1-1 ${(!isPending) ? `uk-hidden` : ``}`}>
            <SpinnerWrapper loading={true} />
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};