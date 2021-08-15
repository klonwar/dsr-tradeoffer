import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '#redux/store';
import { useSelector } from 'react-redux';
import { accountsListSelector } from '#redux/selectors';
import { Operations } from '#redux/operations/operations';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import { UserPhoto } from '#components/user-photo/user-photo';
import { UserRole } from '#server/common/enums/user-role.enum';
import { useShowAccountsRequestError } from '#src/js/hooks/use-show-accounts-request-error';

export const AccountsListPage: FC = () => {
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const accountsList = useSelector(accountsListSelector);

  useEffect(() => {
    dispatch(Operations.getAccountsList());
    setIsDispatched(true);
    // eslint-disable-next-line
  }, []);

  useShowAccountsRequestError(isDispatched);

  if (!accountsList || accountsList.length === 0)
    return (
      <div
        className={`uk-width-1-1 uk-height-1-1 uk-flex uk-flex-center uk-flex-middle uk-text-center uk-padding-small`}>
        <h2 className={`uk-text-muted`}>Здесь будет список пользователей</h2>
      </div>
    );

  return (
    <div className={`uk-flex uk-flex-center uk-flex-wrap uk-padding-small`}>
      <table className={`uk-table uk-table-divider uk-table-responsive`}>
        <thead>
        <tr>
          <th>{keyToLabelText.get(`id`)}</th>
          <th>{keyToLabelText.get(`photoPath`)}</th>
          <th>{keyToLabelText.get(`username`)}</th>
          <th>{keyToLabelText.get(`firstName`)}</th>
          <th>{keyToLabelText.get(`phone`)}</th>
          <th>{keyToLabelText.get(`email`)}</th>
          <th>{keyToLabelText.get(`birthday`)}</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        {(accountsList) ? accountsList.map((user) => {
          const isAdmin = user.role === UserRole.ADMIN;
          return (
            <tr key={user.id} className={(isAdmin) ? `GoldenRow` : ``}>
              <td className={`uk-table-shrink`}>{user.id}</td>
              <td className={`uk-width-small`}>
                <UserPhoto />
              </td>
              <td>
                {(isAdmin) ? (
                  <span className={`uk-margin-small-right`} uk-icon={`star`} />
                ) : null}
                {user.username}
              </td>
              <td className={`uk-table-expand`}>{user.firstName}</td>
              <td className={`uk-width-medium uk-table-shrink`}>{user.phone}</td>
              <td className={`uk-width-medium uk-table-shrink`}>{user.email}</td>
              <td className={`uk-width-medium`}>{user.birthday}</td>

              <td className={`uk-table-shrink uk-text-right`}>
                {(!isAdmin) ? (
                  <button className={`uk-link`} onClick={() => dispatch(Operations.deleteAccount(user.id))}
                          uk-icon={`trash`} />
                ) : null}
              </td>
            </tr>
          );
        }) : null}
        </tbody>
      </table>
    </div>
  );
};