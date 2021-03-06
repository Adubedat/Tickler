import styled from 'styled-components';

export const TicketTitle = styled.span`
  font-size: 2.5em;
  font-weight: 500;
  color: #008aa8;
`;

export const TicketsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 5;
`;

export const RowContainer = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ListElementContainer = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  :hover {
    background-color: #d4dde4;
  }
  border-radius: 5px;
  margin: 5px;
  background-color: #ecf0f3;
`;

export const ListElementHeader = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TicketAttribute = styled.span`
  display: flex;
  min-width: 120px;
  justify-content: center;
  align-items: center;
`;

export const TicketAttributeStyle = {
  paddingLeft: '10px'
}