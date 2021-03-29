import React from 'react';
import { MainContainer } from './styles';
import { withRouter } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <MainContainer>
      <p>404 Error Page not found</p>
    </MainContainer>
  );
};

export default withRouter(PageNotFound);
