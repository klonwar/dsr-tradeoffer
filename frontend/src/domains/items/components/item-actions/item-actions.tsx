import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Operations } from '#redux/operations/operations';
import { useAppDispatch } from '#redux/store';

interface Props {
  id: number;
}

export const ItemActions: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`ItemActions`}>
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
    </div>
  );
};