import React, { FC, useEffect, useState } from 'react';
import { MainPhotoInput } from '#domains/main/components/main-photo-input/main-photo-input';
import { AppInput } from '#components/app-input/app-input';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import InputHint from '#components/input-hint/input-hint';
import { MainCategorySelect } from '#domains/main/components/main-category-select/main-category-select';
import { Operations } from '#redux/operations/operations';
import { useAppDispatch } from '#redux/store';
import { useForm } from 'react-hook-form';
import { AddItemFormDto } from '#domains/main/dto/add-item-form-dto';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { Link, useHistory } from 'react-router-dom';
import { isItemsRequestPendingSelector, itemsRequestErrorSelector } from '#redux/selectors';
import { useSelector } from 'react-redux';
import { useShowItemsRequestError } from '#src/js/hooks/use-show-items-request-error';

export const AddItemPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [photos, setPhotos] = useState<FileList>(undefined);
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<AddItemFormDto>({
    resolver: classValidatorResolver(CreateItemDto),
  });

  const isPending = useSelector(isItemsRequestPendingSelector);
  const itemsRequestError = useSelector(itemsRequestErrorSelector);

  const onSubmit = handleSubmit((data) => {
    dispatch(Operations.createItem({ data, photos }));
  });

  useShowItemsRequestError(isSubmitSuccessful);

  useEffect(() => {
    if (isSubmitSuccessful && !itemsRequestError && !isPending) {
      history.push(`/items`);
    }
  }, [itemsRequestError, isPending, isSubmitSuccessful, history]);

  return (
    <div className={`uk-flex uk-flex-column uk-margin-auto-vertical uk-flex-middle uk-width-1-1`}>
      <div className={`uk-card uk-card-default uk-card-body uk-width-5-6 uk-width-1-2@m`}>
        <h1 className={`uk-card-title`}>Добавление вещи</h1>
        <MainPhotoInput setPhotos={setPhotos} />

        <form className={``}
              onSubmit={onSubmit}>

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

          <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
            <div className='uk-flex uk-form-label'>
              <span>{keyToLabelText.get(`description`)}</span>
            </div>
            <div className={`uk-position-relative`}>
                <textarea
                  className={`AppTextarea uk-textarea${(errors[`description`]) ? ` uk-form-danger` : ``}`}
                  placeholder={`Не стирана, не крашена. 100%.`}
                  {...register(`description`)}
                />
              <InputHint
                text={errors[`description`]?.message}
                className={`uk-position-center-right-out`}
                isActive={!!errors[`description`]}
              />
            </div>
          </div>

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

          <div className={`uk-margin-top`} uk-grid={``}>
            <div>
              <Link
                to={`/items`}
                className={`uk-button uk-button-default`}
              >
                Отмена
              </Link>
            </div>
            <div className={`uk-width-expand`}>
              <button className={`uk-button uk-button-primary uk-width-1-1`}>Создать</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};