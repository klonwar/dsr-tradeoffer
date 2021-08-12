import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { AppInput } from '#components/app-input/app-input';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import InputHint from '#components/input-hint/input-hint';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { AddItemFormDto } from '#domains/main/dto/add-item-form-dto';
import { MainCategorySelect } from '#domains/main/components/main-category-select/main-category-select';
import { useAppDispatch } from '#redux/store';
import { Operations } from '#redux/operations/operations';
import { MainPhotoInput } from '#domains/main/components/main-photo-input/main-photo-input';

export const MainAddItemForm: FC = () => {
  const dispatch = useAppDispatch();
  const [photos, setPhotos] = useState<FileList>(undefined);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddItemFormDto>({
    resolver: classValidatorResolver(CreateItemDto),
  });

  const resetAll = () => {
    reset();
    setPhotos(null);
    setIsOpened(false);
  };

  const onSubmit = handleSubmit((data) => {
    dispatch(Operations.createItem({ data, photos }));
    resetAll();
  });

  return (
    <div className={`MainWrapper-actions uk-flex uk-width-1-1 uk-flex-center uk-padding-small`}>
      {(isOpened)
        ? (
          <div className={`uk-card uk-card-default uk-card-body uk-card-small uk-width-xlarge@m`}>
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
                  className={`uk-textarea${(errors[`description`]) ? ` uk-form-danger` : ``}`}
                  style={{ resize: `vertical` }}
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
                  <button
                    type={`button`}
                    onClick={resetAll}
                    className={`uk-button uk-button-default`}
                  >
                    Отмена
                  </button>
                </div>
                <div className={`uk-width-expand`}>
                  <button className={`uk-button uk-button-primary uk-width-1-1`}>Создать</button>
                </div>
              </div>
            </form>
          </div>
        )
        : (
          <button className={`uk-button uk-button-default uk-flex uk-flex-middle`}
                  onClick={() => setIsOpened(true)}>
            <span uk-icon={`icon: plus`} style={{ lineHeight: `inherit` }} />
            <span className={`uk-margin-small-left uk-visible@s`}>Вещь</span>
          </button>
        )}
    </div>
  );
};