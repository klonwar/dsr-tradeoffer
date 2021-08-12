import React, { FC, useContext, useState } from 'react';
import { RegistrationContext } from '#domains/registration/components/registration-page/registration-page';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import InputHint from '#components/input-hint/input-hint';
import { isPhotoFilename } from '#server/common/util/is-photo-filename';

export const RegistrationPhotoInput: FC = () => {
  const [errors, setErrors] = useState<string>(null);
  const { setPhoto } = useContext(RegistrationContext);

  return (
    <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
      <div className='uk-flex uk-form-label'>
        <span>{keyToLabelText.get(`photoPath`)}</span>
      </div>
      <div className={`uk-position-relative`}>
        <div className={`uk-flex`} uk-form-custom={`target: true`}>
          <input accept={`.png,.jpg`} type={`file`} onChange={(e) => {
            if (e.target?.files?.length !== 0) {
              if (!isPhotoFilename(e.target.files[0].name)) {
                setErrors(`Фотография должна быть в формате .png или .jpg`);
                return;
              }

              setPhoto(e.target.files[0]);
              setErrors(null);
            }
          }} />
          <input
            type={`text`}
            className={`uk-width-expand uk-input`}
            placeholder={`Выбрать файл`}
            disabled={true}
            style={{ marginRight: `5px` }}
          />
          <InputHint
            text={errors}
            className={`uk-position-center-right-out`}
            isActive={!!errors}
          />
          <button type={`button`} className={`uk-button uk-button-default`}>Загрузить</button>
        </div>
      </div>
    </div>
  );
};
