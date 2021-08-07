import React, { FC, useEffect, useState } from 'react';
import {
  isUserRequestPendingSelector,
  userDataSelector,
  userPhotoUrlSelector,
} from '#src/js/redux/selectors';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { EditProfileDto } from '#server/common/dto/edit-profile.dto';
import { ProfileInput } from '#components/profile/profile-input';
import { useAppDispatch } from '#src/js/redux/store';
import { Operations } from '#src/js/redux/operations/operations';
import { useAuthorizedOnly } from '#src/js/hooks/use-authorized-only';
import { useShowUserRequestError } from '#src/js/hooks/use-show-user-request-error';
import noPhoto from '#src/icons/no-photo.svg';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ProfilePhotoForm } from '#components/profile/profile-photo-form';
import { ProfilePasswordForm } from '#components/profile/profile-password-form';

export const Profile: FC = () => {
  useAuthorizedOnly();

  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const userPhotoUrl = useSelector(userPhotoUrlSelector);
  const isURPending = useSelector(isUserRequestPendingSelector);

  const {
    handleSubmit,
    register,
    formState: { isDirty, errors, isSubmitSuccessful },
    reset,
  } = useForm<EditProfileDto>({
    mode: `onTouched`,
    resolver: classValidatorResolver(EditProfileDto),
    defaultValues: {
      firstName: userData?.firstName,
      email: userData?.email,
      phone: userData?.phone,
      birthday: userData?.birthday,
    },
  });

  useShowUserRequestError(isSubmitSuccessful);

  useEffect(() => {
    if (userData) {
      reset({ ...userData });
    }
  }, [userData, reset]);

  const onSubmit = handleSubmit((data) => {
    dispatch(Operations.editProfile(data));
  });

  const changePassword = () => {
    console.log(`Not implemented`);
  };

  return (
    <div className={`uk-padding-small uk-flex-center`} uk-grid={``}>
      <div className={`uk-width-medium uk-width-1-3@s uk-width-1-4@m`}>
        <div className={`uk-card uk-card-default uk-card-body`}>
          <div className={`PhotoContainer uk-width-1-1`} style={{
            backgroundImage: `url(${userPhotoUrl ?? noPhoto})`,
          }} />
        </div>
        <div className={`uk-margin-top`} uk-margin={``}>
          <ProfilePhotoForm />
          <ProfilePasswordForm />
        </div>
      </div>
      <div className={`uk-width-1-1 uk-width-2-3@s uk-width-1-2@m`}>
        <div className={`uk-card uk-card-default uk-card-body`}>
          <h2>{userData?.username}</h2>
          <form
            onSubmit={onSubmit}
            className={`uk-flex-middle`}
          >
            <ProfileInput
              name={`firstName`}
              placeholder={`Вася`}
              register={register}
              errors={errors} />

            <ProfileInput
              name={`email`}
              type={`email`}
              placeholder={`your@gmail.com`}
              register={register}
              errors={errors} />

            <ProfileInput
              name={`phone`}
              type={`tel`}
              placeholder={`8005553535`}
              register={register}
              errors={errors} />

            <ProfileInput
              name={`birthday`}
              type={`date`}
              placeholder={``}
              register={register}
              errors={errors} />

            <div className={`uk-margin-top`}>
              {(isDirty) ? (
                <div className={`uk-flex uk-flex-right`}>
                  <a href={`#`} className={`uk-button uk-button-default`}
                     onClick={(e) => {
                       e.preventDefault();
                       reset({ ...userData });
                     }}>
                    Отменить
                  </a>
                  <button className={`uk-button uk-button-primary uk-margin-left`}
                          type={`submit`}
                          disabled={!isDirty || isURPending}
                  >
                    Сохранить
                  </button>
                </div>
              ) : null}
            </div>
          </form>
        </div>

        {(!isDirty) ? (
          <div className={`uk-text-muted uk-margin-top uk-text-center`}
               style={{ userSelect: `none` }}>
            Нажмите на любое поле для редактирования
          </div>
        ) : null}
      </div>
    </div>
  );
};