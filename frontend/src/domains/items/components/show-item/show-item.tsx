import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadItemsList } from '#src/js/hooks/use-load-items-list';
import { categoriesListSelector, isItemsRequestPendingSelector, itemsListSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';
import { srcFromPhotoPath } from '#src/js/util/src-from-photo-path';
import { useLoadCategoriesList } from '#src/js/hooks/use-load-categories-list';

export const ShowItem: FC = () => {
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
    <div className={`uk-flex uk-flex-center uk-flex-middle uk-height-1-1 uk-padding-small`}>
      <div className={`uk-card uk-card-body uk-card-default uk-width-xlarge`}>
        <h1 className={`uk-card-title`}>{item.name}</h1>
        <p>{item.description}</p>
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
          <div className={`uk-width-1-1 uk-width-1-2@m uk-position-relative`} uk-slideshow={``}>
            <ul className={`uk-slideshow-items`}>
              {item.photos?.map(({ photoPath }) => (
                <li key={photoPath}><img src={srcFromPhotoPath(photoPath)} alt={``} uk-cover={``} /></li>
              ))}
            </ul>
            <button
              className={`uk-position-center-left uk-position-small uk-hidden-hover uk-link`}
              uk-slidenav-previous={``}
              uk-slideshow-item={`previous`}
            />
            <button
              className={`uk-position-center-right uk-position-small uk-hidden-hover uk-link`}
              uk-slidenav-next={``}
              uk-slideshow-item={`next`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};