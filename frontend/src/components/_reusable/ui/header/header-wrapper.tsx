import React from 'react';
import Header from '#reusable/ui/header/header';

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
