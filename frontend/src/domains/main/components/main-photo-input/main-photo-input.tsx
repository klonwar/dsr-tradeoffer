import React, { FC, useState } from 'react';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import InputHint from '#components/input-hint/input-hint';
import { isPhotoFilename } from '#server/common/util/is-photo-filename';

interface Props {
  setPhotos: (photos: FileList) => void
}

export const MainPhotoInput: FC<Props> = ({ setPhotos }) => {
  const [errors, setErrors] = useState<string>(null);

  return (
    <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
      <div className='uk-flex uk-form-label'>
        <span>{keyToLabelText.get(`photosPaths`)}</span>
      </div>
      <div className={`uk-position-relative`}>
        <div className={`uk-flex`} uk-form-custom={`target: true`}>
          <input accept={`.png,.jpg`} type={`file`} multiple={true} onChange={(e) => {
            if (e.target?.files) {
              if (e.target.files.length === 0) {
                setPhotos(undefined);
              } else {
                if (Array.from(e.target.files).find((file) => !isPhotoFilename(file.name))) {
                  setErrors(`Фотографии должны быть в формате .png или .jpg`);
                  return;
                }
                setPhotos(e.target.files);
              }

            }
          }} />
          <input
            type={`text`}
            className={`uk-width-expand uk-input uk-margin-small-right`}
            placeholder={`Выбрать файл`}
            disabled={true}
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