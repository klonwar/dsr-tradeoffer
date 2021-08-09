import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationInput } from '#components/registration/registration-input/registration-input';
import { CreateItemDto } from '#server/common/dto/create-item.dto';

export const MainAddItemButton: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CreateItemDto>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className={`MainWrapper-actions uk-flex uk-width-1-1 uk-flex-center uk-padding-small`}>
      {(isOpened)
        ? (
          <form className={`uk-card uk-card-default uk-card-body uk-card-small`} onSubmit={onSubmit}>
            <RegistrationInput<CreateItemDto>
              name={`name`}
              icon={`tag`}
              placeholder={`Назване`}
              register={register}
              errors={errors}
            />
          </form>
        )
        : (
          <button className={`uk-button uk-button-default uk-flex uk-flex-middle`}
                  onClick={() => setIsOpened(true)}>
            <span uk-icon={`icon: plus`} />
            <span className={`uk-margin-small-left uk-visible@s`}>Вещь</span>
          </button>
        )}
    </div>
  );
};