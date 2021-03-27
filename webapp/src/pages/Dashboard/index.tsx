import React from 'react';
import { MainContainer, TicketsContainer, RowContainer, ColumnContainer } from './styles';
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu/index';

const Dashboard = () => {
  return (
    <MainContainer>
      <ColumnContainer>
        <Navbar />
        <RowContainer>
          <LeftMenu />
          <TicketsContainer />
        </RowContainer>
      </ColumnContainer>
    </MainContainer>
  );
};

export default withRouter(Dashboard);