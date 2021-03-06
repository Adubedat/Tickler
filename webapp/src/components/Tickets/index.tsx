import React, { useEffect, useState } from 'react';
import { TicketsContainer, TicketTitle, RowContainer, ListElementContainer, ListElementHeader, TicketAttribute, TicketAttributeStyle } from './styles';
import { TICKETS_SERVICE_URL } from '../../constants';
import { Button, Overlay, Tag } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import TicketForm from '../TicketForm';
import { ICreateTicket } from '../TicketForm';

export interface TicketProps {
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

const initialTicket = {
  _id: "",
  creator_id: "",
  title: "",
  description: "",
  priority: "Normal",
  severity: "Normal",
  status: "Open",
  number: 0,
  modified: "",
}

const severityColor = (severity: string) => {
  switch (severity) {
    case "Wishlist":
      return '#70728f';
    case "Minor":
      return '#40a8e4';
    case "Normal":
      return '#40e47c';
    case "Important":
      return '#e4a240';
    case "Critical":
      return '#d35450';
    default:
      return '#40e47c';
  }
}

const priorityColor = (priority: string) => {
  switch (priority) {
    case "Low":
      return '#a8e440';
    case "Normal":
      return '#e4ce40';
    case "High":
      return '#e47c40';
    default:
      return '#e4ce40';
  }
}



const backdropStyle = {
  style: {
    backgroundColor: '#fffffff0',
  }
}

const TicketsList = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const [formType, setFormType] = useState('Create');
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [ticket, setTicket] = useState(initialTicket);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const jwt = localStorage.getItem('jwt');
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
  }, [openOverlay])

  const createTicket = async (ticket: ICreateTicket) => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    }
    try {
      let response = await fetch(`${TICKETS_SERVICE_URL}/tickets`, requestOptions);
      let data = await response.json();
      if (response.status >= 400) {
        console.error(data.message);
      }
      toggleOverlay();
    } catch (error) {
      console.error(error);
    }
  }

  const updateTicket = async (ticket: ICreateTicket) => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    }
    try {
      let response = await fetch(`${TICKETS_SERVICE_URL}/tickets/${ticket.id}`, requestOptions);
      let data = await response.json();
      if (response.status >= 400) {
        console.error(data.message);
      }
      toggleOverlay();
    } catch (error) {
      console.error(error);
    }
  }

  const openCreateOverlay = () => {
    setTicket(initialTicket);
    setFormType('Create');
    setOpenOverlay(!openOverlay);
  }
  
  const openUpdateOverlay = (ticket: TicketProps) => {
    setTicket(ticket);
    setFormType('Update');
    setOpenOverlay(!openOverlay);
  }
  
  const toggleOverlay = () => {
    setOpenOverlay(!openOverlay);
  }

  const displayTickets = () => {
    return (tickets.map((ticket) => {
      ticket.modified = ticket.modified.split('T')[0].replace('-', ' ');
      return (<ListElement ticket={ticket}  key={ticket._id}/>)
    }));
  }

  const ListElement = ({ ticket }: Props) => {
    return (
      <ListElementContainer onClick={() => openUpdateOverlay(ticket)}>
        <div style={{ display: 'flex'}}>
          <Tooltip2 content={ticket.severity} minimal placement="top">
            <TicketAttribute><Tag round style={{backgroundColor: severityColor(ticket.severity)}} /></TicketAttribute>
          </Tooltip2>
          <Tooltip2 content={ticket.priority} minimal placement="top">
            <TicketAttribute><Tag round style={{backgroundColor: priorityColor(ticket.priority)}} /></TicketAttribute>
          </Tooltip2>
          <TicketAttribute><span style={{color: '#008aa8'}}>#{ticket.number}</span>&nbsp;{ticket.title}</TicketAttribute >
        </div>
        <div style={{ display: 'flex'}}>
          <TicketAttribute>{ticket.status}</TicketAttribute >
          <TicketAttribute>{ticket.modified}</TicketAttribute >
        </div>
      </ListElementContainer>
    );
  };

  return (
    <TicketsContainer>
      <Overlay
        isOpen={openOverlay}
        onClose={toggleOverlay}
        backdropProps={backdropStyle}
      >
        <TicketForm toggleOverlay={toggleOverlay} type={formType} createTicket={createTicket} updateTicket={updateTicket} ticket={ticket}/>
      </Overlay>
      <RowContainer >
        <TicketTitle>Tickets</TicketTitle>
        <Button
          onClick={openCreateOverlay}
          icon="plus"
          large
          style={{backgroundColor: '#83eede', backgroundImage: 'none' }}
          text="New ticket"
        />
      </RowContainer>
      <ListElementHeader>
        <div style={{ display: 'flex'}}>
          <TicketAttribute style={TicketAttributeStyle}>
            <Button minimal rightIcon="chevron-down" >Severity</Button >
          </TicketAttribute>
          <TicketAttribute style={TicketAttributeStyle}>
            <Button minimal rightIcon="chevron-down" >Priority</Button >
          </TicketAttribute>
          <TicketAttribute style={TicketAttributeStyle}>
            <Button minimal rightIcon="chevron-down" >Ticket</Button >
          </TicketAttribute>
        </div>
        <div style={{ display: 'flex'}}>
          <TicketAttribute style={TicketAttributeStyle}>
            <Button minimal rightIcon="chevron-down" >Status</Button >
          </TicketAttribute>
          <TicketAttribute style={TicketAttributeStyle}>
            <Button minimal rightIcon="chevron-down" >Modified</Button >
          </TicketAttribute>
        </div>
      </ListElementHeader>
      {displayTickets()}
    </TicketsContainer>
  );
};

export default TicketsList;