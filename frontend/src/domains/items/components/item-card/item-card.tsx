import React, { FC } from 'react';
import noPhoto from '#src/icons/no-photo.svg';
import { ItemDto } from '#server/common/dto/item.dto';
import { Link } from 'react-router-dom';
import { srcFromPhotoPath } from '#src/js/util/src-from-photo-path';
import { ItemActions } from '#domains/items/components/item-actions/item-actions';

interface ItemProps extends Partial<ItemDto> {
  withActions?: boolean;
  linkTo?: string
}

export const ItemCard: FC<ItemProps> = (props) => {
  const { id, name, geo, item_category, trade_category, photos, withActions = true, linkTo = `items` } = props;

  const photoPath = (photos?.[0]?.photoPath)
    ? srcFromPhotoPath(photos[0].photoPath)
    : noPhoto;

  return (
    <div className={`uk-card uk-card-default uk-card-body uk-width-1-1`} data-id={id}>
      <div className={`ItemCard`}>
        <div className={`ItemCard-header`}>
          <Link to={`/${linkTo}/${id}`} className={`ItemCard-picture`} style={{ backgroundImage: `url(${photoPath})` }}>
          </Link>
          <div className={`ItemCard-info`}>
            <Link className={`ItemCard-title uk-h4 uk-link-heading`} to={`/${linkTo}/${id}`}>{name}</Link>
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
      {(withActions) ? <ItemActions id={id} /> : null}
    </div>
  );
};