import React from 'react';

interface Props {
  className?: string,
  text?: string,
  isActive: boolean
}

const InputHint: React.FC<Props> = (props) => {
  const { className = ``, text, isActive } = props;

  return (
    (isActive && text)
      ? (<div className={`uk-position-absolute uk-overlay uk-padding-small ${className}`} style={{zIndex: 30}}>
        <div className={`uk-flex uk-flex-middle uk-height-1-1`}>
          <span className={`input-hint uk-active`}>
            {text}
          </span>
        </div>
      </div>)
      : null
  );
};


export default InputHint;
