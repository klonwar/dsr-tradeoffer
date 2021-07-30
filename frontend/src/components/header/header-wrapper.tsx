import React from 'react';
import Header from '#components/header/header';

const HeaderWrapper: React.FC = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div>
        {children}
      </div>
    </>
  );
};
export default HeaderWrapper;
