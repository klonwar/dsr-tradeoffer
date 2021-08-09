import React, { FC } from 'react';
import noPhoto from '#src/icons/no-photo.svg';
import { ItemDto } from '#server/common/dto/item.dto';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector } from '#redux/selectors';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';

interface ItemProps extends Partial<ItemDto> {}

export const Item: FC<ItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const isPending = useSelector(isItemsRequestPendingSelector);
  const { id, name, description, geo, item_category, trade_category, photos } = props;

  const photoPath = (photos?.[0]?.photoPath)
    ? `${process.env[`SERVER_ORIGIN`]}/${photos[0].photoPath}`
    : noPhoto;

  return (
    <div className={`uk-card uk-card-default uk-card-body uk-card-small`} data-id={id}>
      <div className={`Item`}>
        <div className={`Item-header`}>
          <div className={`Item-picture`}>
            <img src={photoPath}
                 width={80}
                 height={80}
                 alt={name} />
          </div>
          <div className={`Item-info`}>
            <h4 className={`Item-title`}>
              {name}
            </h4>
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
        <a href={`#`} uk-icon={`trash`} onClick={() => dispatch(Operations.deleteItem({id}))} />
      </div>
    </div>
  );
};