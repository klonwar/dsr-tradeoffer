import React, { FC } from 'react';
import noPhoto from '#src/icons/no-photo.svg';
import { ItemDto } from '#server/common/dto/item.dto';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector } from '#redux/selectors';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { Link } from 'react-router-dom';
import { srcFromPhotoPath } from '#src/js/util/src-from-photo-path';

interface ItemProps extends Partial<ItemDto> {}

export const ItemCard: FC<ItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const isPending = useSelector(isItemsRequestPendingSelector);
  const { id, name, geo, item_category, trade_category, photos } = props;

  const photoPath = (photos?.[0]?.photoPath)
    ? srcFromPhotoPath(photos[0].photoPath)
    : noPhoto;

  return (
    <div className={`uk-card uk-card-default uk-card-body uk-width-1-1`} data-id={id}>
      <div className={`ItemCard`}>
        <div className={`ItemCard-header`}>
          <div className={`ItemCard-picture`} style={{ backgroundImage: `url(${photoPath})` }}>
          </div>
          <div className={`ItemCard-info`}>
            <Link className={`ItemCard-title uk-h4 uk-link-heading`} to={`/items/${id}`}>{name}</Link>
            <div className={`ItemCard-category`}>
              <span>
                {item_category}
              </span>
              <span>-&gt;</span>
              <span>
                {trade_category}
              </span>
            </div>
            <div className={`ItemCard-location`}>
              <span uk-icon={`icon: location; ratio: 0.75`} />
              <span>{geo}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`ItemCard-actions`}>
        <Link
          className={`uk-link`}
          to={`/items/${id}/edit`}
          uk-icon={`icon: pencil`}
        />
        <button
          className={`uk-link`}
          uk-icon={`trash`}
          onClick={() => dispatch(Operations.deleteItem({ id }))}
        />
      </div>
    </div>
  );
};