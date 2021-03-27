import styled from 'styled-components'

export const LeftMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  max-width: 200px;
  flex-direction: column;
  background-color: #394b59;
`;

export const MenuElement = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  :hover {
    background-color: #31414d;
  }
`;

export const TicketsContainer = styled.div`
  position: relative;
  display: flex;
  flex: 5;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: #ffffff;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const RowContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;