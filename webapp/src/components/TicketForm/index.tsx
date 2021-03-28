import { Button } from '@blueprintjs/core';
import React from 'react';
import { useUserState } from '../../context/User';
import { ColumnContainer, RowContainer } from '../../pages/Dashboard/styles';
import { ButtonsContainer, FormContainer, MainContainer } from './styles';

interface Props {
  toggleOverlay: () => void;
  type: string;
}

const TicketForm = ({toggleOverlay, type}: Props) => {
  const user = useUserState();

  const displayDeleteButton = () => {
    if (user.role === "admin") {
      return (<Button onClick={toggleOverlay} text="Delete ticket"/>)
    }
  }

  return (
    <MainContainer>
      <FormContainer>
        <RowContainer style={{ flex: 5, backgroundColor: 'pink' }}>
          <ColumnContainer style={{flex: 3, backgroundColor: 'blue' }}>
            Text areas
          </ColumnContainer>
          <ColumnContainer style={{flex: 1, backgroundColor: 'green' }}>
            Select items
          </ColumnContainer>
        </RowContainer>
        <ButtonsContainer style={{ flex: 1, backgroundColor: 'yellow' }}>
          <Button text={type}/>
          <Button onClick={toggleOverlay} text="Cancel"/>
          {displayDeleteButton()}
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default TicketForm;