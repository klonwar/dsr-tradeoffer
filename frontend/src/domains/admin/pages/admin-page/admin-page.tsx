import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { itemsListSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import { PhotosSlideshow } from '#domains/items/components/photos-slideshow/photos-slideshow';
import { useShowItemsRequestError } from '#src/js/hooks/use-show-items-request-error';

export const AdminPage: FC = () => {
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const itemsList = useSelector(itemsListSelector);

  useEffect(() => {
    dispatch(Operations.getItemsList());
    setIsDispatched(true);
    // eslint-disable-next-line
  }, []);

  useShowItemsRequestError(isDispatched);

  if (!itemsList || itemsList.length === 0)
    return (
      <div className={`uk-width-1-1 uk-height-1-1 uk-flex uk-flex-center uk-flex-middle uk-text-center uk-padding-small`}>
        <h2 className={`uk-text-muted`}>Здесь будет список вещей</h2>
      </div>
    );

  return (
    <div className={`uk-flex uk-flex-center uk-flex-wrap uk-padding-small`}>
      <table className={`uk-table uk-table-striped uk-table-responsive`}>
        <thead>
        <tr>
          <th>{keyToLabelText.get(`id`)}</th>
          <th>{keyToLabelText.get(`username`)}</th>
          <th>{keyToLabelText.get(`photosPaths`)}</th>
          <th>{keyToLabelText.get(`name`)}</th>
          <th>{keyToLabelText.get(`description`)}</th>
          <th>{keyToLabelText.get(`geo`)}</th>
          <th>{keyToLabelText.get(`item_category_id`)}</th>
          <th>{keyToLabelText.get(`trade_category_id`)}</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        {(itemsList) ? itemsList.map((item) => (
          <tr key={item.id}>
            <td className={`uk-table-shrink`}>{item.id}</td>
            <td className={`uk-table-shrink`}>{item.user}</td>
            <td className={`uk-width-medium`}>
              <PhotosSlideshow item={item} width={`1-1`} padding={false} />
            </td>
            <td>{item.name}</td>
            <td className={`uk-width-medium`}>{item.description}</td>
            <td>{item.geo}</td>
            <td>{item.item_category}</td>
            <td>{item.trade_category}</td>
            <td className={`uk-table-shrink uk-text-right`}>
              <button className={`uk-link`} onClick={() => dispatch(Operations.deleteItem(item.id))} uk-icon={`trash`}/>
            </td>
          </tr>
        )) : null}
        </tbody>
      </table>
    </div>
  );
};