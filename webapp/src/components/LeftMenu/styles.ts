import styled from 'styled-components';

export const LeftMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  max-width: 200px;
  flex-direction: column;
  background-color: #394b59;
`;

export const MenuElement: any = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  :hover {
    background-color: #31414d;
  }
  background-color: ${(props: any) => {
    if (props.id === props.selected)
      return '#31414d'
  }}
`;