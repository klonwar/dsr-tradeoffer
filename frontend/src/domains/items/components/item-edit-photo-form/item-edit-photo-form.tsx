import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '#redux/store';
import { useSelector } from 'react-redux';
import { isItemsRequestPendingSelector, itemsRequestErrorSelector } from '#redux/selectors';
import { useForm } from 'react-hook-form';
import { useShowUserRequestError } from '#src/js/hooks/use-show-user-request-error';
import { isPhotoFilename } from '#server/common/util/is-photo-filename';
import InputHint from '#components/input-hint/input-hint';
import { ItemDto } from '#server/common/dto/item.dto';
import { useHistory } from 'react-router-dom';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { ItemPhotosUl } from '#domains/items/components/item-photos-ul/item-photos-ul';
import { MAX_ITEM_PHOTOS } from '#server/common/constants/constants';

interface Props {
  item: ItemDto;
}

export const ItemEditPhotoForm: FC<Props> = ({ item }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const itemsRequestError = useSelector(itemsRequestErrorSelector);
  const isPending = useSelector(isItemsRequestPendingSelector);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<{ photos: FileList }>({
    mode: `onChange`,
  });
  const [isOpened, setIsOpened] = useState(false);

  const onSubmit = handleSubmit((data) => {
    //dispatch(Operations.setItemPhotos(data.photos));
    console.log(data);
  });

  const watchPhotos = watch(`photos`);

  useShowUserRequestError(isSubmitSuccessful);

  useEffect(() => {
    if (isSubmitSuccessful && !isPending && !itemsRequestError) {
      history.push(`/items/${item?.id}`);
    }
  }, [isSubmitSuccessful, isPending, itemsRequestError, history, item]);

  if (!isOpened) {
    return (
      <button className={`uk-width-1-1 uk-button uk-button-default`}
              onClick={() => setIsOpened(true)}>Обновить фотографии
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={`uk-inline uk-width-expand `}>
        <div className={`uk-position-relative uk-flex`}>
          <div className={`uk-width-expand uk-margin-small-right`} uk-form-custom={`target: true`}>
            <input accept={`.png,.jpg`}
                   multiple={true}
                   {...register(
                     `photos`,
                     {
                       required: `Выберите фотографию`,
                       validate: (fileList: FileList) => {
                         if (fileList.length > MAX_ITEM_PHOTOS)
                           return ErrorMessagesEnum.PHOTO_LIMIT;

                         if (Array.from(fileList).find((photo) => !isPhotoFilename(photo.name)))
                           return ErrorMessagesEnum.WRONG_PHOTO_TYPE;
                       },
                     },
                   )}
                   type={`file`} />
            <input
              type={`text`}
              className={`uk-input uk-margin-small-right`}
              placeholder={`Выбрать фотографии`}
              disabled={true}
            />
            <InputHint
              text={errors.photos?.message}
              className={`uk-position-center-right-out`}
              isActive={!!errors.photos}
            />
          </div>
          <button type={`submit`}
                  className={`uk-button uk-button-primary uk-padding-small uk-padding-remove-vertical`}
                  uk-icon={`icon: check`}
                  disabled={isPending} />
        </div>
        <ItemPhotosUl photos={watchPhotos} />
      </div>
    </form>
  );
};