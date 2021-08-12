import React, { FC, useContext } from 'react';
import { RegistrationContext } from '#domains/registration/registration';
import { keyToLabelText } from '#src/js/util/key-to-label-text';

export const RegistrationPhotoInput: FC = () => {
  const { setPhoto } = useContext(RegistrationContext);

  return (
    <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
      <div className='uk-flex uk-form-label'>
        <span>{keyToLabelText.get(`photoPath`)}</span>
      </div>
      <div className={`uk-position-relative`}>
        <div className={`uk-flex`} uk-form-custom={`target: true`}>
          <input type={`file`} onChange={(e) => {
            if (e.target) {
              setPhoto(e.target.files[0]);
            }
          }} />
          <input
            type={`text`}
            className={`uk-width-expand uk-input`}
            placeholder={`Выбрать файл`}
            disabled={true}
            style={{ marginRight: `5px` }}
          />
          <a href={`#`} className={`uk-button uk-button-default`}>Загрузить</a>
        </div>
      </div>
    </div>
  );
};
