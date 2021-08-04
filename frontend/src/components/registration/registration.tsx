import React, { createContext, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from '#src/js/redux/selectors';
import { Link, useHistory } from 'react-router-dom';
import { Wizard, WizardActionOverrideData, WizardStep } from '#components/wizard/wizard';
import { CreateUserDto } from '#src/js/dto/create-user.dto';
import { FirstRegistrationStep } from './steps/first-registration-step';
import { SecondRegistrationStep } from './steps/second-registration-step';
import { ThirdRegistrationStep } from '#components/registration/steps/third-registration-step';

export const RegistrationContext = createContext<{
  registrationState: Partial<CreateUserDto>;
  appendToState: (data: Partial<CreateUserDto>) => void;
}>(null);

const Registration: FC = () => {
  const [registrationState, setRegistrationState] = useState<Partial<CreateUserDto>>({});
  const history = useHistory();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const [progress, setProgress] = useState<number>(0);
  const [maxProgress, setMaxProgress] = useState<number>(3);

  const updateProgressFromWizard = (data: WizardActionOverrideData) => {
    setProgress(data.newContext.step);
    setMaxProgress(data.newContext.length);
  };

  const appendToState = (data: Partial<CreateUserDto>) =>
    setRegistrationState({ ...registrationState, ...data });

  useEffect(() => {
    if (isAuthorized) {
      history.replace(`/`);
    }
  }, [history, isAuthorized]);

  return (
    <RegistrationContext.Provider value={{ registrationState, appendToState }}>
      <div className={`uk-flex uk-flex-column uk-margin-auto-vertical uk-flex-middle uk-width-1-1`}>
        <h4 className={`uk-margin-remove`}>
          {Math.min(progress + 1, maxProgress)} / {maxProgress}
        </h4>
        <progress className={`uk-progress  uk-width-5-6 uk-width-1-2@m`} value={progress} max={maxProgress} />
        <div className={`uk-card uk-card-default uk-card-body uk-width-5-6 uk-width-1-2@m`}>
          <Wizard
            overrideNext={(next, data) => {
              updateProgressFromWizard(data);
              next();
            }}
            overridePrev={(prev, data) => {
              updateProgressFromWizard(data);
              prev();
            }}
            // Чтобы пользователю не вводить все повторно при переходе назад
            softHide={true}
          >
            <WizardStep render={({ next }) => (
              <FirstRegistrationStep next={next} />
            )} />
            <WizardStep render={({ next, prev }) => (
              <SecondRegistrationStep next={next} prev={prev} />
            )} />
            <WizardStep render={({ prev }) => (
              <ThirdRegistrationStep prev={prev} />
            )} />
            <WizardStep render={({ next, prev }) => (
              <>
                <h1 className={`uk-card-title`}>Поздравляю</h1>
                <button onClick={next}>Вперед</button>
                <button onClick={prev}>Назад</button>
              </>
            )} />
          </Wizard>
        </div>
        <div className={`uk-text-small uk-text-center uk-width-1-1`}>
          <Link className={`uk-display-inline-block uk-link uk-padding-small`} to={`/login`}>У меня есть аккаунт</Link>
        </div>
      </div>
    </RegistrationContext.Provider>
  );
};

export default Registration;
