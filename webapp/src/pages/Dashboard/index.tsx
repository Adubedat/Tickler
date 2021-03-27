import React from 'react';
import { MainContainer, RowContainer, ColumnContainer } from './styles';
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu/index';
import TicketsList from '../../components/Tickets';

const Dashboard = () => {
  return (
    <MainContainer>
      <ColumnContainer>
        <Navbar />
        <RowContainer>
          <LeftMenu />
          <TicketsList />
        </RowContainer>
      </ColumnContainer>
    </MainContainer>
  );
};

export default withRouter(Dashboard);