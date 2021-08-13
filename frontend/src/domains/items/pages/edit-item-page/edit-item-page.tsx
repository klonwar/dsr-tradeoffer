import React, { FC, useEffect, useMemo } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useLoadItemsList } from '#src/js/hooks/use-load-items-list';
import {
  categoriesListSelector,
  isItemsRequestPendingSelector,
  itemsListSelector,
  itemsRequestErrorSelector,
} from '#redux/selectors';
import { useSelector } from 'react-redux';
import { useLoadCategoriesList } from '#src/js/hooks/use-load-categories-list';
import { FieldPath, useForm } from 'react-hook-form';
import { EditItemDto } from '#server/common/dto/edit-item.dto';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { PhotosSlideshow } from '#domains/items/components/photos-slideshow/photos-slideshow';
import { AppInput } from '#components/app-input/app-input';
import { AppTextarea } from '#components/app-textarea/app-textarea';
import { MainCategorySelect } from '#domains/main/components/main-category-select/main-category-select';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { useShowItemsRequestError } from '#src/js/hooks/use-show-items-request-error';
import { ItemEditPhotoForm } from '#domains/items/components/item-edit-photo-form/item-edit-photo-form';

export const EditItemPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { itemId } = useParams<{ itemId: string }>();
  const isPending = useSelector(isItemsRequestPendingSelector);
  const itemsList = useSelector(itemsListSelector);
  const itemsRequestError = useSelector(itemsRequestErrorSelector);
  const item = useMemo(() => itemsList?.find((item) => item.id === parseInt(itemId)), [itemId, itemsList]);
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setValue } = useForm<EditItemDto>({
    resolver: classValidatorResolver(EditItemDto),
    defaultValues: {
      id: item?.id,
    },
  });

  useEffect(() => {
    if (item) {
      Object.entries(item).map(([key, value]) => {
        setValue(key as FieldPath<EditItemDto>, value);
      });
    }
  }, [item, setValue]);

  useLoadItemsList();
  useLoadCategoriesList();
  useShowItemsRequestError(isSubmitSuccessful);

  useEffect(() => {
    if (isSubmitSuccessful && !isPending && !itemsRequestError) {
      history.push(`/items/${item?.id}`);
    }
  }, [isSubmitSuccessful, isPending, itemsRequestError, history, item]);

  const onSubmit = handleSubmit((data) => {
    dispatch(Operations.editItem(data));
  });

  if (isPending)
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Загрузка...
      </h4>
    );

  if (!itemsList)
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Ошибка
      </h4>
    );

  if (!item) {
    return (
      <h4 className={`uk-position-center uk-margin-remove uk-text-muted`}>
        Такой вещи нет
      </h4>
    );
  }

  return (
    <div className={`uk-flex uk-flex-center uk-flex-wrap uk-padding-small`}>
      <div className={`uk-flex uk-flex-column uk-width-1-1 uk-width-xlarge@m`}>
        <PhotosSlideshow item={item} />
        <div className={`ItemPhotos uk-flex uk-flex-column`}>
          <ItemEditPhotoForm item={item} />
        </div>
      </div>

      <div className={`uk-card uk-card-body uk-card-default uk-width-xlarge`}>
        <h1 className={`uk-card-title`}>Редактирование</h1>
        <form onSubmit={onSubmit}>
          <input className={`uk-hidden`} {...register(`id`)} />

          <AppInput
            name={`name`}
            inputProps={{
              placeholder: `Куртка`,
            }}
            options={{
              icon: `tag`,
            }}
            useForm={{ register, errors }}
          />

          <AppTextarea
            name={`description`}
            textareaProps={{
              placeholder: `Не стирана, не крашена. 100%.`,
            }}
            useForm={{ register, errors }}
          />

          <AppInput
            name={`geo`}
            inputProps={{
              placeholder: `Воронеж`,
            }}
            options={{
              icon: `location`,
            }}
            useForm={{ register, errors }}
          />

          <div className={`uk-child-width-1-1 uk-child-width-expand@s`} uk-grid={`margin: uk-margin-small`}>
            <div>
              <MainCategorySelect name={`item_category_id`} useForm={{ register, errors }} />
            </div>
            <div>
              <MainCategorySelect name={`trade_category_id`} useForm={{ register, errors }} />
            </div>
          </div>

          <div className={`uk-margin-top`}>
            <div className={`uk-flex uk-flex-right`}>
              <button type={`button`} className={`uk-button uk-button-default`}
                      onClick={() => {
                        if (history.length > 1) {
                          history.goBack();
                        } else {
                          history.push(`/items/${item?.id}`);
                        }
                      }}>
                Отменить
              </button>
              <div className={`uk-width-expand`}>
                <button className={`uk-button uk-button-primary uk-margin-left uk-width-1-1`}
                        disabled={isPending}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};