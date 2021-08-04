import React from 'react';
import { FC } from 'react';

const Logo: FC = () => {
  return (
    <a href={`#`} className={`Logo uk-link-reset`}>
      <span className={`uk-visible@s`}>TradeOffer</span>
    </a>
  );
};

export default Logo;