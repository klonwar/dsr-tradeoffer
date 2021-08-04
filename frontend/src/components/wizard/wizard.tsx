/**
 * Я поискал библиотеки на https://npmjs.com, нашел очень популярную
 * **react-albus**, но, как оказалось, она давно не поддерживается,
 * содержит кучу багов и т.д. Посмотрел на аналоги, увидел, что
 * для моей задачи они будут оверкиллом. Поэтому решил написать
 * свой простой Wizard.
 * */

import React, { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';

interface WizardContextInterface {
  step: number;
  length: number;
}

interface WizardContextActionsInterface {
  next: () => void;
  prev: () => void;
}

interface WizardStepContextInterface {
  index: number;
  softHide: boolean;
}

const WizardContext = createContext<WizardContextInterface>(null);
const WizardContextActions = createContext<WizardContextActionsInterface>(null);
const WizardStepContext = createContext<WizardStepContextInterface>(null);

interface WizardStepProps {
  render: (wizardContext: WizardContextInterface & WizardContextActionsInterface) => React.ReactNode;
}

interface WizardStepElement extends JSX.Element {}

export const WizardStep: FC<WizardStepProps> = (props) => {
  const { render } = props;

  const wizardContext = useContext(WizardContext);
  const wizardContextActions = useContext(WizardContextActions);
  const wizardStepContext = useContext(WizardStepContext);

  const hidden = wizardContext.step !== wizardStepContext.index;

  if (!wizardStepContext.softHide && hidden)
    return null;

  return (
    <div style={{display: (hidden) ? `none` : `block`}}>
      {render({ ...wizardContext, ...wizardContextActions })}
    </div> as WizardStepElement
  );
};

export interface WizardActionOverrideData {
  prevContext: WizardContextInterface;
  newContext: WizardContextInterface;
}

interface WizardProps {
  children: WizardStepElement | WizardStepElement[],
  softHide?: boolean,
  overrideNext?: (next: () => void, data?: WizardActionOverrideData) => void,
  overridePrev?: (prev: () => void, data?: WizardActionOverrideData) => void,
}

export const Wizard: FC<WizardProps> = (props) => {
  const {
    children,
    softHide = false,
    overrideNext,
    overridePrev,
  } = props;

  const [wizardContext, setWizardContext] = useState<WizardContextInterface>({
    step: 0,
    length: React.Children.count(children) - 1,
  });

  const [wizardContextActions, setWizardContextActions] = useState<WizardContextActionsInterface>({
    next: () => {},
    prev: () => {},
  });

  const next = useCallback(() => {
    const newContext = {
      ...wizardContext,
      step: Math.min(wizardContext.step + 1, wizardContext.length),
    };
    const originNext = () => setWizardContext(newContext);

    if (overrideNext) {
      overrideNext(originNext, {
        prevContext: wizardContext,
        newContext,
      });
      return;
    }

    originNext();
  }, [wizardContext, overrideNext]);

  const prev = useCallback(() => {
    const newContext = {
      ...wizardContext,
      step: Math.max(wizardContext.step - 1, 0),
    };

    const originPrev = () => setWizardContext(newContext);

    if (overridePrev) {
      overridePrev(originPrev, {
        prevContext: wizardContext,
        newContext,
      });
      return;
    }

    originPrev();
  }, [wizardContext, overridePrev]);

  useEffect(() => {
    setWizardContextActions({
      next,
      prev,
    });
  }, [next, prev]);

  return (
    <WizardContext.Provider value={wizardContext}>
      <WizardContextActions.Provider value={wizardContextActions}>
        {
          React.Children.map(
            children,
            (child, index) => (
              <WizardStepContext.Provider key={`wsc-${index}`} value={{ index, softHide }}>
                {child}
              </WizardStepContext.Provider>
            ),
          )
        }
      </WizardContextActions.Provider>
    </WizardContext.Provider>
  );
};