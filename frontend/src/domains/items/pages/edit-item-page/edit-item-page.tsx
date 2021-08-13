import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadItemsList } from '#src/js/hooks/use-load-items-list';
import { isItemsRequestPendingSelector, itemsListSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';
import { useLoadCategoriesList } from '#src/js/hooks/use-load-categories-list';
import { PhotosSlideshow } from '#domains/items/components/photos-slideshow/photos-slideshow';
import { ItemEditPhotoForm } from '#domains/items/components/item-edit-photo-form/item-edit-photo-form';
import { ItemEditForm } from '#domains/items/components/item-edit-form/item-edit-form';

export const EditItemPage: FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const itemsList = useSelector(itemsListSelector);
  const item = useMemo(() => itemsList?.find((item) => item.id === parseInt(itemId)), [itemId, itemsList]);

  useLoadItemsList();
  useLoadCategoriesList();

  if (!item) {
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Такой вещи нет
      </h4>
    );
  }

  return (
    <div className={`uk-flex uk-flex-center uk-flex-wrap uk-padding-small`}>
      <div className={`uk-flex uk-flex-column uk-flex-middle uk-width-1-1 uk-width-xlarge@m`}>
        <PhotosSlideshow item={item} />
        <div className={`uk-margin-bottom uk-flex uk-flex-column`}>
          <ItemEditPhotoForm item={item} />
        </div>
      </div>

      <div className={`uk-card uk-card-body uk-card-default uk-width-xlarge`}>
        <h1 className={`uk-card-title`}>Редактирование</h1>
        <ItemEditForm item={item} />
      </div>
    </div>
  );
};