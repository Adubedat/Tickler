import styled from 'styled-components';

export const LabelStyle = {
  color: '#008aa8',
  fontSize: '1.2em'
}
export const MainContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
`;

export const TicketTitle = styled.span`
  font-size: 2.5em;
  font-weight: 500;
  color: #008aa8;
  align-self: center;
`;

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 800px;
  z-index: 21;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColumnContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding: 30px;
  justify-content: space-between;
  max-height: 100px;
  flex-direction: row;
`;

export const SuccessButtonStyle = {
  backgroundImage: 'none',
  backgroundColor: '#008aa8',
  width: '200px'
}