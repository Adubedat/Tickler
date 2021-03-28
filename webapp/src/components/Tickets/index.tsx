import React, { useEffect, useState } from 'react';
import { TicketsContainer, TicketTitle, RowContainer, ListElementContainer, ListElementHeader, TicketAttribute } from './styles';
import { TICKETS_SERVICE_URL } from '../../constants';
import { Button, Overlay } from "@blueprintjs/core";
import TicketForm from '../TicketForm';

interface TicketProps {
  _id: string;
  creator_id: string;
  title: string;
  description: string;
  priority: string;
  severity: string;
  status: string;
  number: number;
  modified: string;
}

interface Props {
  ticket: TicketProps;
}

const ListElement = ({ ticket }: Props) => {
  return (
    <ListElementContainer>
      <div style={{ display: 'flex'}}>
        <TicketAttribute>{ticket.severity}</TicketAttribute >
        <TicketAttribute>{ticket.priority}</TicketAttribute >
        <TicketAttribute>{`#${ticket.number} ${ticket.title}`}</TicketAttribute >
      </div>
      <div style={{ display: 'flex'}}>
        <TicketAttribute>{ticket.status}</TicketAttribute >
        <TicketAttribute>{ticket.modified}</TicketAttribute >
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
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchUsers = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        },
      };
      try {
        let response = await fetch(`${TICKETS_SERVICE_URL}/tickets`, requestOptions);
        let data = await response.json();
        if (response.status >= 400) {
          console.error(data.message);
          return;
        }
        setTickets(data.data);
      } catch (error) {
        console.error(error);
      }
    };
  fetchUsers();
  })

  const displayTickets = () => {
    return (tickets.map((ticket) => {
      ticket.modified = ticket.modified.split('T')[0].replace('-', ' ');
      return (<ListElement ticket={ticket}  key={ticket._id}/>)
    }));
  }

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
        <div style={{ display: 'flex'}}>
          <TicketAttribute style={{ paddingLeft: '10px'}}>
            <Button minimal rightIcon="chevron-down" >Severity</Button >
          </TicketAttribute>
          <TicketAttribute style={{ paddingLeft: '10px'}}>
            <Button minimal rightIcon="chevron-down" >Priority</Button >
          </TicketAttribute>
          <TicketAttribute style={{ paddingLeft: '10px'}}>
            <Button minimal rightIcon="chevron-down" >Ticket</Button >
          </TicketAttribute>
        </div>
        <div style={{ display: 'flex'}}>
          <TicketAttribute style={{ paddingLeft: '10px'}}>
            <Button minimal rightIcon="chevron-down" >Status</Button >
          </TicketAttribute>
          <TicketAttribute style={{ paddingLeft: '10px'}}>
            <Button minimal rightIcon="chevron-down" >Modified</Button >
          </TicketAttribute>
        </div>
      </ListElementHeader>
      {displayTickets()}
    </TicketsContainer>
  );
};

export default TicketsList;