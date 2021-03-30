import { Button, FormGroup, HTMLSelect, InputGroup, Intent, Label, TextArea } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useUserState } from '../../context/User';
import { ButtonsContainer, FormContainer, MainContainer, TicketTitle, RowContainer, ColumnContainer, LabelStyle, SuccessButtonStyle } from './styles';
import { TicketProps } from '../Tickets';
import { TICKETS_SERVICE_URL } from '../../constants';

interface Props {
  toggleOverlay: () => void;
  createTicket: (data: ICreateTicket) => void;
  updateTicket: (data: ICreateTicket) => void;
  ticket: TicketProps;
  type: string;
}

export interface ICreateTicket {
  id?: string;
  creator_id: String;
  title: string;
  description: string;
  priority: string;
  severity: string;
  status: string;
}

const TicketForm = ({toggleOverlay, createTicket, updateTicket, ticket, type}: Props) => {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [severity, setSeverity] = useState(ticket.severity);
  const [subjectEmpty, setSubjectEmpty] = useState(false);


  const user = useUserState();

  const deleteTicket = async () => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
    }
    try {
      let response = await fetch(`${TICKETS_SERVICE_URL}/tickets/${ticket._id}`, requestOptions);
      let data = await response.json();
      if (response.status >= 400) {
        console.error(data.message);
      }
      toggleOverlay();
    } catch (error) {
      console.error(error);
    }
  }

  const displayDeleteButton = () => {
    if (user.role === "admin") {
      return (<Button style={{width: '200px'}} intent={Intent.DANGER} large onClick={deleteTicket} text="Delete ticket"/>)
    }
  }

  const statusOptions = [
    { label: "Open", value: "Open"},
    { label: "Closed", value: "Closed"},
  ];

  const severityOptions = [
    { label: "Wishlist", value: "Wishlist"},
    { label: "Minor", value: "Minor"},
    { label: "Normal", value: "Normal"},
    { label: "Important", value: "Important"},
    { label: "Critical", value: "Critical"},
  ]

  const priorityOptions = [
    { label: "Low", value: "Low"},
    { label: "Normal", value: "Normal"},
    { label: "High", value: "High"},
  ]

  const handleConfirmForm = async () => {
    if (!title) {
      setSubjectEmpty(true);
      return;
    }

    const data = {
      id: ticket._id,
      creator_id: user.id,
      title,
      description,
      status,
      priority,
      severity
    }

    if (type === "Create") {
      createTicket(data);
    } else {
      updateTicket(data);
    }
  }

  return (
    <MainContainer>
      <FormContainer>
        <TicketTitle>{type === "Create" ? 'New ticket' : 'Update ticket'}</TicketTitle>
        <RowContainer style={{ flex: 5 }}>
          <ColumnContainer style={{ flex: 3 }}>
            <FormGroup
              intent={Intent.DANGER}
              helperText={subjectEmpty ? "Subject can not be empty" : ""}
            >
              <InputGroup
                large
                placeholder="Subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                intent={subjectEmpty ? Intent.DANGER : Intent.NONE}
              />
            </FormGroup>
            <TextArea
              large
              placeholder="Please add descriptive text to help others better understand this issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
              style={{marginTop: '20px', resize: 'none', height: '30vh'}}
            />
          </ColumnContainer>
          <ColumnContainer style={{flex: 1 }}>
            <Label style={LabelStyle}>
              Status
              <HTMLSelect value={status} onChange={(e) => {setStatus(e.target.value)}} options={statusOptions}/>
            </Label>
            <Label style={LabelStyle}>
              Priority
              <HTMLSelect value={priority} onChange={(e) => {setPriority(e.target.value)}} options={priorityOptions}/>
            </Label>
            <Label style={LabelStyle}>
              Severity
              <HTMLSelect value={severity} onChange={(e) => {setSeverity(e.target.value)}} options={severityOptions}/>
            </Label>
          </ColumnContainer>
        </RowContainer>
        <ButtonsContainer style={{ flex: 1 }}>
          <Button onClick={handleConfirmForm} style={SuccessButtonStyle} intent={Intent.SUCCESS} large text={type}/>
          <Button style={{width: '200px'}} intent={Intent.DANGER} large onClick={toggleOverlay} text="Cancel"/>
          {displayDeleteButton()}
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default TicketForm;