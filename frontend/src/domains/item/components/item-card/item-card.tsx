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
  const { id, name, description, geo, item_category, trade_category, photos } = props;

  const photoPath = (photos?.[0]?.photoPath)
    ? srcFromPhotoPath(photos[0].photoPath)
    : noPhoto;

  return (
    <div className={`uk-card uk-card-default uk-card-body uk-width-1-1`} data-id={id}>
      <div className={`Item`}>
        <div className={`Item-header`}>
          <div className={`Item-picture`} style={{ backgroundImage: `url(${photoPath})` }}>
          </div>
          <div className={`Item-info`}>
            <Link className={`Item-title uk-h4 uk-link-heading`} to={`/item/${id}`}>{name}</Link>
            <div className={`Item-category`}>
              <span>
                {item_category}
              </span>
              <span>-&gt;</span>
              <span>
                {trade_category}
              </span>
            </div>
            <div className={`Item-location`}>
              <span uk-icon={`icon: location; ratio: 0.75`} />
              <span>{geo}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`Item-actions`}>
        <a href={`#`} uk-icon={`trash`} onClick={(e) => {
          e.preventDefault();
          dispatch(Operations.deleteItem({ id }));
        }} />
      </div>
    </div>
  );
};