import React, { useState } from 'react';
import { TicketsContainer, TicketTitle, RowContainer, ListElementContainer, ListElementHeader } from './styles';
import { Button, Overlay } from "@blueprintjs/core";
import TicketForm from '../TicketForm';

const ListElement = () => {
  return (
    <ListElementContainer>
      <div>
        <Button minimal rightIcon="chevron-down" >Severity</Button >
        <Button minimal rightIcon="chevron-down" >Priority</Button >
        <Button minimal rightIcon="chevron-down" >Ticket</Button >
      </div>
      <div>
        <Button minimal rightIcon="chevron-down" >Status</Button >
        <Button minimal rightIcon="chevron-down" >Modified</Button >
      </div>
    </ListElementContainer>
  );
};

const backdropStyle = {
  style: {
    backgroundColor: '#fffffff0',
  }
}

const TicketsList = () => {
  const [openOverlay, setOpenOverlay] = useState(false);

  const toggleOverlay = () => {
    setOpenOverlay(!openOverlay);
  }

  return (
    <TicketsContainer>
      <Overlay
        isOpen={openOverlay}
        onClose={toggleOverlay}
        backdropProps={backdropStyle}
      >
        <TicketForm toggleOverlay={toggleOverlay} type={'create'} />
      </Overlay>
      <RowContainer >
        <TicketTitle>Tickets</TicketTitle>
        <Button
          onClick={toggleOverlay}
          icon="plus"
          large
          style={{backgroundColor: '#83eede', backgroundImage: 'none' }}
          text="New ticket"
        />
      </RowContainer>
      <ListElementHeader>
      <div>
        <Button minimal rightIcon="chevron-down" >Severity</Button >
        <Button minimal rightIcon="chevron-down" >Priority</Button >
        <Button minimal rightIcon="chevron-down" >Ticket</Button >
      </div>
      <div>
        <Button minimal rightIcon="chevron-down" >Status</Button >
        <Button minimal rightIcon="chevron-down" >Modified</Button >
      </div>
    </ListElementHeader>
    </TicketsContainer>
  );
};

export default TicketsList;