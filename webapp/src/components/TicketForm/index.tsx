import { Button, HTMLSelect, InputGroup, Intent, Label, TextArea } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useUserState } from '../../context/User';
import { ButtonsContainer, FormContainer, MainContainer, TicketTitle, RowContainer, ColumnContainer, LabelStyle, SuccessButtonStyle } from './styles';

interface Props {
  toggleOverlay: () => void;
  type: string;
}

const TicketForm = ({toggleOverlay, type}: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [severity, setSeverity] = useState('');


  const user = useUserState();

  const displayDeleteButton = () => {
    if (user.role === "admin") {
      return (<Button style={{width: '200px'}} intent={Intent.DANGER} large onClick={toggleOverlay} text="Delete ticket"/>)
    }
  }

  const statusOptions = [
    { label: "Open", value: "Open"},
    { label: "Closed", value: "Closed"},
  ];

  const priorityOptions = [
    { label: "Wishlist", value: "Wishlist"},
    { label: "Minor", value: "Minor"},
    { label: "Normal", value: "Normal"},
    { label: "Important", value: "Important"},
    { label: "Critical", value: "Critical"},
  ]

  const severityOptions = [
    { label: "Low", value: "Low"},
    { label: "Normal", value: "Normal"},
    { label: "High", value: "High"},
  ]

  return (
    <MainContainer>
      <FormContainer>
        <TicketTitle>New ticket</TicketTitle>
        <RowContainer style={{ flex: 5 }}>
          <ColumnContainer style={{ flex: 3 }}>
            <InputGroup
              id="title-input"
              large
              placeholder="Subject"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              id="description-input"
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
          <Button style={SuccessButtonStyle} intent={Intent.SUCCESS} large text={type}/>
          <Button style={{width: '200px'}} intent={Intent.DANGER} large onClick={toggleOverlay} text="Cancel"/>
          {displayDeleteButton()}
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default TicketForm;