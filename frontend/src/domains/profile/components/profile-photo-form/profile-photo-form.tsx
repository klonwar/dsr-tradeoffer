import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputHint from '#components/input-hint/input-hint';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { useShowUserRequestError } from '#src/js/hooks/use-show-user-request-error';
import { isUserRequestPendingSelector, userDataSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';

export const ProfilePhotoForm: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const isPending = useSelector(isUserRequestPendingSelector);

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<{ photo: FileList }>();
  const [isOpened, setIsOpened] = useState(false);

  const onSubmit = handleSubmit((data) => {
    const photo: File = data.photo[0];
    dispatch(Operations.setPhoto(photo));
  });

  useShowUserRequestError(isSubmitSuccessful);

  useEffect(() => {
    if (userData) {
      setIsOpened(false);
    }
  }, [userData]);

  if (!isOpened) {
    return (
      <button className={`uk-width-1-1 uk-button uk-button-default`}
              onClick={() => setIsOpened(true)}>Обновить фотографию
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={`uk-inline uk-width-expand `}>
        <div className={`uk-position-relative uk-flex`}>
          <div className={`uk-width-expand uk-margin-small-right`} uk-form-custom={`target: true`}>
            <input {...register(`photo`, { required: `Выберите фотографию` })} type={`file`} />
            <input
              type={`text`}
              className={`uk-input`}
              placeholder={`Выбрать файл`}
              disabled={true}
              style={{ marginRight: `5px` }}
            />
            <InputHint
              text={errors.photo?.message}
              className={`uk-position-center-right-out`}
              isActive={!!errors.photo}
            />
          </div>
          <button type={`submit`}
                  className={`uk-button uk-button-primary uk-padding-small uk-padding-remove-vertical`}
                  uk-icon={`icon: check`}
                  disabled={isPending} />
        </div>
      </div>
    </form>
  );
};
