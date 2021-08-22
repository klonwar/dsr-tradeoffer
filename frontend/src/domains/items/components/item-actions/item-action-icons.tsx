import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Operations } from '#redux/operations/operations';
import { useAppDispatch } from '#redux/store';
import { BasketActions } from '#redux/reducers/slices/basket-slice';
import { ItemDto } from '#server/common/dto/item.dto';
import { sumBasketContentSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';
import addToCart from '#src/icons/add-to-cart.svg';
import deleteFromCart from '#src/icons/delete-from-cart.svg';

interface Props {
  item: ItemDto;
  isUserItem: boolean;
  withItemActions: boolean;
}

export const ItemActionIcons: FC<Props> = ({ item, isUserItem, withItemActions }) => {
  const dispatch = useAppDispatch();
  const { id } = item;
  const basketContent = useSelector(sumBasketContentSelector);
  const isInBasket = useMemo(() => basketContent[item.id], [basketContent, item]);

  return (
    <div className={`ItemActions`}>
      <div className={`uk-width-expand`}>
        <button className={`uk-button ${(isInBasket) ? `uk-button-primary` : `uk-button-default`}`} onClick={() => {
          if (isInBasket) {
            dispatch(BasketActions.delete(item.id));
          } else {
            if (isUserItem) {
              dispatch(BasketActions.setOffered(item));
            } else {
              dispatch(BasketActions.setDesired(item));
            }
          }
        }}>
          <img className={`uk-icon uk-icon-image`} alt={`basket action`} src={(isInBasket) ? deleteFromCart : addToCart}
               uk-svg={``} />
        </button>
      </div>
      {(isUserItem && withItemActions) ? (
        <>
          <Link
            className={`uk-link`}
            to={`/items/${id}/edit`}
            uk-icon={`icon: pencil`}
          />
          <button
            className={`uk-link`}
            uk-icon={`trash`}
            onClick={() => dispatch(Operations.deleteItem(id))}
          />
        </>
      ) : null}
    </div>
  );
};