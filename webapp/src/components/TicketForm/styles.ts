import styled from 'styled-components';

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

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 80%;
  width: 60%;
  height: 600px;
  z-index: 21;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
`;