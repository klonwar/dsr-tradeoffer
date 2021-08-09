import React from 'react';
import Header from '#components/_reusable/ui/header/header';

const HeaderWrapper: React.FC = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default HeaderWrapper;
