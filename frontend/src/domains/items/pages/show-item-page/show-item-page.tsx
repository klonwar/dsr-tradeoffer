import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadItemsList } from '#src/js/hooks/use-load-items-list';
import { categoriesListSelector, isItemsRequestPendingSelector, itemsListSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';
import { useLoadCategoriesList } from '#src/js/hooks/use-load-categories-list';
import { PhotosSlideshow } from '#domains/items/components/photos-slideshow/photos-slideshow';
import { ItemActions } from '#domains/items/components/item-actions/item-actions';

export const ShowItemPage: FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const isPending = useSelector(isItemsRequestPendingSelector);
  const itemsList = useSelector(itemsListSelector);
  const categories = useSelector(categoriesListSelector);
  const item = useMemo(() => itemsList?.find((item) => item.id === parseInt(itemId)), [itemId, itemsList]);

  useLoadItemsList();
  useLoadCategoriesList();

  if (isPending)
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Загрузка...
      </h4>
    );

  if (!itemsList)
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Ошибка
      </h4>
    );

  if (!item) {
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Такой вещи нет
      </h4>
    );
  }

  return (
    <div className={`uk-flex uk-flex-center uk-flex-wrap uk-padding-small`}>
      <div className={`uk-flex uk-flex-column uk-width-1-1 uk-width-xlarge@s`}>
        <PhotosSlideshow item={item} />
      </div>
      <div className={`uk-card uk-card-body uk-card-default uk-width-xlarge`}>
        <h1 className={`TextEllipsis uk-card-title`}>{item.name}</h1>
        <p className={`TextEllipsis`}>{item.description}</p>
        <div className={`uk-flex uk-flex-wrap`} uk-margin={``}>
          <div className={`uk-width-1-1 uk-width-1-2@m`}>
            <div className={`uk-flex uk-flex-middle`}>
              <span>Где: </span>
              <span className={`uk-margin-small-left`}>{item.geo}</span>
            </div>
            <div className={`uk-flex uk-flex-middle`}>
              <span>Категория: </span>
              <span className={`uk-margin-small-left`}>{item.item_category}</span>
            </div>
            <div className={`uk-flex uk-flex-middle`}>
              <span>Хочу: </span>
              <span className={`uk-margin-small-left`}>{item.trade_category}</span>
            </div>
          </div>
        </div>
        <ItemActions id={item.id} />
      </div>
    </div>
  );
};