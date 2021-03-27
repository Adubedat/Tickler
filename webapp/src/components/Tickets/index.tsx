import React from 'react';
import { TicketsContainer, TicketTitle, RowContainer, ListElementContainer, ListElementHeader } from './styles';
import { Button } from "@blueprintjs/core";

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

const TicketsList = () => {
  return (
    <TicketsContainer>
      <RowContainer >
        <TicketTitle>Tickets</TicketTitle>
        <Button icon="plus" large style={{backgroundColor: '#83eede', backgroundImage: 'none' }}>New ticket</Button>
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