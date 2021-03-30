import React, { useState } from 'react';
import { MainContainer, RowContainer, ColumnContainer } from './styles';
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu/index';
import TicketsList from '../../components/Tickets';
import Statistics from '../../components/Statistics';

export const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('tickets');

  const displayComponent = () => {
    if (selectedComponent === 'tickets') {
      return (<TicketsList />);
    }
    else if (selectedComponent === 'statistics') {
      return (<Statistics />);
    }
  }

  return (
    <MainContainer>
      <ColumnContainer>
        <Navbar />
        <RowContainer>
          <LeftMenu selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
          {displayComponent()}
        </RowContainer>
      </ColumnContainer>
    </MainContainer>
  );
};

export default withRouter(Dashboard);